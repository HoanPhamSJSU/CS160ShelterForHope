const express = require('express'); 
// const Event = require('../models/shelter');
// const jwt = require('jsonwebtoken'); 
// require('dotenv').config(); 


const connection = require('../config/database');

exports.loadShelterController = async (req, res)=> {
    

    console.log("getting Events"); 
    try {
        let sql = 'SELECT * from shelters';
        connection.query(sql, function(err, data, fields) {
            if (err) throw err;
            res.json({
              status: 200,
              data,
              message: "User lists retrieved successfully"
            })
          })

    } catch (e) {
        console.log("err", e)
        return res.status(500).json({ message: e })
    }
}

// exports.loadEventControllerById = async (req, res)=> {
//     const { id } = req.params.id
//     try {
//         console.log("Loading"); 
//         const event = await Event.findById(req.params.id).exec();

//         return res.send(event)

//     } catch (e) {
//         console.log("err", e)
//         return res.status(500).json({ message: e })
//     }
// }




