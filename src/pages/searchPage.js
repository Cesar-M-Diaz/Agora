import {React, useState, useEffect} from "react"
import SearchResult from '../components/searchResult.js'
import SelectPage from '../components/selectPage.js'
import axios from "../utils/axios"
import history from "../utils/history.js"

const SearchPage = (props) => {

  const params = new URLSearchParams(document.location.search.substring(1));
  const query = params.get("query"); // is the string "Jonathan"
  const page = parseInt(params.get("page")) || 1; 
  const [Tutors, setTutors] = useState([])
  const [Page, setPage] = useState(page)
  const [Pages, setPages] = useState(page)

  useEffect(() => {
    const search = async() => {
    try{
      
      const responseTut = await axios.get(`/tutorsearch/${query}/${Page}`)
      setTutors(responseTut.data.data)
      const count = responseTut.data.count
      setPages(parseInt(count/9))
      history.push({
        pathname: `/search/?query=${query}&page=${Page}`
      })
      
      
    } catch(error) {
      console.error(error)
    }}
    search()
  },[Page, query])

 
    
  return (
    <div className="search-page">
      <SearchResult Tutors={Tutors}/>
      <SelectPage Page={page} setPage={setPage}  Pages={Pages}/>
    </div>
  )
}

export { SearchPage }