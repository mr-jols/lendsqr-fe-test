import { InputFieldBuilder } from "@/components/input";
import { SelectInputFieldBuilder } from "@/components/input/select";
import { FormElementType } from "@/hooks/useForm";
import Images from "@/utils/images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeadingFilters({
  props,
}: {
  props: { title: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLTableRowElement>(null);

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
  });

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
                onChange: () => "",
                options: ["lendsqr", "irorun"],
                value: "",
                type: FormElementType.select,
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "username",
                label: "Username",
                onChange: () => "",
                type: FormElementType.text,
                value: "",
              }}
            />
            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "email",
                label: "Email",
                onChange: () => "",
                type: FormElementType.email,
                value: "",
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "date",
                label: "Date",
                onChange: () => "",
                type: FormElementType.date,
                value: "",
              }}
            />

            <InputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "Phonenumber",
                label: "Phone Number",
                onChange: () => "",
                type: FormElementType.number,
                value: "",
              }}
            />

            <SelectInputFieldBuilder
              props={{
                errorMessage: "",
                placeholder: "status",
                label: "Status",
                onChange: () => "",
                options: ["active", "pending", "blacklisted", "inactive"],
                value: "",
                type: FormElementType.select,
              }}
            />

            <div className="buttons">
              <button className="submit-button submit-button--outlined">
                Reset
              </button>
              <button className="submit-button submit-button--green">
                Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
