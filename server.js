import express, { json } from 'express';
// import http from 'http';
import path from "path";
import bodyParser from 'body-parser'
import ejsLayouts from "express-ejs-layouts";
import session from 'express-session';
import methodOverride from 'method-override';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import studentRouter from './src/features/student/student.router.js';
import userRouter from './src/features/user/user.router.js';
import jwtAuth from './src/middleware/jwtAuth.middleware.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import companyRouter from './src/features/companies/companies.router.js';

const server = express();

server.use(express.static('public'));

server.use(session({
    secret: 'Secret Key',
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

server.use(express.static('public', {
    setHeaders: (req, res, next) => {
        if(path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}))

// for parsing json 
server.use(express.json());

// parse form data  - specifying browser to use this type of encoding for data
server.use(express.urlencoded({ extended: true }));

server.set('view engine', 'ejs'); 
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);

// Express doesn't support PUT and DELETE methods in forms directly.
// so we use method-override 
server.use(methodOverride("_method"));



// ------------------------------------------------------------

// server.get('/download-csv', async (req, res) => {
//     const csvWriter = createObjectCsvWriter({
//         path: csvFilePath,
//         header: [
//             { id: 'name', title: 'Name' },
//             { id: 'email', title: 'Email' },
//             { id: 'age', title: 'Age' }
//         ]
//     });

//     const data = [
//         { name: 'John Doe', email: 'john.doe@example.com', age: 30 },
//         { name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 },
//         { name: 'Mike Johnson', email: 'mike.johnson@example.com', age: 35 }
//     ];

//     await csvWriter.writeRecords(data);

//     res.download(csvFilePath, 'data.csv', (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Could not download the file');
//         } else {
//             fs.unlinkSync(csvFilePath); // Delete the file after sending it
//         }
//     });
// });
// -----------------------------------------------------------



server.use(
    '/', 
    // jwtAuth,
    studentRouter
);

server.use(
    '/', 
    // jwtAuth,
    companyRouter
);

server.use(
    '/users',
    userRouter
)

server.use(express.static('src/views'));

server.listen(3200, () => {
    console.log("App is listening on 3200");
    connectUsingMongoose();
})