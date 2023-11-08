import {
  FormElementConfigProps,
  FormElementType,
  FormStateProps,
  initialFormState,
  updateErrors,
  updateIsDirty,
  updateValue,
  validateEmail,
  validateFormElement,
  validateFormElements,
  validateRequiredField,
} from "@/hooks/useForm";

describe("it ensures validity of form state", () => {
  let elements: FormElementConfigProps[];
  beforeEach(() => {
    elements = [
      {
        index: 0,
        shouldValidate: true,
        type: FormElementType.email,
        errorMessages: ["Required", "Invalid"],
      },
      {
        index: 1,
        shouldValidate: true,
        type: FormElementType.password,
        errorMessages: "Password Required",
      },
      {
        index: 2,
        shouldValidate: false,
        type: FormElementType.email,
        errorMessages: ["Required", "Invalid"],
      },
    ];
  });

  it("ensures validity of initial State", () => {
    expect(initialFormState([elements[0],elements[1]])).toEqual(<FormStateProps>{
      errors: ["", ""],
      isDirty: [false, false],
      values: ["", ""],
      sumbitButtonState: {
        isDisabled: false,
        isLoading: false,
        isSuccess: false,
      },
    });
  });

  it("checks that initialState of a form element is set",()=>{
    expect(initialFormState([{
       errorMessages:"",
       index:0,
       shouldValidate:false,
       type:FormElementType.text,
       initialValue:"lendsqr"
    }]).values).toEqual(["lendsqr"]);
  })

  it("updates form value", () => {
    const state = initialFormState([elements[0],elements[1]]);
    expect(updateValue(state, { index: 0, value: "updated" }).values).toEqual([
      "updated",
      "",
    ]);
  });

  it("updates form errors", () => {
    const state = initialFormState([elements[0],elements[1]]);
    const errorMessage = "Something went wrong";
    expect(
      updateErrors(state, { index: 0, value: errorMessage }).errors
    ).toEqual([errorMessage, ""]);
  });

  it("updates form is dirty Fields", () => {
    const state = initialFormState([elements[0],elements[1]]);
    expect(updateIsDirty(state, { index: 0, value: true }).isDirty).toEqual([
      true,
      false,
    ]);
  });

  it("validates a required field", () => {
    const errorMessage = "This field is required";
    expect(validateRequiredField("", errorMessage)).toBe(errorMessage);
    expect(validateRequiredField("d", errorMessage)).toBe("");
  });

  it("validates email field", () => {
    const errorMessages = [
      "Your Email is required",
      "Please enter a valid email",
    ] as [string, string];
    expect(validateEmail("", errorMessages)).toBe(errorMessages[0]);
    expect(validateEmail("ddfd", errorMessages)).toBe(errorMessages[1]);
    expect(validateEmail("one@gmail.com", errorMessages)).toBe("");
  });

  it("validates a form element", () => {
    let initialState = initialFormState(elements);
    expect(validateFormElement(initialState, elements[0]).errors).toEqual([
      elements[0].errorMessages[0],
      "",
      "",
    ]);
    expect(validateFormElement(initialState, elements[1]).errors).toEqual([
      "",
      elements[1].errorMessages,
      "",
    ]);
    expect(validateFormElement(initialState, elements[2]).errors).toEqual([
      "",
      "",
      "",
    ]);
    initialState = updateValue(initialState, { index: 0, value: "hmm" });
    expect(validateFormElement(initialState, elements[0]).errors).toEqual([
      elements[0].errorMessages[1],
      "",
      "",
    ]);
  });

  it("validates all form elements", () => {
    const initialState = initialFormState(elements);
    expect(validateFormElements(initialState, elements).errors).toEqual([
      elements[0].errorMessages[0],
      elements[1].errorMessages,
      "",
    ]);
  });
});
