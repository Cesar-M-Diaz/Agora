import React from 'react';
import '../assets/styles/components/CardContainer.css';
import { tutor } from './mock/tutor';
import TutorsCard from './tutorsCard';

function CardContainer({ categoryName }) {
  const filteredTutorArr = tutor
    .filter((tutor) => tutor.focus === categoryName)
    .slice(0, 4);

  return (
    <main className="cards__container">
      {filteredTutorArr.map(
        ({
          focus,
          profilePhoto,
          rating,
          name,
          description,
          profession,
          _id,
        }) => {
          return (
            <TutorsCard
              key={_id}
              focus={focus}
              profPic={profilePhoto}
              rating={rating}
              name={name}
              description={description}
              profession={profession}
            />
          );
        },
      )}
    </main>
  );
}

export { CardContainer };
