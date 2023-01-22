const axios = require('axios');

export default async function handler(req, res) {
    try {
    if (req.method === "POST"){

        const config = {
            method: 'get',
            url: `https://api.twitter.com/2/users/by/username/${req.body.username}`,
            headers: {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
        };
        let usernameToID = await axios(config)
        let twitterID = usernameToID.data.data.id

        config.url = `https://api.twitter.com/2/users/${twitterID}/tweets?max_results=100&tweet.fields=created_at,public_metrics`

        let queryResult = await axios(config)
        let userTweets = queryResult.data.data
        let pagination = true

        while (pagination) {
            if (queryResult.data.data.length>90){
            config.url = `https://api.twitter.com/2/users/${twitterID}/tweets?max_results=100&tweet.fields=created_at,public_metrics&pagination_token=`+queryResult.data.meta.next_token;
            queryResult = await axios(config);
            userTweets = userTweets.concat(queryResult.data.data)
            console.log(userTweets.length)
            }

        else {pagination = false;}
        }
        let bonkTweets = []

        for (let i = 0; i<userTweets.length; i++){

            if (userTweets[i].text){
                let tweetTextRaw = userTweets[i].text.split(" ")
                let tweetText = tweetTextRaw.map(tweet => tweet.toLowerCase())
                tweetText.forEach((currentWord) => {
                    if (currentWord.includes("bonk")){
                        bonkTweets.push(userTweets[i])
                    }
                })
            }
            userTweets[i].created_at = Date.parse(userTweets[i].created_at)
        }
        res.end(JSON.stringify(bonkTweets))
    }}

    catch (err) {console.log(err, 'api error')}
}