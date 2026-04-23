const getHospitals = (req, res) => {
  res.status(200).json({ message: 'Get Hospitals' });
};

module.exports = { getHospitals };
