import { Col, Form, InputNumber, Row } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type SoftPedalDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

export const SoftPedal: React.FunctionComponent<SoftPedalDetails> = (props) => {

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
              label={"Loudness Reduction"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.softPedal.loudnessReduction} onValueChange={(value: number | null) => props.handleChange(62, value, ["softPedal", "loudnessReduction"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Attack Stretch"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.softPedal.attackStretch} onValueChange={(value: number | null) => props.handleChange(63, value, ["softPedal", "attackStretch"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Filter Close"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.softPedal.filterClose} onValueChange={(value: number | null) => props.handleChange(64, value, ["softPedal", "filterClose"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}