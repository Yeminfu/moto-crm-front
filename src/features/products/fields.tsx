// @ts-nocheck
import { Form as BForm, FormControl } from "react-bootstrap";
import { Field, FieldProps } from "react-final-form";
import React from "react";

export const CustomInput = (props: {
  lable: string;
  name: string;
  type: "input" | "number" | "password";
  placeholder?: string;
  validation?: any;
}) => {
  return (
    <BForm.Group>
      <BForm.Label>{`${props.lable} ${
        props.validation ? "*" : ""
      }`}</BForm.Label>
      <Field name={props.name} validate={props.validation} valid>
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

// import { Field, FieldProps } from "react-final-form"

export const CustomTextarea = (props: {
  lable: string;
  name: string;
  validation?: any;
}) => {
  return (
    <BForm.Group>
      <BForm.Label>{`${props.lable} ${
        props.validation ? "*" : ""
      }`}</BForm.Label>
      <Field name={props.name} validate={props.validation}>
        {(fieldProps) => <FormControl as="textarea" {...fieldProps.input} />}
      </Field>
    </BForm.Group>
  );
};

export const CustomFileInput: React.FC<FieldProps<
  FileList,
  HTMLInputElement
>> = ({ name, lable, ...props }) => (
  <BForm.Group>
    <BForm.Label>
      {/* <pre>{JSON.stringify(props, null, " ")}</pre> */}
      Изображение товара
    </BForm.Label>
    <Field name={name}>
      {({ input: { value, onChange, ...input } }) => {
        const handleChange = ({
          target,
        }: React.ChangeEvent<HTMLInputElement>) => {
          onChange(target.files); // instead of the default target.value
        };
        return (
          <input {...input} type="file" onChange={handleChange} {...props} />
        );
      }}
    </Field>
  </BForm.Group>
);

export const CustomSelect = (props: {
  lable: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
  validation?: any;
  color?: boolean;
}) => {
  return (
    <BForm.Group>
      <BForm.Label>{`${props.lable} ${
        props.validation ? "*" : ""
      }`}</BForm.Label>
      <Field name={props.name} validate={props.validation}>
        {(fieldProps) => (
          <FormControl as="select" custom {...fieldProps.input}>
            <option>{props.placeholder}</option>
            {props.options.map((option, i) => (
              <option
                value={option.value}
                key={i}
                style={{
                  color: props.color && option.value,
                }}
              >
                {option.label}
              </option>
            ))}
          </FormControl>
        )}
      </Field>
    </BForm.Group>
  );
};
