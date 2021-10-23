import TutorsCard from './tutorsCard';
import '../assets/styles/components/SearchResult.scss';

const SearchResult = (Tutors) => {
  return (
    <main className="search__result">
      {Tutors.Tutors.map((element) => (
        <TutorsCard props={element} />
      ))}
    </main>
  );
};

export default SearchResult;
