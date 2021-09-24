import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CategoriesBar } from '../components/CategoriesBar';
import '../assets/styles/components/TutorsContainer.scss';
import { CardContainer } from './CardContainer';

function TutorsContainer({title, subtitle}) {
  const [filter, setFilter] = useState('Math');
  const [Categories, setCategories] = useState([])
  const [Tutors, setTutors] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try{
      const responseCat = await axios.get('http://localhost:3001/categories')
      const categories = responseCat.data.categories
      setCategories(categories)
      const responseTut = await axios.get(`http://localhost:3001/tutors/${filter}`)
      const tutors = responseTut.data.tutors
      setTutors(tutors)
    } catch(error) {
      console.error(error)
    }
  },[filter])

  console.log('filter', filter, Tutors)

  return (
    <>
      <section className="tutors__container">
        <p className="tutors__subtitle">
          {subtitle || <>From Math to Philosophy, take a look at some of the most common
          subjects asked by thousands of students</>}
        </p>
        <div className="categories__container">
          <CategoriesBar  Categories={Categories} setFilter={setFilter} />
        </div>
        <div className="tutors__title-container">
          <p>{title}</p>
        </div>
        <CardContainer Tutors={Tutors}/>
      </section>
    </>
  );

}
export { TutorsContainer };
