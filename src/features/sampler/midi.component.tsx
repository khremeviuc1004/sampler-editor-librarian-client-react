import { Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { priorityTypes, programMidiChannels, reassignmentTypes } from '../../util/util';
;


export type MidiPanDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const MidiPan: React.FunctionComponent<MidiPanDetails> = (props) => {

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
              label={"Program Number"}
            >
              <InputNumber
                
                step={1}
                
                
                min={1} 
                max={128} 
                value={props.data.midi.programNumber + 1} 
                onChange={(value: number | null) => {
                  if (value !== null) {
                    props.handleChange(15, value - 1, ["midi", "programNumber"], props.programNumberInMemory, props.data)
                  }
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
              label={"Priority"}
            >
              <Select
                options={priorityTypes} 
                bordered={true} 
                value={props.data.midi.priority} 
                onChange={(value: number | null) => props.handleChange(18, value, ["midi", "priority"], props.programNumberInMemory, props.data)} />
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
              label={"Play Low"}
            >
              <InputNumber
                
                step={1}
                
                
                min={21} 
                max={127} 
                value={props.data.midi.playRangeLow} 
                onChange={(value: number | null) => props.handleChange(19, value, ["midi", "playRangeLow"], props.programNumberInMemory, props.data)} />
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
              label={"Channel"}
            >
              <Select
                options={programMidiChannels} 
                bordered={true} 
                value={props.data.midi.channel} 
                onChange={(value: number | null) => props.handleChange(16, value, ["midi", "channel"], props.programNumberInMemory, props.data)} />
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
              label={"Reassignment"}
            >
              <Select
                options={reassignmentTypes} 
                bordered={true} 
                value={props.data.midi.reassignment} 
                onChange={(value: number | null) => props.handleChange(61, value, ["midi", "reassignment"], props.programNumberInMemory, props.data)} />
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
              label={"Play High"}
            >
              <InputNumber
                
                step={1}
                
                
                min={21} 
                max={127} 
                value={props.data.midi.playRangeHigh} 
                onChange={(value: number | null) => props.handleChange(20, value, ["midi", "playRangeHigh"], props.programNumberInMemory, props.data)} />
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
              label={"Polyphony"}
            >
              <InputNumber
                
                step={1}
                
                
                min={1} 
                max={32} 
                value={props.data.midi.polyphony + 1} 
                onChange={(value: number | null) => {
                  if (value !== null) {
                    props.handleChange(17, value - 1, ["midi", "polyphony"], props.programNumberInMemory, props.data)
                  }
                }} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}