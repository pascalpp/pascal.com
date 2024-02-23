import './rating_stars.less';

import { Star } from 'react-feather';
import React    from 'react';


export default function RatingStars({ rating }) {
  const percentage = (rating / 5) * 100;
  const style      = { width: `${percentage}%` };

  return (
    <div className="rating-stars">
      <div className="cropped" style={style}>
        <FiveStars/>
      </div>
      <FiveStars/>
    </div>
  );
}


function FiveStars() {
  return (
    <div className="five-stars">
      <Star/>
      <Star/>
      <Star/>
      <Star/>
      <Star/>
    </div>
  );
}
