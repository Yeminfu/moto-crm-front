import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form as Bform,
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
        {/* <h3>Фильтр</h3> */}
        <MyForm />
      </Card.Body>
    </Card>
  </>
);

const onSubmit = (values: any) => alert(JSON.stringify(values));

const MyForm = () => (
  <FinalForm
    onSubmit={onSubmit}
    initialValues={{
      year: 2020,
      category: "boats",
    }}
    render={({ handleSubmit }) => (
      <Bform onSubmit={handleSubmit} inline>
        <Field name="year">
          {(props) => (
            <Bform.Group controlId="exampleForm.SelectCustom">
              <Bform.Control as="select" custom {...props.input} size="sm">
                {/* <option>Категория</option> */}
                {[2019, 2020].map((year, i) => (
                  <option value={year} key={i}>
                    {year}
                  </option>
                ))}
              </Bform.Control>
            </Bform.Group>
          )}
        </Field>
        <Field name="category">
          {(props) => (
            <Bform.Group controlId="exampleForm.SelectCustom">
              <Bform.Control as="select" custom {...props.input} size="sm">
                <option>Категория</option>
                {[
                  {
                    label: "лодки",
                    value: "boats",
                  },
                  {
                    label: "мотоциклы",
                    value: "moto",
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
        <Button type="submit" size="sm">
          Отправить
        </Button>
      </Bform>
    )}
  />
);
