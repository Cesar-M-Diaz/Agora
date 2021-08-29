import React from 'react'
import '../assets/styles/components/CategoriesBar.css'

function CategoriesBar() {
    return (
        <div className="CBContainer">
            <button className="Category">Math</button>
            <button className="Category">Biology</button>
            <button className="Category">Computer science</button>
            <button className="Category">Chemistry</button>
            <button className="Category">Philosophy</button>
            <button className="Category">Art</button>
            <button className="Category">Design</button>
            <button className="Category">Engineering</button>
        </div>
    )
}

export default CategoriesBar
