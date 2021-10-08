import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import StudentCancelTutorship from "./StudentCancelTutorship";
import StudentRateTutorship from "./StudentRateTutorship";

import "../assets/styles/components/StudentProfileTutorships.scss";

function StudentProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: true,
    currentRatingStars: 0,
  });

  console.log("currentRatingStars: ", state.currentRatingStars);

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        tutorships: data,
      }));
    };
    getTutorships();
  }, [id]);

  useEffect(() => {
      console.log('useEffect: ', state.currentRatingStars);
  }, [state.currentRatingStars]);

  const handleClick = async (data, e) => {
    const button = e.target.outerText;
    const mySwal = withReactContent(Swal).mixin({
      customClass: {
        confirmButton: "swal-button green",
        cancelButton: "swal-button red",
      },
      buttonsStyling: false,
    });
    const buttons = {
      Cancel: {
        component: <StudentCancelTutorship />,
        confirm: "Yes, cancel",
        cancel: "No, return",
      },
      Pay: "pay",
      Rate: {
        component: (
          <StudentRateTutorship
            onStarsChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                currentRatingStars: value,
              }))
            }
          />
        ),
        confirm: "Send feedback",
        cancel: "Cancel",
        controller: sendRatingController,
      },
    };
    const action = buttons[button];

    await mySwal
      .fire({
        html: action.component,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: action.confirm,
        cancelButtonText: action.cancel
      })
    //   .then((response) => {
    //     console.log("response: ", response);
    //     console.log("After await: ", state.currentRatingStars);
    //     sendRatingController();
    //   });
    console.log("currentRatingStars despues del await: ", state.currentRatingStars);

    // .then((response) => {
    //     console.log(response)
    //     console.log('result value: ', state.currentRatingStars)
    //     // action.controller(data, response.isConfirmed);
    // })
  };

  const sendRatingController = (data, isConfirmed) => {
    const rating = state.currentRatingStars;
    console.log('dentro de la otra funcion: ', rating);
    // const { tutor } = data;
    // const student = id;
    // console.log(`
    //     RATING: ${rating}
    //     TUTOR: ${tutor}
    //     STUDENT: ${student}
    // `)
    // setState(prevState => ({...prevState, currentRatingStars: 0}))
  };

  return (
    <div className="student__tutorships-container">
      <h1 className="student__tutorships-title">My tutorships</h1>
      {state.loading
        ? "Loading..."
        : state.tutorships.map((tutorship) => {
            const { name, focus, profile_photo, email } = tutorship.tutor_id;
            const { status, _id: id } = tutorship;
            const date = new Date(tutorship.date);
            return (
              <div key={id} className="student__tutorship-container">
                <div className="student__tutorship__image-container">
                  <img
                    src={profile_photo}
                    alt={name}
                    className="student__tutorship__image"
                  />
                </div>
                <div className="student__tutorship__description-container">
                  <h2 className="student__tutorship__description-title">
                    {focus} tutorship with {name}
                  </h2>
                  <p className="student__tutorship__date">
                    Tutorship scheduled for{" "}
                    <strong>{date.toDateString()}</strong> at{" "}
                    <strong>{date.getHours() + ":" + date.getMinutes()}</strong>
                  </p>
                  <div className="student__tutorship__status-and-buttons-container">
                    <div className="student__tutorship__status-container">
                      <span>STATUS: {status}</span>
                    </div>
                    <div className="student__tutorship__buttons-container">
                      {status === "pending" && (
                        <>
                          <button
                            onClick={handleClick}
                            className="student__tutorship__buttons__pay-button"
                          >
                            Pay
                          </button>
                          <button
                            onClick={handleClick}
                            className="student__tutorship__buttons__cancel-button"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {status === "accepted" && (
                        <a
                          href={`mailto:${email}`}
                          className="student__tutorship__buttons__contact-button"
                        >
                          Contact
                        </a>
                      )}
                      {status === "completed" && (
                        <button
                          onClick={(e) =>
                            handleClick({ tutor: tutorship.tutor_id._id }, e)
                          }
                          className="student__tutorship__buttons__rate-button"
                        >
                          Rate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default StudentProfileTutorships;
