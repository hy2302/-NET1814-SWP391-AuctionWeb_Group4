import React from 'react'
import PieChart from '../Charts/PieChart'
import LineChart from '../Charts/LineChart'

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
