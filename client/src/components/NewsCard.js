import React from 'react'

export const NewsCard = (props) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="logo512.png" alt="" />
                
            </div>
            <div className="card-content">
                <span className="card-title">{props.title}</span>
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
                {/* <a h href="#">This is a link</a> */}
            </div>
        </div>
    )
}