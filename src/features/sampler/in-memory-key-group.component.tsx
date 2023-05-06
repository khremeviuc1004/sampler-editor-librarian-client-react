import { Breadcrumb, Checkbox, Col, Form, InputNumber, Row, Select, Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { KeyGroup } from '@sampler-editor-librarian/dto';
import { MenuComponent } from '../menu/menu.component';
import { KeygroupFilter1 } from './keygroup-filter1.component';
import { KeygroupFilter2 } from './keygroup-filter2.component';
import { KeygroupTone } from './tone.component';
import { Envelope1 } from './envelope1.component';
import { Envelope2 } from './envelope2.component';
import { Envelope3 } from './envelope3.component';
import { Pitch } from './pitch.component';
import { KeyGroupZone } from './zone.component';
import { muteGroups } from '../../util/util';


export const InMemoryKeygroup: React.FunctionComponent = (props) => {
  const [data, setData] = useState<KeyGroup>(new KeyGroup())
  const { programNumber: inMemoryProgramNumber, keygroupNumber: inMemoryKeygroupNumber } = useParams<{ programNumber: string, keygroupNumber: string }>()
  let programNumberInMemory = inMemoryProgramNumber == null ? 0 : parseInt(inMemoryProgramNumber)
  let keygroupNumberInMemory = inMemoryKeygroupNumber == null ? 0 : parseInt(inMemoryKeygroupNumber)
  const breadcrumbItems = [
    {
      title: <Link to="/sampler">Sampler</Link>,
      key: 'sampler',
    },
    {
      title: <Link to={"/in-memory-program/" + inMemoryProgramNumber}>Program {programNumberInMemory + 1}</Link>,
      key: 'program',
    },
    {
      title: 'Keygroup ' + (keygroupNumberInMemory + 1)
    }
  ]
  const fetchData = () => {
    fetch('http://localhost:4000/api/midi/sampler/program/' + inMemoryProgramNumber + '/keygroup/' + inMemoryKeygroupNumber)
      .then((res) => res.json())
      .then((results: KeyGroup) => {
        console.log("Keygroup data: ", results)
        setData({
          ...results
        })
      })
  }
  const fetchDataCallback = useCallback(fetchData, [inMemoryProgramNumber, inMemoryKeygroupNumber])
  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback])
  const handleChange = (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => {
    if (value !== null) {
      fetch(
        'http://localhost:4000/api/midi/sampler/keygroup/program/' + programNumberInMemory + '/keygroup/' + keygroupNumberInMemory + '/index/' + keygroupHeaderIndex + '/value/' + (typeof value !== "boolean" ? value : (value ? 1 : 0)),
        { method: 'PUT' }
      )
      let newData: KeyGroup = JSON.parse(JSON.stringify(keygroup)) // deep clone
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
  const handleNameChange = (keygroupHeaderIndex: number, name: string, path: Array<string>, keygroup: KeyGroup) => {
    if (name !== null) {
      fetch(
        'http://localhost:4000/api/midi/sampler/keygroup/program/' + programNumberInMemory + '/keygroup/' + keygroupNumberInMemory + '/index/' + keygroupHeaderIndex + '/name/' + name,
        { method: 'PUT' }
      )
      let newData: KeyGroup = JSON.parse(JSON.stringify(keygroup)) // deep clone
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

  return (
    <>
      <MenuComponent />
      <Breadcrumb items={breadcrumbItems} />
      <div>In Memory Key Group: {keygroupNumberInMemory + 1}</div>
      <Row gutter={50}>
        <Col>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 20 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Span Low"}
            >
              <InputNumber bordered={true} defaultValue={21} max={127} value={data.span.lowNote} onChange={(value: number | null) => handleChange(3, value, ["span", "lowNote"], data)} />
            </Form.Item>
            <Form.Item
              label={"Span High"}
            >
              <InputNumber bordered={true} defaultValue={127} max={127} value={data.span.highNote} onChange={(value: number | null) => handleChange(4, value, ["span", "highNote"], data)} />
            </Form.Item>
            <Form.Item
              label={"Mute Group"}
            >
              <Select
                options={muteGroups} bordered={true} value={data.muteGroup} onChange={(value: number | null) => handleChange(160, value, ["muteGroup"], data)} />
            </Form.Item>
            <Form.Item
              label={"Velocity Cross Fade"}
            >
              <Checkbox checked={data.velocityCrossFade} onChange={(event) => handleChange(30, event.target.checked, ["velocityCrossFade"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
        </Col>
      </Row>
      <Tabs
        size='small'
        items={[
          {
            key: 'filter1',
            label: `Filter 1`,
            children: <KeygroupFilter1 data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'filter2',
            label: `Filter 2`,
            children: <KeygroupFilter2 data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'tone',
            label: `Tone`,
            children: <KeygroupTone data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'envelope1',
            label: `Envelope 1`,
            children: <Envelope1 data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'envelope2',
            label: `Envelope 2`,
            children: <Envelope2 data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'envelope3',
            label: `Envelope 3`,
            children: <Envelope3 data={data} setData={setData} handleChange={handleChange} />,
          },
          {
            key: 'zones',
            label: `Zones`,
            children: <KeyGroupZone data={data} setData={setData} handleChange={handleChange} handleNameChange={handleNameChange} />,
          },
          {
            key: 'pitch',
            label: `Pitch`,
            children: <Pitch data={data} setData={setData} handleChange={handleChange} />,
          },
        ]}
      />
    </>
  );
}