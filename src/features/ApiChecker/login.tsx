import React, { useState } from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { API } from "../../api";
import { Wrapper } from "./wrapper";

export const Login = () => {
  const [response, setResponse] = useState<any>({
    loading: false,
    data: null,
    status: null,
  });
  const onSubmit = ({ login, password }: any) => {
    setResponse({
      ...response,
      loading: true,
    });
    API.login(login, password)
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
      <Wrapper
        title={"Login"}
        method={"GET"}
        api_url={"/api/login"}
        form={<MyForm onSubmit={onSubmit} setResponse={setResponse} />}
        response_data={response.data}
      />
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
            <Button variant="primary" type="submit">
              Try it
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
