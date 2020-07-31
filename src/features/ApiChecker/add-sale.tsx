import React, { useState } from "react";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { API } from "../../api";
import { Wrapper } from "./wrapper";

export const AddSale = () => {
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

    API.add_sale(values)
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
    <Wrapper
      title="Add Sale"
      method={"POST"}
      api_url="/api/add-sale"
      form={<MyForm onSubmit={onSubmit} setResponse={setResponse} />}
      response_data={response.data}
    />
  );
};

const MyForm = ({ onSubmit }: any) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      product_id: 1,
      shop_id: "khv",
      saler_id: 1,
      count: 1,
      sum: 100500,
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify({ values }, null, " ")}</pre>
        <Row>
          <Col sm="4">
            <Field name="product_id">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="product_id"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="shop_id">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="shop_id"
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
