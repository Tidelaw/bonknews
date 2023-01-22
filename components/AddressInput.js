import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { stringify } from 'postcss';

export default function AddressInput(){
  const [address, setAddress] = useState("");

  async function handleSubmit (event) {
    event.preventDefault();
    let config = {
      "method" : "POST",
      "url" : "/api/addressTweets",
      "body" : JSON.stringify({
        username : address
      })
    }
    try {
    const response = await axios.post("/api/addressTweets", {
        username: address
    });
    console.log(response.data)
    }
    catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <form  onSubmit={handleSubmit} className="flex p-2 space-x-4 items-center justify-center">
        <input 
          type="text" 
          value={address}
          className="rounded-lg h-12 outline-0 p-4 bg-neutral-900 text-white"
          onChange={(e) => setAddress(e.target.value)}
        />
      <input className='p-2 rounded-lg bg-orange cursor-pointer' type="submit" />
    </form>
  )
}