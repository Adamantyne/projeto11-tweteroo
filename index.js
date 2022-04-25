import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up",(req,res)=>{
    const {avatar,username} = req.body;
    const user = {
        username:username,
        avatar:avatar
    };
    if(checkingData(user.username, user.avatar)){
        res.status(400).send("Todos os campos são obrigatórios!");
    }else{
        users.push(user);
        res.send("OK");
    }
});

app.post("/tweets",(req,res)=>{
    const username = req.headers.user;
    const {tweet} = req.body;
    let currentTweet ={
        username:username,
        tweet:tweet
    };
    if(checkingData(currentTweet.username, currentTweet.tweet)){
        res.status(400).send("Todos os campos são obrigatórios!");
    }else{
        tweets.push(settingAvatar(currentTweet));
        res.status(201).send("OK");
    }
});

function settingAvatar(currentTweet){
    users.forEach(user=>{
        if(user.username === currentTweet.username){
            const avatar = user.avatar;
            currentTweet={...currentTweet, avatar:avatar};
        }
    });
    return currentTweet;
}
function checkingData(username, infos){
    if(username.length===0 || infos.length===0){
        return true;
    }
    else return false;
}

app.get("/tweets",(req,res)=>{
    const currentTweets = [];
    const {page} = req.query;
    if(page<=0){
        res.status(400).send("Todos os campos são obrigatórios!");
    }else{
        const pageValue = (tweets.length-1)-((page-1)*10);
        for(let i=pageValue; i>=0; i--){
            currentTweets.push(tweets[i]);
            if(i<=pageValue-9){break;}
        }
        res.send(currentTweets);
    }
});
app.get("/tweets/:username",(req,res)=>{
    const {username} = req.params;
    const userTweets = getUserTweets(username);
    if(userTweets.length===0){
        res.status(400).send("Usuário não encontrado");
    }else{
        res.send(userTweets);
    }
});

function getUserTweets(username){
    return tweets.filter(tweet=>{
        if(username === tweet.username){
            return true;
        }
        else return false;
    });
}
app.listen(5000,()=>{
    console.log("servidor ok");
});