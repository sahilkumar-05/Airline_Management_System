const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());




app.get('/', async (req, res) => {
    try{
        res.json('Welcome to AIRLINE-RESERVATION-SYSTEM')
    } catch(error) {
        res.status(500).json({Error: error.message})
    }
})


app.post('/airline', async (req, res) => {
    const { airline_id, name, country } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO airlines (airline_id, name, country) VALUES ($1, $2, $3) RETURNING *',
            [airline_id, name, country]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.post('/airports', async (req, res) => {
    const { airport_id, name, city,country } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO airports (airport_id, name, city, country) VALUES ($1, $2, $3, $4) RETURNING *',
            [airport_id, name, city, country]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


app.get('/airline',async(req,res)=>{
    try{
        const result=await pool.query("Select * from airlines")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})


app.get('/aircrafts',async(req,res)=>{
    try{
        const result=await pool.query("Select * from aircrafts")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})


app.get('/airports',async(req,res)=>{
    try{
        const result=await pool.query("Select * from airports")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.get('/bookings',async(req,res)=>{
    try{
        const result=await pool.query("Select * from bookings")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.get('/flight_schedules',async(req,res)=>{
    try{
        const result=await pool.query("Select * from flight_schedules")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})




app.get('/flight_staff_assignment',async(req,res)=>{
    try{
        const result=await pool.query("Select * from flight_staff_assignment")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.get('/flights',async(req,res)=>{
    try{
        const result=await pool.query("Select * from flights")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})


app.get('/passengers',async(req,res)=>{
    try{
        const result=await pool.query("Select * from passengers")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})



app.get('/payments',async(req,res)=>{
    try{
        const result=await pool.query("Select * from payments")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})




app.get('/roles',async(req,res)=>{
    try{
        const result=await pool.query("Select * from roles")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.get('/staff',async(req,res)=>{
    try{
        const result=await pool.query("Select * from staff")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.get('/tickets',async(req,res)=>{
    try{
        const result=await pool.query("Select * from tickets")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})





/*ending Code*/
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Connection Successfully on port = ${port}`)
})