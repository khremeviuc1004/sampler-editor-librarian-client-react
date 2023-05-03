import React, { useEffect, useState } from 'react'
import { Button, Col, notification, Popconfirm, Row, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

interface DataType {
    index: number,
    name: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const SamplerSampleTable: React.FunctionComponent = () => {
    let navigate = useNavigate();
    const [data, setData] = useState<DataType[]>()
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 7,
            hideOnSinglePage: true,
        },
    })
    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:4000/api/midi/sampler/request-resident-sample-names?${qs.stringify({
            page: tableParams.pagination?.current,
            results: tableParams.pagination?.pageSize
        })}`)
            .then((res) => res.json())
            .then((results) => {
                let data: DataType[] = []
                let incoming_data: string[] = results

                incoming_data.forEach((name, index) => {
                    data.push({ index, name })
                });

                setData(data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.length,
                    },
                })
            })
    }
    const [api] = notification.useNotification();
    useEffect(() => {
        console.log("Rendering sampler sample table")
        fetchData()
    }, [JSON.stringify(tableParams)])
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        setTableParams({
            ...tableParams,
            pagination
        })
    }
    let handleEditSample = (sampleNumberInMemory: number) => {
        navigate("/in-memory-sample/" + sampleNumberInMemory)
    }
    let handleDeleteSample = (sampleNumberInMemory: number) => {
        fetch(
            `http://localhost:4000/api/midi/sampler/sample/${sampleNumberInMemory}`,
            { method: 'DELETE' }
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Delete Failure',
                description: 'Could not delete the sample: ' + reason,
            })
        })
    }
    let handleAddSample = () => {
        fetch(
            `http://localhost:4000/api/midi/sampler/sample/${data?.length}/template/square`,
            { method: 'POST' }
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Add Failure',
                description: 'Could not add a new sample: ' + reason,
            })
        })
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'index',
            width: '10%',
            render: (index) => "" + (index + 1),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '80%',
        },
        {
            title: '',
            dataIndex: 'action',
            width: '10%',
            render: (value: any, record: DataType, index: number) => {
                const sampleNumberInMemory = record.index

                return <>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteSample(sampleNumberInMemory)}>
                        <DeleteOutlined title="Delete sample" />
                    </Popconfirm>
                    <EditOutlined title='Edit sample' onClick={() => handleEditSample(sampleNumberInMemory)} />
                </>
            }
        },
    ]

    return (
        <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.index}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            title={() => 'Samples'}
            onChange={(pagination) => handleTableChange(pagination)}
        // footer={() => <Button type='primary'  onClick={() => {handleAddSample();}}><PlusOutlined title='Add a new sample' /></Button>}
        />
    )
}

export default SamplerSampleTable
