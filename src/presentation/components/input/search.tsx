import Images from "@/utils/images";
import Image from "next/image";

export default function SearchInputFieldBuilder() {
    return (
      <div className="search-input">
        <button>
          <div className="icon-wrapper">
            <Image src={Images.search} alt="Search icon" />
          </div>
        </button>
        <input type="search" placeholder="Search for anything" />
      </div>
    );
  }