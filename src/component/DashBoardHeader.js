import React from 'react'

const DashBoardHeader = () => {
    return (
        <div>
            <div className='dashboard_box' style={{ width: '100%', padding: '20px' }}>
                <a href='/support' target="_blank" style={{ backgroundColor: 'red', padding: '10px', color: 'white' }}>Dashboard</a>
            </div>
        </div>
    )
}

export default DashBoardHeader
