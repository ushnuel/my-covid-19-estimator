const covid19ImpactEstimator = (data) => {
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;

  // number of infected persons double every 3days
  const numberOfSetsIn3DaysPeriod = parseInt(data.timeToElapse / 3, 10);
  const projectedInfected = 2 ** numberOfSetsIn3DaysPeriod;

  const infectionsTimeImpact = currentlyInfectedImpact * projectedInfected;
  const infectionsTimeSevere = currentlyInfectedSevere * projectedInfected;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsTimeSevere
    }
  };
};

export default covid19ImpactEstimator;

// covid19ImpactEstimator({
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// });
