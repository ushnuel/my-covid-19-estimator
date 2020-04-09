import checkPeriodType from './checkPeriodType';
import convertToInteger from './utility';

const covid19ImpactEstimator = (data) => {
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;

  const numberOfSetsIn3DaysPeriod = checkPeriodType(data);

  const projectedInfected = 2 ** numberOfSetsIn3DaysPeriod;

  const infectionsTimeImpact = currentlyInfectedImpact * projectedInfected;
  const infectionsTimeSevere = currentlyInfectedSevere * projectedInfected;

  const severeCasesImpact = convertToInteger(0.15 * infectionsTimeImpact);
  const severeCasesSevere = convertToInteger(0.15 * infectionsTimeSevere);

  const totalHospitalCapacity = data.totalHospitalBeds;

  const expectedBedsForCovidPatients = convertToInteger(
    0.35 * totalHospitalCapacity
  );
  const hospitalBedsImpact = expectedBedsForCovidPatients - severeCasesImpact;
  const hospitalBedsSevere = expectedBedsForCovidPatients - severeCasesSevere;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsTimeImpact,
      severeCasesByRequestedTime: severeCasesImpact,
      hospitalBedsByRequestedTime: hospitalBedsImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsTimeSevere,
      severeCasesByRequestedTime: severeCasesSevere,
      hospitalBedsByRequestedTime: hospitalBedsSevere
    }
  };
};

export default covid19ImpactEstimator;
