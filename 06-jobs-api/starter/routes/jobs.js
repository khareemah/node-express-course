const express = require('express');
const router = express.Router();

const {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
module.exports = router;
