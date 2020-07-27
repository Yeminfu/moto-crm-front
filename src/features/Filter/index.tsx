import React from "react";
import { Form as FinalForm } from "react-final-form";
import {
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

export const Filter = () => (
  <>
    <Card className="bg-secondary mb-5">
      <Card.Body>
        <h3>Фильтр</h3>
        <MyForm />
      </Card.Body>
    </Card>
  </>
);

const onSubmit = () => alert("submit");

const MyForm = () => (
  <FinalForm
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={1}>
            <InputGroup size="sm">
              <FormControl aria-label="Small" placeholder="Код" />
            </InputGroup>
          </Col>
          <Col sm={2}>
            <InputGroup size="sm">
              <FormControl aria-label="Small" placeholder="Наименование" />
            </InputGroup>
          </Col>
          <Col>
            <Button variant="outline-danger" size="sm">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-x-octagon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                />
              </svg>
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
