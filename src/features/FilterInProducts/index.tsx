import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form as Bform,  Card } from "react-bootstrap";
// import { useStore } from "effector-react";
// import { categories as $categories } from "../template";
import { OnChange } from "react-final-form-listeners";

export const FilterInProducts = ({ filterHandle }: any) => {
  // const cats = useStore(categories);
  // const categories = useStore($categories);
  return (
    <>
      <Card className="bg-secondary mb-5">
        <Card.Body>
          <FinalForm
            onSubmit={filterHandle}
            initialValues={
              {
                // year: 2020,
                // category: categories[0]?.id,
              }
            }
            render={({ form, handleSubmit, values }) => (
              <Bform onSubmit={handleSubmit} inline>
                <OnChange name="product_name">
                  {(category_name) => {
                    filterHandle(values);
                  }}
                </OnChange>
                <Field name="product_name">
                  {(props) => (
                    <Bform.Group className="mr-2">
                      <Bform.Control
                        placeholder="Наименование товара"
                        {...props.input}
                        size="sm"
                      ></Bform.Control>
                    </Bform.Group>
                  )}
                </Field>
              </Bform>
            )}
          />
        </Card.Body>
      </Card>
    </>
  );
};
