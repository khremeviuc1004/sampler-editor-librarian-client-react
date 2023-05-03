import { Col, Form, Row } from 'antd';
import { KeyGroup } from '@sampler-editor-librarian/dto';
import { useEffect, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type Envelope3Details = {
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
  var slope1Value = (rate1 == 0 ? 1 : rate1);
  var rate1slope = 99 / slope1Value;
  var level1yint = level1;
  var rate1yint = 0;
  var line1x1 = 0;
  var line1y1 = 0;
  var line1x2 = (level1yint - rate1yint) / rate1slope;
  var line1y2 = level1yint;

  var slope2Value = (rate2 == 0 ? 1 : rate2);

  if (level2 < level1yint) {
    slope2Value *= -1;
  }

  var rate2slope = 99 / slope2Value;
  var level2yint = level2;
  var rate2yint = line1y2 - (rate2slope * line1x2);
  var line2x2 = (level2yint - rate2yint) / rate2slope;
  var line2y2 = level2yint;

  var slope3Value = (rate3 == 0 ? 1 : rate3);

  if (level3 < level2yint) {
    slope3Value *= -1;
  }

  var rate3slope = 99 / slope3Value;
  var level3yint = level3;
  var rate3yint = line2y2 - (rate3slope * line2x2);
  var line3x2 = (level3yint - rate3yint) / rate3slope;
  var line3y2 = level3yint;

  var slope4Value = (rate4 == 0 ? 1 : rate4);

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

export const Envelope3: React.FunctionComponent<Envelope3Details> = (props) => {
  const [lines, setLines] = useState(generatePoints(
    props.data.envelope3.rate1,
    props.data.envelope3.level1,
    props.data.envelope3.rate2,
    props.data.envelope3.level2,
    props.data.envelope3.rate3,
    props.data.envelope3.level3,
    props.data.envelope3.rate4,
    props.data.envelope3.level4,
  ));
  useEffect(() => {
    console.log("Rendering envelope 3 tab")
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}

                min={0}
                max={99}
                value={props.data.envelope3.rate1}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      value,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(179, value, ["envelope3", "rate1"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.level1}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      value,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(180, value, ["envelope3", "level1"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50}
                max={50}
                value={props.data.envelope3.velocityModulationOfRate1}
                onValueChange={(value: number | null) => props.handleChange(187, value, ["envelope3", "velocityModulationOfRate1"], props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.rate2}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      value,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(181, value, ["envelope3", "rate2"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.level2}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      value,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(182, value, ["envelope3", "level2"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50}
                max={50}
                value={props.data.envelope3.velocityModulationOfRate4}
                onValueChange={(value: number | null) => props.handleChange(188, value, ["envelope3", "velocityModulationOfRate4"], props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50}
                max={50}
                value={props.data.envelope3.velocityModulationOfEnvelope}
                onValueChange={(value: number | null) => props.handleChange(191, value, ["envelope3", "velocityModulationOfEnvelope"], props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.rate3}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      value,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(183, value, ["envelope3", "rate3"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.level3}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      value,
                      props.data.envelope3.rate4,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(184, value, ["envelope3", "level3"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50}
                max={50}
                value={props.data.envelope3.velocityOffModulationOfRate4}
                onValueChange={(value: number | null) => props.handleChange(189, value, ["envelope3", "velocityOffModulationOfRate4"], props.data)} />
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.rate4}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      value,
                      props.data.envelope3.level4,
                    ))
                  }
                  props.handleChange(185, value, ["envelope3", "rate4"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={99}
                value={props.data.envelope3.level4}
                onValueChange={(value: number | null) => {
                  if (value) {
                    setLines(generatePoints(
                      props.data.envelope3.rate1,
                      props.data.envelope3.level1,
                      props.data.envelope3.rate2,
                      props.data.envelope3.level2,
                      props.data.envelope3.rate3,
                      props.data.envelope3.level3,
                      props.data.envelope3.rate4,
                      value,
                    ))
                  }
                  props.handleChange(186, value, ["envelope3", "level4"], props.data)
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
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50}
                max={50}
                value={props.data.envelope3.keyModulationOfRate2AndRate4}
                onValueChange={(value: number | null) => props.handleChange(190, value, ["envelope3", "keyModulationOfRate2AndRate4"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}