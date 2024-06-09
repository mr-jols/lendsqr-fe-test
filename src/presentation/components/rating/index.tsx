import Images from "@/utils/images";
import Image from "next/image";

export default function RatingBuilder({
  props,
}: {
  props: { rating: 0 | 1 | 2 | 3 };
}) {
  return (
    <div className="rating">
      {new Array(props.rating).fill("").map((item, index) => (
        <div key={index} className="rating-image-wrapper">
          <Image src={Images.details.star_on} alt="one star" />
        </div>
      ))}
      {new Array(3 - props.rating).fill("").map((item, index) => (
        <div key={index} className="rating-image-wrapper">
          <Image src={Images.details.star_off} alt="no star" />
        </div>
      ))}
    </div>
  );
}
