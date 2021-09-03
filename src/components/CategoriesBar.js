import React from 'react';
import '../assets/styles/components/CategoriesBar.css';
import { categories } from './mock/categories';

function CategoriesBar({ onClick }) {
  return (
    <main className="categories__container">
      {/* get the first n elements of the categories mock data */}
      {categories.slice(0, 8).map(({ subject, _id }) => {
        return (
          <button key={_id} className="category__button" onClick={onClick}>
            {subject}
          </button>
        );
      })}
    </main>
  );
}

export { CategoriesBar };
