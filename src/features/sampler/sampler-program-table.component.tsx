import React, { useCallback, useEffect, useState } from 'react'
import { Button, notification, Popconfirm, Space, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'
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

const SamplerProgramTable: React.FunctionComponent = () => {
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
        fetch(`http://localhost:4000/api/midi/sampler/request-resident-program-names`)
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
    const fetchDataCallback = useCallback(fetchData, [tableParams])
    useEffect(() => {
        console.log("Rendering sampler program table")
        fetchDataCallback()
    }, [fetchDataCallback])
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        setTableParams({
            ...tableParams,
            pagination
        })
    }
    let handleEditProgram = (record: DataType) => {
        navigate("/in-memory-program/" + record.index)
    }
    let handleDeleteProgram = (programNumberInMemory: number) => {
        fetch(
            `http://localhost:4000/api/midi/sampler/program/${programNumberInMemory}`,
            { method: 'DELETE' }
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Delete Failure',
                description: 'Could not delete the program: ' + reason,
            })
        })
    }
    let handleAddProgram = () => {
        fetch(
            `http://localhost:4000/api/midi/sampler/program/${data?.length}`,
            { method: 'POST' }
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Add Failure',
                description: 'Could not add a new program: ' + reason,
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
            width: '70%',
        },
        {
            title: '',
            dataIndex: 'action',
            width: '20%',
            render: (value: any, record: DataType, index: number) => {
                return <>
                    <Space>
                        <EditOutlined title='Edit program' onClick={() => handleEditProgram(record)} />
                        <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteProgram(record.index)}>
                            <DeleteOutlined title="Delete program" />
                        </Popconfirm>
                    </Space>
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
            title={() => 'Programs'}
            onChange={handleTableChange}
            footer={() => <Button type='primary'><PlusOutlined title='Add a new program' onClick={handleAddProgram} /></Button>}
        />
    )
}

export default SamplerProgramTable
