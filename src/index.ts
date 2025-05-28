import express from 'express'
import itemRoutes from './routes/itemRoutes'
import { errorHandler } from './middleware/errorHandler'


const app=express();
const PORT=3000;

app.use(express.json())
app.use("/api",itemRoutes)
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.send("Hello!")
})


app.listen(PORT,()=>{
    console.log(`Hello I'm listening on http://localhost:${PORT}`)
})