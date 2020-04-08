import checkPeriodType from './checkPeriodType';

const covid19ImpactEstimator = (data) => {
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;

  const numberOfSetsIn3DaysPeriod = checkPeriodType(data);

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
