import { calculateTime } from "./helpers";

export default class ElmoPriceCalculator {
  // Global variable to calculate weeks and months
  cheapest = {
    months: 0,
    weeks: 0,
    withNormalPricing: {
      daysCost: 0,
      hoursCost: 0,
      minutesCost: 0,
      distanceCost: 0,
    },
    totalCost: Infinity,
  };

  // Price calculation function
  calculatePrice(car, searchParamsObj) {
    const price = car.price;
    let distanceCost = 0;
    if (searchParamsObj.distance > 100) {
      distanceCost = 100 * price.km + (searchParamsObj.distance - 100) * 0.1;
    } else {
      distanceCost = searchParamsObj.distance * price.km;
    }
    const totalTime =
      searchParamsObj.days * 24 * 60 +
      searchParamsObj.hours * 60 +
      searchParamsObj.minutes;

    // Time
    let { daysCost, hoursCost, minutesCost } = calculateTime(totalTime, price);
    // Calculate if weeks or months package comes cheaper
    this._calculatePackages({
      timeLeft: totalTime,
      distanceLeft: searchParamsObj.distance,
      months: 0,
      weeks: 0,
      totalCost: 0,
      onlyWeeks: false,
      price: price,
      weekPrice: car.packages[0],
      monthPrice: car.packages[1],
    });

    let monthsCost = 0;
    let weeksCost = 0;
    let extraInfo = "";
    if (
      (this.cheapest.months > 0 || this.cheapest.weeks > 0) &&
      this.cheapest.totalCost <
        distanceCost + daysCost + hoursCost + minutesCost
    ) {
      monthsCost = this.cheapest.months * car.packages[1].price;
      weeksCost = this.cheapest.weeks * car.packages[0].price;
      daysCost = this.cheapest.withNormalPricing.daysCost;
      hoursCost = this.cheapest.withNormalPricing.hoursCost;
      minutesCost = this.cheapest.withNormalPricing.minutesCost;
      distanceCost = this.cheapest.withNormalPricing.distanceCost;

      extraInfo += ` | Contact ELMO for`;
      let and = false;
      if (monthsCost > 0) {
        extraInfo += ` ${this.cheapest.months} month(s) package`;
        and = true;
      }
      if (weeksCost > 0) {
        extraInfo += `${and ? " and " : ""}`;
        extraInfo += ` ${this.cheapest.weeks} week(s) package`;
      }
    }
    let totalCost =
      monthsCost +
      weeksCost +
      daysCost +
      hoursCost +
      minutesCost +
      distanceCost;
    if (car.name === "Tesla Model 3 SR+" && totalCost < 30) {
      totalCost = 30;
    }
    return {
      extraInfo: extraInfo,
      price: totalCost,
    };
  }

  _calculatePackages({
    timeLeft,
    distanceLeft,
    months,
    weeks,
    totalCost,
    onlyWeeks,
    price,
    weekPrice,
    monthPrice,
  }) {
    if (totalCost > this.cheapest.totalCost) {
      return;
    }
    if (timeLeft <= 0 && distanceLeft <= 0) {
      if (totalCost < this.cheapest.totalCost) {
        this.cheapest.totalCost = totalCost;
        this.cheapest.months = months;
        this.cheapest.weeks = weeks;
        this.cheapest.withNormalPricing = {
          daysCost: 0,
          hoursCost: 0,
          minutesCost: 0,
          distanceCost: 0,
        };
      }
      return;
    } else {
      if (months > 0 || weeks > 0) {
        // if we need to add some extra time to package
        let withNormalPricing = totalCost;
        let normalTime = {
          daysCost: 0,
          hoursCost: 0,
          minutesCost: 0,
        };
        let normalDistance = 0;
        if (timeLeft > 0) {
          normalTime = calculateTime(timeLeft, price);
          withNormalPricing +=
            normalTime.daysCost + normalTime.hoursCost + normalTime.minutesCost;
        }
        if (distanceLeft > 0) {
          normalDistance = distanceLeft * 0.1;
          withNormalPricing += normalDistance;
        }
        if (withNormalPricing < this.cheapest.totalCost) {
          this.cheapest.months = months;
          this.cheapest.weeks = weeks;
          this.cheapest.totalCost = withNormalPricing;
          this.cheapest.withNormalPricing = {
            daysCost: normalTime.daysCost,
            hoursCost: normalTime.hoursCost,
            minutesCost: normalTime.minutesCost,
            distanceCost: normalDistance,
          };
        }
      }
      // We first add months and the weeks, and that's why we have onlyWeeks parameter
      if (!onlyWeeks) {
        this._calculatePackages({
          timeLeft: timeLeft - 30 * 24 * 60,
          distanceLeft: distanceLeft - 3000,
          months: months + 1,
          weeks: weeks,
          totalCost: totalCost + monthPrice.price,
          onlyWeeks: false,
          price: price,
          weekPrice: weekPrice,
          monthPrice: monthPrice,
        });
      }
      this._calculatePackages({
        timeLeft: timeLeft - 7 * 24 * 60,
        distanceLeft: distanceLeft - 700,
        months: months,
        weeks: weeks + 1,
        totalCost: totalCost + weekPrice.price,
        onlyWeeks: true,
        price: price,
        weekPrice: weekPrice,
        monthPrice: monthPrice,
      });
    }
  }
}
