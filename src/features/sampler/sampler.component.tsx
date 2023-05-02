import { Stack } from '@mui/material';
import { Breadcrumb, Col, Row } from 'antd';
import { MenuComponent } from '../menu/menu.component';
import SamplerProgramTable from './sampler-program-table.component';
import SamplerSampleTable from './sampler-sample-table.component';
import SamplerStatusReport from './sampler-status-report.component';
import HardDiskDirectoryTable from './harddisk-directory-table.component';
import { useEffect } from 'react';


export const Sampler: React.FunctionComponent = (props) => {
  const breadcrumbItems = [
    {
      title: 'Sampler'
    }
  ]
  useEffect(() => {
    console.log("Rendering sampler view")
  }, [])

  return (
      <>
        <MenuComponent />
        <Breadcrumb items={breadcrumbItems} />
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            width: '100%',
            height: '800px',
          }}
          >
          <Row gutter={50}>
            <Col style={{width: "33%"}}>
              <SamplerStatusReport />
            </Col>
            <Col style={{width: "33%"}}>
              <SamplerProgramTable />
            </Col>
            <Col style={{width: "33%"}}>
              <SamplerSampleTable />
            </Col>
          </Row>
          <Row gutter={50}>
            <Col style={{width: "33%"}}>
              <HardDiskDirectoryTable />
            </Col>
            <Col style={{width: "33%"}}>
            </Col>
            <Col style={{width: "33%"}}>
            </Col>
          </Row>
        </Stack>
      </>
  );
};