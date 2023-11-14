import React from 'react'
import { useEffect, useState} from 'react'
import Loader from './Loading'
import axios from 'axios'
import coinImage from '../coin.png'
import { BaseUrl } from "./baseUrl";
import { useParams } from 'react-router-dom'
import './Style/CoinDetail.css'
import {BiSolidUpArrow, BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from "./CoinChart"
// useParams hooks is Used to get the id of items
const CoinDetails = () => {

  const[coin, setCoin] = useState([])
  const[loading, setLoading] = useState(true)
  const[currency, setCurrency] = useState('inr')

  //Setting Currency Symbol
  const currencySymbol = currency === 'inr' ? '₹' : '$'

  //Params used to get the ID of the Object
  const {id} = useParams()
  
  //?: Known as optional channing
  // So it ignore the Error, if data is not Fetched Successfully
  // And Try to Access the data the Server
  const profit = coin.market_data?.price_change_percentage_24h > 0
  useEffect(()=>{
       const getCoin=async()=>{
      try {
        const {data} = await axios.get(`${BaseUrl}/coins/${id}`)
        console.log(data)
        setCoin(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    
    }
    getCoin()
  },[id])

  return (
    <>
    {
      loading ? <Loader/> : <>
      
      {/* We can use Map here to pass the data, but we directly access the data from the data */}
         <div className="coin-detail" style={{display:'flex', justifyContent:'space-evenly'}}>
          <div className="coin-info">
          <div className='btn'>
          {/* Managing currency state using onClick Event */}
          <button onClick={()=>{setCurrency('inr')}}>INR</button>
          <button onClick={()=>{setCurrency('usd')}}>USD</button>
          </div>
            <div className="time">
              {coin.last_updated}
            </div>
            <div className="coin-image">
              <img height={'150px'} src={coin.image.large} alt="Coin-Image" />
            </div>
            <div className="coin-name">
              {coin.name}
            </div>
            <div className="coin-price">
             {currencySymbol} {coin.market_data.current_price[currency]} 
            </div>
            <div className="coin-profit">
            {profit ? <BiSolidUpArrow color='green'/>  : <BiSolidDownArrow color='red'/>  }
            {coin.market_data.price_change_percentage_24h} %
            </div>
            <div className="market-rank">
             <IoPulseOutline color="orange"/> #{coin.market_cap_rank}
            </div>
            <div className="coin-desc">
              {/* Split Function split the Strings in Subtring by given condition 
              and stores those substring as Elements in Array 
              Note: Here we split the String whenever the '.' dot arrives,
               and accesses 0th position subtring */}
               <p>{coin.description.en.split('.')[0]}</p>
            </div>
            </div>
          <div>
             <CoinChart currency={currency}/>
          </div>
         
         </div>
      </>
    }
    </>
  )
}

export default CoinDetails