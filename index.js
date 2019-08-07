const app= require('./app')

app.listen(3000,(err)=>{
    if (err) throw err
    
    console.log("connected to port:3000");
    


})