var axios = require('axios');
import { supabase } from '../../supabaseClient';

const tweetCount = async (req, res) => {

    let countData = [] 

    var config = {
        method: 'get',
        url: 'https://api.twitter.com/2/tweets/counts/recent?query=@bonk_inu',
        headers: {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
    };
      
      await axios(config)
      .then(function (response) {countData=response.data.data;})

      const { data, error } = await supabase
      .from('stats')
      .upsert(countData)
      
      await res.end(JSON.stringify(countData))
}

export default tweetCount;