import React, { useCallback, useEffect, useState } from 'react'
import { notification, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'

export type ConfigProperties = {
    tableTitle: string,
    fetchURL: string,
    setURL: string,
    isInput: boolean
}

interface DataType {
    id: number,
    name: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
    {
        title: '',
        dataIndex: 'id',
        width: '10%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '90%',
    },
]

const MidiConnectionTable: React.FunctionComponent<ConfigProperties> = (props) => {
    const [data, setData] = useState<DataType[]>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>()
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
        fetch(props.fetchURL)
            .then((response) => response.json())
            .then((results) => {
                let data: DataType[] = results

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
            .then(() => {
                fetch('http://localhost:4000/api/midi/connections')
                    .then((response) => response.json())
                    .then((results) => {
                        let data: any[] = results

                        data.forEach((value) => {
                            if (props.isInput && value.is_input) {
                                setSelectedRowKeys([value.id as number])
                            }
                            else {
                                setSelectedRowKeys([value.id as number])
                            }
                        })
                    })
            })
    }
    const [api] = notification.useNotification();
    const fetchDataCallback = useCallback(fetchData, [props, tableParams])
    useEffect(() => {
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
    const handleRowSelectionChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log("Row selected", selectedRowKeys)
        let rowKeys: number[] = []
        selectedRowKeys.forEach((value) => {
            if (value !== null) {
                let rowKey: number = value.valueOf() as number
                rowKeys.push(rowKey)
            }
        })
        setSelectedRowKeys(rowKeys)
        fetch(
            `${props.setURL}/${selectedRowKeys[0]}`,
            {method: 'POST'}
        ).then((value: Response) => {
        }).catch((reason: any) => {
            api['error']({
                message: 'Connection Issue',
                description: 'Could not connect to midi input: ' + reason,
            })
        })   
    }
    
    return (
        <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            title={() => props.tableTitle}
            onChange={handleTableChange}
            rowSelection={{
                type: 'radio',
                onChange: handleRowSelectionChange,
                selectedRowKeys: selectedRowKeys
            }}
        />
    )
}

export default MidiConnectionTable
