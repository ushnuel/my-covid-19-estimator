/* eslint-disable operator-linebreak */
const utility = {
  convertToInteger(number) {
    return Math.trunc(number);
  },

  calculateDollarsInFlight(data, infectionsImpact, infectionsSevere) {
    const { region, timeToElapse } = data;
    const avgDailyInc = region.avgDailyIncomeInUSD;
    const avgDailyIncPop = region.avgDailyIncomePopulation;

    const dollarsInFlightImpact = (
      infectionsImpact *
      avgDailyInc *
      avgDailyIncPop *
      timeToElapse
    ).toFixed(2);

    const dollarsInFlightSevere = (
      infectionsSevere *
      avgDailyInc *
      avgDailyIncPop *
      timeToElapse
    ).toFixed(2);

    return { dollarsInFlightImpact, dollarsInFlightSevere };
  }
};

module.exports = utility;
