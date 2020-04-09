import convertToInteger from './utility';

const checkPeriodType = (data) => {
  // number of infected persons double every 3days

  let numberOfSetsIn3DaysPeriod;

  switch (data.periodType) {
    case 'days':
      numberOfSetsIn3DaysPeriod = convertToInteger(data.timeToElapse / 3);
      break;
    case 'weeks':
      numberOfSetsIn3DaysPeriod = convertToInteger((data.timeToElapse * 7) / 3);
      break;
    case 'months':
      numberOfSetsIn3DaysPeriod = convertToInteger(
        (data.timeToElapse * 30) / 3
      );
      break;
    default:
      numberOfSetsIn3DaysPeriod = convertToInteger(data.timeToElapse / 3);
      break;
  }
  return numberOfSetsIn3DaysPeriod;
};

module.exports = checkPeriodType;
