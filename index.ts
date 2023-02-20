import express, {Express} from 'express';
import dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

//Instantiate Express App
const app: Express = express();
dotenv.config();

//Body Parser
app.use(bodyParser.json());

//CORS
app.use(cors());

//Create Database connec
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
});

//Define Server Port
const port = process.env.PORT;

//Create a Default route

AppDataSource.initialize().then(()=>{
    //Start listening to tbe requests on the defined port
    app.listen(port);
    console.log('Data Source has been initialized!');
}).catch((err) => {
    console.error("Error during Data Source initialization",err)
});

app.use('/', tasksRouter);