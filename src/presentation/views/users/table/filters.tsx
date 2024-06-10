import { InputFieldBuilder } from "@/presentation/components/input";
import { SelectInputFieldBuilder } from "@/presentation/components/input/select";
import { FilterFormContext } from "@/context/useFormFilter";
import { FormElementType, FormHookOutputProps } from "@/hooks/useForm";
import Images from "@/utils/images";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import {
  TableFilterContext,
  TableFilterContextType,
} from "@/hooks/useTableFilter";
import { UserStatus, stringToUserStatus } from "@/models/domain/user";
import { formatDate } from "@/utils/functions";
import { UsersContext, UsersContextType } from "@/hooks/useUsers";

export default function HeadingFilters({
  props,
}: {
  props: { title: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLTableRowElement>(null);
  const { state, dispatch } = useContext(
    FilterFormContext
  ) as FormHookOutputProps;
  const { resetState, setState } = useContext(
    TableFilterContext
  ) as TableFilterContextType;
  const { users } = useContext(UsersContext) as UsersContextType;

  function handleOutsideClick(event: MouseEvent): void {
    if (modalRef.current) {
      if (!modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      } else if (
        !modalRef.current
          .querySelector(".modal-content")
          ?.contains(event.target as Node)
      ) {
        event.stopPropagation();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="heading-content">
      {props.title}

      <div className="image-wrapper" ref={modalRef}>
        <Image
          src={Images.table.filter}
          alt="filter icon"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isOpen && (
          <div className="user-table-filters">
            <SelectInputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Select Organization",
                label: "Organization",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 0,
                    value: e,
                  }),
                options: ["All"].concat(
                  Array.from(new Set(users.map((item) => item.organization)))
                ),
                value: state.values[0],
                type: FormElementType.select,
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Username",
                label: "Username",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 1,
                    value: e,
                  }),
                type: FormElementType.text,
                value: state.values[1],
              }}
            />
            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Email",
                label: "Email",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 2,
                    value: e,
                  }),
                type: FormElementType.email,
                value: state.values[2],
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Date",
                label: "Date",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 3,
                    value: e,
                  }),
                type: FormElementType.date,
                value: state.values[3],
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Phone Number",
                label: "Phone Number",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 4,
                    value: e,
                  }),
                type: FormElementType.text,
                value: state.values[4],
              }}
            />

            <SelectInputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Status",
                label: "Status",
                onChange: (e) =>
                  dispatch.handleValueChange({
                    index: 5,
                    value: e,
                  }),
                options: ["All"].concat(Object.values(UserStatus)),
                value: state.values[5],
                type: FormElementType.select,
              }}
            />

            <div className="buttons">
              <button
                className="submit-button submit-button--outlined"
                onClick={() => resetState()}
              >
                Reset
              </button>
              <button
                className="submit-button submit-button--green"
                onClick={() => {
                  setState({
                    organization: state.values[0],
                    username: state.values[1],
                    email: state.values[2],
                    date: Boolean(state.values[3])
                      ? formatDate(state.values[3])
                      : "",
                    phoneNumber: state.values[4],
                    status: stringToUserStatus(state.values[5]),
                  });
                }}
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
