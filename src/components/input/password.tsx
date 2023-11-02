"use client";
import useToggle from "@/hooks/useToggle";
import { InputFieldProps } from ".";
import ErrorBuilder from "./error";

export function PasswordInputFieldBuilder({
  props,
}: {
  props: InputFieldProps;
}) {
  const [toggle, handleToggle] = useToggle();

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <div className="relative-wrapper">
        <span className="visibility-toggler" onClick={(_) => handleToggle()}>
          {toggle ? "Hide" : "Show"}
        </span>
        <input
          type={toggle ? "text" : "password"}
          placeholder={props.placeholder}
          value={props.value}
        ></input>
      </div>
      <ErrorBuilder props={props.errorMessage} />
      <span className="forgot-password">Forgot Password</span>
    </>
  );
}
