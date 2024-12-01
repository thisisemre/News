import { useState, useEffect } from 'react'
import '../styles/RealTimeNews.css'

function RealTimeNews({ category }) {
    const [realtimeNews, setRealtimeNews] = useState([])
    const [lastUpdate, setLastUpdate] = useState(null)
    const [subscribedCategories, setSubscribedCategories] = useState(() => {
        // Get subscribed categories from localStorage
        const saved = localStorage.getItem('subscribedCategories')
        return saved ? JSON.parse(saved) : []
    })

    // Check if current category is subscribed
    const isSubscribed = subscribedCategories.includes(category)

    // Save subscribed categories to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('subscribedCategories', JSON.stringify(subscribedCategories))
    }, [subscribedCategories])

    const handleSubscribe = async () => {
        if ('Notification' in window) {
            try {
                if (isSubscribed) {
                    // Unsubscribe from this category
                    setSubscribedCategories(prev => 
                        prev.filter(cat => cat !== category)
                    )
                    return
                }

                const permission = await Notification.requestPermission()
                console.log('Permission:', permission)

                if (permission === 'granted') {
                    // Subscribe to this category
                    setSubscribedCategories(prev => [...prev, category])
                    
                    // Show confirmation notification
                    new Notification('Category Subscribed!', {
                        body: `You'll receive updates for ${category} news`,
                        icon: '📰'
                    })
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error)
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const API_KEY = import.meta.env.VITE_NEWS_API_KEY
                const response = await fetch(
                    `/api/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
                )
                const data = await response.json()
                
                if (data.status === 'ok') {
                    const newArticles = data.articles.filter(article => {
                        const publishedAt = new Date(article.publishedAt)
                        return lastUpdate ? publishedAt > lastUpdate : true
                    })

                    if (newArticles.length > 0) {
                        setRealtimeNews(prev => [...newArticles, ...prev].slice(0, 3))
                        setLastUpdate(new Date())
                        
                        // Send notification only if subscribed to this category
                        if (isSubscribed && Notification.permission === 'granted') {
                            new Notification(`New ${category} Article!`, {
                                body: newArticles[0].title,
                                icon: '📰',
                                tag: `news-update-${category}`
                            })
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching real-time news:', error)
            }
        }, 30000)

        return () => clearInterval(interval)
    }, [category, lastUpdate, isSubscribed])

    return (
        <div className="realtime-news">
            <div className="realtime-header">
                <div className="header-left">
                    <h3>Real-Time Updates</h3>
                    <span className="pulse"></span>
                </div>
                <button 
                    onClick={handleSubscribe}
                    className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                >
                    {isSubscribed ? `🔔 Subscribed to ${category}` : `Subscribe to ${category}`}
                </button>
            </div>
            <div className="realtime-list">
                {realtimeNews.map((article, index) => (
                    <div key={index} className="realtime-item">
                        <span className="time">
                            {new Date(article.publishedAt).toLocaleTimeString()}
                        </span>
                        <p>{article.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RealTimeNews 