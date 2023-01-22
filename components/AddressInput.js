import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { stringify } from 'postcss';
import IndivScatterChart from './/IndivScatter';
import IndivCumulativeChart from './/IndivCumu';
import {cumulativeChartFormat} from '../utils/cumuFormat';

export default function AddressInput(){
  const [address, setAddress] = useState("");
  const [addressTweets, setAddressTweets] = useState([]);
  const [cumuData, setCumuData] = useState([]);


  async function handleSubmit (event) {
    event.preventDefault();

    const response = await axios.post("/api/addressTweets", {
        username: address
    });
    
    try {
      setAddressTweets(response.data)
      console.log(addressTweets)
      let sortedCumuData = cumulativeChartFormat(addressTweets);
      console.log(sortedCumuData, '2')
      setCumuData(sortedCumuData.cumulativeStats);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-screen grid grid-cols-2 grid-rows-2 h-full flex-col justify-center items-center p-8 gap-8'>

      <form onSubmit={handleSubmit} className="flex row-start-1 col-span-2 p-2 space-x-4 items-center justify-center">
          <input 
            type="text" 
            value={address}
            className="rounded-lg h-12 outline-0 p-4 bg-neutral-900 text-white"
            onChange={(e) => setAddress(e.target.value)}
          />
        <input className='p-2 rounded-lg bg-orange cursor-pointer' type="submit" />
      </form>

    <div className='flex row-start-2 w-full h-full justify-center items-center shadow shadow-none p-4 gap-y-4 bg-neutral-900 rounded-lg'>
      <IndivScatterChart tweets={addressTweets}></IndivScatterChart>
    </div>
    <div className='flex row-start-2 col-start-2 w-full h-full justify-center items-center shadow shadow-none p-4 gap-y-4 bg-neutral-900 rounded-lg'>
      <IndivCumulativeChart data={cumuData}></IndivCumulativeChart>
    </div>

    </div>
  )
}