const getJobs = async (req, res) => {
  res.send('get all jobss');
};

const createJob = async (req, res) => {
  res.send('create job');
};

const getJob = async (req, res) => {
  res.send('get job');
};

const updateJob = async (req, res) => {
  res.send('update job');
};
const deleteJob = async (req, res) => {
  res.send('delete job');
};

module.exports = { getJob, getJobs, createJob, updateJob, deleteJob };
