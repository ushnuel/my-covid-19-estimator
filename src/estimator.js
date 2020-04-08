const covid19ImpactEstimator = (data) => {
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevereImpact = data.reportedCases * 50;

  const infectionsRequestByTimeImpact = currentlyInfectedImpact * 512;
  const infectionsRequestByTimeSevere = currentlyInfectedSevereImpact * 512;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsRequestByTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsRequestByTimeSevere
    }
  };
};

export default covid19ImpactEstimator;

covid19ImpactEstimator({
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
});
