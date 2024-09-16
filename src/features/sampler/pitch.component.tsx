import { Col, Form, Row } from 'antd';
import { KeyGroup } from '@sampler-editor-librarian/dto';
import { Donut } from 'react-dial-knob';
import { useEffect } from 'react';
import { donutTheme } from './donut-theme';

export type PitchDetails = {
  data: KeyGroup,
  setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
  handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const Pitch: React.FunctionComponent<PitchDetails> = (props) => {
  useEffect(() => {
    console.log("Rendering pitch tab")
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
              label={"LFO1 Mod. of Pitch"}
            >
              <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                min={-50} max={50} value={props.data.pitchModulationByLFO1} onValueChange={(value: number | null) => props.handleChange(150, value, ["pitchModulationByLFO1"], props.data)} />
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
              label={"Pitch Mod. Source"}
            >
              <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                min={-50} max={50} value={props.data.pitchModulationInputAmount} onValueChange={(value: number | null) => props.handleChange(154, value, ["pitchModulationInputAmount"], props.data)} />
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
              label={"Loudness Mod. Source"}
            >
              <Donut diameter={50} step={1} jumpLimit={10} theme={{ ...donutTheme }}
                min={-50} max={50} value={props.data.loudnessModulationInputAmount} onValueChange={(value: number | null) => props.handleChange(155, value, ["loudnessModulationInputAmount"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}