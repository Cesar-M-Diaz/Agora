import React from 'react';

function TutorDescription() {
  const starNodes = [];

  for (let i = 1; i <= tutors.rating; i++) {
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

export default TutorDescription;
