import React from 'react'
import PieChart from '../charts/PieChart'
import LineChart from '../charts/LineChart'

const ChartView = () => {
    return (
        <>
            <main className="main-content">
                <h1>Dashboard</h1>
                <div className="charts">
                    <PieChart />
                    <LineChart />
                </div>
            </main>
        </>
    )
}

export default ChartView
