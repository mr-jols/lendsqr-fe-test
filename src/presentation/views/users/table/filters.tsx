import { InputFieldBuilder } from "@/presentation/components/input";
import { SelectInputFieldBuilder } from "@/presentation/components/input/select";
import { FilterFormContext } from "@/context/useFormFilter";
import {
  GlobalFilterContext,
  GlobalFilterContextType,
} from "@/context/useGlobalFilter";
import { FormElementType, FormHookOutputProps } from "@/hooks/useForm";
import Images from "@/utils/images";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

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
  const { setGlobalFilter} = useContext(
    GlobalFilterContext
  ) as GlobalFilterContextType;

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
                options: ["lendsqr", "irorun"],
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
                type: FormElementType.number,
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
                options: ["active", "pending", "blacklisted", "inactive"],
                value: state.values[5],
                type: FormElementType.select,
              }}
            />

            <div className="buttons">
              <button className="submit-button submit-button--outlined" onClick={
                ()=> setGlobalFilter("")
              }>
                Reset
              </button>
              <button className="submit-button submit-button--green" onClick={()=>{
                setGlobalFilter(state.values[0])
              }}>
                Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
