import {React} from 'react';
import '../assets/styles/components/CategoriesBar.scss';

function CategoriesBar({ Categories , setFilter}) {
  return (
    <main className="categories__container">
      {Categories.map((e) => {
        return (
          <button key={e._id} className="category__button" onClick={()=>setFilter(e.subject)}>
            {e.subject}
          </button>
        )
      })}
    </main>
  );
}

export { CategoriesBar };
