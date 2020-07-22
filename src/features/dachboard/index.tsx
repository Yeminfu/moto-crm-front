import React from "react";
import "./dashboard.scss";
import { Row, Col, Nav, InputGroup } from "react-bootstrap";
import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { Filter } from "../Filter";

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
        <Filter />
        <InputGroup className="mb-3">
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2">Продано</InputGroup.Text>
          </InputGroup.Append>
          <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        </InputGroup>
        <Table />
        <Pagination />
      </Col>
    </Row>
  </div>
);
