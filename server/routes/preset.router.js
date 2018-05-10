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
    if (req.isAuthenticated()) {
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
    if (req.isAuthenticated()) {//in order to post an item, user must be signed in
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
        req.user.id]).then((result) => {

            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    console.log('DELETE route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){//in order to delete an item, user must be signed in
    let queryText = `DELETE FROM presets WHERE id = $1 AND person_id = $2;`;
    pool.query(queryText, [req.params.id, req.user.id]).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
    })
} else {
    res.sendStatus(403);
}
});

router.put('/:id', (req, res) => {
    //updates book entry in sql book table
    console.log('in PUT route', req.body.descriptionString);

    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){//in order to update an item, user must be signed in
    // const id = req.params.id;
    const queryText = `UPDATE presets SET "binauralval" = $1, "synthfreq" = $2, "synthvolume" = $3, "playervolume" =$4, "balance" = $5, "mastervolume" = $6, "drone_id" = $7, "descriptionstring" = $8, "descriptiongeneral_id" = $9 WHERE "id" = $10;`
    pool.query(queryText, [req.body.binauralVal,
        req.body.synthFreq,
        req.body.synthVolume,
        req.body.playerVolume,
        req.body.balance,
        req.body.masterVolume,
        req.body.droneId,
        req.body.descriptionString,
        req.body.descriptionGeneralId,
        req.body.id
    ]).then(result => {
            res.sendStatus(204);
        })
        .catch(error => {
            console.log('error making preset put query', error);
            res.sendStatus(500);
        });
    }
});//end router.put update

module.exports = router;