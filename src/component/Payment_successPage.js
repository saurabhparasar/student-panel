import React from 'react'
import icon from './checked.png'
const Payment_successPage = () => {
    return (
        <div>

            <center>
                <div><br /><br /><br /><br />
                    <img src={icon} width='100px' />
                </div><br /><br />
                <h1 style={{ color: 'green' }}>Your Payment was Successful</h1><br /><br /><br />
                <a href='https://zinedu.com/'>www.zinedu.com</a>
            </center>
        </div>
    )
}

export default Payment_successPage
