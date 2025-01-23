import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import pkg from "pg";
import dotenv from "dotenv"; 

dotenv.config(); 
const { Pool } = pkg; 
const app = express(); 
const port = process.env.PORT || 4500; 

// middleware for pasrsing json and enabling cross-origin requests
app.use(bodyParser.json()); 
app.use(cors());

// postgres db connection using .env variables  
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT, 
});

//Fetch users from the postgres database 
app.get("/fetch", async (req,res)=>{
    try {
        const client = await pool.connect(); 
        const query = "SELECT * FROM users ORDER BY id ASC"; //Simple query to retrieve all users 
        console.log("Running query: ", query); //making sure query is working correctly(testing purposes) 
        const result = await client.query(query);
        client.release();
        //make the company field into an object to match table structure. 
        const users = result.rows.map((user)=>({
            ...user,
            company:{name:user.company}, //makes company into object -to fix when updating db
        })); 
        res.status(200).json(users); //sends users a json reponse
    } catch (err) {
        console.error(err); 
        res.status(500).json({message:"Failed to fetch users."})
    }
}) 

// Simple endpoint to check if backend is running 
app.get("/", (req, res) => {
    res.send("Backend is running!"); //works :)
}); 

// Saves users to the database
app.post("/save", async (req, res) => {
    const users = req.body.users; 

    if (!users || users.length === 0) {
        return res.status(400).json({ message: "No users available to save" });
    }

    try {
        const client = await pool.connect(); 
        //Kept database the same if updated manuelly so when data is saved kept the same as db. 
        const query = `
            INSERT INTO users (id, name, email, phone, company) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING; 
        `; 

        for (const user of users) {
            await client.query(query, [
                user.id,
                user.name,
                user.email,
                user.phone, 
                user.company.name, 
            ]);
        }

        client.release(); 
        res.status(200).json({ message: "Users successfully saved!" });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Failed to save the users" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
