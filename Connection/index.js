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

app.get('/airline',async(req,res)=>{
    try{
        const result=await pool.query("Select * from airlines")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.post('/aircrafts', async (req, res) => {
    const { model, manufacturer, capacity, registration_number, airline_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO aircrafts (model, manufacturer, capacity, registration_number, airline_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [model, manufacturer, capacity, registration_number, airline_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        let errorMessage = 'Failed to add aircraft';
        
        if (error.code === '23505') { // Unique violation
            errorMessage = 'Registration number already exists';
        } else if (error.code === '23503') { // Foreign key violation
            errorMessage = 'Airline ID does not exist';
        }
        
        res.status(500).json({ 
            Error: errorMessage,
            Details: error.message
        });
    }
});
app.get('/aircrafts', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM aircrafts");
        res.json(result.rows);
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
app.get('/airports',async(req,res)=>{
    try{
        const result=await pool.query("Select * from airports")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

app.post('/bookings', async (req, res) => {
    const { booking_id, passenger_id, schedule_id, booking_date, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (booking_id, passenger_id, schedule_id, booking_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [booking_id, passenger_id, schedule_id, booking_date, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

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


app.post('/flights', async (req, res) => {
    const { flight_id, flight_code, origin_airport, destination_airport, aircraft_id, airline_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO flights (flight_id, flight_code, origin_airport, destination_airport, aircraft_id, airline_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [flight_id, flight_code, origin_airport, destination_airport, aircraft_id, airline_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.get('/flights', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM flights");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.post('/passengers', async (req, res) => {
    const { passenger_id, name, email, phone, passport_number, nationality, dob } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO passengers (passenger_id, name, email, phone, passport_number, nationality, dob) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [passenger_id, name, email, phone, passport_number, nationality, dob]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

app.get('/passengers', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM passengers");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});



app.get('/payments',async(req,res)=>{
    try{
        const result=await pool.query("Select * from payments")
        res.json(result.rows);
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})



// POST endpoint to insert a new role
app.post('/roles', async (req, res) => {
    const { role_id, role_name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO roles (role_id, role_name) VALUES ($1, $2) RETURNING *',
            [role_id, role_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

// GET endpoint to fetch all roles
app.get('/roles', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roles");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

 // Insert new staff member
app.post('/staff', async (req, res) => {
    const { name, role_id, phone, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO staff (name, role_id, phone, email) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, role_id, phone, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

// Get all staff members
app.get('/staff', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM staff");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});
// Get staff count grouped by role
app.get('/staff/role-distribution', async (req, res) => {
  try {
    const result = await pool.query(
      ` SELECT r.role_name, COUNT(s.staff_id) AS count
      FROM roles r
      LEFT JOIN staff s ON r.role_id = s.role_id
      GROUP BY r.role_name
      ORDER BY r.role_name`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});


// Add a new ticket
app.post('/tickets', async (req, res) => {
    const { booking_id, seat_number, class: ticket_class, price } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tickets (booking_id, seat_number, class, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [booking_id, seat_number, ticket_class, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

// Get all tickets
app.get('/tickets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickets ORDER BY ticket_id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});





/*ending Code*/
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Connection Successfully on port = ${port}`)
})