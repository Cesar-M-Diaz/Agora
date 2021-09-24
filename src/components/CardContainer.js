import {React} from 'react';
import '../assets/styles/components/CardCointainer.scss';
import TutorsCard from './tutorsCard';

function CardContainer({ Tutors }) {
  return (
    <main className="cards__container">
      {Tutors.map((element) => { return  <TutorsCard props={element}/>})}
    </main>
  );
}
export { CardContainer };
  