import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/tutorCards.scss';
import history from '../utils/history';

function TutorsCard(tutor) {
  const { rating, profile_photo, name, profession, focus, description, _id } =
    tutor.props;
  const starNodes = [];

  for (let i = 1; i <= rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }

  function handleClick() {
    history.push({
      pathname: '/tutor',
      state: _id,
    });
  }

  return (
    <div className="card" key={_id} onClick={handleClick}>
      <div className="card-visual-info">
        <img src={profile_photo} alt="profilepicture"></img>
        <h1>{name}</h1>
        <div className="card-stars">{starNodes}</div>
      </div>
      <div className="card-tutor-info">
        <h2>{profession}</h2>
        <h3>{focus}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TutorsCard;
