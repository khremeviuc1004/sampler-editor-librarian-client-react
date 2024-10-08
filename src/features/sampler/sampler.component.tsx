import { Stack } from '@mui/material';
import { Breadcrumb, Col, Divider, Row } from 'antd';
import { MenuComponent } from '../menu/menu.component';
import SamplerProgramTable from './sampler-program-table.component';
import SamplerSampleTable from './sampler-sample-table.component';
import { useEffect } from 'react';


export const Sampler: React.FunctionComponent = (props) => {
  const breadcrumbItems = [
    {
      title: 'Memory'
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
        <Divider orientation="left" />
        <Row gutter={10}>
          <Col  className='wide-table-col'>
            <SamplerProgramTable />
          </Col>
          <Col  className='wide-table-col'>
            <SamplerSampleTable />
          </Col>
        </Row>
        <Divider orientation="left" />
      </Stack>
    </>
  );
};