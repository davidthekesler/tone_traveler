const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('library get route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if(req.isAuthenticated()){
    console.log('made it to library router.get');
    const queryText = `SELECT presets.id, presets.createdts, presets.person_id, presets.binauralval, presets.synthfreq, presets.synthvolume, 
    presets.playervolume, presets.balance, presets.mastervolume, presets.drone_id, presets.descriptionstring, presets.descriptiongeneral_id, descriptiongeneral.description, descriptiongeneral.max, descriptiongeneral.min, descriptiongeneral.optimal, descriptiongeneral.title, descriptiongeneral.toolittle, descriptiongeneral.toomuch, drones.dronetitle, drones.dronedescription FROM presets INNER JOIN descriptiongeneral ON descriptiongeneral.id = presets.descriptiongeneral_id INNER JOIN drones ON drones.id = presets.drone_id WHERE presets.person_id = $1`;
    pool.query(queryText, [req.user.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT library query', err);
        res.sendStatus(500);
      });
    }
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;