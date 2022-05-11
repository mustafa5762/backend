const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const videoRouter = require('./routes/videoRoutes');
const cors = require('cors');
const screenplayRoutes = require('./routes/screenplayRoutes');
const magazineRoutes = require('./routes/magazineRoutes');


mongoose.connect('mongodb+srv://Keywords:Hasnotyet123@keywords.vmzso.mongodb.net/myFirstDatab?retryWrites=true&w=majority')
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err));

app.use(cors());

app.get('/', (req,res) => {
    res.send('working')
});

app.use(bodyParser.json());

app.use(authRoutes);

app.use(videoRouter);

app.use(screenplayRoutes);

app.use(magazineRoutes)









app.listen(process.env.PORT || 5000,() => console.log('Server Started'));