import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  InputGroup,
  FormControl,
  Spinner,
  Form as Bform,
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
// import axios from "axios";
import { API } from "../../api";

export const Report = () => {
  const [response, setResponse] = useState<any>({
    loading: false,
    data: null,
    status: null,
  });
  const onSubmit = (values: any) => {
    setResponse({
      ...response,
      loading: true,
    });
    API.report(values)
      .then((x) => {
        setResponse({
          loading: false,
          data: x.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          setResponse({
            loading: false,
            data: {
              error: {
                text: error.response.statusText,
                code: error.response.status,
              },
            },
          });
        }
      });
  };
  return (
    <>
      <Row>
        <Col sm={2}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Admin API: Sessions</Card.Title>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2>Admin API: Sessions</h2>
          <div>
            <div>Login</div>
            <Badge variant="info">GET</Badge> /api/report
          </div>
          <div className="mt-3">
            <MyForm onSubmit={onSubmit} setResponse={setResponse} />
            {response.data && (
              <pre className="reponse-view">
                {JSON.stringify({ response: response.data }, null, " ")}
              </pre>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

const MyForm = ({ onSubmit }: any) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      login: "kolyan",
      password: "bill geits loh",
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm="4">
            <Field name="category">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Control as="select" custom {...props.input}>
                    <option>Выберите категорию</option>
                    {[
                      {
                        label: "лодки",
                        value: "boats",
                      },
                      {
                        label: "моторы",
                        value: "motors",
                      },
                    ].map((x, i) => (
                      <option value={x.value} key={i}>
                        {x.label}
                      </option>
                    ))}
                  </Bform.Control>
                </Bform.Group>
              )}
            </Field>
            <Field name="login">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Login"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="password">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Password"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            {/* <Button variant="outline-primary" type="submit" size="sm">
              send
            </Button> */}
            <Button
              variant="primary"
              // disabled
              type="submit"
            >
              Try it
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
