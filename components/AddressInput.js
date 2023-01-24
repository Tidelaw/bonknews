import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { stringify } from 'postcss';
import IndivScatterChart from './/IndivScatter';
import IndivCumulativeChart from './/IndivCumu';
import { cumulativeChartFormat } from '../utils/cumuFormat';

export default function AddressInput() {
  const [address, setAddress] = useState("");
  const [addressTweets, setAddressTweets] = useState([]);
  const [cumuData, setCumuData] = useState([]);


  async function handleSubmit(event) {
    event.preventDefault();

    if (event) {
    
    }
    
    setAddressTweets([])
    setCumuData([])

    ///^[a-zA-Z0-9_]{1,15}$/
    
    const response = await axios.post("/api/addressTweets", {username: address});

    try {
      setAddressTweets(response.data)
      let sortedCumuData = cumulativeChartFormat(response.data);
      setCumuData(sortedCumuData.cumulativeStats);
    }
    catch (err) {
    }
  }

  return ( //grid grid-cols-2 grid-rows-2 
    <div className='w-screen 
    
    h-screen flex-col justify-center items-center xl:p-16 p-4 pt-8 space-y-4'>

      <form onSubmit={handleSubmit} className="flex row-start-1 col-span-2 p-2 space-x-4 items-center justify-center">
        <input
          type="text"
          value={address}
          className="rounded-lg h-12 outline-0 p-4 bg-neutral-900 text-white"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input className='p-2 rounded-lg bg-orange font-semibold text-neutral-800 duration-200 hover:bg-light-orange cursor-pointer' type="submit" />
        <MUITooltip placement='top'
          title={"Input twitter username without @, e.g. @username --> username "}>
          <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
        </MUITooltip>
      </form>

      <div className='flex  w-full h-min justify-center items-center shadow shadow-none xl:p-4 gap-y-4 bg-neutral-900 rounded-lg'>
        <IndivScatterChart tweets={addressTweets}></IndivScatterChart>
      </div>
      <div className='flex  w-full h-min justify-center items-center shadow shadow-none xl:p-4 gap-y-4 bg-neutral-900 rounded-lg'>
        <IndivCumulativeChart data={cumuData}></IndivCumulativeChart>
      </div>

    </div>
  )
}