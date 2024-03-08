const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));



const port = 3000;
var data = []
app.get("/", (req, res) => {
    res.render("index.ejs")


})

app.get("/create", (req, res) => {
    res.render("create.ejs")
})
app.post("/create", (req, res) => {
    var name = req.body["title"]
    var content = req.body["content"]
    var id = req.body["id"]
    var author = req.body["author"]
    
    if (name && content) {
        var newData = { id, name, author, content }
        data.push(newData)


    }
    res.render("index.ejs")


   
})
app.get("/allPosts", (req, res) => {
    res.render("allPosts.ejs", { data })
   
})
app.get("/delete", (req, res) => {


    res.render("deletePost.ejs", {data})
})

app.post("/delete", (req, res) => {
   if(data){
    var deleteId = req.body["delete"]
    if(deleteId){
        data = data.filter(item =>
            item.id !== deleteId
        )
    }
   }
res.render("index.ejs")
})
app.get("/update", (req, res) => {
    res.render("updatePost.ejs", {data})
})

app.post("/update", (req, res) => {
    const updateId = req.body["updateId"]
    
    res.render("updatePopup.ejs", {updateId})
  
})

app.get("/updatepopup", (req, res) => {
    res.render("updatePopup.ejs")
})
app.post("/updatepopup", (req, res)  => {
   const updatedId = req.body["updatedId"]
   const updatedTitle = req.body["updatedTitle"]
   const updatedAuthor = req.body["updatedAuthor"]
   const updatedContent = req.body["updatedContent"]
   for(var i=0; i<data.length; i++){
    if(data[i].id===updatedId){
        data[i].name = updatedTitle;
        data[i].author = updatedAuthor;
        data[i].content = updatedContent;

    }
   }
   res.render("allPosts.ejs", { data })
   

})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})