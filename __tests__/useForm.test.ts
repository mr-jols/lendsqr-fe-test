import { FormStateProps, initialFormState } from "@/hooks/useForm";

describe("it ensures validity of form state", () => {
  it("ensures validity of initial State", () => {
    expect(initialFormState(2)).toEqual(<FormStateProps>{
      errors: ["", ""],
      isDirty: [false, false],
      values: ["", ""],
    });
  });
});
