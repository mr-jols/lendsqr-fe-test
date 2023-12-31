"use client";
import { InputFieldBuilder } from "@/components/input";
import SubmitButtonBuilder from "@/components/input/button";
import { PasswordInputFieldBuilder } from "@/components/input/password";
import useForm, {
  FormElementConfigProps,
  FormElementType,
} from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RightSection() {
  return (
    <section className="login-section login-section--right">
      <div>
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <LoginForm />
      </div>
    </section>
  );
}

function LoginForm() {
  //This initilizes form state
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
  const router = useRouter();

  useEffect(() => {
    if (state.sumbitButtonState.isLoading) {
      //mock api load state
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard/users");
        dispatch.handleButtonStateChange({
          ...state.sumbitButtonState,
        });
      }, 1000);
    }
  }, [state.sumbitButtonState.isLoading]);

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
          isLoading: state.sumbitButtonState.isLoading,
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
