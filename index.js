const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoryRoutes = require('./Routes/CategoryRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const userRoutes = require('./Routes/UserRoutes');
var cors = require('cors')
var bodyParser = require('body-parser');
const blogRoutes = require('./Routes/BlogRoutes');
const commentRoutes = require('./Routes/CommentRoute');


mongoose.connect('mongodb+srv://ecommerce:Hasnotyet123@cluster0.aegl2.mongodb.net/ecommerceapi?retryWrites=true&w=majority')
.then(() => console.log('Database Connected'))
.catch((c) => console.log(c))

app.use(cors())
app.use(bodyParser.json())

app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes)
app.use('/api', blogRoutes)
app.use('/api', commentRoutes)


app.listen(process.env.PORT || 5000,() => console.log('Server Started'));

module.exports = app;