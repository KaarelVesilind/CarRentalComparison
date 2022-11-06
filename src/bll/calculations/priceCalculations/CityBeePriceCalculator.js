import { calculateTime } from "./helpers";
export default class CityBeePriceCalculator {
  calculatePrice(car, searchParamsObj) {
    const price = car.price;
    const distanceCost = searchParamsObj.distance * price.km;
    const totalTime =
      searchParamsObj.days * 24 * 60 +
      searchParamsObj.hours * 60 +
      searchParamsObj.minutes;
    // Time
    let { daysCost, hoursCost, minutesCost } = calculateTime(totalTime, price);
    const totalCost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost;
    if (totalCost < 2.29) {
      return 2.29;
    }
    // Calculate packages
    let usePackage = this._calculatePackages(
      car,
      totalCost,
      searchParamsObj,
      totalTime,
      price
    );
    return {
      package: usePackage,
      normalPrice: totalCost,
      price: usePackage.price < totalCost ? usePackage.price : totalCost,
    };
  }

  _calculatePackages(car, totalCost, searchParamsObj, totalTime, price) {
    const packages = car.packages;
    let usePackage = {
      days: 0,
      hours: 0,
      distance: 0,
      price: Number.MAX_SAFE_INTEGER,
    };
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
            let extraCostTime = calculateTime(extraTime, price);
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
}
