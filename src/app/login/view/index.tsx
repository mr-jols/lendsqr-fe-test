"use client";
import { InputFieldBuilder } from "@/components/input";
import SubmitButtonBuilder from "@/components/input/button";
import { PasswordInputFieldBuilder } from "@/components/input/password";
import useForm, {
  FormElementConfigProps,
  FormElementType,
  validateFormElements,
} from "@/hooks/useForm";
import Images from "@/utils/images";
import Image from "next/image";
import { useEffect } from "react";

export default function LoginView() {
  return (
    <main>
      <div className="login-wrapper">
        <div className="positioned-wrapper">
          <div className="logo-icon-wrapper">
            <Image
              src={Images.logo_icon}
              alt="logo icon"
              className="logo-icon"
            />
          </div>
        </div>
        <LeftSectionView />
        <RightSectionView />
      </div>
    </main>
  );
}

function LeftSectionView() {
  return (
    <section className="login-section login-section--left">
      <div>
        <Image
          src={Images.login_illustration}
          alt="logo illustration"
          className="login-illustration"
        />
      </div>
    </section>
  );
}

function RightSectionView() {
  return (
    <section className="login-section login-section--right">
      <div>
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <LoginFormView />
      </div>
    </section>
  );
}

function LoginFormView() {
  const elements: FormElementConfigProps[] = [
    {
      errorMessages: ["Your Email is Requried", "Please enter a valid email"],
      shouldValidate: true,
      type: FormElementType.email,
      index: 0,
    },
    {
      errorMessages: "Your password is required",
      shouldValidate: true,
      type: FormElementType.password,
      index: 1,
    },
  ];
  const { state, dispatch } = useForm(elements);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form className="login-form">
      <InputFieldBuilder
        props={{
          errorMessage: state.errors[0],
          placeholder: "Email",
          type: FormElementType.email,
          value: state.values[0],
          onBlur: () => dispatch.handleValidateFormElement(elements[0]),
          onChange: (value: string) =>
            dispatch.handleValueChange({ index: 0, value }),
        }}
      />
      <PasswordInputFieldBuilder
        props={{
          errorMessage: state.errors[1],
          placeholder: "Password",
          value: state.values[1],
          onBlur: () => dispatch.handleValidateFormElement(elements[1]),
          onChange: (value: string) =>
            dispatch.handleValueChange({ index: 1, value }),
        }}
      />
      <SubmitButtonBuilder
        props={{
          isLoading: false,
          title: "LOG IN",
          className: "submit-button--green",
          onClick() {
            dispatch.handleValidateFormElements(elements);
          },
        }}
      />
    </form>
  );
}
