import { Col, Form, Row } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperC} onValueChange={(value: number | null) => props.handleChange(44, value, ["semiToneTuning", "temperC"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperCSharp} onValueChange={(value: number | null) => props.handleChange(45, value, ["semiToneTuning", "temperCSharp"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperD} onValueChange={(value: number | null) => props.handleChange(46, value, ["semiToneTuning", "temperD"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperDSharp} onValueChange={(value: number | null) => props.handleChange(47, value, ["semiToneTuning", "temperDSharp"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperE} onValueChange={(value: number | null) => props.handleChange(48, value, ["semiToneTuning", "temperE"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperF} onValueChange={(value: number | null) => props.handleChange(49, value, ["semiToneTuning", "temperF"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperFSharp} onValueChange={(value: number | null) => props.handleChange(50, value, ["semiToneTuning", "temperFSharp"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperG} onValueChange={(value: number | null) => props.handleChange(51, value, ["semiToneTuning", "temperG"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperGSharp} onValueChange={(value: number | null) => props.handleChange(52, value, ["semiToneTuning", "temperGSharp"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperA} onValueChange={(value: number | null) => props.handleChange(53, value, ["semiToneTuning", "temperA"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperASharp} onValueChange={(value: number | null) => props.handleChange(54, value, ["semiToneTuning", "temperASharp"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.semiToneTuning.temperA} onValueChange={(value: number | null) => props.handleChange(55, value, ["semiToneTuning", "temperA"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}