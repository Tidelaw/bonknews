import { supabase } from '../../supabaseClient';

const tweetCount = async (req, res) => {

    let data = await supabase.from('baseTweets').select()

    let cumulativeStats = []

    if (data.data[0]){
        data.data.reverse()        
        let endHour = Math.ceil((data.data[data.data.length-1].created_at-data.data[0].created_at)/3600000)
        console.log(endHour)
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

      
      await res.end(JSON.stringify(cumulativeStats))
}

export default tweetCount;

