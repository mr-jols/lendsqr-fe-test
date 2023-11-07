import RatingBuilder from "@/components/rating";
import Images from "@/utils/images";
import Image from "next/image";

export default function Playground() {
  return (
    <div className="user-details">
      <UserDetails />
    </div>
  );
}

function UserDetails() {
  return (
    <div>
      <BackButton />
      <HeaderWithActions />
      <IntroSection />
      <BodySection />
    </div>
  );
}

function BodySection() {
  return (
    <div className="user-details-section">
      <SectionItem props={sectionDataOne} />
      <SectionItem props={sectionDataTwo} />
      <SectionItem props={sectionDataThree} />
      <SectionItem props={sectionDataFour} />
    </div>
  );
}

interface SectionItemProps {
  title: string;
  fields: Map<string, string>;
}

const sectionDataOne: SectionItemProps = {
  title: "Personal Information",
  fields: new Map([
    ["full Name", "Grace Effiom"],
    ["Phone Number", "07060780922"],
    ["Email Address", "grace@gmail.com"],
    ["Bvn", "07060780922"],
    ["Gender", "Female"],
    ["Marital status", "Single"],
    ["Children", "None"],
    ["Type of residence", "Parent’s Apartment"],
  ]),
};

const sectionDataTwo: SectionItemProps = {
  title: "Education and Employment",
  fields: new Map([
    ["level of education", "B.Sc"],
    ["employment status", "Employed"],
    ["sector of employment", "FinTech"],
    ["Duration of employment", "2 years"],
    ["office email", "grace@lendsqr.com"],
    ["Monthly income", "₦200,000.00- ₦400,000.00"],
    ["loan repayment", "40,000"],
  ]),
};

const sectionDataThree: SectionItemProps = {
  title: "Socials",
  fields: new Map([
    ["Twitter", "@grace_effiom"],
    ["Facebook", "Grace Effiom"],
    ["Instagram", "@grace_effiom"],
  ]),
};


const sectionDataFour: SectionItemProps = {
    title: "Guarantor",
    fields: new Map([
      ["full Name", "Debby Ogana"],
      ["Phone Number", "07060780922"],
      ["Email Address", "debby@gmail.com"],
      ["Relationship","Sister"]
    ]),
  };


  
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

function IntroSection() {
  return (
    <section className="user-details-section">
      <div className="user-details-section-intro">
        <div className="avatar-wrapper">
          <Image
            src={
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/332.jpg"
            }
            alt="avatar"
            width={100}
            height={100}
          />
        </div>
        <div className="name">
          <h4>Grace Effiom</h4>
          <span>LSQFf587g90</span>
        </div>
        <div className="tier">
          <span>User’s Tier</span>
          <RatingBuilder props={{ rating: 1 }} />
        </div>
        <div className="account">
          <h4>₦200,000.00</h4>
          <span>9912345678/Providus Bank</span>
        </div>
      </div>
      <IntroSectionMenu />
    </section>
  );
}

function IntroSectionMenu() {
  return (
    <ul className="user-details-section-intro-menu">
      {[
        "General Details",
        "Documents",
        "Bank Details",
        "Loans",
        "Savings",
        "App and System",
      ].map((item, index) => (
        <li
          className={`user-details-section-intro-menu-item
           ${
             index === 0 ? "user-details-section-intro-menu-item--active" : ""
           }`}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function BackButton() {
  return (
    <div className="user-details-back">
      <div className="back-arrow-image-wrapper">
        <Image src={Images.details.back_arrow} alt="back arrow" />
      </div>
      <span>Back to Users</span>
    </div>
  );
}

function HeaderWithActions() {
  return (
    <div className="user-details-header">
      <h5 className="dashboard-title">User Details</h5>

      <div className="user-details-actions">
        <button className="user-details-actions-button user-details-actions-button--blacklist">
          Blacklist User
        </button>
        <button className="user-details-actions-button user-details-actions-button--activate">
          Activate User
        </button>
      </div>
    </div>
  );
}
