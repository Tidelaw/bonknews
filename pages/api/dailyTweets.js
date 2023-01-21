const axios = require('axios');
import { supabase } from '../../supabaseClient';

const collectionTweets = async (req, res) => {
        let allTweets = []
        
        const config = {
            method: 'get',
            url: `https://api.twitter.com/2/tweets/search/recent?query=@bonk_inu&max_results=100&tweet.fields=public_metrics,created_at`,
            headers: {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
        };
        
        let queryResult = await axios(config)
        let pagination = true;

        while (pagination) {
            if ((Date.parse(queryResult.data.data[0].created_at)/1000)>((Date.now()/1000)-86400) && queryResult.data.data.length>98){
                config.url = `https://api.twitter.com/2/tweets/search/recent?query=@bonk_inu&max_results=100`+'&next_token='+queryResult.data.meta.next_token+'&tweet.fields=public_metrics,created_at';
                queryResult = await axios(config);
                allTweets = allTweets.concat(queryResult.data.data)

                console.log(allTweets.length)
            }
            else {pagination = false;}
        }
        
        let filtered = [];

        for (let i = 0; i<allTweets.length; i++){
            if (allTweets[i].public_metrics.like_count>2){
                filtered.push(allTweets[i])
                filtered[filtered.length-1].created_at = Date.parse(allTweets[i].created_at)
            }
        }

        const { data, error } = await supabase
        .from('baseTweets')
        .upsert(filtered)
        console.log(data, error)

    console.log("All collections logged.")
    await res.end(JSON.stringify("Raw length =", allTweets.length, "Filtered length =", filtered.length))
}

export default collectionTweets;