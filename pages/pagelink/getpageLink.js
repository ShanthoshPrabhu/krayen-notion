import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'

const ParentDefault = () => {
        
  const  [deadData, setDeadData] = useState([])
      const notionData= async () => {
          const apiData = await axios.get("https://notion-api.splitbee.io/v1/page/975fa599cff24ee4b16f4a8a93e18683")
      //  .then(response=>setData(response))
      // .catch(error=>console.log(error))
          setDeadData(apiData.data)
          console.log(deadData)
      // Object.keys(deadData).map((dataa)=>(
      //   console.log(dataa)
      // ))
      // let hey
      // hey = Object.keys(deadData)
      // console.log(hey)
      
      // const hii = hey.flatMap((zz)=>{
      //   const damta = deadData[zz]
      //   const content = damta.value.properties.title[0]
      //   console.log(damta)
      //   console.log(content)
      //   console.log(damta.value)
      }
      
   useEffect(() =>{
          notionData()
              // eslint-disable-next-line
   }, [])  
return(
  <div> getpageLink
        <button onClick={notionData} className='flex font-medium'>get</button>
        <NotionRenderer />
     </div>
     ///pagelink/getpageLink.js
)
}


export default ParentDefault