import axios from 'axios'
import React from 'react'

async function getData(pageId) {
 console.log('xx')
    const data=await axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`)
    // console.log(data.data)

  return (
    data
  )
}

export default getData