function StudentProfileMenu() {
    return (
        <select className="student-profile-menu-select">
            <option className="student-profile-menu-option" value="profile">Profile</option>
            <option className="student-profile-menu-option" value="payment-methods">Payment methods</option>
            <option className="student-profile-menu-option" value="my-tutorships">My tutorships</option>
        </select>
    )
}

export default StudentProfileMenu;
