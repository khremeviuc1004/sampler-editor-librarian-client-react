import { Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { lfoRetriggerOptions, waveFormTypes } from '../../util/util';
;


export type LFO2Details = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

export const LFO2: React.FunctionComponent<LFO2Details> = (props) => {

  return (
    <>
      <Row gutter={50}>
        <Col>
          <Form
            labelCol={{ span: 200 }}
            wrapperCol={{ span: 200 }}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Waveform"}
            >
              <Select
                options={waveFormTypes} bordered={true} value={props.data.lfo2.waveform} onChange={(value: number | null) => props.handleChange(98, value, ["lfo2", "waveform"], props.programNumberInMemory, props.data)} />
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
              label={"Retrigger"}
            >
              <Select
                options={lfoRetriggerOptions} bordered={true} value={props.data.lfo2.retrigger} onChange={(value: number | null) => props.handleChange(102, value, ["lfo2", "retrigger"], props.programNumberInMemory, props.data)} />
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
              label={"Speed"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.lfo2.speed} onChange={(value: number | null) => props.handleChange(29, value, ["lfo2", "speed"], props.programNumberInMemory, props.data)} />
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
              label={"Depth"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.lfo2.depth} onChange={(value: number | null) => props.handleChange(30, value, ["lfo2", "depth"], props.programNumberInMemory, props.data)} />
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
              label={"Delay"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.lfo2.delay} onChange={(value: number | null) => props.handleChange(31, value, ["lfo2", "delay"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}