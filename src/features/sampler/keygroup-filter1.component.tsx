import { Col, Form, InputNumber, Row } from 'antd';
import { KeyGroup } from 'sampler-editor-librarian-dto';
import { useEffect } from 'react';
;


export type Filter1Details = {
  data: KeyGroup,
  setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
  handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const KeygroupFilter1: React.FunctionComponent<Filter1Details> = (props) => {
  useEffect(() => {
    console.log("Rendering keygroup filter 1 tab")
  }, [])

  return (
    <>
      <Row gutter={50}>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Frequency"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.filter1.frequency}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(7, value, ["filter1", "frequency"], props.data)
                }} />
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
              label={"Frequency Modulation 1"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.filter1.freqModulationInput1Amount}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(151, value, ["filter1", "freqModulationInput1Amount"], props.data)
                }} />
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
              label={"Key Follow"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-24}
                max={24}
                value={props.data.filter1.keyFollow}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(8, value, ["filter1", "keyFollow"], props.data)
                }} />
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
              label={"Frequency Modulation 2"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.filter1.freqModulationInput2Amount}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(152, value, ["filter1", "freqModulationInput2Amount"], props.data)
                }} />
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
              label={"Resonance"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={15}
                value={props.data.filter1.resonance}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(149, value, ["filter1", "resonance"], props.data)
                }} />
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
              label={"Frequency Modulation 3"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.filter1.freqModulationInput3Amount}
                onChange={(value: number | null) => {
                  if (value !== null) props.handleChange(153, value, ["filter1", "freqModulationInput3Amount"], props.data)
                }} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}