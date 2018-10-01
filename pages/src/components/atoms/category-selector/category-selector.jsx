import React from 'react'

class CategorySelector extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
        const categories = [];
        return (
            <section className="category-selector-section">
                <div className="container">
                    <div className="category-selector-wrapper">
                        <p>TODO CategorySelector:</p>
                        <ul className="category-nav">
                            { categories.map((cat, i) => (
                                <li className={cat === 'todo' ? 'active': ''}>
                                    <a href>{cat}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        );
    };
}

export default CategorySelector