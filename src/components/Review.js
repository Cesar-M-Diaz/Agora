import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Review({ comment, rating }) {
  const starNodes = [];

  for (let i = 1; i <= rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }

  return (
    <div>
      <div>{starNodes}</div>
      <p className="tutor-profile__text">{comment}</p>
    </div>
  );
}

export { Review };
