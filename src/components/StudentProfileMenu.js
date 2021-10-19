import { useEffect, useState } from "react";
import history from '../utils/history'

function StudentProfileMenu({ page }) {
    const [selected, setSelected] = useState('Edit Profile')

    const handleSelect = e => {
        const value = e.target.id || e.target.value;
        setSelected(value);
        history.push(`/profile/${value}`)
    }

    useEffect(() => {
        setSelected(page);
    }, [page])

    return (
        <>
            <select onChange={handleSelect} className="student-profile-menu-select sm">
                <option className="student-profile-menu-option" selected={selected === "edit"} value="edit">Edit Profile</option>
                <option className="student-profile-menu-option" selected={selected === "payment"} value="payment">Payment methods</option>
                <option className="student-profile-menu-option" selected={selected === "tutorships"} value="tutorships">My tutorships</option>
            </select>
            <section className="student-profile-menu md">
                <ul className="student-profile-menu-list">
                    <div to="edit"><li onClick={handleSelect} id="edit" className={`student-profile-menu-item ${selected === 'edit' && 'selected'}`}>Edit Profile</li></div>
                    <div to="payment"><li onClick={handleSelect} id="payment" className={`student-profile-menu-item ${selected === 'payment' && 'selected'}`}>Payment methods</li></div>
                    <div to="tutorships"><li onClick={handleSelect} id="tutorships" className={`student-profile-menu-item ${selected === 'tutorships' && 'selected'}`}>My tutorships</li></div>
                </ul>
            </section>
        </>
    )
}

export default StudentProfileMenu;
