import { UsersContext, UsersContextType } from "@/hooks/useUsers";
import { useContext, useMemo } from "react";

interface SectionItemProps {
  title: string;
  fields: Map<string, string>;
}

export default function UserDetailBodySection({
  props,
}: {
  props: { id: number };
}) {
  const { users } = useContext(UsersContext) as UsersContextType;

  const sectionDataOne: SectionItemProps = useMemo(
    () => ({
      title: "Personal Information",
      fields: new Map([
        ["full Name", users[props.id]?.fullname ?? ""],
        ["Phone Number", users[props.id]?.phone_number ?? ""],
        ["Email Address", users[props.id]?.email ?? ""],
        ["Bvn", users[props.id]?.bvn ?? ""],
        ["Gender", users[props.id]?.gender ?? ""],
        ["Marital status", users[props.id]?.maritalstatus ?? ""],
        ["Children", users[props.id]?.children.toString() ?? ""],
        ["Type of residence", "Parent’s Apartment"],
      ]),
    }),
    [users]
  );

  const sectionDataTwo: SectionItemProps = useMemo(
    () => ({
      title: "Education and Employment",
      fields: new Map([
        ["level of education", "B.Sc"],
        ["employment status", "Employed"],
        ["sector of employment", users[props.id]?.employment_sector],
        ["Duration of employment", "2 years"],
        ["office email", users[props.id]?.office_email ?? ""],
        ["Monthly income", users[props.id]?.monthly_income ?? ""],
        ["loan repayment", users[props.id]?.loan_repayment ?? ""],
      ]),
    }),
    [users]
  );

  const sectionDataThree: SectionItemProps = useMemo(
    () => ({
      title: "Socials",
      fields: new Map([
        ["Twitter", users[props.id]?.twitter ?? ""],
        ["Facebook", users[props.id]?.faceboook ?? ""],
        ["Instagram", users[props.id]?.instagram ?? ""],
      ]),
    }),
    [users]
  );

  const sectionDataFour: SectionItemProps = useMemo(
    () => ({
      title: "Guarantor",
      fields: new Map([
        ["full Name", users[props.id]?.guarantor_name ?? ""],
        ["Phone Number", users[props.id]?.guarantor_phone_number ?? ""],
        ["Email Address", users[props.id]?.guarantor_email ?? ""],
        ["Relationship", "Sister"],
      ]),
    }),
    [users]
  );

  return (
    <div className="user-details-section">
      <SectionItem props={sectionDataOne} />
      <SectionItem props={sectionDataTwo} />
      <SectionItem props={sectionDataThree} />
      <SectionItem props={sectionDataFour} />
    </div>
  );
}

function SectionItem({ props }: { props: SectionItemProps }) {
  return (
    <div className="user-details-section-item">
      <div className="user-details-section-item-title">{props.title}</div>
      <div className="user-details-section-item-fields">
        {Array.from(props.fields.keys()).map((item, index) => (
          <div key={index} className="user-details-section-item-field">
            <span className="user-details-section-item-field-key">{item}</span>
            <span className="user-details-section-item-field-value">
              {props.fields.get(item)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
