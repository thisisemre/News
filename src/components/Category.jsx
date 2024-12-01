import { useState } from 'react'
import '../styles/Category.css'

function Category({ onCategorySelect }) {
    const categories = [
        'general',
        'business',
        'technology',
        'sports',
        'entertainment',
        'health',
        'science',
        
    ]

    const [selectedCategory, setSelectedCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedCategory) {
            onCategorySelect(selectedCategory)
        }
    }

    return (
        <div className="category-selection">
            <h2>Select a News Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={!selectedCategory}
                >
                    Show News
                </button>
            </form>
        </div>
    )
}

export default Category

