import { useState } from 'react'
import News from './components/News'
import Category from './components/Category'
import './styles/App.css'

function App() {
  // State to track which category is selected (null means no category selected)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Function to handle going back to category selection
  const handleBack = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="app">
      <header>
        {/* Title is clickable and returns to home */}
        <h1 onClick={handleBack} className="app-title">
          📰 News
          <span className="subtitle">Latest Updates</span>
        </h1>
      </header>
      
      <main>
        {/* Conditional rendering: show either Category selection or News based on if category is selected */}
        {!selectedCategory ? (
          <Category onCategorySelect={setSelectedCategory} />
        ) : (
          <News 
            category={selectedCategory} 
            onBack={handleBack}
          />
        )}
      </main>
      <footer>
        <p>© 2024 News App</p>
      </footer>
    </div>
  )
}

export default App
