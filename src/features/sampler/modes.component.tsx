import { Checkbox, Col, Form, Row } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';

export type ModesDetails = {
    programNumberInMemory: number,
    data: Program,
    setData: React.Dispatch<React.SetStateAction<Program>>,
    handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

export const Modes: React.FunctionComponent<ModesDetails> = (props) => {

  return (
      <>
        <Row gutter={50}>
          <Col>
            <Form
              labelCol={{span: 200}}
              wrapperCol={{span: 200}}
              size={"small"}
              layout='vertical'
              >
                <Form.Item
                  label={"Key Group Cross Fade"}
                >
                  <Checkbox checked={props.data.modes.keyGroupCrossFade} onChange={(event) => props.handleChange(41, event.target.checked, ["modes", "keyGroupCrossFade"], props.programNumberInMemory, props.data)} />
                </Form.Item>
                <Form.Item
                  label={"Mono Legato"}
                >
                  <Checkbox checked={props.data.modes.monoLegato} onChange={(event) => props.handleChange(72, event.target.checked, ["modes", "monoLegato"], props.programNumberInMemory, props.data)} />
                </Form.Item>
            </Form>
          </Col>
       </Row>
      </>
  );
}