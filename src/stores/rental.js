import { defineStore } from "pinia";
import { providers } from "./db";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    distance: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    offers: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setRentDetails({ distance, days, hours, minutes }) {
      this.distance = distance;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.offers = calculateOffers(distance, days, hours, minutes);
    },
  },
});

function calculateOffers(distance, days, hours, minutes) {
  let offers = [];
  for (const provider in providers) {
    for (const car of providers[provider]) {
      let price = calculatePrice(provider, car, distance, days, hours, minutes);
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
        console.log(option);
        usePackage = option;
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
        if (packageCostExtra < cost) {
          usePackage = option;
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
  // Distance
  const freeDistance = days > 0 ? days * 300 : 300;
  if (distance > freeDistance) {
    cost += (distance - freeDistance) * price.km;
  }
  // Time
  if (days * price.day > price.week) {
    cost += price.week;
  } else if (days * price.day > price["3days"]) {
    cost += price["3days"];
  } else {
    cost += days * price.day;
  }
  let totalMinutes = minutes + hours * 60;
  if (totalMinutes < 30) {
    totalMinutes = 30;
  }
  const minuteCost = price.minute * (totalMinutes - 30) + price.first30mins;
  if (minuteCost > price.day) {
    cost += price.day;
  } else {
    cost += minuteCost;
  }
  return cost;
}

//--------------------- ELMO ---------------------

function calculateElmoPrice(car, distance, days, hours, minutes) {
  const price = car.price;
  let cost = 0;
  // Distance
  if (distance > 100) {
    cost = +100 * price.km + (distance - 100) * 0.1;
  } else {
    cost = distance * price.km;
  }
  // Time
  cost += days * price.day;
  if (hours * price.hour > price.day) {
    cost += price.day;
  } else {
    cost += hours * price.hour;
  }
  cost += minutes * price.minute;
  if (car.name === "Rent5" && cost < 30) {
    cost = 30;
  }
  return cost;
}
