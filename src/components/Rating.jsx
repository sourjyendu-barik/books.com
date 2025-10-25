import React from "react";
import { Star, StarHalf } from "lucide-react";
const Rating = ({ rating }) => {
  const r = Number(rating);
  console.log(r);
  const fullstar = Math.floor(r);
  const half = r % 1 !== 0;
  // const empty = 5 - (fullstar + (half ? 1 : 0));
  return (
    <div className="d-flex align-items-center gap-1">
      {Array(fullstar)
        .fill("yellow")
        .map((_, i) => (
          <Star color="gold" key={`full${i}`} />
        ))}
      {half && <StarHalf color="gold" />}
    </div>
  );
};

export default Rating;
