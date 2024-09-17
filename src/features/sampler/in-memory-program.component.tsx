import { Breadcrumb, Button, Col, Form, Input, notification, Popconfirm, Row, Space, TablePaginationConfig, Tabs } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Program } from 'sampler-editor-librarian-dto';
import { MenuComponent } from '../menu/menu.component';
import { LFO1 } from './lfo1.component';
import { LFO2 } from './lfo2.component';
import { MasterOutput } from './master-output.component';
import { MasterPan } from './master-pan.component';
import { MasterTuning } from './master-tuning.component';
import { MidiPan } from './midi.component';
import { Modes } from './modes.component';
import { PitchBend } from './pitch-bend.component';
import { Portamento } from './portamento.component';
import { SemitoneTuning } from './semitone-tuning.component';
import { SoftPedal } from './soft-pedal.component';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { KeyGroupGlobal } from './key-group-global.component';

interface KeyGroup {
  index: number,
}


interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export const InMemoryProgram: React.FunctionComponent = (props) => {
  const [data, setData] = useState<Program>(new Program())
  const { id: inMemoryProgramNumber } = useParams<{ id: string }>()
  let programNumberInMemory = inMemoryProgramNumber == null ? 0 : parseInt(inMemoryProgramNumber)
  const navigate = useNavigate()
  const breadcrumbItems = [
    {
      title: <Link to="/Sampler">Sampler</Link>,
      key: 'sampler',
    },
    {
      title: 'Program' + (programNumberInMemory + 1)
    }
  ]
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 7,
      hideOnSinglePage: true,
    },
  })
  const fetchData = () => {
    fetch(`http://localhost:4000/api/midi/sampler/program/${inMemoryProgramNumber}`)
      .then((res) => res.json())
      .then((results: Program) => {
        console.log("Program data: ", results)
        setData({
          ...results
        })

        let keygroups = []
        for (let index = 0; index < results.numberOfKeyGroups; index++) {
          keygroups.push({ index })
        }

        setKeygroups(keygroups)
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: keygroups.length,
          },
        })
      })
  }
  const [api] = notification.useNotification();
  // eslint-disable-next-line
  const fetchDataCallback = useCallback(fetchData, [])
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetchDataCallback()
  }, [fetchDataCallback])
  const handleChange = (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => {
    if (value !== null) {
      fetch(
        `http://localhost:4000/api/midi/sampler/program/${programNumberInMemory}/index/${programHeaderIndex}/value/${typeof value !== "boolean" ? value : (value ? 1 : 0)}`,
        { method: 'PUT' }
      )
      let newData: Program = JSON.parse(JSON.stringify(program)) // deep clone
      let data: any = newData

      path.forEach((subPath: string, index) => {
        if (subPath in data && index < (path.length - 1)) {
          data = data[subPath]
        }
        data[subPath] = value
      })
      setData(newData)
    }
  }
  const [keygroups, setKeygroups] = useState<KeyGroup[]>()
  const [loading, setLoading] = useState(false)
  const handleTableChange = (
    pagination: TablePaginationConfig,
  ) => {
    setTableParams({
      ...tableParams,
      pagination
    })
  }
  let handleEditKeyGroup = (record: KeyGroup) => {
    navigate("/in-memory-key-group/" + inMemoryProgramNumber + "/keygroup/" + record.index)
  }
  let handleDeleteKeyGroup = (keygroupNumberInProgram: number) => {
    fetch(
      `http://localhost:4000/api/midi/sampler/program/${inMemoryProgramNumber}/keygroup/${keygroupNumberInProgram}`,
      { method: 'DELETE' }
    ).then((value: Response) => {
      fetchData()
    }).catch((reason: any) => {
      api['error']({
        message: 'Delete Failure',
        description: 'Could not delete the key group: ' + reason,
      })
    })
  }
  let handleAddKeygroup = () => {
    fetch(
      `http://localhost:4000/api/midi/sampler/program/${inMemoryProgramNumber}/keygroup/${keygroups?.length}`,
      { method: 'POST' }
    ).then((value: Response) => {
      fetchData()
    }).catch((reason: any) => {
      api['error']({
        message: 'Add Failure',
        description: 'Could not add a new key group to the program: ' + reason,
      })
    })
  }
  const handleNameChange = (programHeaderIndex: number, name: string, path: Array<string>, program: Program) => {
    if (name !== null) {
      fetch(
        `http://localhost:4000/api/midi/sampler/program/${programNumberInMemory}/index/${programHeaderIndex}/name/${name}`,
        { method: 'PUT' }
      )
      let newData: Program = JSON.parse(JSON.stringify(program)) // deep clone
      let data: any = newData

      path.forEach((subPath: string, index) => {
        if (subPath in data && index < (path.length - 1)) {
          data = data[subPath]
        }
        data[subPath] = name
      })
      setData(newData)
    }
  }
  const columns: ColumnsType<KeyGroup> = [
    {
      title: 'Number',
      dataIndex: 'index',
      render: (index) => "Key group " + (index + 1),
    },
    {
      title: '',
      dataIndex: 'action',
      width: '10%',
      render: (value: any, record: KeyGroup, index: number) => {
        return <>
          <Space>
            <EditOutlined title='Edit keygroup' onClick={() => handleEditKeyGroup(record)} />
            <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteKeyGroup(record.index)}>
              <DeleteOutlined title="Delete key group" />
            </Popconfirm>
          </Space>
        </>
      }
    },
  ];

  return (
    <>
      <MenuComponent />
      <Breadcrumb items={breadcrumbItems} />
      <div>In Memory Program: {programNumberInMemory}</div>
      <Row gutter={50}>
        <Col>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Program Name"}
            >
              <Input bordered={true} defaultValue={0} min={3} max={12} value={data.name} onChange={(event) => handleNameChange(3, event.target.value, ["name"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.index}
            dataSource={keygroups}
            pagination={tableParams.pagination}
            loading={loading}
            title={() => 'Key Groups'}
            onChange={handleTableChange}
            footer={() => <Button type='primary'><PlusOutlined title='Add a new key group' onClick={handleAddKeygroup} /></Button>}
          />
        </Col>
      </Row>
      <Tabs
        size='small'
        items={[
          {
            key: 'lfo1',
            label: `LFO1`,
            children: <LFO1 programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'lfo2',
            label: `LFO2`,
            children: <LFO2 programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'pitch_bend',
            label: `Pitch Bend`,
            children: <PitchBend programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'semitone_tuning',
            label: `Temper Tuning`,
            children: <SemitoneTuning programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'master_tuning',
            label: `Master Tuning`,
            children: <MasterTuning programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'soft_pedal',
            label: `Soft Pedal`,
            children: <SoftPedal programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'modes',
            label: `Modes`,
            children: <Modes programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'master_output',
            label: `Master Output`,
            children: <MasterOutput programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'master_pan',
            label: `Master Pan`,
            children: <MasterPan programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'midi',
            label: `Midi`,
            children: <MidiPan programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'portamento',
            label: `Portamento`,
            children: <Portamento programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'keygroup_global',
            label: `Keygroup Global`,
            children: <KeyGroupGlobal programNumberInMemory={programNumberInMemory} data={data} setData={setData} handleChange={handleChange} />,
          },
        ]}
      />
    </>
  );
}