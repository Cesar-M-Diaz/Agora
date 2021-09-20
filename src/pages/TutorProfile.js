import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { tutor as tutors } from '../components/mock/tutor';
import { ReviewsContainer } from '../components/ReviewsContainer';
import { reviews } from '../components/mock/reviews';
import '../assets/styles/pages/TutorProfile.css';
import axios from 'axios';

function TutorProfile(props) {
  const [tutor, setTutor] = useState({});

  useEffect(() => {
    axios.get('/tutor/:id', { params: props.id }).then((response) => {
      const data = response.data.tutorData;
      setTutor(data);
    });
  }, [tutor]);

  return (
    <div className="tutor-profile__body">
      <TutorPageHead tutor={tutor} id={tutor._id} />
      <TutorDescription tutor={tutor} id={tutor._id} />
      <ReviewsContainer reviews={reviews} />
    </div>
  );
}

export { TutorProfile };
