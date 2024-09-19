import { Stack } from '@mui/material';
import { Breadcrumb, Col, Row } from 'antd';
import { MenuComponent } from '../menu/menu.component';
import MidiConnectionTable from './midi-connection-table.component';


export const Config: React.FunctionComponent = (props) => {
  const breadcrumbItems = [
    {
      title: 'Settings'
    }
  ]

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
            <Col className='wide-table-col'>
              <MidiConnectionTable isInput={true} tableTitle='Midi Inputs' fetchURL='http://localhost:4000/api/midi/ports/input' setURL='http://localhost:4000/api/midi/ports/input/connect'/>
            </Col>
            <Col className='wide-table-col'>
            <MidiConnectionTable isInput={false} tableTitle='Midi Outputs' fetchURL='http://localhost:4000/api/midi/ports/output' setURL='http://localhost:4000/api/midi/ports/output/connect'/>
            </Col>
          </Row>
        </Stack>
      </>
  );
};