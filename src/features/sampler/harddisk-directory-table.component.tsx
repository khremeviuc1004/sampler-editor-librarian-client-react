import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputRef, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { ClearOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons'

interface EntryDetails {
    entry_number: number,
    selector: number,
    entry_name: string,
    type: string
}

interface DataType {
    index: number,
    name: string,
    type: string
}

type DataIndex = keyof DataType;

const HardDiskDirectoryTable: React.FunctionComponent = () => {
    const [data, setData] = useState<DataType[]>()
    const [loading, setLoading] = useState(false)
    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:4000/api/midi/sampler/hard-disk-dir`)
            .then((res) => res.json())
            .then((results) => {
                let data: DataType[] = []
                let incoming_data: EntryDetails[] = results

                incoming_data.forEach((value, index) => {
                    data.push({
                        index,
                        name: value.entry_name,
                        type: value.type
                    })
                });

                setData(data);
                setLoading(false);
            })
    }
    // eslint-disable-next-line
    const [searchText, setSearchText] = useState('');
    // eslint-disable-next-line
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };
    const handleClear = (
        clearFilters: () => void,
        confirm: (param?: FilterConfirmProps) => void,
    ) => {
        clearFilters()
        setSearchText('')
        setSearchedColumn('')
        confirm()
    };
    useEffect(() => {
        console.log("Rendering sampler hard disk directory table")
    }, [])
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
            width: '60%',
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value: string | number | any, record: DataType) => record.name.indexOf(value) >= 0,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search name`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, 'name')}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys as string[], confirm, 'name')}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => clearFilters && handleClear(clearFilters, confirm)}
                            icon={<ClearOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Clear
                        </Button>
                    </Space>
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '30%',
            filters: [
                {
                    text: 'Program',
                    value: 'program',
                },
                {
                    text: 'Sample',
                    value: 'sample',
                },
                {
                    text: 'Cue List',
                    value: 'cue list',
                },
                {
                    text: 'Take List',
                    value: 'take list',
                },
                {
                    text: 'Effects file',
                    value: 'effects file',
                },
                {
                    text: 'Drum Inputs',
                    value: 'drum inputs',
                },
            ],
            onFilter: (value: string | number | any, record: DataType) => record.type === value,
        },
    ]

    return (
        <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.index}
            dataSource={data}
            loading={loading}
            title={() => 'Current Volume Contents'}
            footer={() => <Button type='primary' onClick={fetchData}><DownloadOutlined title='Load current volume' /></Button>}
        />
    )
}

export default HardDiskDirectoryTable
