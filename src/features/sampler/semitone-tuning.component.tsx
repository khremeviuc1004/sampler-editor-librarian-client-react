import { Col, Form, InputNumber, Row } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
;


export type SemitoneTuningDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const SemitoneTuning: React.FunctionComponent<SemitoneTuningDetails> = (props) => {

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
              label={"C"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperC} onChange={(value: number | null) => props.handleChange(44, value, ["semiToneTuning", "temperC"], props.programNumberInMemory, props.data)} />
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
              label={"C#"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperCSharp} onChange={(value: number | null) => props.handleChange(45, value, ["semiToneTuning", "temperCSharp"], props.programNumberInMemory, props.data)} />
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
              label={"D"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperD} onChange={(value: number | null) => props.handleChange(46, value, ["semiToneTuning", "temperD"], props.programNumberInMemory, props.data)} />
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
              label={"D#"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperDSharp} onChange={(value: number | null) => props.handleChange(47, value, ["semiToneTuning", "temperDSharp"], props.programNumberInMemory, props.data)} />
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
              label={"E"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperE} onChange={(value: number | null) => props.handleChange(48, value, ["semiToneTuning", "temperE"], props.programNumberInMemory, props.data)} />
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
              label={"F"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperF} onChange={(value: number | null) => props.handleChange(49, value, ["semiToneTuning", "temperF"], props.programNumberInMemory, props.data)} />
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
              label={"F#"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperFSharp} onChange={(value: number | null) => props.handleChange(50, value, ["semiToneTuning", "temperFSharp"], props.programNumberInMemory, props.data)} />
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
              label={"G"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperG} onChange={(value: number | null) => props.handleChange(51, value, ["semiToneTuning", "temperG"], props.programNumberInMemory, props.data)} />
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
              label={"G#"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperGSharp} onChange={(value: number | null) => props.handleChange(52, value, ["semiToneTuning", "temperGSharp"], props.programNumberInMemory, props.data)} />
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
              label={"A"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperA} onChange={(value: number | null) => props.handleChange(53, value, ["semiToneTuning", "temperA"], props.programNumberInMemory, props.data)} />
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
              label={"A#"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperASharp} onChange={(value: number | null) => props.handleChange(54, value, ["semiToneTuning", "temperASharp"], props.programNumberInMemory, props.data)} />
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
              label={"B"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.semiToneTuning.temperA} onChange={(value: number | null) => props.handleChange(55, value, ["semiToneTuning", "temperA"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}