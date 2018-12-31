const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message:'Welcome to the API'
    });
});


app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err,authData) => {
        if(err){
            res.sendStatus(403);
        }else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req,res) => {
    //create mock user

    const user = {
        id:1,
        username:'nduhiu',
        email:'nduhiu@gmail.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn:'30s'},(err,token) => {
        res.json({
            token
        });
    });
})

//format of token
//Authorization: Bearer <access_token>

//verify token

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined

    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array

        const bearerToken = bearer[1];

        req.token = bearerToken;

    next();

    }else{
        res.sendStatus(403);
    }
}


app.listen(5000, () => console.log('Server started on port 5000'));