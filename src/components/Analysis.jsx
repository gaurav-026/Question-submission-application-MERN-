import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Analysis = () => {

    const { fetchedData } = useContext(AppContext);
    if (!fetchedData) {
        return <p>No submission found</p>;
    }
    else {
        return (
            <div>
                <br />
                <br />
                <h3>Here is your response of your submitted answers:</h3>
                <div>
                    {Object.keys(fetchedData).map((key) => (
                        <div key={key} className='analysisCard'>
                            <span>Question {key}:</span> {Array.isArray(fetchedData[key]) ? fetchedData[key].join(', ') : fetchedData[key]}
                        </div>
                    ))}
                </div>
            </div>
        )
    }


}

export default Analysis
