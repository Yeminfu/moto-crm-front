import { Form as BForm, FormControl } from "react-bootstrap";
import { Field } from "react-final-form";
import React from "react";

export const CustomInput = (props: {
  lable: string;
  name: string;
  type: "input" | "number" | "password";
  placeholder?: string;
  validation: any;
}) => {
  return (
    <BForm.Group>
      <BForm.Label>{props.lable}</BForm.Label>
      <Field name={props.name}>
        {(fieldProps) => (
          <FormControl
            placeholder={props.placeholder}
            type={props.type}
            {...fieldProps.input}
          />
        )}
      </Field>
    </BForm.Group>
  );
};

export const CustomTextarea = (props: {
  lable: string;
  name: string;
  validation: any;
}) => {
  return (
    <BForm.Group>
      <BForm.Label>{props.lable}</BForm.Label>
      <Field name={props.name}>
        {(fieldProps) => <FormControl as="textarea" {...fieldProps.input} />}
      </Field>
    </BForm.Group>
  );
};

export const CustomSelect = (props: {
  lable: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
  validation: any;
}) => (
  <BForm.Group>
    <BForm.Label>{props.lable}</BForm.Label>
    <Field name={props.name}>
      {(fieldProps) => (
        <FormControl as="select" custom {...fieldProps.input}>
          <option>{props.placeholder}</option>
          {props.options.map((option, i) => (
            <option value={option.value} key={i}>
              {option.label}
            </option>
          ))}
        </FormControl>
      )}
    </Field>
  </BForm.Group>
);
