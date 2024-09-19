import { Breadcrumb, Col, Divider, Row } from "antd";
import { MenuComponent } from "../menu/menu.component";
import { useEffect } from "react";
import StatusReportTable from "./status-report-table.component";
import { Stack } from "@mui/material";


export const StatusReport: React.FunctionComponent = (props) => {
    const breadcrumbItems = [
        {
          title: 'Status Report'
        }
      ]
      useEffect(() => {
        console.log("Rendering status report view")
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
                    <StatusReportTable />
                </Col>
                </Row>
                <Divider orientation="left" />
            </Stack>
        </>
      );
}