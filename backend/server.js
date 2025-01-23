import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import pkg from "pg";
import dotenv from "dotenv"; 

dotenv.config(); 

const { Pool } = pkg;

const app = express(); 
const port = process.env.PORT || 4500; 

// middleware 
app.use(bodyParser.json()); 
app.use(cors());

// postgres db connection 
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT, 
});
app.get("/fetch", async (req,res)=>{
    try {
        const client = await pool.connect(); 
        const query = "SELECT * FROM users ORDER BY id ASC"; 
        console.log("Running query: ", query); //making sure query is working correctly 
        const result = await client.query(query);
        client.release();

        //make the company field into an obj
        const users = result.rows.map((user)=>({
            ...user,
            company:{name:user.company},
        })); 
        
        res.status(200).json(users); 

        
    } catch (err) {
        console.error(err); 
        res.status(500).json({message:"Failed to fetch users."})
    }
}) 

// routes
app.get("/", (req, res) => {
    res.send("Backend is running!"); //works :)
}); 

app.post("/save", async (req, res) => {
    const users = req.body.users; 

    if (!users || users.length === 0) {
        return res.status(400).json({ message: "No users available to save" });
    }

    try {
        const client = await pool.connect(); 
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
