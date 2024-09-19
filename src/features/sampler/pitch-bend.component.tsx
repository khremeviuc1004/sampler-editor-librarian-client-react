import { Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { bendModes } from '../../util/util';
;


export type PitchBendDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

export const PitchBend: React.FunctionComponent<PitchBendDetails> = (props) => {

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
              label={"Bendwheel up"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={24} value={props.data.pitchBend.bendWheelUp} onChange={(value: number | null) => props.handleChange(39, value, ["pitchBend", "bendWheelUp"], props.programNumberInMemory, props.data)} />
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
              label={"Bend Mode"}
            >
              <Select
                options={bendModes} bordered={true} value={props.data.pitchBend.bendMode} onChange={(value: number | null) => props.handleChange(74, value, ["pitchBend", "bendMode"], props.programNumberInMemory, props.data)} />
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
              label={"Bendwheel down"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={24} value={props.data.pitchBend.bendWheelDown} onChange={(value: number | null) => props.handleChange(73, value, ["pitchBend", "bendWheelDown"], props.programNumberInMemory, props.data)} />
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
              label={"Pressure"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-12} max={12} value={props.data.pitchBend.pressureModulation} onChange={(value: number | null) => props.handleChange(40, value, ["pitchBend", "pressureModulation"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}