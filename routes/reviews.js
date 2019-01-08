const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/test', (req, res) => {
  axios.get(`http://fectraveltipsterreviews-env.cpzspfr2yt.us-east-2.elasticbeanstalk.com/hotels/reviews`)
    .then(response => {
      res.send(response.data);
    });
});


module.exports = router;


