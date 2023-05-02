import {  Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';

export type MasterTuningDetails = {
    programNumberInMemory: number,
    data: Program,
    setData: React.Dispatch<React.SetStateAction<Program>>,
    handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const MasterTuning: React.FunctionComponent<MasterTuningDetails> = (props) => {

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
                  label={"Program Tune"}
                >
                    <InputNumber controls={true} bordered={true} defaultValue={0} min={-50.0} max={50.0} step={0.01} value={props.data.masterTuning.tune} onChange={(value: number | null) => props.handleChange(65, value, ["masterTuning", "tune"], props.programNumberInMemory, props.data)} />
                </Form.Item>
            </Form>
          </Col>
       </Row>
      </>
  );
}