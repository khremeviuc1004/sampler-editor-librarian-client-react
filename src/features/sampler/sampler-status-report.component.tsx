import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface DataType {
    name: string;
    value: number,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: '50%',
    },
    {
        title: 'Value',
        dataIndex: 'value',
        width: '50%',
    },
];

interface TableParams {
    pagination?: TablePaginationConfig;
}

const SamplerStatusReport: React.FunctionComponent = () => {
    const [data, setData] = useState<DataType[]>()
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            hideOnSinglePage: true,
        },
    });
    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:4000/api/midi/sampler/sampler-status-report`)
            .then((res) => res.json())
            .then((results) => {
                let data: DataType[] = []

                Object.entries(results).forEach(([key, value]) => {
                    if (typeof value == 'number') {
                        let typed_value: number = value
                        data.push({ name: key, value: typed_value })
                    }
                })

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
    const fetchDataCallback = useCallback(fetchData, [tableParams])
    useEffect(() => {
        console.log('Rendering sampler status report')
        fetchDataCallback()
    }, [fetchDataCallback])


    return (
        <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.name}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            title={() => 'Status'}
        />
    )
}

export default SamplerStatusReport
