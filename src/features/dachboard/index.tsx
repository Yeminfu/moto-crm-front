import React from "react";
import "./dashboard.scss";
import { Row, Col, Nav } from "react-bootstrap";
import { Table } from "../Table/index";

export const Dashboard = () => (
  <div className="container-fluid">
    <Row className="dashboard">
      <Col className="bg-dark col-md-auto">
        <Nav
          defaultActiveKey="/home"
          className="flex-column navbar align-items-start"
        >
          {[
            { text: "Лодки" },
            { text: "ЗИП Лодки" },
            { text: "ЗИП Лодки" },
            { text: "ПЛМ" },
            { text: "ЗИП ПЛМ" },
            { text: "Мото" },
            { text: "ЗИП Мото" },
          ].map((x) => (
            <Nav.Link href="/home" className="text-white bg-dark">
              {x.text}
            </Nav.Link>
          ))}
        </Nav>
      </Col>
      <Col>
        <Table />
      </Col>
    </Row>
  </div>
);
