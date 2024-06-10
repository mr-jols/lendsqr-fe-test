import useToggle from "@/hooks/useToggle";
import { InputFieldProps } from ".";
import ErrorBuilder from "./error";


export function PasswordInputFieldBuilder({
  props,
}: {
  props: Omit<InputFieldProps,"type">;
}) {
  const [toggle, handleToggle] = useToggle();

  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <div className="relative-wrapper">
        <span className="visibility-toggler" onClick={(_) => handleToggle()}>
          {toggle ? "Hide" : "Show"}
        </span>
        <input
          type={toggle ? "text" : "password"}
          placeholder={props.placeholder}
          value={props?.value ?? ""}
          onChange={(e) => props.onChange(e.target.value)}
          onBlur={(_)=>props.onBlur?.call({})}
       />
      </div>
      <ErrorBuilder props={props.errorMessage} />
      <p className="forgot-password">Forgot Password</p>
    </div>
  );
}
