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
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
import axios from "axios";

export const Login = () => {
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
    axios
      .get("http://10.0.0.31:3001/api/login", {
        params: values,
      })
      .then((x) => {
        console.log("x", x);
        setResponse({
          loading: false,
          data: x,
          status: x.status,
        });
      })
      .catch((x) => {
        console.log("x", x);
        setResponse({
          loading: false,
          data: x,
          status: x.status,
        });
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
            <Badge variant="info">POST</Badge> /api/login
          </div>
          <div className="mt-3">
            <MyForm onSubmit={onSubmit} setResponse={setResponse} />
            <pre>{JSON.stringify({ response }, null, " ")}</pre>
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
        <pre>{JSON.stringify(values, null, " ")}</pre>
      </form>
    )}
  />
);
