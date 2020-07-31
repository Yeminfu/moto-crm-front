import React, { useState } from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { API } from "../../api";

import { Wrapper } from "./wrapper";

export const AddToStock = () => {
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

    API.add_to_stock(values)
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
        title="Add to stock"
        method="POST"
        api_url="/api/add_to_stock"
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
      shop_id: "khv",
      product_id: "1",
      count: "10",
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify({ values }, null, " ")}</pre>
        <Row>
          <Col sm="4">
            <Field name="shop_id">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="shop_id"
                    // aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="product_id">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="product_id"
                    // aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="count">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="count"
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
