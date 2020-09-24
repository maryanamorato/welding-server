require('./models/User')
require('./models/Equipment')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const equipmentRoutes = require('./routes/equipmentRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json());
app.use(authRoutes);
app.use(equipmentRoutes);

const mongoUri = 'mongodb+srv://maryana:maryana@cluster0.jvotj.gcp.mongodb.net/equipments?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance")
})

mongoose.connection.on('error',(err)=>{
    console.error("Error connecting to mongo ", err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening on 3008")
})