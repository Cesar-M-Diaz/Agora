import React, { useState } from 'react';
import { CategoriesBar } from '../components/CategoriesBar';
import '../assets/styles/components/TutorsContainer.css';
import { CardContainer } from './CardContainer';

function TutorsContainer() {
  /* change the category filter word */
  const [filterKeyword, setFilterKeyword] = useState('math');

  /* get the category name of the clicked button to pass as the filter word */
  const onClick = (e) => {
    setFilterKeyword(e.target.innerText);
  };

  return (
    <>
      <section className="tutors__container">
        <p className="tutors__subtitle">
          From Math to Philosophy, take a look at some of the most common
          subjects asked by thousands of students
        </p>
        <div className="categories__container">
          <CategoriesBar onClick={onClick} />
        </div>
        <div className="tutors__title-container">
          <p>Meet some of our best tutors</p>
        </div>
        <CardContainer categoryName={filterKeyword} />
      </section>
    </>
  );
}

export { TutorsContainer };
