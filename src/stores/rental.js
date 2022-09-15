import { defineStore } from "pinia";
import { beast } from "@/providers/shortTerm/beast";
import { bolt } from "@/providers/shortTerm/bolt";
import { citybee } from "@/providers/shortTerm/citybee";
import { elmo } from "@/providers/shortTerm/elmo";

const providers = { beast, bolt, citybee, elmo };

export const useStore = defineStore({
  id: "store",
  state: () => ({
    offers: [],
  }),
  actions: {
    setRentDetails({
      distance,
      days,
      hours,
      minutes,
      showTraditional,
      start,
      end,
    }) {
      this.offers = calculateOffers(
        distance,
        days,
        hours,
        minutes,
        showTraditional,
        start,
        end
      );
    },
  },
});

function calculateOffers(
  distance,
  days,
  hours,
  minutes,
  showTraditional,
  start,
  end
) {
  let offers = [];
  for (const provider in providers) {
    if (
      providers[provider].cities.includes(start) &&
      providers[provider].cities.includes(end)
    ) {
      for (const car of providers[provider].cars) {
        let price = calculatePrice(
          provider,
          car,
          distance,
          days,
          hours,
          minutes
        );
        let extraInfo = "";
        if (provider === "elmo") {
          extraInfo = car.cars.join(", ");
        }
        if (typeof price !== "number" && provider === "citybee") {
          const daysText = price.days > 0 ? price.days + " days " : "";
          const hoursText = price.hours > 0 ? price.hours + " hours " : "";
          extraInfo = `Use package: ${daysText}${hoursText}${price.distance} km`;
          price = price.price;
        }
        offers.push({
          id: offers.length + 1,
          price: price.toFixed(2),
          car: car.name,
          provider: provider.toUpperCase(),
          extraInfo: extraInfo,
        });
      }
    }
  }
  return offers.sort((a, b) => a.price - b.price);
}

function calculatePrice(provider, car, distance, days, hours, minutes) {
  switch (provider) {
    case "elmo":
      return calculateElmoPrice(car, distance, days, hours, minutes);
    case "beast":
      return calculateBeastPrice(car, distance, days, hours, minutes);
    case "bolt":
      return calculateBoltPrice(car, distance, days, hours, minutes);
    case "citybee":
      return calculateCityBeePrice(car, distance, days, hours, minutes);
  }
}
// --------------------- CITYBEE ---------------------
function calculateCityBeePrice(car, distance, days, hours, minutes) {
  const price = car.price;
  const distanceCost = distance * price.km;
  const totalTime = days * 24 + hours + minutes / 60;
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
  const totalCost = 0.5 + distanceCost + daysCost + hoursCost + minutesCost;
  if (totalCost < 2.29) {
    return 2.29;
  }
  // Calculate packages
  const packages = car.packages;
  let usePackage = {
    days: 0,
    hours: 0,
    distance: 0,
    price: Number.MAX_SAFE_INTEGER,
  };
  for (const option of packages) {
    const packageTotalTime = option.days * 24 + option.hours;
    if (option.price < totalCost) {
      // if fits exactly in the package
      if (
        distance <= option.distance &&
        totalTime <= packageTotalTime &&
        option.price < usePackage.price
      ) {
        usePackage = { ...option };
      }
      // if fits in the package with some extra time or distance
      else {
        let packageCostExtra = option.price;
        // Add extra distance
        if (distance > option.distance) {
          packageCostExtra += (distance - option.distance) * price.km;
        }
        // Add extra time
        if (totalTime > packageTotalTime) {
          packageCostExtra +=
            (totalTime - packageTotalTime) * 60 * price.minute;
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
  if (usePackage.days > 0 || usePackage.hours > 0 || usePackage.distance > 0) {
    return usePackage;
  } else {
    return totalCost;
  }
}

// --------------------- BOLT ---------------------
function calculateBoltPrice(car, distance, days, hours, minutes) {
  const price = car.price;

  const distanceCost = distance * price.km;
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
  const totalCost = distanceCost + daysCost + hoursCost + minutesCost;
  if (totalCost < 1.99) {
    return 1.99;
  } else {
    return totalCost;
  }
}

//--------------------- BEAST ---------------------
function calculateBeastPrice(car, distance, days, hours, minutes) {
  const price = car.price;
  let totalMinutes = minutes + hours * 60;
  // ---- Distance
  // Distance
  let freeDistance = days * 300;
  freeDistance += totalMinutes > 0 ? 300 : 0;
  let distanceCost = 0;
  if (distance > freeDistance) {
    distanceCost += (distance - freeDistance) * price.km;
  }
  // Weeks
  let weeksCost = 0;
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    days -= weeks * 7;
    weeksCost += weeks * price.week;
  }
  // 3Days
  let threeDaysCost = 0;
  if (days >= 3) {
    const threeDays = Math.floor(days / 3);
    days -= threeDays * 3;
    if (
      threeDays * price["3days"] +
        days * price.day +
        totalMinutes * price.minute >
      price.week
    ) {
      weeksCost += price.week;
      days = 0;
      totalMinutes = 0;
    } else {
      threeDaysCost += threeDays * price["3days"];
    }
  }
  // Days
  let daysCost = 0;
  if (days >= 1) {
    if (days * price.day + totalMinutes * price.minute > price["3days"]) {
      threeDaysCost += price["3days"];
    } else {
      daysCost += days * price.day;
    }
  }
  const shortRent = weeksCost === 0 && threeDaysCost === 0 && daysCost === 0;
  const shortRentPrice = price.first30mins + (totalMinutes - 30) * price.minute;
  // Minutes
  let minutesCost = 0;
  if (totalMinutes > 0 || shortRent) {
    if (
      totalMinutes * price.minute > price.day ||
      (shortRent && shortRentPrice > price.day)
    ) {
      daysCost += price.day;
    } else {
      if (shortRent) {
        if (totalMinutes < 30) {
          totalMinutes = 30;
        }
        minutesCost += shortRentPrice;
      } else {
        minutesCost += totalMinutes * price.minute;
      }
    }
  }

  return weeksCost + threeDaysCost + daysCost + minutesCost + distanceCost;
}

//--------------------- ELMO ---------------------

function calculateElmoPrice(car, distance, days, hours, minutes) {
  const price = car.price;

  //Months
  let monthsCost = 0;
  if (days >= 30) {
    const months = Math.floor(days / 30);
    monthsCost += months * price.month;
    days -= months * 30;
    distance -= months * 3000;
  }
  // Weeks
  let weeksCost = 0;
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    days -= weeks * 7;
    if (
      weeks * price.week +
        days * price.day +
        hours * price.hour +
        minutes * price.minute >
      price.month
    ) {
      monthsCost += price.month;
      distance -= 3000;
      days = 0;
      hours = 0;
      minutes = 0;
    } else {
      weeksCost += weeks * price.week;
      distance -= weeks * 700;
    }
  }
  //Days
  let daysCost = 0;
  if (days >= 1) {
    if (
      days * price.day + hours * price.hour + minutes * price.minute >
      price.week
    ) {
      weeksCost += price.week;
      distance -= 700;
      days = 0;
      hours = 0;
      minutes = 0;
    } else {
      daysCost += days * price.day;
    }
  }
  //Hours
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
  //Minutes
  let minutesCost = 0;
  if (minutes >= 1) {
    minutesCost += minutes * price.minute;
  }

  if (distance < 0) {
    distance = 0;
  }
  // Distance
  let distanceCost = 0;
  if (distance > 100) {
    distanceCost += 100 * price.km + (distance - 100) * 0.1;
  } else {
    distanceCost += distance * price.km;
  }
  return (
    monthsCost + weeksCost + daysCost + hoursCost + minutesCost + distanceCost
  );
}
