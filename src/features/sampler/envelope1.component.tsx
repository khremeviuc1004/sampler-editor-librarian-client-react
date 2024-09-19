import { Checkbox, Col, Form, InputNumber, Row } from 'antd';
import { KeyGroup } from 'sampler-editor-librarian-dto';
import { useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';



export type Envelope1Details = {
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

const generatePoints = (attack: number, decay: number, sustain: number, release: number): LinePoints => {
  return {
    points: [
      0, canvasHeight,
      attack, 0,
      attack + decay, canvasHeight - sustain,
      canvasWidth - release, canvasHeight - sustain,
      canvasWidth, canvasHeight,
    ]
  }
}

export const Envelope1: React.FunctionComponent<Envelope1Details> = (props) => {
  const [lines, setLines] = useState(generatePoints(
    props.data.envelope1.attack,
    props.data.envelope1.decay,
    props.data.envelope1.sustain,
    props.data.envelope1.release));
  useEffect(() => {
    console.log("Rendering envelope 1 tab")
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
              label={"Attack"}
            >
              <InputNumber
                step={1}
                min={0}
                max={99}
                value={props.data.envelope1.attack}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      value,
                      props.data.envelope1.decay,
                      props.data.envelope1.sustain,
                      props.data.envelope1.release))
                  }
                  props.handleChange(12, value, ["envelope1", "attack"], props.data)
                }} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            style={{ maxWidth: 500 }}
            layout='vertical'
            labelWrap={false}
          >
            <Form.Item
              label={"Vel. Mod. of Attack"}
            >
              <InputNumber
                step={1}
                min={-50}
                max={50}
                value={props.data.envelope1.velocityModulationOfAttack}
                onChange={(value: number | null) => props.handleChange(16, value, ["envelope1", "velocityModulationOfAttack"], props.data)}
              />
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
              label={"Decay"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope1.decay}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope1.attack,
                      value,
                      props.data.envelope1.sustain,
                      props.data.envelope1.release))
                  }
                  props.handleChange(13, value, ["envelope1", "decay"], props.data)
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
              label={"Vel. Mod. of Release"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope1.velocityModulationOfRelease}
                onChange={(value: number | null) => props.handleChange(17, value, ["envelope1", "velocityModulationOfRelease"], props.data)} />
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
              label={"Attack Hold"}
            >
              <Checkbox checked={props.data.envelope1.attackHold} onChange={(event) => props.handleChange(131, event.target.checked, ["envelope1", "attackHold"], props.data)} />
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
              label={"Sustain"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope1.sustain}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope1.attack,
                      props.data.envelope1.decay,
                      value,
                      props.data.envelope1.release))
                  }
                  props.handleChange(14, value, ["envelope1", "sustain"], props.data)
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
              label={"Vel. Off Mod. of Release"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope1.velocityOffModulationOfRelease}
                onChange={(value: number | null) => props.handleChange(18, value, ["envelope1", "velocityOffModulationOfRelease"], props.data)} />
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
              label={"Release"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0}
                max={99}
                value={props.data.envelope1.release}
                onChange={(value: number | null) => {
                  if (value !== null) {
                    setLines(generatePoints(
                      props.data.envelope1.attack,
                      props.data.envelope1.decay,
                      props.data.envelope1.sustain,
                      value))
                  }
                  props.handleChange(15, value, ["envelope1", "release"], props.data)
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
              label={"Key Mod. of Dec. & Rel."}

            >
              <InputNumber
                
                step={1}
                
                
                min={-50}
                max={50}
                value={props.data.envelope1.keyModulationOfDecayAndRelease}
                onChange={(value: number | null) => props.handleChange(19, value, ["envelope1", "keyModulationOfDecayAndRelease"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}