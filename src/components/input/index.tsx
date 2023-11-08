import { FormElementType } from "@/hooks/useForm";
import ErrorBuilder from "./error";

export interface InputFieldProps {
  label?: string;
  placeholder: string;
  errorMessage: string;
  type: FormElementType;
  value: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function InputFieldBuilder({ props }: { props: InputFieldProps }) {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input
        type={
          props.type == FormElementType.email
            ? "email"
            : props.type == FormElementType.number
            ? "number"
            : props.type == FormElementType.date
            ? "date"
            : "text"
        }
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={(_) => props.onBlur?.call({})}
      />
      <ErrorBuilder props={props.errorMessage} />
    </div>
  );
}
