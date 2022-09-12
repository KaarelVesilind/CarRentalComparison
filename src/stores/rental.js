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
  let cost = 0.5;
  cost += distance * price.km;
  // Time
  cost += days * price.day;
  if (hours * price.hour > price.day) {
    cost += price.day;
  } else {
    cost += hours * price.hour;
  }
  if (minutes * price.minute > price.hour) {
    cost += price.hour;
  } else {
    cost += minutes * price.minute;
  }
  if (cost < 2.29) {
    cost = 2.29;
  }
  // Calculate packages
  const packages = car.packages;
  let usePackage = {
    days: 0,
    hours: 0,
    distance: 0,
    price: Number.MAX_SAFE_INTEGER,
  };
  const totalTime = days * 24 + hours + minutes / 60;
  for (const option of packages) {
    const packageTotalTime = option.days * 24 + option.hours;
    if (option.price < cost) {
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
        if (packageCostExtra < cost && packageCostExtra < usePackage.price) {
          usePackage = { ...option };
          usePackage.price = packageCostExtra;
        }
      }
    }
  }
  if (usePackage.days > 0 || usePackage.hours > 0 || usePackage.distance > 0) {
    return usePackage;
  } else {
    return cost;
  }
}

// --------------------- BOLT ---------------------
function calculateBoltPrice(car, distance, days, hours, minutes) {
  const price = car.price;
  let cost = 0;
  cost += distance * price.km;
  // Time
  cost += days * price.day;
  if (hours * price.hour > price.day) {
    cost += price.day;
  } else {
    cost += hours * price.hour;
  }
  if (minutes * price.minute > price.hour) {
    cost += price.hour;
  } else {
    cost += minutes * price.minute;
  }
  if (cost < 1.99) {
    cost = 1.99;
  }
  return cost;
}

//--------------------- BEAST ---------------------
function calculateBeastPrice(car, distance, days, hours, minutes) {
  const price = car.price;
  let cost = 0;
  // ---- Time
  // Weeks
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    cost += weeks * price.week;
    days -= weeks * 7;
  }
  // Days
  if (days * price.day > price.week) {
    cost += price.week;
  } else if (days * price.day > price["3days"]) {
    cost += price["3days"];
  } else {
    cost += days * price.day;
  }
  // Minutes
  let totalMinutes = minutes + hours * 60;
  let minuteCost = 0;
  // if rent under one day
  if (days === 0) {
    if (totalMinutes > 30) {
      totalMinutes -= 30;
    } else {
      totalMinutes = 30;
    }
    minuteCost = price.minute * (totalMinutes - 30) + price.first30mins;
    // if rent longer than one day
  } else {
    minuteCost = price.minute * totalMinutes;
  }
  if (minuteCost > price.day) {
    cost += price.day;
    days += 1;
  } else {
    cost += minuteCost;
  }
  // ---- Distance
  // Distance
  let freeDistance = days * 300;
  freeDistance += totalMinutes > 0 ? 300 : 0;
  if (distance > freeDistance) {
    cost += (distance - freeDistance) * price.km;
  }

  return cost;
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
