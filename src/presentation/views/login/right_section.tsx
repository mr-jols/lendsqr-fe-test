import { InputFieldBuilder } from "@/presentation/components/input";
import SubmitButtonBuilder from "@/presentation/components/input/button";
import { PasswordInputFieldBuilder } from "@/presentation/components/input/password";
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
      type: FormElementType.email,
      errorMessages: ["Your Email is required", "Please enter a valid email"],
      shouldValidate: true,
      index: 0,
    },
    {
      type: FormElementType.password,
      errorMessages: "Your password is required",
      shouldValidate: true,
      index: 1,
    },
  ];
  const { state, dispatch } = useForm(elements);
  const router = useRouter();

  useEffect(() => {
    if (state.sumbitButtonState.isLoading) {
      //mock api load time
      const timeoutId = setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard/users");
        dispatch.handleButtonStateChange({
          ...state.sumbitButtonState,
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
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
