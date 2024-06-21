import { useState } from "react";

//This custom hook manages form state

export enum FormElementType {
  email,
  password,
  select,
  date,
  text,
  number,
}

export interface FormStateProps {
  errors: string[];
  isDirty: boolean[];
  values: string[];
  sumbitButtonState: SubmitButtonStateProps;
}

//string error message is used for required elements with [string,string] is used for required elements that can have invalid states
export interface FormElementConfigProps {
  shouldValidate: boolean;
  type: FormElementType;
  index: number;
  errorMessages: [string, string] | string;
  initialValue?: string;
}

interface UpdateValuesProps {
  value: string;
  index: number;
}

interface UpdateErrorsProps extends UpdateValuesProps {}

interface UpdateIsDirtyProps {
  value: boolean;
  index: number;
}

interface SubmitButtonStateProps {
  isDisabled: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export function updateValue(
  currentState: FormStateProps,
  update: UpdateValuesProps
): FormStateProps {
  return {
    ...currentState,
    values: currentState.values.map((item, index) =>
      index == update.index ? update.value : item
    ),
  };
}

export function updateErrors(
  currentState: FormStateProps,
  update: UpdateErrorsProps
): FormStateProps {
  return {
    ...currentState,
    errors: currentState.errors.map((item, index) =>
      index == update.index ? update.value : item
    ),
  };
}

export function updateIsDirty(
  currentState: FormStateProps,
  update: UpdateIsDirtyProps
): FormStateProps {
  return {
    ...currentState,
    isDirty: currentState.isDirty.map((item, index) =>
      index == update.index ? update.value : item
    ),
  };
}

export function updateSubmitButtonState(
  currentState: FormStateProps,
  buttonState: SubmitButtonStateProps
): FormStateProps {
  return { ...currentState, sumbitButtonState: buttonState };
}

export function initialFormState(
  values: FormElementConfigProps[]
): FormStateProps {
  return {
    errors: new Array(values.length).fill(""),
    isDirty: new Array(values.length).fill(false),
    values: values.map((item) => item?.initialValue ?? ""),
    sumbitButtonState: {
      isDisabled: false,
      isLoading: false,
      isSuccess: false,
    },
  };
}

export interface FormHookOutputProps {
  state: FormStateProps;
  dispatch: {
    handleValueChange(update: UpdateValuesProps): void;
    handleIsDirtyChange(update: UpdateIsDirtyProps): void;
    handleButtonStateChange(update: SubmitButtonStateProps): void;
    handleValidateFormElement(element: FormElementConfigProps): void;
    handleValidateFormElements(elements: FormElementConfigProps[]): void;
    resetFormState(): void;
  };
}

export default function useForm(
  init: FormElementConfigProps[]
): FormHookOutputProps {
  const initialState = initialFormState(init);
  const [formState, setFormState] = useState<FormStateProps>(initialState);

  function handleValueChange(update: UpdateValuesProps) {
    setFormState(updateValue(formState, update));
  }

  function handleIsDirtyChange(update: UpdateIsDirtyProps) {
    setFormState(updateIsDirty(formState, update));
  }

  function handleButtonStateChange(update: SubmitButtonStateProps) {
    setFormState(updateSubmitButtonState(formState, update));
  }

  function handleValidateFormElement(element: FormElementConfigProps) {
    setFormState(validateFormElement(formState, element));
  }

  function handleValidateFormElements(elements: FormElementConfigProps[]) {
    setFormState(validateFormElements(formState, elements));
  }

  function resetFormState() {
    setFormState(initialState);
  }
  return {
    state: formState,
    dispatch: {
      handleValueChange,
      handleIsDirtyChange,
      handleButtonStateChange,
      handleValidateFormElement,
      handleValidateFormElements,
      resetFormState
    },
  };
}

export function validateFormElement(
  currentState: FormStateProps,
  element: FormElementConfigProps
): FormStateProps {
  if (element.shouldValidate == false) return currentState;
  else {
    switch (element.type) {
      case FormElementType.email:
        return {
          ...currentState,
          errors: currentState.errors.map((item, index) =>
            index == element.index
              ? validateEmail(
                  currentState.values[index],
                  element.errorMessages as [string, string]
                )
              : item
          ),
        };
      default:
        return {
          ...currentState,
          errors: currentState.errors.map((item, index) =>
            index == element.index
              ? validateRequiredField(
                  currentState.values[index],
                  element.errorMessages as string
                )
              : item
          ),
        };
    }
  }
}

export function validateFormElements(
  currentState: FormStateProps,
  elements: FormElementConfigProps[]
): FormStateProps {
  const state: FormStateProps = {
    ...currentState,
    errors: currentState.errors.map(
      (_, index) =>
        validateFormElement(currentState, elements[index]).errors[index]
    ),
  };

  return {
    ...state,
    sumbitButtonState: {
      ...state.sumbitButtonState,
      isLoading:
        state.errors.filter((item) => item == "").length == state.values.length,
    },
  };
}

export function validateEmail(
  value: string,
  errorMessages: [string, string]
): string {
  if (value.length == 0) return errorMessages[0];
  if (
    !value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return errorMessages[1];
  }
  return "";
}

export function validateRequiredField(value: string, errorMessage: string) {
  if (value.length == 0) return errorMessage;
  return "";
}
