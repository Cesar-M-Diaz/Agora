import { React } from 'react';
import '../assets/styles/components/CategoriesBar.scss';

function CategoriesBar({ Categories, setFilter }) {
  return (
    <main className="categories__container">
      <select
        placeholder="categories"
        name="categories"
        className="categories__select-focus"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option hidden>Choose an area</option>
        {Categories.map((category) => (
          <option key={category._id} value={category.subject}>
            {category.subject}
          </option>
        ))}
      </select>
      {Categories.map((e, i) => (
        <button className="category__button" key={i} onClick={() => setFilter(e.subject)}>
          {e.subject}
        </button>
      ))}
    </main>
  );
}

export { CategoriesBar };
