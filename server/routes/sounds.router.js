const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('sounds get route');
    console.log('made it to sounds router.get');
    const queryText = `SELECT * FROM drones`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT drones query', err);
        res.sendStatus(500);
      });
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;