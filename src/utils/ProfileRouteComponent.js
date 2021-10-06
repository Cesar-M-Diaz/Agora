import { useSelector } from 'react-redux';
import StudentProfile from '../pages/StudentProfile';
import TutorProfile from '../pages/TutorProfilePage';

function ProfileRouteComponent() {
  const role = useSelector((state) => state.currentUser.type);
  if (role === 'tutor') return <TutorProfile />;
  return <StudentProfile />;
}

export default ProfileRouteComponent;
