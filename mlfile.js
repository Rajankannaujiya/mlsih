
import express from "express";
import cors from "cors";
import axios from 'axios'


const app = express();
app.use(cors({
  origin: "*",
  credentials:true
 }
  ));


  app.use(express.json({ limit: '10mb' })); // 10MB limit for JSON
app.use(express.urlencoded({ extended: false, limit: '10mb' })); // 10MB limit for URL-encoded



app.post( "/ml", async(req,res)=>{
    console.log("I reached here")
    try {
        const {walletAddress} = req.body;
        console.log(walletAddress)

    if(!walletAddress){
        return res.status(400).send("wallet address is necessary");
    }

    // http://localhost:5500/analyze/?data=0xdadB0d80178819F2319190D340ce9A924f783711

    const response = await axios.post(`http://10.10.209.138:5500/analyze/?data=${walletAddress}`);
    if(response){
        return res.status(200).json(response.data);
    }
    } catch (error) {
     console.log("this is the error", error.message)   
     return res.status(400).send("internal server error")
    }
} )

const port =5500;
app.listen(port,()=>{    
    console.log(`server is listening on the http://localhost:${port}`);
})