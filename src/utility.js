/* eslint-disable operator-linebreak */
const truncateNumber = (number) => Math.trunc(number);

const normalizeDurationToDays = (data) => {
  let normalizedDuration;

  switch (data.periodType) {
    case 'days':
      normalizedDuration = truncateNumber(data.timeToElapse);
      break;
    case 'weeks':
      normalizedDuration = truncateNumber(data.timeToElapse * 7);
      break;
    case 'months':
      normalizedDuration = truncateNumber(data.timeToElapse * 30);
      break;
    default:
      normalizedDuration = truncateNumber(data.timeToElapse / 3);
      break;
  }
  return normalizedDuration;
};

const utility = {
  calculateDollarsInFlight(data, infectionsImpact, infectionsSevere) {
    const { region } = data;
    const avgDailyInc = region.avgDailyIncomeInUSD;
    const avgDailyIncPop = region.avgDailyIncomePopulation;

    const normalizedDuration = normalizeDurationToDays(data);

    // total income iN USD
    const totalIncomeOfTheImpact =
      (infectionsImpact * avgDailyInc * avgDailyIncPop) / normalizedDuration;

    const totalIncomeOfTheSevere =
      (infectionsSevere * avgDailyInc * avgDailyIncPop) / normalizedDuration;

    const dollarsInFlightImpact = totalIncomeOfTheImpact.toFixed(2);

    const dollarsInFlightSevere = totalIncomeOfTheSevere.toFixed(2);

    return { dollarsInFlightImpact, dollarsInFlightSevere };
  },

  calculateNumberOf3DaysSet(data) {
    const numberOfSetsOf3DaysPeriod = normalizeDurationToDays(data);
    return truncateNumber(numberOfSetsOf3DaysPeriod / 3);
  },

  convertToInteger(number) {
    return truncateNumber(number);
  }
};

module.exports = utility;
