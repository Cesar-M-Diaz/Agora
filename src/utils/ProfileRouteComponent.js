import { useSelector } from "react-redux";
import StudentProfile from "../pages/StudentProfile";

function ProfileRouteComponent(){
  const role = useSelector(state => state.currentUser.type)
  if(role === "tutor") return <StudentProfile />; // We must change this to return the TutorProfile page once it's created
  return <StudentProfile />;
}

export default ProfileRouteComponent;