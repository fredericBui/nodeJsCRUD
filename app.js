const express = require('express')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true})); // New
app.use(express.json()); // New

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    port            : '3308',
    user            : 'root',
    password        : '',
    database        : 'testnode'
})

// Get all users
app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM users', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
})

// Get user by id
app.get('/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id] , (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
})

// Add user
app.get('/add/user/:nom', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('INSERT INTO `users` (`id`, `nom`) VALUES (NULL, ?)',[req.params.nom] , (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
})

// Delete user by id
app.get('/del/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('DELETE FROM `users` WHERE `users`.`id` = ?',[req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
})


// Update user
app.get('/set/user/:id/:nom', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('UPDATE `users` SET `nom` = ? WHERE `users`.`id` = 1',[req.params.nom, req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from users table are: \n', rows)
        })
    })
})


// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

