Here is the formatted content of your `README.md` file: 

# fieldsync-fullstack-app

Full Stack Application built using React (frontend), Node.js (backend), and PostgreSQL (database). This app includes three main pages (Home/Save/Fetch) and provides features like user data fetching, saving, and retrieving.

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

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/moralesSantos/fieldsync-fullstack-app.git
   cd fieldsync-fullstack-app
   ```

2. Backend Setup:
    - Navigate to backend folder:
      ```sh
      cd backend
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Create a `.env` file for environment variables:
      ```sh
      touch .env
      ```
      Add the following to `.env`:
      ```env
      POSTGRES_USER=postgres
      POSTGRES_PASSWORD=yourpassword
      POSTGRES_DB=fieldsync_db
      POSTGRES_HOST=localhost
      POSTGRES_PORT=5432
      PORT=4500
      ```
    - Start Docker Compose to initialize the database and backend:
      ```sh
      docker-compose up --build
      ```
    - Verify backend is running by visiting:
      [http://localhost:4500/](http://localhost:4500/) (or the port specified in the `.env`)

3. Initialize the Database:
    - Access the postgres container (ensure you are in the backend directory):
      ```sh
      docker exec -it fieldsync_postgres psql -U postgres -d fieldsync_db
      ```
    - Create the `users` table:
      ```sql
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phone VARCHAR(20),
          company VARCHAR(255)
      );
      ```
    - Verify the table was created (you should see the `users` table listed):
      ```sh
      /dt
      ```
    - Exit the postgres container:
      ```sh
      \q
      ```

4. Frontend Setup:
    - Navigate to the frontend folder:
      ```sh
      cd ../frontend/fullstack-app
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Start the React app:
      ```sh
      npm start
      ```
    - Open in browser:
      [http://localhost:3000/](http://localhost:3000/)

5. Test the Application Workflow:
    - **Homepage**: Click the download button to fetch user data from the API.
    - **Save Page**:
      - Navigate to save page.
      - Click on the save users button to save the fetched data to the PostgreSQL database.
    - **Fetch Page**:
      - Navigate to Fetch Page.
      - Click the fetch user button to retrieve saved data from the PostgreSQL database.

6. Troubleshooting:
    - **Docker Issues**:
      - Ensure Docker Desktop is running before starting the backend.
      - If you run into trouble, use:
        ```sh
        docker ps
        docker stop <container_id>
        docker rm <container_id>
        ```
      - Retry again.
    - **Database Issues**:
      - Make sure the database is running by checking logs:
        ```sh
        docker logs fieldsync_postgres
        ```
    - **Frontend Issues**:
      - Ensure all dependencies are installed using:
        ```sh
        npm install
        ```

### Project Structure:
```
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
```

This should help you with the formatting of your README file.

