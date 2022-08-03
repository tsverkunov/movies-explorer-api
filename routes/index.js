const router = require('express').Router();
const { auth } = require('../middlewares/auth');

router.use(require('./signup'));

router.use(auth);

router.use(require('./signout'));
router.use(require('./users'));
router.use(require('./movies'));

module.exports = router;
