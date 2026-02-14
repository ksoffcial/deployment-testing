const express = require("express");
const main = require("./db");
const Food = require("./food");
const cors = require('cors')
const app = express();
require('dotenv').config()

// app.use(cors({
//     origin: 'https://localhost:5173',
//     credentials: true
// }))

app.use(express.json());


app.post("/addFood", async (req, res) => {
    try {
        const foodData = req.body;
        if (!foodData) {
            console.log("food data is not avaible")
            return res.status(500).send("food data is not avaible")
        }

        await Food.create(foodData);

        res.send("food Data added sucessfully")

    }
    catch (err) {
        console.log(err)
        res.status(500).status("not found data ")
    }
});

app.get("/getfood", async (req, res) => {
    try {
        const foodItem = await Food.find().select("name price image category description");
        if (!foodItem) {
            console.log("some occured ")
            return res.status(500).send("error occured ")
        }

        res.status(200).send(foodItem)
    }
    catch (err) {
        res.send("some error occured ")
    }
})



const initilaizeconnection = async () => {
    try {
        await main()
        app.listen(process.env.PORT_NUM, () => {
            console.log("Port is listening....")
        })
    }
    catch (err) {
        console.log("some error occured...", err.message)
    }
}

initilaizeconnection();