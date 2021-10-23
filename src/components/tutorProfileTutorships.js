import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from './Loader';
// import tutorCancelTutorship from './tutorCancelTutorship.js';

import '../assets/styles/components/tutorProfileTutorships.scss';
// import { StaticRouter } from 'react-router';

function TutorProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: false,
    renderSwitch: false,
    getStudents: false,
  });

  const handleClick = async (data, e) => {
    const button = e.target.outerText;
    const mySwal = withReactContent(Swal);
    const buttons = {
      Cancel: {
        component: <tutorCancelTutorship swal={mySwal} tutorshipId={data.tutorshipId} setState={setState} />,
        confirm: 'Yes, cancel',
        cancel: 'No, return',
      },
    };

    const action = buttons[button];

    await mySwal.fire({
      html: action.component,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: true,
        tutorships: data,
      }));
    };

    getTutorships();
  }, [id, state.renderSwitch]);

  return (
    <div className="tutor__tutorships-container">
      {!state.loading ? (
        <Loader />
      ) : (
        state.tutorships.map((tutorship, i) => {
          const { name, focus, email } = tutorship.tutor_id;
          const { status, _id: id } = tutorship;
          const date = new Date(tutorship.date);
          const studentName = tutorship.student_id.name;
          const studentPhoto = tutorship.student_id.profile_photo;

          return (
            <div key={id} className="tutor__tutorship-container">
              <div className="tutor__tutorship__image-container">
                <img src={studentPhoto} alt={name} className="tutor__tutorship__image" />
              </div>
              <div className="tutor__tutorship__description-container">
                <h2 className="tutor__tutorship__description-title">
                  {focus} tutorship with {studentName}
                </h2>
                <p className="tutor__tutorship__date">
                  Tutorship scheduled for <strong>{date.toDateString()}</strong> at{' '}
                  <strong>{date.getUTCHours() + ':' + date.getUTCMinutes()}</strong>
                </p>
                <div className="tutor__tutorship__status-and-buttons-container">
                  <div className="tutor__tutorship__status-container">
                    <span>STATUS: {status}</span>
                  </div>
                  <div className="tutor__tutorship__buttons-container">
                    {status === 'pending' && (
                      <>
                        {/* <button
                          onClick={(e) => handleClick({ tutor: tutorship.tutor_id._id, tutorshipId: id }, e)}
                          className="tutor__tutorship__buttons__cancel-button"
                        >
                          Cancel
                        </button> */}

                      </>
                    )}
                    {status === 'accepted' && (
                      <a href={`mailto:${email}`} className="tutor__tutorship__buttons__contact-button">
                        Contact
                      </a>
                    )}
                    {status === 'completed' && (
                      <button
                        onClick={(e) => handleClick({ tutor: tutorship.tutor_id._id, tutorshipId: id }, e)}
                        className="tutor__tutorship__buttons__rate-button"
                      >
                        Rate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TutorProfileTutorships;
