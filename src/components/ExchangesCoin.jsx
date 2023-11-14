import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { BaseUrl } from './baseUrl'
import Loading from './Loading'
import './Style/Exchanges.css'
import OurModel from './OurModel'

const ExchangesCoin = () => {

  //useState for Loader
  const[loading, setLoading] = useState(true)

  //Storing API Data in State such that we can use it to dispaly
  const[exchanges,setExchanges] = useState([])

  //====== Fetching Data Using uesEffect() hook
  //i)Whenever a first time component rendered, a useEffect is called.
  //ii)And inside useEffect whatever function is there is also called
  //iii)Here we want where 'ExchangesCoin' component is rendered, 
  //the useEffect is Called and make get API Request.

  useEffect(()=>{
     const getExchangesData=async()=>{
      const {data} =await axios.get(`${BaseUrl}/exchanges`)
      console.log(data)
      //Passing fetched data to useState 
      setExchanges(data)
      setLoading(false)
     }
     getExchangesData()
  },[])

  return (
    <>
      {/* Handling Loader using condition */}
      {
      loading ? <Loading/> : <>
        <Header/>
         {/* Render the 3D Model */}
        <OurModel />
        <div>
           {exchanges.map((item, index)=>{
            return (
              <div key={index} className='ex-cards'>
            <div className="image">
              <img height={"80px"} src={item.image} alt="Etherium Coin"/>
            </div>
            <div className="name">
              {item.name}
            </div>
            <div className="price">
              {/* .toFixed: After number how many decimal places we want to show
              Zero means initially there would be no decimal plcaes */}
              {item.trade_volume_24h_btc.toFixed(0)}
            </div>
            <div className="rank">
              {item.trust_score_rank}
            </div>
           </div>
            )
           })}
        </div>
      </>}

    </>
    
  )
}

export default ExchangesCoin



//Promise: Means Whether the Request is Accepted or Rejected
//async: Our Function will work Asynchronically and "Wait"
// until whole data should be fetched 