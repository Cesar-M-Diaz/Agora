import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { ReviewsContainer } from '../components/ReviewsContainer';
import '../assets/styles/pages/TutorViewProfile.scss';
import axios from '../utils/axios';

function TutorDetailsPage(props) {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const id = props.location.state;

  useEffect(() => {
    async function tutorDetailsData(id) {
      try {
        const tutorData = await axios.get(`/tutor/${id}`);
        const data = tutorData.data;
        const reviewData = tutorData.data.reviews;
        setTutor(data);
        setReviews(reviewData);
      } catch (err) {
        console.log(err);
      }
    }
    tutorDetailsData(id);
  }, [id]);

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

export default TutorDetailsPage;
