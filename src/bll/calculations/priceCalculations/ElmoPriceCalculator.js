export default class ElmoPriceCalculator {
  calculatePrice(car, searchParamsObj) {
    const price = car.price;
    //Months
    let monthsCost = 0;
    if (searchParamsObj.days >= 30) {
      const months = Math.floor(searchParamsObj.days / 30);
      monthsCost += months * price.month;
      searchParamsObj.days -= months * 30;
      searchParamsObj.distance -= months * 3000;
    }
    // Weeks
    let weeksCost = 0;
    if (searchParamsObj.days >= 7) {
      const weeks = Math.floor(searchParamsObj.days / 7);
      searchParamsObj.days -= weeks * 7;
      if (
        weeks * price.week +
          searchParamsObj.days * price.day +
          searchParamsObj.hours * price.hour +
          searchParamsObj.minutes * price.minute >
        price.month
      ) {
        monthsCost += price.month;
        searchParamsObj.distance -= 3000;
        searchParamsObj.days = 0;
        searchParamsObj.hours = 0;
        searchParamsObj.minutes = 0;
      } else {
        weeksCost += weeks * price.week;
        searchParamsObj.distance -= weeks * 700;
      }
    }
    //Days
    let daysCost = 0;
    if (searchParamsObj.days >= 1) {
      if (
        searchParamsObj.days * price.day +
          searchParamsObj.hours * price.hour +
          searchParamsObj.minutes * price.minute >
        price.week
      ) {
        weeksCost += price.week;
        searchParamsObj.distance -= 700;
        searchParamsObj.days = 0;
        searchParamsObj.hours = 0;
        searchParamsObj.minutes = 0;
      } else {
        daysCost += searchParamsObj.days * price.day;
      }
    }
    //Hours
    let hoursCost = 0;
    if (searchParamsObj.hours >= 1) {
      if (
        searchParamsObj.hours * price.hour +
          searchParamsObj.minutes * price.minute >
        price.day
      ) {
        daysCost += price.day;
        searchParamsObj.hours = 0;
        searchParamsObj.minutes = 0;
      } else {
        hoursCost += searchParamsObj.hours * price.hour;
      }
    }
    //Minutes
    let minutesCost = 0;
    if (searchParamsObj.minutes >= 1) {
      minutesCost += searchParamsObj.minutes * price.minute;
    }

    if (searchParamsObj.distance < 0) {
      searchParamsObj.distance = 0;
    }
    // Distance
    let distanceCost = 0;
    if (monthsCost > 0 || weeksCost > 0) {
      // Extra distance cost
      distanceCost += searchParamsObj.distance * 0.1;
    } else if (searchParamsObj.distance > 100) {
      distanceCost += 100 * price.km + (searchParamsObj.distance - 100) * 0.1;
    } else {
      distanceCost += searchParamsObj.distance * price.km;
    }
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
}
