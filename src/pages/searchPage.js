import {React, useState, useEffect} from "react"
import SearchResult from '../components/searchResult.js'
import SelectPage from '../components/selectPage.js'
import axios from "../utils/axios"



const SearchPage = (props) => {

  const [Tutors, setTutors] = useState([])
  const [Page, setPage] = useState(1)
  const [Subject, setSubject] = useState('Math')
  const [Pages, setPages] = useState()
  console.log(props.location.state)

  // setSubject(props.location.state)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try{
      const responseTut = await axios.get(`/tutorsearch/${props.location.state}/${Page}`)
      setTutors(responseTut.data.data)
      const count = responseTut.data.count
      setPages(parseInt(count/9))
      
    } catch(error) {
      console.log(Page)
    }
  },[Page, props.location.stateps])

  
  return (
    <div className="search-page">
      <SearchResult Tutors={Tutors}/>
      <SelectPage Page={Page} setPage={setPage} Pages={Pages}/>
    </div>
  )
}

export { SearchPage }