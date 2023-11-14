import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {BaseUrl} from './baseUrl'
import {useParams} from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from './Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({currency}) => {

    const[chartData, setchartData] = useState([])
    const {id} = useParams()
    const[days, setDays] = useState(1)

    const CoinChartData=async()=>{
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setchartData(data.prices)
       // console.log(data.prices)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      CoinChartData()
    },[currency, id, days])

    //Whatever we want to show in our chart we will access under myData
    const myData={
      //Accessing data from chartData
      //So we are getting data for 365days, 
      //and each day contains array in which 
      //0th Postion Contains Date and 1st Position contains time
      labels: chartData.map((value)=>{
        //Getting date from the value object
        //Our date is at 0th Position 
        const date = new Date(value[0])
        //  console.log(date)

        // .getHours() converts dates in hour
        //After 12, it should give 1,2,3 that's why subtracted -12, 
        //otherwise it would give 13,14, etc
        //Working
        //If date > 12 then, then subtract date with -12 and converts date into minutes (hh:mm)
        //If time < 12, then return the simple time in AM
        const time = date.getHours() > 12
        ? `${date.getHours() -12} : ${date.getMinutes()} PM` 
        : `${date.getHours()} : ${date.getMinutes()} AM`
        return days===1 ? time: date.toLocaleDateString()
      }),
      //DataSet for Price
      datasets:[
        {
          label: `Price in Past Days ${days} in ${currency}`,
          data: chartData.map((value)=>value[1]),
          borderColor: 'orange',
          borderWidth: '3'
        }
      ]
    }

    //Adding jsx/Logic, if chart is not availbale show loader, else show The Chart
    return (
      <>
      {
        chartData.length === 0 ?(<Loading/>) : (
          <div>
         <Line data={myData} options={{
          elements:{        
            //To remove the points from chart           
            point:{
              radius: 1,
            }
          }
         }} style={{marginTop:"5rem", width:'60rem'}}/> 

      <div className='btn' style={{marginTop:"20px"}}>
          {/* Managing currency state using onClick Event */}
          <button onClick={()=>{setDays(1)}}>24 hour</button>
          <button onClick={()=>{setDays(30)}}>1 Month</button>
          <button onClick={()=>{setDays(364)}}>1 Year</button>
          </div>
      </div> 
        )
      }
      </>
    )
}

export default CoinChart

//In this Project npm installed
// i)axios
// ii)react-icons
// iii)react-router-dom
// iv)chart.js (popular Library for making chart in Reactjs)
//npm install --save chart.js react-chartjs-2
//react three fiber(For 3D Model)
//npm i @react-three/fiber
//npm three js(npm i three)
//npm react three drei(npm i @react-three/drei)
