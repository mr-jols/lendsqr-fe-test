"use client"
import { useState } from "react";

export enum FormElementType {
  email,
  password,
}

export interface FormStateProps {
  errors: string[];
  isDirty: boolean[];
  values: string[];
  sumbitButtonState: SubmitButtonStateProps;
}

export interface FormElementConfigProps {
  shouldValidate: boolean;
  type: FormElementType;
  index: number;
  errorMessages: [string, string] | string;
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
) {
  return { ...currentState, buttonState };
}

export function initialFormState(length: number): FormStateProps {
  return {
    errors: new Array(length).fill(""),
    isDirty: new Array(length).fill(false),
    values: new Array(length).fill(""),
    sumbitButtonState: {
      isDisabled: false,
      isLoading: false,
      isSuccess: false,
    },
  };
}

export default function useForm(init: FormElementConfigProps[]) {
  const [formState, setFormState] = useState<FormStateProps>(
    initialFormState(init.length)
  );

  function handleValueChange(update: UpdateValuesProps) {
    setFormState(updateValue(formState, update));
  }

  function handleErrorChange(update: UpdateErrorsProps) {
    setFormState(updateErrors(formState, update));
  }

  function handleIsDirtyChange(update: UpdateIsDirtyProps) {
    setFormState(updateIsDirty(formState, update));
  }

  function handleButtonStateChange(update: SubmitButtonStateProps) {
    setFormState(updateSubmitButtonState(formState, update));
  }
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
    return {
      ...currentState,
      errors: currentState.errors.map(
        (item, index) =>
          validateFormElement(currentState, elements[index]).errors[index]
      ),
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
