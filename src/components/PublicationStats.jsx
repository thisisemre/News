import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import '../styles/PublicationStats.css'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

function PublicationStats({ news }) {
    const [hourlyStats, setHourlyStats] = useState(Array(24).fill(0))
    const [activeHour, setActiveHour] = useState(null)

    useEffect(() => {
        const stats = Array(24).fill(0)
        news.forEach(article => {
            const hour = new Date(article.publishedAt).getHours()
            stats[hour]++
        })
        setHourlyStats(stats)
    }, [news])

    const chartData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: 'Articles Published',
                data: hourlyStats,
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3b82f6',
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#3b82f6',
                pointHoverBorderColor: '#fff'
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                titleColor: '#64ffda',
                bodyColor: '#fff',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    title: (items) => {
                        return `Time: ${items[0].label}`
                    },
                    label: (item) => {
                        return `Articles: ${item.raw}`
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    },
                    callback: (value, index) => {
                        // Show every 3 hours
                        return index % 3 === 0 ? `${value}` : ''
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(226, 232, 240, 0.5)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    },
                    stepSize: 1
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        onHover: (event, elements) => {
            if (elements && elements.length) {
                setActiveHour(elements[0].index)
            } else {
                setActiveHour(null)
            }
        }
    }

    return (
        <div className="publication-stats">
            <h3>Publication Timeline</h3>
            <div className="stats-info">
                <div className="total-articles">
                    <span className="count">{news.length}</span>
                    <span className="label">Total Articles</span>
                </div>
                <div className="peak-hour">
                    <span className="count">
                        {hourlyStats.indexOf(Math.max(...hourlyStats))}:00
                    </span>
                    <span className="label">Peak Hour</span>
                </div>
            </div>
            <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className="time-distribution">
                <h4>Time Distribution</h4>
                <div className="hour-blocks">
                    {hourlyStats.map((count, hour) => (
                        <div
                            key={hour}
                            className={`hour-block ${activeHour === hour ? 'active' : ''}`}
                            style={{
                                backgroundColor: `rgba(59, 130, 246, ${count / Math.max(...hourlyStats)})`
                            }}
                            title={`${hour}:00 - ${count} articles`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublicationStats 