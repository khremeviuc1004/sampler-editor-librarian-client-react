import { Checkbox, Col, Form, Row, Select } from 'antd';
import { KeyGroup } from '@sampler-editor-librarian/dto';
import { attenuation } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { useEffect } from 'react';

export type ToneDetails = {
    data: KeyGroup,
    setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
    handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

const donutTheme = {
  donutThickness: 10,
  centerColor: 'black',
  centerFocusedColor: '#111111'
}

export const KeygroupTone: React.FunctionComponent<ToneDetails> = (props) => {
  useEffect(() => {
    console.log("Rendering keygroup tone tab")
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
                  label={"Centre Frequency"}
                >
                    <Checkbox checked={props.data.filter2ToneEnabled} onChange={(event) => props.handleChange(168, event.target.checked, ["filter2ToneEnabled"], props.data)} />
                </Form.Item>
                <Form.Item
                  label={"Centre Frequency"}
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
                      value={props.data.tone.centerFreqency} 
                      onValueChange={(value: number | null) => props.handleChange(172, value, ["tone", "centerFreqency"], props.data)} />
                </Form.Item>
                <Form.Item
                  label={"Slope"}
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
                      value={props.data.tone.slope} 
                      onValueChange={(value: number | null) => props.handleChange(173, value, ["tone", "slope"], props.data)} />
                </Form.Item>
                <Form.Item
                  label={"Attenuator"}
                >
                    <Select 
                      style={{width: "90px"}}
                      options={attenuation} 
                      bordered={true} 
                      value={props.data.filter2.attenuator} 
                      onChange={(value: number | null) => props.handleChange(169, value, ["filter2", "attenuator"], props.data)} />
                </Form.Item>
            </Form>
          </Col>
       </Row>
      </>
  );
}