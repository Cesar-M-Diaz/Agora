import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
// import { tutor as tutors } from '../components/mock/tutor';
import { ReviewsContainer } from '../components/ReviewsContainer';
// import { reviews } from '../components/mock/reviews';
import '../assets/styles/pages/TutorProfile.css';
import axios from '../utils/axios';

function TutorProfile(props) {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const id = '613fc9e12204249f386c9e4b';

  useEffect(() => {
    axios
      .get(`/tutor/${id}`)
      .then((response) => {
        const data = response.data;
        setTutor(data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`/tutor/reviews/${id}`)
      .then((response) => {
        const reviews = response.data;
        setReviews(reviews);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="tutor-profile__body">
      <TutorPageHead tutor={tutor} />
      <TutorDescription tutor={tutor} />
      <ReviewsContainer reviews={reviews} />
    </div>
  );
}

export { TutorProfile };
