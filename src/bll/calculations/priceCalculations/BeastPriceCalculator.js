export default class BeastPriceCalculator {
  calculatePrice(car, searchParamsObj) {
    const price = car.price;
    let totalMinutes = searchParamsObj.minutes + searchParamsObj.hours * 60;
    // ---- Distance
    // Distance
    let freeDistance = searchParamsObj.days * 300;
    freeDistance += totalMinutes > 0 ? 300 : 0;
    let distanceCost = 0;
    if (searchParamsObj.distance > freeDistance) {
      distanceCost += (searchParamsObj.distance - freeDistance) * price.km;
    }
    // Weeks
    let weeksCost = 0;
    if (searchParamsObj.days >= 7) {
      const weeks = Math.floor(searchParamsObj.days / 7);
      searchParamsObj.days -= weeks * 7;
      weeksCost += weeks * price.week;
    }
    // 3Days
    let threeDaysCost = 0;
    if (searchParamsObj.days >= 3) {
      const threeDays = Math.floor(searchParamsObj.days / 3);
      searchParamsObj.days -= threeDays * 3;
      if (
        threeDays * price["3days"] +
          searchParamsObj.days * price.day +
          totalMinutes * price.minute >
        price.week
      ) {
        weeksCost += price.week;
        searchParamsObj.days = 0;
        totalMinutes = 0;
      } else {
        threeDaysCost += threeDays * price["3days"];
      }
    }
    // Days
    let daysCost = 0;
    if (searchParamsObj.days >= 1) {
      if (
        searchParamsObj.days * price.day + totalMinutes * price.minute >
        price["3days"]
      ) {
        threeDaysCost += price["3days"];
        totalMinutes = 0;
      } else {
        daysCost += searchParamsObj.days * price.day;
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
    if (totalMinutes > 0) {
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
    return weeksCost + threeDaysCost + daysCost + minutesCost + distanceCost;
  }
}
