const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const videoRouter = require('./routes/videoRoutes');
const cors = require('cors');
const screenplayRoutes = require('./routes/screenplayRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const Video = require('./Models/videoModel');
const Magazine = require('./Models/magazineModel');
const Screenplay = require('./Models/screenplayModel');
const catRouter = require('./routes/Categories');


mongoose.connect('mongodb+srv://Keywords:Hasnotyet123@keywords.vmzso.mongodb.net/myFirstDatab?retryWrites=true&w=majority')
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err));

app.use(cors());

app.get('/', (req,res) => {
    res.send('working')
});

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use(authRoutes);

app.use(videoRouter);

app.use(screenplayRoutes);

app.use(magazineRoutes);

app.use(catRouter);


app.get('/search/:query', async (req,res) => {
    const video = await Video.find({'title' : new RegExp(req.params.query, 'i')});
    const magazine = await Magazine.find({'title' : new RegExp(req.params.query, 'i')});
    const screenplay = await Screenplay.find({'title' : new RegExp(req.params.query, 'i')});
    res.send({
        videos: video,
        magazines: magazine,
        screenplays: screenplay
    });
});









app.listen(process.env.PORT || 5000,() => console.log('Server Started'));