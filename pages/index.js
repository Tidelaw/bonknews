import 'tailwindcss/tailwind.css'
import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from "react";
import TweetScatterChart from '../components/TweetScatter';
import TweetCountChart from '../components/TweetCount';
import CumulativeChart from '../components/CumulativeChart';
import KeywordTreemap from '../components/KeywordTreemap';
import KeyWords from '../components/KeyWords';
import axios from 'axios';

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
    <div className="flex container min-w-full h-[90rem] bg-neutral-800 justify-center items-center flex-col font-sans">
      <main className="flex h-full grid grid-cols-3 grid-rows-3 w-full text-2xl justify-center items-center p-16 gap-8">
        <TweetScatterChart tweets={filteredLikes}></TweetScatterChart>
        <CumulativeChart data={cumulativeData}></CumulativeChart>
        <TweetCountChart volume={tweetCount}></TweetCountChart>
        <KeyWords keywords={keywords}></KeyWords>
        {/* <KeywordTreemap keywords={keywords}></KeywordTreemap> */}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  let data = await supabase.from('baseTweets').select()
  let volume_data = await supabase.from('tweetCount').select()

  let cumulativeStats = []

    if (data.data[0]){
        data.data.reverse()        
        let endHour = Math.ceil((data.data[data.data.length-1].created_at-data.data[0].created_at)/3600000)
        for (let hour = 1; hour<endHour; hour++){
            if (data.data[0]){
              cumulativeStats.push({"hour":(data.data[0].created_at)+(hour*3600000), "likes":0, "indivlikes":0, "replies":0, "retweets":0, "impressions":0, "num_contributed":0}) 
            }
            for (let x = 0; x<data.data.length; x++){
                if (data.data[x].created_at<data.data[0].created_at+(hour*3600000)){
                    cumulativeStats[hour-1].likes += data.data[x].public_metrics.like_count;
                    cumulativeStats[hour-1].replies += data.data[x].public_metrics.reply_count;
                    cumulativeStats[hour-1].retweets += data.data[x].public_metrics.retweet_count;
                    cumulativeStats[hour-1].impressions += data.data[x].public_metrics.impression_count;
                    cumulativeStats[hour-1].num_contributed += 1
    
                }
            }
            if (cumulativeStats[hour-2]){
              cumulativeStats[hour-1].indivlikes = cumulativeStats[hour-1].likes-cumulativeStats[hour-2].likes}
        }}

  return {
    props: {
     rawTweet: data.data,
     tweetCount: volume_data.data,
     cumulativeData: cumulativeStats
    },
  }
}