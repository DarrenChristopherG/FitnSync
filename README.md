# FitnSync - A Web-Based Fitness Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vue.js)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

FitnSync is a full-stack web application designed to help users track their fitness journey. It features secure user authentication, a browsable library of exercises, and a detailed workout logging system.

## Features 

* **Secure Authentication:** User signup and login system using JWT (JSON Web Tokens).
* **Exercise Library:** Browse a master list of exercises with details and categories.
* **Workout Logging:** Log detailed workout sessions, including exercises, sets, reps, and weight.
* **Workout History:** View a complete, chronologically sorted history of all past workouts.
* **Protected Routes:** User-specific data is protected and only accessible when logged in.

## Tech Stack

* **Frontend:** Vue 3 (Composition API), Vue Router, Pinia, Axios
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL with Sequelize as the ORM
* **Authentication:** JWT & bcryptjs for password hashing

## Getting Started

Follow these instructions to get a local copy of the project up and running for development.

### Prerequisites

* **Node.js** (v20.x or later) & **npm**
* **Git**
* **PostgreSQL** server installed and running.
* An API testing tool like **Postman** or **Insomnia** (recommended for backend testing).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/FitnSync.git](https://github.com/your-username/FitnSync.git)
    cd FitnSync
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Set Up Backend Environment Variables:**
    * Navigate to the `server` directory.
    * Create a `.env` file by copying the example: `cp .env.example .env` (or create it manually).
    * Edit the `.env` file with your local database credentials:

    ```ini
    # .env.example

    # Port for the Express server
    PORT=5000

    # PostgreSQL Connection URL
    # Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME
    DATABASE_URL=postgres://postgres:your_password_here@localhost:5432/your_db_name
    ```

### Running the Application

You will need two separate terminals to run both the frontend and backend servers.

1.  **Start the Backend Server:**
    ```bash
    # In terminal 1
    cd server
    node server.js
    ```
    Your backend should be running on `http://localhost:5000`.

2.  **Start the Frontend Client:**
    ```bash
    # In terminal 2
    cd client
    npm run serve
    ```
    Open your browser and navigate to `http://localhost:8080`.

## API Endpoints

Here are the core API endpoints available for testing.

### Authentication (`/api/auth`)

| Method | Endpoint         | Description                   | Protected | Example Body                                                 |
| :----- | :--------------- | :---------------------------- | :-------- | :----------------------------------------------------------- |
| `POST` | `/signup`        | Register a new user.          | No        | `{ "username": "test", "email": "test@test.com", "password": "123" }` |
| `POST` | `/signin`        | Log in to get an access token. | No        | `{ "username": "test", "password": "123" }`                     |

### Exercises (`/api/exercises`)

| Method | Endpoint    | Description                     | Protected |
| :----- | :---------- | :------------------------------ | :-------- |
| `GET`  | `/`         | Get a list of all exercises.    | No        |
| `POST` | `/`         | Create a new master exercise.   | Yes (Admin role can be added) |

### Workouts (`/api/workouts`)
_Note: All workout routes are protected and require a valid `x-access-token` in the header._

| Method | Endpoint | Description                  | Example Body                                                                                                                              |
| :----- | :------- | :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/`      | Get the logged-in user's workout history. | _(None)_                                                                                                                                  |
| `POST` | `/`      | Log a new workout session.   | `{ "date": "2025-10-07", "notes": "Felt strong today", "logs": [{ "ExerciseId": 1, "sets": 3, "reps": 10, "weight": 50 }] }` |

## Contributing

Contributions are welcome! Please follow the standard GitHub Flow:
1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
