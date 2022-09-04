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
      // if (provider === "citybee") {
      //   price = price[0];
      //   extraInfo = price[1]; citybee packages
      // }
      offers.push({
        id: offers.length + 1,
        price: price
          ? calculatePrice(
              provider,
              car,
              distance,
              days,
              hours,
              minutes
            ).toFixed(2)
          : 99999999999,
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
  // TODO price packages
  return cost;
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
