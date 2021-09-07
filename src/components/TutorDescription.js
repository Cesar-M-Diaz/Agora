import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TutorDescription({ tutor }) {
  const starNodes = [];

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }

  return (
    <div>
      <img src="" alt="" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus natus
        autem expedita esse illo, dolore earum eum, recusandae suscipit ut
        maiores incidunt quis officiis officia temporibus tenetur dolorum, ex
        magnam.
      </p>
      <div className="profile-stars">{starNodes}</div>
    </div>
  );
}

export { TutorDescription };
