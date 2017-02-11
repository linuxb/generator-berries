const express = require('express');
const controller = require('../proxy');

const router = express.Router();

router.get('/', (req, res, next) => {
  (async () => {
    try {
      const result = await controller.serve('welcome to my app');
      return res.status(200).send(result);
    } catch (ex) {
      res.status(500).send(ex.message);
      next(ex);
    }
  })();
});

module.exports = router;
