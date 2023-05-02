import { Breadcrumb, Checkbox, Col, Form, Input, InputNumber, Row, Select, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MenuComponent } from '../menu/menu.component';
import { Sample } from '@sampler-editor-librarian/dto';
import { bandwidths, samplePlayBackTypes } from '../../util/util';
import { SampleLoopComponent } from './sample-loop.component';


export const InMemorySample: React.FunctionComponent = (props) => {
  const [data, setData] = useState<Sample>(new Sample())
  const { sampleNumber: inMemorySampleNumber } = useParams<{ sampleNumber: string }>()
  let sampleNumberInMemory = inMemorySampleNumber == null ? 0 : parseInt(inMemorySampleNumber)
  const navigate = useNavigate()
  const breadcrumbItems = [
    {
      title: <Link to="/sampler">Sampler</Link>,
      key: 'sampler',
    },
    {
      title: 'Sample ' + (sampleNumberInMemory + 1)
    }
  ]
  const fetchData = () => {
    fetch(`http://localhost:4000/api/midi/sampler/sample/${inMemorySampleNumber}`)
        .then((res) => res.json())
        .then((results: Sample) => {
          console.log("Sample data: ", results)
          setData({
            ...results
          })
        })
  }
  useEffect(() => {
    console.log("Whoops!")
    fetchData();
  }, [])
  const handleChange = (sampleHeaderIndex: number, value: number | boolean | null, path: Array<string>, sample: Sample) => {
    if (value !== null) {
      fetch(
        `http://localhost:4000/api/midi/sampler/sample/${sampleNumberInMemory}/index/${sampleHeaderIndex}/value/${typeof value !== "boolean" ? value : (value ? 1 : 0)}`,
        {method: 'PUT'}
      )
      let newData: Sample = JSON.parse(JSON.stringify(sample)) // deep clone
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
  const handleNameChange = (sampleHeaderIndex: number, name: string, path: Array<string>, sample: Sample) => {
    if (name !== null) {
      fetch(
        `http://localhost:4000/api/midi/sampler/sample/${sampleNumberInMemory}/index/${sampleHeaderIndex}/name/${name}`,
        {method: 'PUT'}
      )
      let newData: Sample = JSON.parse(JSON.stringify(sample)) // deep clone
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
        <div>In Memory Key Group: {sampleNumberInMemory + 1}</div>
        <Row gutter={50}>
          <Col>
            <Form
              labelCol={{span: 20}}
              wrapperCol={{span: 20}}
              size={"small"}
              layout='vertical'
            >
              <Form.Item
                label={"Bandwidth"}
              >
                <Select style={{width: "90px"}}
                  options={bandwidths} 
                  bordered={true} 
                  value={data.bandwith}
                  disabled={true} 
                  onChange={(value: number | null) => handleChange(1, value, ["bandwith"], data)} />
              </Form.Item>
              <Form.Item
                label={"Original Pitch"}
              >
                <InputNumber bordered={true} defaultValue={0} min={21} max={127} value={data.originalPitch} onChange={(value: number | null) => handleChange(2, value, ["originalPitch"], data)} />
              </Form.Item>
              <Form.Item
                label={"Name"}
              >
                <Input bordered={true} defaultValue={0} min={3} max={12} value={data.name} onChange={(event) => handleNameChange(3, event.target.value, ["name"], data)} />
              </Form.Item>
              <Form.Item
                  label={"Sample rate validity"}
                >
                  <Checkbox checked={data.valid} disabled={true} /* onChange={(event) => handleChange(15, event.target.checked, ["valid"], data)} */ />
                </Form.Item>
              <Form.Item
                label={"Number of loops"}
              >
                <InputNumber bordered={true} disabled={true} defaultValue={0} min={0} max={4} value={data.numberOfLoops} /* onChange={(value: number | null) => handleChange(16, value, ["numberOfLoops"], data)} */ />
              </Form.Item>
              <Form.Item
                label={"Playback Type"}
              >
                <Select style={{width: "90px"}}
                  options={samplePlayBackTypes} 
                  bordered={true} 
                  value={data.playbackType}
                  onChange={(value: number | null) => handleChange(19, value, ["playbackType"], data)} />
              </Form.Item>
              <Form.Item
                label={"Tuning"}
              >
                <InputNumber controls={true} bordered={true} defaultValue={0} min={-50.0} max={50.0} step={0.01} value={data.tune} onChange={(value: number | null) => handleChange(20, value, ["tune"], data)} />
              </Form.Item>
              <Form.Item
                label={"Length"}
              >
                <InputNumber bordered={true} disabled={true} defaultValue={1} min={1} value={data.sampleLength} /* onChange={(value: number | null) => handleChange(26, value, ["sampleLength"], data)} */ />
              </Form.Item>
              <Form.Item
                label={"Start Offset"}
                tooltip={"Play Start Offset from Start of Sample"}
              >
                <InputNumber bordered={true} defaultValue={0} min={0} max={data.sampleLength - 1} value={data.startOffset} onChange={(value: number | null) => handleChange(30, value, ["startOffset"], data)} />
              </Form.Item>
              <Form.Item
                label={"End Offset"}
                tooltip={"Play End Offset from Start of Sample"}
              >
                <InputNumber bordered={true} defaultValue={1} min={1} max={data.sampleLength} value={data.playLength} onChange={(value: number | null) => handleChange(34, value, ["playLength"], data)} />
              </Form.Item>
              <Form.Item
                label={"Sample Rate"}
              >
                <InputNumber bordered={true} disabled={true} defaultValue={44100} min={1} max={44100} value={data.sampleRate} /* onChange={(value: number | null) => handleChange(138, value, ["sampleRate"], data)} */ />
              </Form.Item>
              <Form.Item
                label={"Tuning Offset of Hold Loop"}
              >
                <InputNumber bordered={true} defaultValue={0} min={-50} max={50} value={data.tuningOffset} onChange={(value: number | null) => handleChange(140, value, ["tuningOffset"], data)} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
         <Tabs
          size='small'
          items={[
            {
              key: 'loop1',
              label: 'Loop 1',
              children: <SampleLoopComponent data={data} loop={data.loop1} sampleLoopNumber={0} setData={setData} handleChange={handleChange} />,
            },
            {
              key: 'loop2',
              label: 'Loop 2',
              children: <SampleLoopComponent data={data} loop={data.loop2} sampleLoopNumber={1} setData={setData} handleChange={handleChange} />,
            },
            {
              key: 'loop3',
              label: 'Loop 3',
              children: <SampleLoopComponent data={data} loop={data.loop3} sampleLoopNumber={2} setData={setData} handleChange={handleChange} />,
            },
            {
              key: 'loop4',
              label: 'Loop 4',
              children: <SampleLoopComponent data={data} loop={data.loop4} sampleLoopNumber={3} setData={setData} handleChange={handleChange} />,
            },
          ]}
          />
      </>
  );
}