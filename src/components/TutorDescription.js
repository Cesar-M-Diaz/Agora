import React from 'react';

function TutorDescription({ tutor }) {
  return (
    <div>
      <p>{tutor.description}</p>
    </div>
  );
}

export { TutorDescription };
