import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function StudentCancelTutorship() {
    return (
        <div className="StudentCancelTutorship-container">
            <div className="swal2-icon swal2-danger swal2-icon-show" style={{display: 'flex'}}><div className="swal2-icon-content"><FontAwesomeIcon icon={faTrash} /></div></div>
            <h1>Are you sure you want to cancel this tutorship?</h1>
            <h2>This action cannot be undone</h2>
        </div>
    )
}

export default StudentCancelTutorship
