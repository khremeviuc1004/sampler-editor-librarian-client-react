import {  Col, Form, InputNumber,  Row } from 'antd';
import { Sample, SampleLoop } from '@sampler-editor-librarian/dto';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type SampleLoopProperties = {
  data: Sample,
  loop: SampleLoop,
  sampleLoopNumber: number,
  setData: React.Dispatch<React.SetStateAction<Sample>>,
  handleChange: (sampleHeaderIndex: number, value: number | boolean | null, path: Array<string>, sample: Sample) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const SampleLoopComponent: React.FunctionComponent<SampleLoopProperties> = (props) => {

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
              label={"Start"}
              tooltip={"Loop Start - sample is played to this point and then looping starts from this position minus loop length"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={props.data.sampleLength > 0 ? props.data.sampleLength : 12}
                value={props.loop.loopStart}
                onValueChange={(value: number | null) => props.handleChange(38 + (props.sampleLoopNumber * 12), value, ["loop" + (props.sampleLoopNumber + 1), "loopStart"], props.data)} />
            </Form.Item>
            <Form.Item
              label={"Length"}
              tooltip={"Loop Length - looping start from the loop start point minus this length"}
            >
              <InputNumber
                controls={true}
                bordered={true}
                defaultValue={0}
                min={0}
                max={props.data.sampleLength > 0 ? props.data.sampleLength : 1}
                step={0.001}
                value={props.loop.loopLength}
                onChange={(value: number | null) => props.handleChange(42 + (props.sampleLoopNumber * 12), value, ["loop" + (props.sampleLoopNumber + 1), "loopLength"], props.data)} />
            </Form.Item>
            <Form.Item
              label={"Dwell"}
              tooltip={"0 = Off, 9999 = Hold, 1 - 998 = number, always enter numbers"}
            >
              <InputNumber
                formatter={(value) => {
                  let numericValue = value

                  // Workaround for a bug - according to the formatter callback typescript definition, value should be a number but I am receiving a string 
                  if (typeof value === 'string') {
                    numericValue = parseInt('' + value)
                  }

                  switch(numericValue) {
                    case 0:
                      return "Off"
                    case 9999:
                      return "Hold"
                    default:
                      return "" + value
                  }
                }}
                parser={(displayValue) => displayValue === "Off" ? 0 : displayValue === "Hold" ? 9999 : displayValue ? parseInt(displayValue) : 0}
                controls={true}
                bordered={true}
                defaultValue={0}
                min={0}
                max={9999}
                value={props.loop.dwellTime}
                onChange={(value: number | null) => props.handleChange(48 + (props.sampleLoopNumber * 12), value, ["loop" + (props.sampleLoopNumber + 1), "dwellTime"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}