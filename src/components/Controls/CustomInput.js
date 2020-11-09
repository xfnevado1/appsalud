import React  from "react";
import {Form, } from "react-bootstrap";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return <>
      <Form.Control {...field} {...props} />
      <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>
  </>
};
export default CustomInput;