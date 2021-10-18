
import StudentProfileMenu from '../components/StudentProfileMenu';
import StudentProfileEdit from '../components/StudentProfileEdit';
import StudentProfileTutorships from '../components/StudentProfileTutorships';

import '../assets/styles/pages/StudentProfile.scss';
import history from '../utils/history';

function StudentProfile({ props }){
    const currentPage = props.match.params.section;
    const pages = {
        "edit": <StudentProfileEdit />,
        "tutorships": <StudentProfileTutorships />,
    }

    return(
        <div className="student-profile-container">
            <section className="student-profile__menu-container">
                <StudentProfileMenu page={currentPage} />
            </section>
            <main className="student-profile-main">
                {pages[currentPage] || history.push('/404')}
            </main>
        </div>
    )
}

export default StudentProfile;