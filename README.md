# fieldsync-fullstack-app
Full Stack Application built using react(frontend), Node.js(backend) and postgresSQL(database). This app includes three main pages (Home/Save/Fetch) and provides features like user data fetching, saving and retrieval via api. Includes step-by-step on instructions on read.me file. 

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

---

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- A code editor like [VSCode](https://code.visualstudio.com/)

---

Setup Instuctions: 
---
1. Clone the respository

git clone https://github.com/moralesSantos/fieldsync-fullstack-app.git
cd fieldsync-fullstack-app
---
2. Backend Setup
    1. Navigate to backend Folder: 
        cd backend
    2. Install dependcies:
        npm install
    3. Create a .env file for enviorment variables;
        touch .env
    Add the following to .env
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=yourpassword
        POSTGRES_DB=fieldsync_db
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        PORT=4500
    4. Start Docker Compose to initialize the database and backend: 
        docker-compose up --build
    5. verify backend is running by going to: 
        http://localhost:4500/
        (or the port specified in the .env)
---
3. Initialize the Database:
    1. Access the postgres container (make sure you are cd into backend):
        docker exec -it fieldsync_postgres psql -U postgres -d fieldsync_db
    2. create the users table:

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            company VARCHAR(255)
        );
    3. Verify table was created (You should see the users table listed): 
        /dt
    4. Exit the postgres container: 
        \q
---
4. Frontend Setup 
    1. Navigate to the frontend folder: 
        cd ../frontend/fullstack-app
    2. Install dependencies: 
        npm install 
    3. Start react app: 
        npm start 
    4. Open in browser: 
        http://localhost:3000/
---
5. Test the application workflow
    1. Homepage: Click the download button to fetch user data from api.
    2. SavePage:
        Navigate to save page.
        Click on the save users button to save the fetched data to the postgres database.
    3. Fetch Page: 
        Navigate to Fetch Page
        Click the fetch User button to retrieve saved data from postgres database. 
---
6.TroubleShooting
    Docker Issues: 
        Ensure Docker Desktop is running before starting the backend
        If you run in trouble use: 
            docker ps
            docker stop<container_id>
            docker rm <container_id>
        Retry again 
    Database issues: 
        Make sure databse is running by checking logs: 
            docker logs fieldsync_postgres
    FrontEnd Issues: 
        Ensure all dependicies are installed using: npm install


Project Structure: 

fieldsync-fullstack-app/
    backend/
        server.js 
        docker-compose.yml 
        .env 
    frontend/
        fullstack-app/
        src/
        package.json
    .gitignore
    README.md 

