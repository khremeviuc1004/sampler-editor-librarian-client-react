import { Checkbox, Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';
import { portamentoTypes, priorityTypes, reassignmentTypes } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type PortamentoDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const Portamento: React.FunctionComponent<PortamentoDetails> = (props) => {

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
              label={"Rate"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.portamento.rate} onValueChange={(value: number | null) => props.handleChange(110, value, ["portamento", "rate"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Type"}
            >
              <Select style={{ width: "90px" }}
                options={portamentoTypes} bordered={true} value={props.data.portamento.type} onChange={(value: number | null) => props.handleChange(111, value, ["portamento", "type"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Portamento"}
            >
              <Checkbox checked={props.data.portamento.enabled} onChange={(event) => props.handleChange(112, event.target.checked, ["portamento", "enabled"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}