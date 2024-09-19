import { Col, Form, InputNumber, Row } from 'antd';
import { KeyGroup } from 'sampler-editor-librarian-dto';
import { Layer, Line, Stage } from 'react-konva';
import { useEffect, useState } from 'react';
;


export type Envelope2Details = {
  data: KeyGroup,
  setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
  handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

interface LinePoints {
  points: number[],
}

const canvasWidth = 400
const canvasHeight = 100

const generatePoints = (rate1: number, level1: number, rate2: number, level2: number, rate3: number, level3: number, rate4: number, level4: number): LinePoints => {
  var slope1Value = (rate1 === 0 ? 1 : rate1);
  var rate1slope = 99 / slope1Value;
  var level1yint = level1;
  var rate1yint = 0;
  var line1x1 = 0;
  var line1y1 = 0;
  var line1x2 = (level1yint - rate1yint) / rate1slope;
  var line1y2 = level1yint;

  var slope2Value = (rate2 === 0 ? 1 : rate2);

  if (level2 < level1yint) {
    slope2Value *= -1;
  }

  var rate2slope = 99 / slope2Value;
  var level2yint = level2;
  var rate2yint = line1y2 - (rate2slope * line1x2);
  var line2x2 = (level2yint - rate2yint) / rate2slope;
  var line2y2 = level2yint;

  var slope3Value = (rate3 === 0 ? 1 : rate3);

  if (level3 < level2yint) {
    slope3Value *= -1;
  }

  var rate3slope = 99 / slope3Value;
  var level3yint = level3;
  var rate3yint = line2y2 - (rate3slope * line2x2);
  var line3x2 = (level3yint - rate3yint) / rate3slope;
  var line3y2 = level3yint;

  var slope4Value = (rate4 === 0 ? 1 : rate4);

  if (level4 < level3yint) {
    slope4Value *= -1;
  }

  var rate4slope = 99 / slope4Value;
  var line4x2 = canvasWidth;
  var line4y2 = level4;
  var line4y1 = level3;
  var line4yint = line4y2 - (rate4slope * line4x2);
  var line4x1 = (line4y1 - line4yint) / rate4slope;

  return {
    points: [
      line1x1, canvasHeight - line1y1,
      line1x2, canvasHeight - line1y2,
      line2x2, canvasHeight - line2y2,
      line3x2, canvasHeight - line3y2,
      line4x1, canvasHeight - line4y1,
      line4x2, canvasHeight - line4y2,
    ]
  }
}

export const Envelope2: React.FunctionComponent<Envelope2Details> = (props) => {
  const [lines, setLines] = useState(generatePoints(
    props.data.envelope2.rate1,
    props.data.envelope2.level1,
    props.data.envelope2.rate2,
    props.data.envelope2.level2,
    props.data.envelope2.rate3,
    props.data.envelope2.level3,
    props.data.envelope2.rate4,
    props.data.envelope2.level4,
  ));
  useEffect(() => {
    console.log("Rendering envelope 2 tab")
  }, [])

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
              label={"R1"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.rate1}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      value,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(20, value, ["envelope2", "rate1"], props.data)
                }} />
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
              label={"L1"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.level1}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      value,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(156, value, ["envelope2", "level1"], props.data)
                }} />
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
              label={"Vel.  Mod. of R1"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope2.velocityModulationOfRate1}
                onChange={(value: number | null) => props.handleChange(24, value, ["envelope2", "velocityModulationOfRate1"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <div style={{ backgroundColor: "#222222" }}>
            <Stage
              width={canvasWidth}
              height={canvasHeight}
            >
              <Layer>
                <Line
                  points={lines.points}
                  stroke="#00ff00"
                  strokeWidth={1}
                />
              </Layer>
            </Stage>
          </div>
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
              label={"R2"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.rate2}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      value,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(157, value, ["envelope2", "rate2"], props.data)
                }} />
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
              label={"L2"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.level2}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      value,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(158, value, ["envelope2", "level2"], props.data)
                }} />
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
              label={"Vel. Mod. of R4"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope2.velocityModulationOfRate4}
                onChange={(value: number | null) => props.handleChange(25, value, ["envelope2", "velocityModulationOfRate4"], props.data)} />
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
              label={"Vel. Mod. of Env."}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope2.velocityModulationOfEnvelope}
                onChange={(value: number | null) => props.handleChange(28, value, ["envelope2", "velocityModulationOfEnvelope"], props.data)} />
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
              label={"R3"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.rate3}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      value,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(21, value, ["envelope2", "rate3"], props.data)
                }} />
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
              label={"L3"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.level3}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      value,
                      props.data.envelope2.rate4,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(22, value, ["envelope2", "level3"], props.data)
                }} />
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
              label={"Vel. Off Mod. of R4"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope2.velocityOffModulationOfRate4}
                onChange={(value: number | null) => props.handleChange(26, value, ["envelope2", "velocityOffModulationOfRate4"], props.data)} />
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
              label={"R4"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.rate4}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      value,
                      props.data.envelope2.level4,
                    ))
                  }
                  props.handleChange(23, value, ["envelope2", "rate4"], props.data)
                }} />
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
              label={"L4"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope2.level4}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope2.rate1,
                      props.data.envelope2.level1,
                      props.data.envelope2.rate2,
                      props.data.envelope2.level2,
                      props.data.envelope2.rate3,
                      props.data.envelope2.level3,
                      props.data.envelope2.rate4,
                      value,
                    ))
                  }
                  props.handleChange(159, value, ["envelope2", "level4"], props.data)
                }} />
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
              label={"Key Mod. of R2 and R4"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope2.keyModulationOfRate2AndRate4}
                onChange={(value: number | null) => props.handleChange(27, value, ["envelope2", "keyModulationOfRate2AndRate4"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}