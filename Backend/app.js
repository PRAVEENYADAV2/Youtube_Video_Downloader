import express from 'express';
import optionRouter from './Routes/qualityOptions.js';
import downloadRouter from './Routes/downloadRoute.js';
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.3:3000'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routers

app.use('/', optionRouter)
app.use('/', downloadRouter)

const host = "192.168.1.3";
const port = 5000
const server = app.listen( port, host, () => {
    console.log(`http://${host}:${port}`);
});