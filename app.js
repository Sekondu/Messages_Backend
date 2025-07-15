const express=require("express");
const app=express();
const path=require("node:path");
const PORT=3000;
const messages=[
{
text:"Hello",
user:"Tony",
added:new Date(),
},
{
text:"Hi",
user:"Stark",
added:new Date(),
}
]

app.use(express.urlencoded({extended:true}));

app.set("views",path.join(__dirname,"./views"));
app.set("view engine","ejs");

app.get("/",(req,res) => {res.render("index",{messages:messages})});
app.get("/new",(req,res) => {res.render("message_form")});
app.get("/view_message",(req,res) => {
    let data;
    try{
        data=JSON.parse(req.query.mydata)
    }
    catch(err)
    {
        console.log(err);
    }
    res.render("view_message",{data});
})

app.post("/new",(req,res) => {
    messages.push({text:req.body.message,user:req.body.username,added:new Date()});
    res.redirect("/");
});

app.listen(PORT,(req,res) => {console.log("Server working at 3000")});