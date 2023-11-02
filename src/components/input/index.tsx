import { FormElementType } from "@/hooks/useForm";
import ErrorBuilder from "./error";

export interface InputFieldProps {
    label?: string;
    placeholder: string;
    errorMessage: string;
    type: FormElementType;
    value?: string;
  }

export function InputFieldBuilder({ props }: { props: InputFieldProps }) {
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type == FormElementType.email ? "email" : "text"}
        placeholder={props.placeholder}
        value={props.value}
      ></input>
      <ErrorBuilder props={props.errorMessage} />
    </>
  );
}
