import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function StudentRateTutorship({ onStarsChange }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const setStars = (index) => {
        setRating(index);
        onStarsChange(index);
    }

    return (
        <div className="StudentRateTutorship-container">
            <div className="swal2-icon swal2-warning swal2-icon-show" style={{display: 'flex'}}><div className="swal2-icon-content"><FontAwesomeIcon icon={faStar} /></div></div>
            <h1>Rate this tutorship</h1>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setStars(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                    );
                })}
            </div>
        </div>
    )
}

export default StudentRateTutorship
