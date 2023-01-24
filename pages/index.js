import 'tailwindcss/tailwind.css'
import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from "react";
import TweetScatterChart from '../components/TweetScatter';
import TweetCountChart from '../components/TweetCount';
import CumulativeChart from '../components/CumulativeChart';
import AddressInput from '../components/AddressInput';
import KeywordTreemap from '../components/KeywordTreemap';
import KeyWords from '../components/KeyWords';
import axios from 'axios';
import {cumulativeChartFormat} from '../utils/cumuFormat';
import { Analytics } from '@vercel/analytics/react';

export default function Home({rawTweet, tweetCount, cumulativeData, bonkPrices}) {
  let [keywords, setKeywords] = useState()
  let [countRange] = useState()

  useEffect(() => {
    async function main() {
      let keywords_data
      keywords_data = await axios.get('/api/keywords').then(data=> keywords_data = data.data)
      setKeywords(keywords_data)
    }
    main()
  }, [])

  // for (let i = 0; i<bonkPrices.length; i++){
    
  // }

  let filteredLikes = [];
  for (let i = 0; i<rawTweet.length; i++){
    if (rawTweet[i].public_metrics.like_count>29){
      filteredLikes.push(rawTweet[i])
    }
  }

  

  return (
    <div className="flex container flex-col min-w-full bg-neutral-800 justify-center font-sans">
      <Analytics></Analytics>
      <div className='flex justify-center font-bold text-4xl text-white mt-4 text-6xl text-orange'>Individual</div>
      <div className='flex w-full h-[62rem] justify-center'>
        <AddressInput></AddressInput>
      </div>
      
      <h1 className='flex mt-8 justify-center font-bold text-6xl text-orange'>All</h1>
      <div className="flex flex-col xl:h-[85rem] xl:grid xl:grid-cols-3 xl:grid-rows-3 w-full text-2xl justify-center items-center p-2 xl:p-16 gap-8">
        <div className='flex self-start w-full col-span-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 items-center xl:items-start'>
        <TweetScatterChart tweets={filteredLikes}></TweetScatterChart>
        </div>

        <div className="flex w-full col-span-2 row-start-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center" >
          <CumulativeChart data={cumulativeData}></CumulativeChart>
        </div>

        <div className='flex self-end w-full col-span-2 row-start-3 rounded-lg shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center'>
          <TweetCountChart bonk={countRange} volume={tweetCount}></TweetCountChart>
        </div>

        <KeyWords keywords={keywords}></KeyWords>
        {/* <KeywordTreemap keywords={keywords}></KeywordTreemap> */}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let data = await supabase.from('baseTweets').select()
  let volume_data = await supabase.from('tweetCount').select()
  let cumulativeStats = cumulativeChartFormat(data.data)

  let config = {
    'method':'get',
    'url':'https://node-api.flipsidecrypto.com/api/v2/queries/68fc92ca-7f32-4dac-8947-b8ec89ad9852/data/latest',
    'headers':{}
  }
  let bonkPrice = await axios(config);
  console.log('bonk', bonkPrice.data[0].RECORDED_HOUR.slice(0,10))
  console.log('scatter:', new Date(data.data[0].created_at).toISOString().slice(0,10),
   'tweetCount', volume_data.data[0].start.slice(0,10),
    'cumu', new Date(cumulativeStats.cumulativeStats[0].hour).toISOString().slice(0,10))

  return {
    props: {
     rawTweet: data.data,
     tweetCount: volume_data.data,
     cumulativeData: cumulativeStats.cumulativeStats,
     bonkPrices: bonkPrice.data
    },
  }
}