import React from "react";
import '../assets/styles/components/SearchPage.scss';

const SelectPage =  ({Page, setPage, Pages}) => {

  const prevPage = (e) => {
    e.preventDefault()  
    setPage((Page) => (Page === 1 ? (Page = 1) : Page - 1));
    window.scrollTo(0, 0)
  }

  const nextPage = (e) => {
    e.preventDefault()  
    setPage((Page) => (Page === Pages ? (Page = 11) : Page + 1));
    window.scrollTo(0, 0)
  }

  return (
    <div className="change__page_container">
    {Page > 1? <button className="change__page_button" onClick={prevPage}>Prev</button>:null}
      <p className="change__page_p">Page {Page} / {Pages}</p>
    {Page < Pages? <button className="change__page_button" onClick={nextPage}>Next</button>:null}
    </div>
  )
}

export default SelectPage;
