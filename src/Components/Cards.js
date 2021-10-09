import React from 'react'
import './../CSS/Cards.css'
export function Cards({name, role , email, id}) {
    return (
        <div>
            
            <span className="field">{id}</span>
            <span className="field">{name}</span>
            <span className="field">{email}</span>
            <span className="field">{role}</span>
        </div>
    )
}

