import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/tutorCards.css'

function TutorsCard (props) {
  
  const tutors = props;
  const starNodes = []

  for (let i = 1; i <= tutors.rating; i++){
    starNodes.push(<FontAwesomeIcon icon={faStar}/>)
  }
  
  return (
    <div className="card">
      <div className='card-visual-info'>
        <img src={tutors.profPic} alt='profilepicture'></img>
        <h1>{tutors.name}</h1>
        <div className='card-stars'>{starNodes}</div>
      </div>
        <div className="card-tutor-info">
        <h2>{tutors.profession}</h2>
        <h3>{tutors.focus}</h3>
        <p>{tutors.description}</p>
      </div>
    </div>
  )
} 

export default TutorsCard

