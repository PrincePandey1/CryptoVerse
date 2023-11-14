import React from 'react'
import { useEffect, useState } from 'react'
import {BaseUrl} from './baseUrl'
import axios from 'axios'
import Header from './Header'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import './Style/Coin.css'


const Coins = () => {

  const[loading, setLoading] = useState(true)
  const[coins,setCoins] = useState([])
  //Managing the state of Currency
  const[currency, setCurrency] = useState('INR')
  //Creating state for Search Operation
  const[search, setSearch] = useState('')

  //Setting Currency Symbol
  const currencySymbol = currency === 'INR' ? '₹' : '$'

  useEffect(()=>{
    const getCoinsData=async()=>{
     const {data} =await axios.get(`${BaseUrl}/coins/markets?vs_currency=${currency}`)
     console.log(data)
     //Passing fetched data to useState 
     setCoins(data)
     setLoading(false)
    }
    getCoinsData()
 },[currency])

  return (
    
      <>
      {
        loading ? <Loading/>:<>
        <Header />
        {/* Creating Serch Bar  */}
        <div className="search-bar">
          <input type="text" placeholder='Search Your Coins' 
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          />
        </div>
        <div className='btns'>
          {/* Managing currency state using onClick Event */}
          <button onClick={()=>{setCurrency('INR')}}>INR</button>
          <button onClick={()=>{setCurrency('USD')}}>USD</button>
        </div>
        {
          //Adding Filter 
          //If data is Empty String return whole data
          // else if data contains the input String by user, 
          //then return those Data
          coins.filter((data)=>{
          if(data === ''){
            return data
          }else if(data.name.toLowerCase().includes(search.toLowerCase())){
             return data
          }
          }).map((coindata, index)=>{
            return(
              <CoinCard coinData={coindata} id={coindata.id} coinIndex={index}  currencySymbol={currencySymbol}/>
             )
          })
        }
        </>
      }
      </>
    
  )
}

const CoinCard=({coinData, coinIndex, currencySymbol, id})=>{
  const profit = coinData.price_change_percentage_24h > 0
  return(
          // Passing the id of Coins, So whenever we click particular 
          // coin so it will render to the parcticular icon page with help of its id.
          <Link to={`/coins/${id}`} style={{color:"white", textDecoration:'none'}}>
             <div key={coinIndex} className='ex-cards'>
              <div className="image">
                <img height={"80px"} src={coinData.image} alt="Etherium Coin"/>
              </div>
              <div className="name">
                {coinData.name}
              </div>
              <div className="price">
                {/* .toFixed: After number how many decimal places we want to show
                Zero means initially there would be no decimal plcaes */}
               {currencySymbol} {coinData.current_price.toFixed(0)}
              </div>
              {/* Changing the w.r.t price, 
              if profit is positive then color is green, 
              otherwise color is red*/}
              <div style={profit? {color:"green"}:{color:"red"}}className="rank">
                {/* If profit would be positive then add + before the valur or return the samw value */}
                {profit ? '+' + coinData.price_change_percentage_24h.toFixed(2):coinData.price_change_percentage_24h.toFixed(2)}
              </div>
             </div>
          </Link>
      )
    }

export default Coins