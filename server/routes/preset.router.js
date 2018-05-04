const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('made it to preset router.get');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){
    const queryText = `SELECT * FROM "presets" WHERE person_id = $1`;
    pool.query(queryText, [req.user.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT description query', err);
        res.sendStatus(500);
      });
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){//in order to post an item, user must be signed in
        let queryText = `INSERT INTO presets ("binauralval", "synthfreq", "synthvolume", "playervolume", "balance", "mastervolume", "drone_id", "descriptionstring", "descriptiongeneral_id", "person_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        pool.query(queryText, [req.body.binauralVal, 
                                req.body.synthFreq, 
                                req.body.synthVolume,
                                req.body.playerVolume,
                                req.body.balance,
                                req.body.masterVolume,
                                req.body.droneId,
                                req.body.descriptionString,
                                req.body.descriptionGeneralId,
                                req.user.id]).then((result)=>{

            res.sendStatus(201);
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;