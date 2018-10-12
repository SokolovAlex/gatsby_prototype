import React from 'react';

const CategorySelector = () => {
  const categories = [];
  return (
    <section className="category-selector-section">
      <div className="container">
        <div className="category-selector-wrapper">
          <p>TODO CategorySelector:</p>
          <ul className="category-nav">
            {categories.map((cat) => (
              <li className={cat === 'todo' ? 'active' : ''}>
                <a href>{cat}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
