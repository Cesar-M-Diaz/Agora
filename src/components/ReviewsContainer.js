import React from 'react';
import { tutor } from './mock/tutor';
import { Review } from './Review';

function ReviewsContainer({ reviews }) {
  const tutor_id = 'tyh';
  const filteredReviews = reviews.filter(
    (reviews) => reviews.tutorId === tutor_id,
  );

  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {filteredReviews.map((props) => {
          return (
            <Review
              id={props.tutorId}
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
