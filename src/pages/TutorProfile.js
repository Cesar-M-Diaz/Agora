import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { ReviewsContainer } from '../components/ReviewsContainer';
import '../assets/styles/pages/TutorViewProfile.scss';
import axios from '../utils/axios';

function TutorProfile(props) {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const id = '614a1d924db3efc62ac1f530';

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
    <>
      <div className="tutor-profile__body">
        <TutorPageHead tutor={tutor} />
        <TutorDescription tutor={tutor} />
        <ReviewsContainer reviews={reviews} />
      </div>
    </>
  );
}

export { TutorProfile };
