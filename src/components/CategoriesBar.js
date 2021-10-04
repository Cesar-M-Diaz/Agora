import {React} from 'react';
import '../assets/styles/components/CategoriesBar.scss';

function CategoriesBar({ Categories , setFilter}) {
  return (
    <main className="categories__container">
      {Categories.map((e, i) => {
        return (
          <button className="category__button" key={i} onClick={()=>setFilter(e.subject)}>
            {e.subject}
          </button>
        )
      })}
    </main>
  );
}

export { CategoriesBar };
