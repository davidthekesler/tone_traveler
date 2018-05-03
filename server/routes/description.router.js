const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/general', (req, res) => {
    console.log('made it to descriptiongeneral router.get');
    const queryText = `SELECT * FROM "descriptiongeneral"`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT description query', err);
        res.sendStatus(500);
      });

});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;