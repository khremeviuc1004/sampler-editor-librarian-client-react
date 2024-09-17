import { Col, Form, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { modulationInputSourceTypes } from '../../util/util';

export type KeygroupGlobalDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const KeyGroupGlobal: React.FunctionComponent<KeygroupGlobalDetails> = (props) => {

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
              label={"Pitch Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.pitchModulationInputType} onChange={(value: number | null) => props.handleChange(87, value, ["pitchModulationInputType"], props.programNumberInMemory, props.data)} />
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
              label={"Filter 1 Freq. Mod. 1"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter1FreqModulationInput1Type} onChange={(value: number | null) => props.handleChange(84, value, ["filter1FreqModulationInput1Type"], props.programNumberInMemory, props.data)} />
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
              label={"Filter 2 Freq. Mod. 1"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter2FreqModulationInput1Type} onChange={(value: number | null) => props.handleChange(99, value, ["filter2FreqModulationInput1Type"], props.programNumberInMemory, props.data)} />
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
              label={"Loudness Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.loudnessModulationInputType} onChange={(value: number | null) => props.handleChange(88, value, ["loudnessModulationInputType"], props.programNumberInMemory, props.data)} />
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
              label={"Filter 1 Freq. Mod. 2"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter1FreqModulationInput2Type} onChange={(value: number | null) => props.handleChange(85, value, ["filter1FreqModulationInput2Type"], props.programNumberInMemory, props.data)} />
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
              label={"Filter 2 Freq. Mod. 2"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter2FreqModulationInput2Type} onChange={(value: number | null) => props.handleChange(100, value, ["filter2FreqModulationInput2Type"], props.programNumberInMemory, props.data)} />
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
            <Form.Item />
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Filter 1 Freq. Mod. 3"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter1FreqModulationInput3Type} onChange={(value: number | null) => props.handleChange(86, value, ["filter1FreqModulationInput3Type"], props.programNumberInMemory, props.data)} />
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
              label={"Filter 2 Freq. Mod. 3"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.filter2FreqModulationInput3Type} onChange={(value: number | null) => props.handleChange(101, value, ["filter2FreqModulationInput3Type"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}