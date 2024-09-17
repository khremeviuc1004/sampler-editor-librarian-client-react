import { Col, Form, InputNumber, Row, Select, SelectProps, Tabs } from 'antd';
import { KeyGroup } from 'sampler-editor-librarian-dto';
import { pitch, zonePlayBackTypes } from '../../util/util';
import { useEffect, useState } from 'react';
import { zoneOutputTypes } from '../../util/util';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type ZoneDetails = {
  data: KeyGroup,
  setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
  handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
  handleNameChange: (keygroupHeaderIndex: number, name: string, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const KeyGroupZone: React.FunctionComponent<ZoneDetails> = (props) => {
  let navigate = useNavigate();
  const [data, setData] = useState<SelectProps['options']>([])
  const [loading, setLoading] = useState(false)
  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:4000/api/midi/sampler/request-resident-sample-names`)
      .then((res) => res.json())
      .then((results) => {
        let data: SelectProps['options'] = []
        let incoming_data: string[] = results

        data.push({ value: "            ", label: "            " })

        for (let index = 0; index < incoming_data.length; index++) {
          let name = incoming_data[index]
          data.push({ value: name, label: name })
        }

        setData(data);
        setLoading(false);
      })
  }
  useEffect(() => {
    console.log("Rendering zone tab")
    fetchData();
  }, [])
  let handleEditSample = (sampleName: string) => {
    data?.forEach((value, index) => {
      if (sampleName === value.label) {
        console.log("Edit sample: sampleNumberInMemory=", index - 1)
        navigate("/in-memory-sample/" + (index - 1))
        return false
      }
    })
  }

  return (
    <>
      <Tabs
        size='small'
        items={[
          {
            key: 'zone1',
            label: `Zone 1`,
            children: <>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Sample Name"}
                    >
                      <Select

                        options={data}
                        bordered={true}
                        loading={loading}
                        value={props.data.zone1.sampleName}
                        onChange={(value: string) => props.handleNameChange(34, value, ["zone1", "sampleName"], props.data)} />
                      <EditOutlined title='Edit sample' onClick={() => handleEditSample(props.data.zone1.sampleName)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity Low"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone1.velocityLow} onValueChange={(value: number | null) => props.handleChange(46, value, ["zone1", "velocityLow"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity High"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone1.velocityHigh} onValueChange={(value: number | null) => props.handleChange(47, value, ["zone1", "velocityHigh"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pitch"}
                    >
                      <Select
                        options={pitch} bordered={true} value={props.data.zone1.pitch} onChange={(value: number | null) => props.handleChange(132, value, ["zone1", "pitch"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Tune (semitone.cents)"}
                    >
                      <InputNumber
                        controls={true}
                        bordered={true}
                        defaultValue={0}
                        min={-50.0}
                        max={50.0}
                        step={0.01}
                        value={props.data.zone1.tune}
                        onChange={(value: number | null) => props.handleChange(48, value, ["zone1", "tune"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Loudness"}
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
                        value={props.data.zone1.loudness}
                        onValueChange={(value: number | null) => props.handleChange(50, value, ["zone1", "loudness"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Filter"}
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
                        value={props.data.zone1.filterCutOff}
                        onValueChange={(value: number | null) => props.handleChange(51, value, ["zone1", "filterCutOff"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pan"}
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
                        value={props.data.zone1.pan}
                        onValueChange={(value: number | null) => props.handleChange(52, value, ["zone1", "pan"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Out"}
                    >
                      <Select
                        options={zoneOutputTypes} bordered={true} value={props.data.zone1.output} onChange={(value: number | null) => props.handleChange(136, value, ["zone1", "output"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Playback"}
                    >
                      <Select
                        options={zonePlayBackTypes} bordered={true} value={props.data.zone1.playback} onChange={(value: number | null) => props.handleChange(53, value, ["zone1", "playback"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity > start"}
                    >
                      <Donut
                        diameter={75}
                        step={1}
                        jumpLimit={10}
                        theme={{
                          ...donutTheme
                        }}
                        min={-9999}
                        max={9999}
                        value={props.data.zone1.velToStartPosAdj}
                        onValueChange={(value: number | null) => props.handleChange(140, value, ["zone1", "velToStartPosAdj"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </>,
          },
          {
            key: 'zone2',
            label: `Zone 2`,
            children: <>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Sample Name"}
                    >
                      <Select

                        options={data}
                        bordered={true}
                        loading={loading}
                        value={props.data.zone2.sampleName}
                        onChange={(value: string) => props.handleNameChange(58, value, ["zone2", "sampleName"], props.data)} />
                      <EditOutlined title='Edit sample' onClick={() => handleEditSample(props.data.zone2.sampleName)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity Low"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone2.velocityLow} onValueChange={(value: number | null) => props.handleChange(70, value, ["zone2", "velocityLow"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity High"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone2.velocityHigh} onValueChange={(value: number | null) => props.handleChange(71, value, ["zone2", "velocityHigh"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pitch"}
                    >
                      <Select
                        options={pitch} bordered={true} value={props.data.zone2.pitch} onChange={(value: number | null) => props.handleChange(133, value, ["zone2", "pitch"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Tune (semitone.cents)"}
                    >
                      <InputNumber
                        controls={true}
                        bordered={true}
                        defaultValue={0}
                        min={-50.0}
                        max={50.0}
                        step={0.01}
                        value={props.data.zone2.tune}
                        onChange={(value: number | null) => props.handleChange(72, value, ["zone2", "tune"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Loudness"}
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
                        value={props.data.zone2.loudness}
                        onValueChange={(value: number | null) => props.handleChange(74, value, ["zone2", "loudness"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Filter"}
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
                        value={props.data.zone2.filterCutOff}
                        onValueChange={(value: number | null) => props.handleChange(75, value, ["zone2", "filterCutOff"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pan"}
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
                        value={props.data.zone2.pan}
                        onValueChange={(value: number | null) => props.handleChange(76, value, ["zone2", "pan"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Out"}
                    >
                      <Select
                        options={zoneOutputTypes} bordered={true} value={props.data.zone2.output} onChange={(value: number | null) => props.handleChange(137, value, ["zone2", "output"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Playback"}
                    >
                      <Select
                        options={zonePlayBackTypes} bordered={true} value={props.data.zone2.playback} onChange={(value: number | null) => props.handleChange(77, value, ["zone2", "playback"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity > start"}
                    >
                      <Donut
                        diameter={75}
                        step={1}
                        jumpLimit={10}
                        theme={{
                          ...donutTheme
                        }}
                        min={-9999}
                        max={9999}
                        value={props.data.zone2.velToStartPosAdj}
                        onValueChange={(value: number | null) => props.handleChange(142, value, ["zone2", "velToStartPosAdj"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </>,
          },
          {
            key: 'zone3',
            label: `Zone 3`,
            children: <>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Sample Name"}
                    >
                      <Select

                        options={data}
                        bordered={true}
                        loading={loading}
                        value={props.data.zone3.sampleName}
                        onChange={(value: string) => props.handleNameChange(82, value, ["zone3", "sampleName"], props.data)} />
                      <EditOutlined title='Edit sample' onClick={() => handleEditSample(props.data.zone3.sampleName)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity Low"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone3.velocityLow} onValueChange={(value: number | null) => props.handleChange(94, value, ["zone3", "velocityLow"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity High"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone3.velocityHigh} onValueChange={(value: number | null) => props.handleChange(95, value, ["zone3", "velocityHigh"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pitch"}
                    >
                      <Select
                        options={pitch} bordered={true} value={props.data.zone3.pitch} onChange={(value: number | null) => props.handleChange(134, value, ["zone3", "pitch"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Tune (semitone.cents)"}
                    >
                      <InputNumber
                        controls={true}
                        bordered={true}
                        defaultValue={0}
                        min={-50.0}
                        max={50.0}
                        step={0.01}
                        value={props.data.zone3.tune}
                        onChange={(value: number | null) => props.handleChange(96, value, ["zone3", "tune"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Loudness"}
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
                        value={props.data.zone3.loudness}
                        onValueChange={(value: number | null) => props.handleChange(98, value, ["zone3", "loudness"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Filter"}
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
                        value={props.data.zone3.filterCutOff}
                        onValueChange={(value: number | null) => props.handleChange(99, value, ["zone3", "filterCutOff"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pan"}
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
                        value={props.data.zone3.pan}
                        onValueChange={(value: number | null) => props.handleChange(100, value, ["zone3", "pan"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Out"}
                    >
                      <Select
                        options={zoneOutputTypes} bordered={true} value={props.data.zone3.output} onChange={(value: number | null) => props.handleChange(138, value, ["zone3", "output"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Playback"}
                    >
                      <Select
                        options={zonePlayBackTypes} bordered={true} value={props.data.zone3.playback} onChange={(value: number | null) => props.handleChange(101, value, ["zone3", "playback"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity > start"}
                    >
                      <Donut
                        diameter={75}
                        step={1}
                        jumpLimit={10}
                        theme={{
                          ...donutTheme
                        }}
                        min={-9999}
                        max={9999}
                        value={props.data.zone3.velToStartPosAdj}
                        onValueChange={(value: number | null) => props.handleChange(144, value, ["zone3", "velToStartPosAdj"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </>,
          },
          {
            key: 'zone4',
            label: `Zone 4`,
            children: <>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Sample Name"}
                    >
                      <Select

                        options={data}
                        bordered={true}
                        loading={loading}
                        value={props.data.zone4.sampleName}
                        onChange={(value: string) => props.handleNameChange(106, value, ["zone4", "sampleName"], props.data)} />
                      <EditOutlined title='Edit sample' onClick={() => handleEditSample(props.data.zone4.sampleName)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity Low"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone4.velocityLow} onValueChange={(value: number | null) => props.handleChange(118, value, ["zone4", "velocityLow"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity High"}
                    >
                      <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                        min={0} max={127} value={props.data.zone4.velocityHigh} onValueChange={(value: number | null) => props.handleChange(119, value, ["zone4", "velocityHigh"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pitch"}
                    >
                      <Select
                        options={pitch} bordered={true} value={props.data.zone4.pitch} onChange={(value: number | null) => props.handleChange(136, value, ["zone4", "pitch"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Tune (semitone.cents)"}
                    >
                      <InputNumber
                        controls={true}
                        bordered={true}
                        defaultValue={0}
                        min={-50.0}
                        max={50.0}
                        step={0.01}
                        value={props.data.zone4.tune}
                        onChange={(value: number | null) => props.handleChange(120, value, ["zone4", "tune"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Loudness"}
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
                        value={props.data.zone4.loudness}
                        onValueChange={(value: number | null) => props.handleChange(122, value, ["zone4", "loudness"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Filter"}
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
                        value={props.data.zone4.filterCutOff}
                        onValueChange={(value: number | null) => props.handleChange(123, value, ["zone4", "filterCutOff"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Pan"}
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
                        value={props.data.zone4.pan}
                        onValueChange={(value: number | null) => props.handleChange(124, value, ["zone4", "pan"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Out"}
                    >
                      <Select
                        options={zoneOutputTypes} bordered={true} value={props.data.zone4.output} onChange={(value: number | null) => props.handleChange(139, value, ["zone4", "output"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Playback"}
                    >
                      <Select
                        options={zonePlayBackTypes} bordered={true} value={props.data.zone4.playback} onChange={(value: number | null) => props.handleChange(125, value, ["zone4", "playback"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form
                    {...layout}
                    size={"small"}
                    layout='vertical'
                  >
                    <Form.Item
                      label={"Velocity > start"}
                    >
                      <Donut
                        diameter={75}
                        step={1}
                        jumpLimit={10}
                        theme={{
                          ...donutTheme
                        }}
                        min={-9999}
                        max={9999}
                        value={props.data.zone4.velToStartPosAdj}
                        onValueChange={(value: number | null) => props.handleChange(146, value, ["zone4", "velToStartPosAdj"], props.data)} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </>,
          },
        ]}
      />
    </>
  );
}