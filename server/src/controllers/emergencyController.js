const getEmergencyNumbers = (req, res) => {
  res.status(200).json({
    ambulance: "108",
    police: "100",
    fire: "101"
  });
};

module.exports = { getEmergencyNumbers };
