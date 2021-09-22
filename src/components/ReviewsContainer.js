import React from 'react';
import { Review } from './Review';

function ReviewsContainer({ reviews }) {
  return (
    <div className="tutor-profile__reviews-container">
      <h1 className="tutor-profile__title">Reviews</h1>
      <div>
        {reviews.map((props) => {
          return <Review id={props._id} comment={props.comment} rating={props.rating} />;
        })}
      </div>
    </div>
  );
}

export { ReviewsContainer };
