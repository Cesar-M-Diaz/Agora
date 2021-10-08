import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentProfileMenu({ page }) {
    const [selected, setSelected] = useState('Edit Profile')

    const handleSelect = e => {
        setSelected(e.target.id);
    }

    useEffect(() => {
        setSelected(page);
    }, [page])

    return (
        <>
            <select onChange={handleSelect} className="student-profile-menu-select sm">
                <option className="student-profile-menu-option" value="Edit Profile">Edit Profile</option>
                <option className="student-profile-menu-option" value="Payment methods">Payment methods</option>
                <option className="student-profile-menu-option" value="My tutorships">My tutorships</option>
            </select>
            <section className="student-profile-menu md">
                <ul className="student-profile-menu-list">
                    <Link to="edit"><li onClick={handleSelect} id="edit" className={`student-profile-menu-item ${selected === 'edit' && 'selected'}`}>Edit Profile</li></Link>
                    <Link to="payment"><li onClick={handleSelect} id="payment" className={`student-profile-menu-item ${selected === 'payment' && 'selected'}`}>Payment methods</li></Link>
                    <Link to="tutorships"><li onClick={handleSelect} id="tutorships" className={`student-profile-menu-item ${selected === 'tutorships' && 'selected'}`}>My tutorships</li></Link>
                </ul>
            </section>
        </>
    )
}

export default StudentProfileMenu;
