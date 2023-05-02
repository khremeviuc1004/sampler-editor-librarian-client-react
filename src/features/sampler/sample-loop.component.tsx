import {  Col, Form, InputNumber,  Row } from 'antd';
import { Sample, SampleLoop } from '@sampler-editor-librarian/dto';

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
              <InputNumber
                controls={true}
                bordered={true}
                defaultValue={0}
                min={0}
                value={props.loop.loopStart}
                onChange={(value: number | null) => props.handleChange(38 + (props.sampleLoopNumber * 12), value, ["loop" + (props.sampleLoopNumber + 1), "loopStart"], props.data)} />
            </Form.Item>
            <Form.Item
              label={"Length"}
              tooltip={"Loop Length - looping is from the loop start point minus this length to the loop start point"}
            >
              <InputNumber
                controls={true}
                bordered={true}
                defaultValue={0}
                min={0}
                step={0.001}
                value={props.loop.loopLength}
                onChange={(value: number | null) => props.handleChange(42 + (props.sampleLoopNumber * 12), value, ["loop" + (props.sampleLoopNumber + 1), "loopLength"], props.data)} />
            </Form.Item>
            <Form.Item
              label={"Dwell"}
            >
              <InputNumber
                formatter={(value) => value === 0 ? "Off" : value === 9999 ? "Hold" : "" + value}
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