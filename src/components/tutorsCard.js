import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/tutorCards.scss';

function TutorsCard(tutor) {
  const starNodes = [];

  for (let i = 1; i <= tutor.props.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }


  return (
    <div className="card">
      <div className="card-visual-info">
        <img src={tutor.props.profile_photo} alt="profilepicture"></img>
        <h1>{tutor.props.name}</h1>
        <div className="card-stars">{starNodes}</div>
      </div>
      <div className="card-tutor-info">
        <h2>{tutor.props.profession}</h2>
        <h3>{tutor.props.focus}</h3>
        <p>{tutor.props.description}</p>
      </div>
    </div>
  );
}

export default TutorsCard;
