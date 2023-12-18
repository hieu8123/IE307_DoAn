import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/Web";
import 'dotenv/config';
import cors from "cors";
import { createServer } from 'http';
import * as path from 'path';

const app = express();
const Server = createServer(app);

app.use(cors())
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

const port = process.env.SERVER_PORT || 8080;

Server.listen(port, () => {
    console.log("Server is running on the port: " + port)
})
