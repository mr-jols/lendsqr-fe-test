import { FormElementType } from "@/hooks/useForm";
import ErrorBuilder from "./error";

export interface InputFieldProps {
  label?: string;
  placeholder: string;
  errorMessage: string;
  type: FormElementType;
  value: string | null;
  onChange: (value:string) => void;
  onBlur?:()=>void;
}

export function InputFieldBuilder({ props }: { props: InputFieldProps }) {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type == FormElementType.email ? "email" : "text"}
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={(_)=>props.onBlur?.call({})}
      ></input>
      <ErrorBuilder props={props.errorMessage} />
    </div>
  );
}
