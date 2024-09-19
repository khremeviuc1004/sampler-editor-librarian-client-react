import { Col, Form, InputNumber, Row } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
;


export type SoftPedalDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const SoftPedal: React.FunctionComponent<SoftPedalDetails> = (props) => {

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
              label={"Loudness Reduction"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.softPedal.loudnessReduction} onChange={(value: number | null) => props.handleChange(62, value, ["softPedal", "loudnessReduction"], props.programNumberInMemory, props.data)} />
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
              label={"Attack Stretch"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.softPedal.attackStretch} onChange={(value: number | null) => props.handleChange(63, value, ["softPedal", "attackStretch"], props.programNumberInMemory, props.data)} />
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
              label={"Filter Close"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.softPedal.filterClose} onChange={(value: number | null) => props.handleChange(64, value, ["softPedal", "filterClose"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}