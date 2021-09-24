import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { ReviewsContainer } from '../components/ReviewsContainer';
import '../assets/styles/pages/TutorViewProfile.scss';
import axios from '../utils/axios';

function TutorDetailsPage(props) {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const id = '614a1d924db3efc62ac1f530';

  async function tutorDetailsData() {
    try {
      const tutorData = await axios.get(`/tutor/${id}`);
      const data = tutorData.data;
      setTutor(data);
      const reviewsData = await axios.get(`/tutor/reviews/${id}`);
      const reviews = reviewsData.data;
      setReviews(reviews);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    tutorDetailsData();
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

export default TutorDetailsPage;
