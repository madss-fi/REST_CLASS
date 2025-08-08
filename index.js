const { log } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const{v4:uuidv4} = require('uuid');
uuidv4();
const methodOverride = require('method-override');



app.use(express.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"wanderlust_aya",
        content:"Just came back from a solo trip to Spiti Valley. Nature heals in silence 🌄✨"
    },
    {
        id:uuidv4(),
        username:"madihaQureshi",
        content:"Finally completed my first RESTful API's project! 🚀 Feeling proud and motivated to build more."
    },
    {
        id: uuidv4(),
        username:"nocturnal.naina",
        content:"Midnight thoughts hit differently when you’re chasing dreams instead of people. 💭🌙"
    },
    {
        id: uuidv4(),
        username:"grow.with.me",
        content:"Learning to code one step at a time. It’s okay to fail, just don’t forget to smile along the way 😊💻"
    }
]; 

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;

    if (!username || !content || username.trim() === "" || content.trim() === "") {
        return res.status(400).send("Username and content are required.");
    }

    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    
});


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post})
});

app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newContent
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=> {
    let {id}=req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id != p.id);
    res.redirect("/posts");
})



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
    
});