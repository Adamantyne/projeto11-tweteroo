import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up",(req,res)=>{
    const user = req.body;
    users.push(user);
    res.send("OK");
});

app.post("/tweets",(req,res)=>{
    let tweet = req.body;
    users.forEach(user=>{
        if(user.username === tweet.username){
            const avatar = user.avatar;
            tweet={...tweet, avatar:avatar};
        }
    });
    tweets.push(tweet);
    res.send("OK");
});

app.get("/tweets",(req,res)=>{
    const currentTweets = [];
    for(let i=tweets.length-1; i>=0; i--){
        currentTweets.push(tweets[i]);
        if(i <= tweets.length-11){break;}
    }
    res.send(currentTweets);
});

app.listen(5000,()=>{
    console.log("servidor ok");
});