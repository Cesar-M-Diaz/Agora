import { useState } from "react";

function StudentProfileMenu() {
    const [selected, setSelected] = useState('Edit Profile')

    const handleSelect = e => {
        setSelected(e.target.outerText);
    }

    return (
        <>
            <select onChange={handleSelect} className="student-profile-menu-select sm">
                <option className="student-profile-menu-option" value="Edit Profile">Edit Profile</option>
                <option className="student-profile-menu-option" value="Payment methods">Payment methods</option>
                <option className="student-profile-menu-option" value="My tutorships">My tutorships</option>
            </select>
            <section className="student-profile-menu md">
                <ul className="student-profile-menu-list">
                    <li onClick={handleSelect} className={`student-profile-menu-item ${selected === 'Edit Profile' && 'selected'}`}>Edit Profile</li>
                    <li onClick={handleSelect} className={`student-profile-menu-item ${selected === 'Payment methods' && 'selected'}`}>Payment methods</li>
                    <li onClick={handleSelect} className={`student-profile-menu-item ${selected === 'My tutorships' && 'selected'}`}>My tutorships</li>
                </ul>
            </section>
        </>
    )
}

export default StudentProfileMenu;
