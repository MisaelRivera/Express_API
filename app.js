require('dotenv').config();
const express = require('express'),
     { errorHandler } = require('./middleware/errorMiddleware');
const app = express(),
      userRoutes = require('./routes/userRoutes'),
      goalRoutes = require('./routes/goalRoutes');

app.use('/static', express.static(__dirname + '/public'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server initialized correctly!');
});