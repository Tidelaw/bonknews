import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
    var commonWords = ["the","of","i","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
    let data = await supabase.from('baseTweets').select()
        let words = [];
        for (let i = 0; i<data.data.length;i++){
            if (data.data[i].text){
                let tweetTextRaw = data.data[i].text.split(" ")
                let tweetText = tweetTextRaw.map(tweet => tweet.toLowerCase())
                tweetText.forEach((currentWord) => {
                    if (isNaN(currentWord)&&(!commonWords.includes(currentWord))){
                        if (!words.some(element=>element.word === currentWord)){
                            words.push({'word':currentWord, 'count':1, 'name':currentWord})
                        }
                        else {
                            const indexOfWord = words.findIndex((element)=>element.word === currentWord);
                            words[indexOfWord].count+=1
                        }
                    }
                })
            }
        }
        words.sort((a,b)=>b.count-a.count)
        words = words.slice(0,100) // can change, top 100 keywords atm.
    res.end(JSON.stringify(words))
}