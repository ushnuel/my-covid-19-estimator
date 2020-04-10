const Utility = require('./utility');

const covid19ImpactEstimator = (data) => {
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;

  const numberOfSetsOf3DaysPeriod = Utility.calculateNumberOf3DaysSet(data);

  const projectedInfected = 2 ** numberOfSetsOf3DaysPeriod;

  const infectionsTimeImpact = currentlyInfectedImpact * projectedInfected;
  const infectionsTimeSevere = currentlyInfectedSevere * projectedInfected;

  const severeCasesImpact = 0.15 * infectionsTimeImpact;
  const severeCasesSevere = 0.15 * infectionsTimeSevere;

  const totalHospitalCapacity = data.totalHospitalBeds;

  const expectedBedsForCovidPatients = 0.35 * totalHospitalCapacity;

  const hospitalBedsImpact = Utility.convertToInteger(
    expectedBedsForCovidPatients - severeCasesImpact
  );
  const hospitalBedsSevere = Utility.convertToInteger(
    expectedBedsForCovidPatients - severeCasesSevere
  );

  const casesForICUImpact = Utility.convertToInteger(
    0.05 * infectionsTimeImpact
  );
  const casesForICUSevere = Utility.convertToInteger(
    0.05 * infectionsTimeSevere
  );

  const casesForVentilatorsImpact = Utility.convertToInteger(
    0.02 * infectionsTimeImpact
  );
  const casesForVentilatorsSevere = Utility.convertToInteger(
    0.02 * infectionsTimeSevere
  );

  const dollarsInFlight = Utility.calculateDollarsInFlight(
    data,
    infectionsTimeImpact,
    infectionsTimeSevere
  );

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsTimeImpact,
      severeCasesByRequestedTime: severeCasesImpact,
      hospitalBedsByRequestedTime: hospitalBedsImpact,
      casesForICUByRequestedTime: casesForICUImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsImpact,
      dollarsInFlight: dollarsInFlight.dollarsInFlightImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsTimeSevere,
      severeCasesByRequestedTime: severeCasesSevere,
      hospitalBedsByRequestedTime: hospitalBedsSevere,
      casesForICUByRequestedTime: casesForICUSevere,
      casesForVentilatorsByRequestedTime: casesForVentilatorsSevere,
      dollarsInFlight: dollarsInFlight.dollarsInFlightSevere
    }
  };
};

module.exports = covid19ImpactEstimator;
