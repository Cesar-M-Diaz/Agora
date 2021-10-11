import {React, useState, useEffect} from "react"
import SearchResult from '../components/searchResult.js'
import SelectPage from '../components/selectPage.js'
import axios from "../utils/axios"



const SearchPage = (props) => {

  const [Tutors, setTutors] = useState([])
  const [Page, setPage] = useState(1)
  const [Pages, setPages] = useState()

  const subject = props.location.state

  useEffect(() => {
    const search = async() => {
    try{
      const responseTut = await axios.get(`/tutorsearch/${subject}/${Page}`)
      setTutors(responseTut.data.data)
      const count = responseTut.data.count
      setPages(parseInt(count/9))
      
    } catch(error) {
      console.error(error)
    }}
    search()
  },[Page, subject])

  
  return (
    <div className="search-page">
      <SearchResult Tutors={Tutors}/>
      <SelectPage Page={Page} setPage={setPage} Pages={Pages}/>
    </div>
  )
}

export { SearchPage }