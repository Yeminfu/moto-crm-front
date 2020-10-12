import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form as Bform, Button, Card } from "react-bootstrap";
import { useStore } from "effector-react";
import { categories as $categories } from "../template";

export const Filter = ({ filterHandle }: any) => {
  // const cats = useStore(categories);
  const categories = useStore($categories);
  return (
    <>
      <Card className="bg-secondary mb-5">
        <Card.Body>
          <FinalForm
            onSubmit={filterHandle}
            initialValues={{
              year: 2020,
              category: categories[0]?.id,
            }}
            render={({ handleSubmit }) => (
              <Bform onSubmit={handleSubmit} inline>
                <Field name="year">
                  {(props) => (
                    <Bform.Group
                      controlId="exampleForm.SelectCustom"
                      className="mr-2"
                    >
                      <Bform.Control
                        as="select"
                        custom
                        {...props.input}
                        size="sm"
                      >
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
                    <Bform.Group
                      controlId="exampleForm.SelectCustom"
                      className="mr-2"
                    >
                      <Bform.Control
                        as="select"
                        custom
                        {...props.input}
                        size="sm"
                      >
                        {[
                          ...categories?.map((category: any, i: any) => ({
                            label: category.name,
                            value: category.id,
                          })),
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
                  Сформировать
                </Button>
              </Bform>
            )}
          />
        </Card.Body>
      </Card>
    </>
  );
};
