require('dotenv').config();
const express = require('express');
const app = express(),
      userRoutes = require('./routes/userRoutes'),
      goalRoutes = require('./routes/goalRoutes');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);

app.listen(3000, () => {
    console.log('Server initialized correctly!');
});