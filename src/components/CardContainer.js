import React from 'react';
import '../assets/styles/components/CardContainer.css';
import { tutorsData as tutors } from './MockTutorsData';

function CardContainer({ categoryName }) {
  const filteredTutorArr = tutors
    .filter((tutor) => tutor.category === categoryName)
    .slice(0, 4);

  return (
    <main className="cards__container">
      {filteredTutorArr.map(({ category, _id, name }) => {
        return (
          <div key={_id} className="cards__card-mock">
            {category}
          </div>
        );
      })}
    </main>
  );
}

export { CardContainer };
