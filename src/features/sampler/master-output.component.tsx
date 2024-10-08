import { Col, Form, InputNumber, Row, Select } from 'antd';
import { ModulationSourceType, Program } from 'sampler-editor-librarian-dto';
import { individualOutputTypes, modulationInputSourceTypes } from '../../util/util';
;


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
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.masterOutput.loudness} onChange={(value: number | null) => props.handleChange(25, value, ["masterOutput", "loudness"], props.programNumberInMemory, props.data)} />
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
                options={[{ value: ModulationSourceType.NoteOnvelocity, label: ModulationSourceType[ModulationSourceType.NoteOnvelocity] }]}
                bordered={true}
                defaultValue={ModulationSourceType.NoteOnvelocity}
                disabled={true}
              />
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
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput1Amount} onChange={(value: number | null) => props.handleChange(26, value, ["masterOutput", "loudnessModulationInput1Amount"], props.programNumberInMemory, props.data)} />
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
              label={"Individual Output"}
            >
              <Select
                options={individualOutputTypes} bordered={true} value={props.data.masterOutput.individualOutput} onChange={(value: number | null) => props.handleChange(22, value, ["masterOutput", "individualOutput"], props.programNumberInMemory, props.data)} />
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
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterOutput.loudnessModulationInput2Type} onChange={(value: number | null) => props.handleChange(79, value, ["masterOutput", "loudnessModulationInput2Type"], props.programNumberInMemory, props.data)} />
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
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput2Amount} onChange={(value: number | null) => props.handleChange(92, value, ["masterOutput", "loudnessModulationInput2Amount"], props.programNumberInMemory, props.data)} />
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
              label={"Individual Level"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.masterOutput.individualLevel} onChange={(value: number | null) => props.handleChange(70, value, ["masterOutput", "individualLevel"], props.programNumberInMemory, props.data)} />
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
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.masterOutput.loudnessModulationInput3Amount} onChange={(value: number | null) => props.handleChange(93, value, ["masterOutput", "loudnessModulationInput3Amount"], props.programNumberInMemory, props.data)} />
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
              label={"Stereo Level"}
            >
              <InputNumber
                
                step={1}
                
                
                min={0} max={99} value={props.data.masterOutput.stereoLevel} onChange={(value: number | null) => props.handleChange(23, value, ["masterOutput", "stereoLevel"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}