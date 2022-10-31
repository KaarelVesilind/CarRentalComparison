export default class ElmoPriceCalculator {
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
    let { daysCost, hoursCost, minutesCost } = this._calculateTime(
      totalTime,
      price
    );

    let { monthsCost, weeksCost } = this._calculateTime(
      searchParamsObj.months * 30 * 24 * 60 +
        searchParamsObj.weeks * 7 * 24 * 60,
      price
    );

    let extraInfo = "";
    if (monthsCost > 0 || weeksCost > 0) {
      extraInfo += ` | Contact ELMO for`;
      let and = false;
      if (monthsCost > 0) {
        extraInfo += ` ${monthsCost / price.month} month(s) package`;
        and = true;
      }
      if (weeksCost > 0) {
        extraInfo += `${and ? " and " : ""}`;
        extraInfo += ` ${weeksCost / price.week}week(s) package`;
      }
    }
    return {
      extraInfo: extraInfo,
      price:
        monthsCost +
        weeksCost +
        daysCost +
        hoursCost +
        minutesCost +
        distanceCost,
    };
  }

  _calculatePackages(car, totalCost, searchParamsObj, totalTime, price) {
    const packages = Array.reverse(car.packages);
    let months = 0;
    let weeks = 0;
    let bundlePrice = Number.MAX_SAFE_INTEGER;
    for (const option of packages) {
      const packageTotalTime = option.days * 24 * 60 + option.hours * 60;
      if (option.price < totalCost) {
        // if fits exactly in the package
        if (
          searchParamsObj.distance <= option.distance &&
          totalTime <= packageTotalTime &&
          option.price < usePackage.price
        ) {
          usePackage = { ...option };
        }

        // if fits in the package with some extra time or distance
        else {
          let packageCostExtra = option.price;
          // Add extra distance
          if (searchParamsObj.distance > option.distance) {
            packageCostExtra +=
              (searchParamsObj.distance - option.distance) * price.km;
          }
          // Add extra time
          if (totalTime > packageTotalTime) {
            let extraTime = totalTime - packageTotalTime;
            let extraCostTime = this._calculateTime(extraTime, price);
            packageCostExtra +=
              extraCostTime.daysCost +
              extraCostTime.hoursCost +
              extraCostTime.minutesCost;
          }
          if (
            packageCostExtra < totalCost &&
            packageCostExtra < usePackage.price
          ) {
            usePackage = { ...option };
            usePackage.price = packageCostExtra;
          }
        }
      }
    }
    return usePackage;
  }

  // TODO REFACTOR - same as CityBeePriceCalculator
  _calculateTime(totalTime, price) {
    let days = Math.floor(totalTime / 1440);
    totalTime -= days * 1440;
    let hours = Math.floor(totalTime / 60);
    totalTime -= hours * 60;
    let minutes = totalTime;
    // Days
    let daysCost = 0;
    if (days >= 1) {
      daysCost += days * price.day;
    }
    // Hours
    let hoursCost = 0;
    if (hours >= 1) {
      if (hours * price.hour + minutes * price.minute > price.day) {
        daysCost += price.day;
        hours = 0;
        minutes = 0;
      } else {
        hoursCost += hours * price.hour;
      }
    }
    // Minutes
    let minutesCost = 0;
    if (minutes >= 1) {
      if (minutes * price.minute > price.hour) {
        hoursCost += price.hour;
      } else {
        minutesCost += minutes * price.minute;
      }
    }
    return { daysCost, hoursCost, minutesCost };
  }
}
