import { Breadcrumb, Checkbox, Col, Form, Input, InputNumber, Row, Select, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MenuComponent } from '../menu/menu.component';
import { Sample } from '@sampler-editor-librarian/dto';
import { bandwidths, samplePlayBackTypes } from '../../util/util';
import { SampleLoopComponent } from './sample-loop.component';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';


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
    console.log("Rendering sampler sample view")
    fetchData();
  }, [])
  const handleChange = (sampleHeaderIndex: number, value: number | boolean | null, path: Array<string>, sample: Sample) => {
    if (value !== null) {
      fetch(
        `http://localhost:4000/api/midi/sampler/sample/${sampleNumberInMemory}/index/${sampleHeaderIndex}/value/${typeof value !== "boolean" ? value : (value ? 1 : 0)}`,
        { method: 'PUT' }
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
        { method: 'PUT' }
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
      <Row gutter={10}>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Name"}
            >
              <Input bordered={true} defaultValue={0} min={3} max={12} value={data.name} onChange={(event) => handleNameChange(3, event.target.value, ["name"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Bandwidth"}
            >
              <Select
                options={bandwidths}
                bordered={true}
                value={data.bandwith}
                disabled={true} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Sample Rate"}
            >
              <InputNumber
                bordered={true}
                disabled={true}
                defaultValue={44100}
                readOnly={true}
                min={1}
                max={44100}
                value={data.sampleRate} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Sample rate validity"}
            >
              <Checkbox checked={data.valid} disabled={true} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Original Pitch"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={21} 
                max={127} 
                value={data.originalPitch} onValueChange={(value: number | null) => handleChange(2, value, ["originalPitch"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Start Offset"}
              tooltip={"Play Start Offset from Start of Sample"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} 
                max={data.sampleLength > 0 ? data.sampleLength : 12}
                value={data.startOffset} 
                onValueChange={(value: number | null) => handleChange(30, value, ["startOffset"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Number of loops"}
            >
              <InputNumber
                controls={true}
                bordered={true}
                defaultValue={0}
                readOnly={true}
                min={0}
                max={4}
                value={data.numberOfLoops} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Playback Type"}
            >
              <Select
                options={samplePlayBackTypes}
                bordered={true}
                value={data.playbackType}
                onChange={(value: number | null) => handleChange(19, value, ["playbackType"], data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Tuning"}
            >
              <InputNumber controls={true} bordered={true} defaultValue={0} min={-50.0} max={50.0} step={0.01} value={data.tune} onChange={(value: number | null) => handleChange(20, value, ["tune"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"End Offset"}
              tooltip={"Play End Offset from Start of Sample"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={1} 
                max={data.sampleLength > 0 ? data.sampleLength : 12}
                value={data.playLength} 
                onValueChange={(value: number | null) => handleChange(34, value, ["playLength"], data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Length"}
            >
              <InputNumber
                controls={true}
                bordered={true}
                defaultValue={0}
                readOnly={true}
                min={1}
                max={268435455}
                value={data.sampleLength} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Tuning Offset of Hold Loop"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} 
                max={50} 
                value={data.tuningOffset} 
                onValueChange={(value: number | null) => handleChange(140, value, ["tuningOffset"], data)} />
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