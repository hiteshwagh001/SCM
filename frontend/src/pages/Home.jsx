import React from 'react'
import { useSelector } from 'react-redux'
import Helmet from '../components/Helmet/Helmet'

function Home() {
    return (
        <Helmet title="Home">
            <div className={`p-10  `}>Home</div>

        </Helmet>
    )
}

export default Home