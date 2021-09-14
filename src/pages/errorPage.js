import React from "react"
import { Router, Link } from 'react-router-dom'
import '../assets/styles/pages/errorPage.css'
import error from '../assets/images/error.svg'

function errorPage (){
  return (
    <div className='error-page'>
      <div className='error-info'>
        <h1>Oops!</h1>
        <h2>We can't seem to find the page you're looking for</h2>
        <p>Try another url or go back to homepage...</p>
      </div>
      <img src={ error } ></img>
    </div>
  )
}

export { errorPage }