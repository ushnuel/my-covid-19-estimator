/* eslint-disable operator-linebreak */
const utility = {
  convertToInteger(number) {
    return Math.trunc(number);
  },

  calculateDollarsInFlight(data, infectionsImpact, infectionsSevere) {
    const { region, timeToElapse, population } = data;
    const avgDailyInc = region.avgDailyIncomeInUSD;
    const avgDailyIncPop = region.avgDailyIncomePopulation;

    // total income iN USD
    const totalIncomeOfThePopulation =
      population * avgDailyInc * avgDailyIncPop * timeToElapse;

    const totalIncomeOfTheImpact =
      infectionsImpact * avgDailyInc * avgDailyIncPop * timeToElapse;

    const totalIncomeOfTheSevere =
      infectionsSevere * avgDailyInc * avgDailyIncPop * timeToElapse;

    const dollarsInFlightImpact = (
      totalIncomeOfThePopulation - totalIncomeOfTheImpact
    ).toFixed(2);

    const dollarsInFlightSevere = (
      totalIncomeOfThePopulation - totalIncomeOfTheSevere
    ).toFixed(2);

    return { dollarsInFlightImpact, dollarsInFlightSevere };
  }
};

module.exports = utility;
