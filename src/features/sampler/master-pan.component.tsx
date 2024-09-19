import { Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from 'sampler-editor-librarian-dto';
import { modulationInputSourceTypes } from '../../util/util';
;


export type MasterPanDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const MasterPan: React.FunctionComponent<MasterPanDetails> = (props) => {

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
              label={"Stero Pan"}
            >
              <InputNumber
                
                step={1}
                
                
                min={-50} max={50} value={props.data.masterPan.stereoPan} onChange={(value: number | null) => props.handleChange(24, value, ["masterPan", "stereoPan"], props.programNumberInMemory, props.data)} />
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
              label={"Pan Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterPan.panModulationInput1Type} onChange={(value: number | null) => props.handleChange(76, value, ["masterPan", "panModulationInput1Type"], props.programNumberInMemory, props.data)} />
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
                
                
                min={-50} max={50} value={props.data.masterPan.panModulationInput1Amount} onChange={(value: number | null) => props.handleChange(89, value, ["masterPan", "panModulationInput1Amount"], props.programNumberInMemory, props.data)} />
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
              label={"Pan Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterPan.panModulationInput2Type} onChange={(value: number | null) => props.handleChange(77, value, ["masterPan", "panModulationInput2Type"], props.programNumberInMemory, props.data)} />
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
                
                
                min={-50} max={50} value={props.data.masterPan.panModulationInput2Amount} onChange={(value: number | null) => props.handleChange(90, value, ["masterPan", "panModulationInput2Amount"], props.programNumberInMemory, props.data)} />
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
              label={"Pan Modulation Type"}
            >
              <Select
                options={modulationInputSourceTypes} bordered={true} value={props.data.masterPan.panModulationInput3Type} onChange={(value: number | null) => props.handleChange(78, value, ["masterPan", "panModulationInput3Type"], props.programNumberInMemory, props.data)} />
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
                
                
                min={-50} max={50} value={props.data.masterPan.panModulationInput3Amount} onChange={(value: number | null) => props.handleChange(91, value, ["masterPan", "panModulationInput3Amount"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}