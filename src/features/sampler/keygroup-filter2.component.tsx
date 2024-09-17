import { Col, Form, Row, Select } from 'antd';
import { KeyGroup } from 'sampler-editor-librarian-dto';
import { filterTypes } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { useEffect } from 'react';
import { donutTheme } from './donut-theme';

export type Filter2Details = {
  data: KeyGroup,
  setData: React.Dispatch<React.SetStateAction<KeyGroup>>,
  handleChange: (keygroupHeaderIndex: number, value: number | boolean | null, path: Array<string>, keygroup: KeyGroup) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const KeygroupFilter2: React.FunctionComponent<Filter2Details> = (props) => {
  useEffect(() => {
    console.log("Rendering keygroup filter 2 tab")
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
              label={"Frequency"}
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
                value={props.data.filter2.frequency}
                onValueChange={(value: number | null) => props.handleChange(177, value, ["filter2", "frequency"], props.data)} />
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
              label={"Frequency Modulation 1"}
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
                value={props.data.filter2.freqModulationInput1Amount}
                onValueChange={(value: number | null) => props.handleChange(174, value, ["filter2", "freqModulationInput1Amount"], props.data)} />
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
              label={"Key Follow"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={-24}
                max={24}
                value={props.data.filter2.keyFollow}
                onValueChange={(value: number | null) => props.handleChange(178, value, ["filter2", "keyFollow"], props.data)} />
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
              label={"Frequency Modulation 2"}
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
                value={props.data.filter2.freqModulationInput2Amount}
                onValueChange={(value: number | null) => props.handleChange(175, value, ["filter2", "freqModulationInput2Amount"], props.data)} />
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
              label={"Resonance"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0}
                max={31}
                value={props.data.filter2.resonance}
                onValueChange={(value: number | null) => props.handleChange(171, value, ["filter2", "resonance"], props.data)} />
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
              label={"Frequency Modulation 3"}
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
                value={props.data.filter2.freqModulationInput3Amount}
                onValueChange={(value: number | null) => props.handleChange(176, value, ["filter2", "freqModulationInput3Amount"], props.data)} />
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
              label={"Filter Type"}
            >
              <Select
                options={filterTypes}
                bordered={true}
                value={props.data.filter2.filterType}
                onChange={(value: number | null) => props.handleChange(170, value, ["filter2", "filterType"], props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}