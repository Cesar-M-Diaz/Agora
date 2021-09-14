import React from "react"
import { Router, Link } from 'react-router-dom'
import '../assets/styles/pages/errorPage.css'

function errorPage (){
  return (
    <div className='error-page'>
      <div className='error-info'>
        <h1>Oops!</h1>
        <h2>We can't seem to find the page you're looking for</h2>
        <p>Try another url or go back to homepage...</p>
      </div>
      <img src='https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603dd7695326d84ea29942b9_Frame-161.png' ></img>
    </div>
  )
}

export { errorPage }