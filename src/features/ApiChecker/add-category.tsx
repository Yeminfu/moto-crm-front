import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form as Bform,
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { API } from "../../api";

import { Wrapper } from "./wrapper";

export const AddCategory = () => {
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

    API.add_category(values)
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
        title="Add category"
        method="POST"
        api_url="/api/add_category"
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
      id: "boat",
      name: "Лодки",
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify({ values }, null, " ")}</pre>
        <Row>
          <Col sm="4">
            <Field name="id">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="ID"
                    // aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="name">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Название"
                    // aria-label="Username"
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
