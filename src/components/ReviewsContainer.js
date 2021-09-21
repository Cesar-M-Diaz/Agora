import React from 'react';
import { Review } from './Review';

function ReviewsContainer({ reviews }) {
  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {reviews.map((props) => {
          return (
            <Review
              id={props._id}
              comment={props.comment}
              rating={props.rating}
            />
          );
        })}
      </div>
    </div>
  );
}

export { ReviewsContainer };
