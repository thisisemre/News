import { useState, useEffect } from 'react'
import RealTimeNews from './RealTimeNews'
import PublicationStats from './PublicationStats'
import '../styles/News.css'

function News({ category, onBack }) {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sources, setSources] = useState([])
    const [selectedSource, setSelectedSource] = useState('all')

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setError(null)
            try {
                const API_KEY = import.meta.env.VITE_NEWS_API_KEY

                const url = `/api/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`

                const response = await fetch(url)
                
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
                }
                
                const data = await response.json()
                console.log('API Response:', data)
                
                if (data.status === 'ok') {
                    const validArticles = data.articles.filter(article => {
                        return (
                            article &&
                            article.title &&
                            article.title !== '[Removed]' &&
                            article.title !== 'Removed'
                        )
                    })
                    setNews(validArticles)
                } else {
                    throw new Error(data.message || 'Failed to fetch news')
                }
            } catch (err) {
                console.error('Error details:', err)
                setError(`Failed to load news: ${err.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [category])

    if (loading) return <div className="loading">Loading news...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="news-section">
            <div className="news-header">
                <div className="header-content">
                    <h2 className="category-title">
                        {category.charAt(0).toUpperCase() + category.slice(1)} News
                    </h2>
                    {sources.length > 0 && (
                        <select 
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className="source-select"
                        >
                            <option value="all">All Sources</option>
                            {sources.map(source => (
                                <option key={source.id} value={source.id}>
                                    {source.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <button onClick={onBack} className="back-btn">
                    ← Back to Categories
                </button>
            </div>

            <div className="news-layout">
                <div className="main-content">
                    <RealTimeNews category={category} selectedSource={selectedSource} />
                    <div className="news-container">
                        {news.length > 0 ? (
                            news.map((article, index) => (
                                <article key={index} className="news-card">
                                    <div className="news-image-container">
                                        {article.urlToImage ? (
                                            <img 
                                                src={article.urlToImage} 
                                                alt={article.title}
                                                className="news-image"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/news-placeholder.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="news-image-placeholder">
                                                <span>📰</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="news-content">
                                        <h3>{article.title}</h3>
                                        <p className="news-description">
                                            {article.description || 'No description available'}
                                        </p>
                                        <div className="news-meta">
                                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                            <span className="source">{article.source.name}</span>
                                            <a 
                                                href={article.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="read-more"
                                            >
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="no-news">
                                No articles found for this selection.
                            </div>
                        )}
                    </div>
                </div>
                <aside className="stats-sidebar">
                    <PublicationStats news={news} />
                </aside>
            </div>
        </div>
    )
}

export default News
