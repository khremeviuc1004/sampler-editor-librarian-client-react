import { Col, Form, InputNumber, Row, Select } from 'antd';
import { ModulationSourceType, Program } from '@sampler-editor-librarian/dto';
import { individualOutputTypes, modulationInputSourceTypes, waveFormTypes } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type MasterOutputDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const MasterOutput: React.FunctionComponent<MasterOutputDetails> = (props) => {

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
              label={"Loudness"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.masterOutput.loudness} onValueChange={(value: number | null) => props.handleChange(25, value, ["masterOutput", "loudness"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Individual Output"}
            >
              <Select style={{ width: "90px" }}
                options={individualOutputTypes} bordered={true} value={props.data.masterOutput.individualOutput} onChange={(value: number | null) => props.handleChange(22, value, ["masterOutput", "individualOutput"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Individual Level"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.masterOutput.individualLevel} onValueChange={(value: number | null) => props.handleChange(70, value, ["masterOutput", "individualLevel"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Stereo Level"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={99} value={props.data.masterOutput.stereoLevel} onValueChange={(value: number | null) => props.handleChange(23, value, ["masterOutput", "stereoLevel"], props.programNumberInMemory, props.data)} />
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
              label={"Loudness Modulation Type"}
            >
              <Select 
                style={{ width: "90px" }}
                options={[{ value: ModulationSourceType.NoteOnvelocity, label: ModulationSourceType[ModulationSourceType.NoteOnvelocity] }]} 
                bordered={true} 
                defaultValue={ModulationSourceType.NoteOnvelocity} 
                disabled={true}
                />
            </Form.Item>
            <Form.Item
              label={"Loudness Modulation Type"}
            >
              <Select style={{ width: "90px" }}
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterOutput.loudnessModulationInput2Type} onChange={(value: number | null) => props.handleChange(79, value, ["masterOutput", "loudnessModulationInput2Type"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Loudness Modulation Type"}
            >
              <Select style={{ width: "90px" }}
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterOutput.loudnessModulationInput3Type} onChange={(value: number | null) => props.handleChange(80, value, ["masterOutput", "loudnessModulationInput3Type"], props.programNumberInMemory, props.data)} />
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
              label={"Modulation Amount"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput1Amount} onValueChange={(value: number | null) => props.handleChange(26, value, ["masterOutput", "loudnessModulationInput1Amount"], props.programNumberInMemory, props.data)} />
            </Form.Item>
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
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput2Amount} onValueChange={(value: number | null) => props.handleChange(92, value, ["masterOutput", "loudnessModulationInput2Amount"], props.programNumberInMemory, props.data)} />
            </Form.Item>
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
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput3Amount} onValueChange={(value: number | null) => props.handleChange(93, value, ["masterOutput", "loudnessModulationInput3Amount"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}