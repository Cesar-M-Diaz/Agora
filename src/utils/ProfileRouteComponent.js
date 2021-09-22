import { useSelector } from "react-redux";
import StudentProfile from "../pages/StudentProfile";

function ProfileRouteComponent(){
  const isTutor = useSelector(state => state.currentUser.focus)
  if(isTutor) return <StudentProfile />;
  return <StudentProfile />;
}

export default ProfileRouteComponent;