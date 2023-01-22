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

export default function Home({rawTweet, tweetCount, cumulativeData}) {
  let [keywords, setKeywords] = useState()

  useEffect(() => {
    async function main() {
      let keywords_data
      keywords_data = await axios.get('/api/keywords').then(data=> keywords_data = data.data)
      setKeywords(keywords_data)
    }
    main()
  }, [])
  let filteredLikes = [];
  for (let i = 0; i<rawTweet.length; i++){
    if (rawTweet[i].public_metrics.like_count>29){
      filteredLikes.push(rawTweet[i])
    }
  }

  

  return (
    <div className="flex container flex-col min-w-full bg-neutral-800 justify-center font-sans">
        
      <div className='flex w-full h-[62rem] justify-center'>
        <AddressInput></AddressInput>
      </div>
      
      <div className="flex h-[85rem] grid grid-cols-3 grid-rows-3 w-full text-2xl justify-center items-center p-16 gap-8">
        


        <div className='flex self-start w-full col-span-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 items-center xl:items-start'>
        <TweetScatterChart tweets={filteredLikes}></TweetScatterChart>
        </div>

        <div className="flex w-full col-span-2 row-start-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center" >
          <CumulativeChart data={cumulativeData}></CumulativeChart>
        </div>

        <TweetCountChart volume={tweetCount}></TweetCountChart>
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
  return {
    props: {
     rawTweet: data.data,
     tweetCount: volume_data.data,
     cumulativeData: cumulativeStats.cumulativeStats
    },
  }
}