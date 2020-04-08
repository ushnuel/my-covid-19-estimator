const checkPeriodType = (data) => {
  // number of infected persons double every 3days

  let numberOfSetsIn3DaysPeriod;

  switch (data.periodType) {
    case 'days':
      numberOfSetsIn3DaysPeriod = parseInt(data.timeToElapse / 3, 10);
      break;
    case 'weeks':
      numberOfSetsIn3DaysPeriod = parseInt((data.timeToElapse * 7) / 3, 10);
      break;
    case 'months':
      numberOfSetsIn3DaysPeriod = parseInt((data.timeToElapse * 30) / 3, 10);
      break;
    default:
      numberOfSetsIn3DaysPeriod = parseInt(data.timeToElapse / 3, 10);
      break;
  }
  return numberOfSetsIn3DaysPeriod;
};

export default checkPeriodType;
