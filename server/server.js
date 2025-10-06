const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database sync
const db = require("./models");
db.sequelize.sync().then(() => console.log("✅ Database synced"));

// Routes
app.get("/", (req, res) => res.json({ message: "Welcome to the Fitness App backend." }));
require('./routes/auth.routes.js')(app);
require('./routes/exercise.routes.js')(app);
require('./routes/workout.routes.js')(app);

app.listen(port, () => console.log(`🚀 Server is running on port: ${port}`));