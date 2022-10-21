export default class BeastPriceCalculator {
  calculatePrice(car, searchParamsObj) {
    const price = car.price;
    let totalMinutes = searchParamsObj.minutes + searchParamsObj.hours * 60;
    // ---- Distance
    // Distance
    let freeDistance = 0;
    // Weeks
    let weeksCost = 0;
    if (searchParamsObj.days >= 7) {
      const weeks = Math.floor(searchParamsObj.days / 7);
      searchParamsObj.days -= weeks * 7;
      weeksCost += weeks * price.week;
      freeDistance += weeks * 7 * 300;
    }
    // 3Days
    let threeDaysCost = 0;
    if (searchParamsObj.days >= 3) {
      const threeDays = Math.floor(searchParamsObj.days / 3);
      searchParamsObj.days -= threeDays * 3;
      const extraMinutes = this.calculateMinute(totalMinutes, price);
      if (
        threeDays * price["3days"] +
          searchParamsObj.days * price.day +
          extraMinutes.daysCost +
          extraMinutes.minutesCost >
        price.week
      ) {
        weeksCost += price.week;
        searchParamsObj.days = 0;
        totalMinutes = 0;
        freeDistance += 7 * 300;
      } else {
        threeDaysCost += threeDays * price["3days"];
        freeDistance += 3 * 300;
      }
    }
    // Days
    let daysCost = 0;
    if (searchParamsObj.days >= 1) {
      const extraMinutes = this.calculateMinute(totalMinutes, price);
      if (
        searchParamsObj.days * price.day +
          extraMinutes.daysCost +
          extraMinutes.minutesCost >
        price["3days"]
      ) {
        threeDaysCost += price["3days"];
        freeDistance += 3 * 300;
        totalMinutes = 0;
      } else {
        daysCost += searchParamsObj.days * price.day;
        freeDistance += searchParamsObj.days * 300;
      }
    }
    const shortRent = weeksCost === 0 && threeDaysCost === 0 && daysCost === 0;
    // Short Rent
    if (shortRent && totalMinutes < 30) {
      totalMinutes = 30;
    }
    const shortRentPrice =
      price.first30mins + (totalMinutes - 30) * price.minute;
    // Minutes
    let minutesCost = 0;
    const minutes = this.calculateMinute(
      totalMinutes,
      price,
      shortRent,
      shortRentPrice
    );
    freeDistance += minutes.freeDistance;
    daysCost += minutes.daysCost;
    minutesCost += minutes.minutesCost;

    const distanceCost =
      Math.max(searchParamsObj.distance - freeDistance, 0) * price.km;
    console.log(weeksCost, threeDaysCost, daysCost, minutesCost, distanceCost);
    return weeksCost + threeDaysCost + daysCost + minutesCost + distanceCost;
  }

  calculateMinute(totalMinutes, price, shortRent = false, shortRentPrice = 0) {
    let freeDistance = 0;
    let daysCost = 0;
    let minutesCost = 0;
    if (totalMinutes > 0) {
      freeDistance += 300;
      if (
        totalMinutes * price.minute > price.day ||
        (shortRent && shortRentPrice > price.day)
      ) {
        daysCost += price.day;
      } else if (shortRent) {
        minutesCost += shortRentPrice;
      } else {
        minutesCost += totalMinutes * price.minute;
      }
    }
    return { freeDistance, daysCost, minutesCost };
  }
}
