import { Checkbox, Col, Form, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { modulationInputSourceTypes, waveFormTypes } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type LFO1Details = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const LFO1: React.FunctionComponent<LFO1Details> = (props) => {

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
              label={"Waveform"}
            >
              <Select
                options={waveFormTypes} bordered={true} value={props.data.lfo1.waveform} onChange={(value: number | null) => props.handleChange(97, value, ["lfo1", "waveform"], props.programNumberInMemory, props.data)} />
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
              label={"LFO desync"}
            >
              <Checkbox checked={props.data.lfo1.desync} onChange={(event) => props.handleChange(59, event.target.checked, ["lfo1", "desync"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item />
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.speed} onValueChange={(value: number | null) => props.handleChange(33, value, ["lfo1", "speed"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.lfo1.speedModulationInputType} onChange={(value: number | null) => props.handleChange(81, value, ["lfo1", "speedModulationInputType"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Amount"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.lfo1.speedModulationInputAmount} onValueChange={(value: number | null) => props.handleChange(94, value, ["lfo1", "speedModulationInputAmount"], props.programNumberInMemory, props.data)} />
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
              label={"Modwheel Extra Depth"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.extraDepthModulationByModwheelAmount} onValueChange={(value: number | null) => props.handleChange(36, value, ["lfo1", "extraDepthModulationByModwheelAmount"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.depth} onValueChange={(value: number | null) => props.handleChange(34, value, ["lfo1", "depth"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.lfo1.depthModulationInputType} onChange={(value: number | null) => props.handleChange(82, value, ["lfo1", "depthModulationInputType"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Amount"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.lfo1.depthModulationInputAmount} onValueChange={(value: number | null) => props.handleChange(95, value, ["lfo1", "depthModulationInputAmount"], props.programNumberInMemory, props.data)} />
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
              label={"Pressure Extra Depth"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.extraDepthModulationByAftertouchAmount} onValueChange={(value: number | null) => props.handleChange(37, value, ["lfo1", "extraDepthModulationByAftertouchAmount"], props.programNumberInMemory, props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.delay} onValueChange={(value: number | null) => props.handleChange(35, value, ["lfo1", "delay"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.lfo1.delayModulationInputType} onChange={(value: number | null) => props.handleChange(83, value, ["lfo1", "delayModulationInputType"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Amount"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.lfo1.delayModulationInputAmount} onValueChange={(value: number | null) => props.handleChange(96, value, ["lfo1", "delayModulationInputAmount"], props.programNumberInMemory, props.data)} />
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
              label={"Velocity Extra Depth"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.lfo1.extraDepthModulationByVelocityAmount} onValueChange={(value: number | null) => props.handleChange(38, value, ["lfo1", "extraDepthModulationByVelocityAmount"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}