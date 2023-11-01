import { useState } from "react";

enum FormElementType {
  email,
  password,
}

export interface FormStateProps {
  errors: string[];
  isDirty: boolean[];
  values: string[];
}

interface FormElementConfigProps {
  shouldValidate: boolean;
  type: FormElementType;
}

export function initialFormState(length: number): FormStateProps {
  return {
    errors: new Array(length).fill(""),
    isDirty: new Array(length).fill(false),
    values: new Array(length).fill(""),
  };
}

export default function useForm(init: FormElementConfigProps[]) {
  const [formState, setFormState] = useState<FormStateProps>(
    initialFormState(init.length)
  );
}
