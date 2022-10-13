import { beast } from "@/providers/shortTerm/beast";
import { bolt } from "@/providers/shortTerm/bolt";
import { citybee } from "@/providers/shortTerm/citybee";
import { elmo } from "@/providers/shortTerm/elmo";
import BeastPriceCalculator from "./priceCalculations/BeastPriceCalculator";
import BoltPriceCalculator from "./priceCalculations/BoltPriceCalculator";
import CityBeePriceCalculator from "./priceCalculations/CityBeePriceCalculator";
import ElmoPriceCalculator from "./priceCalculations/ElmoPriceCalculator";

export default class OffersCalculator {
  providers = { beast, bolt, citybee, elmo };

  calculateOffers(searchParamsObj) {
    let offers = [];
    for (const provider in this.providers) {
      if (
        this.providers[provider].cities.includes(searchParamsObj.start) &&
        this.providers[provider].cities.includes(searchParamsObj.end)
      ) {
        for (const car of this.providers[provider].cars) {
          let price = this._calculatePrice(provider, car, searchParamsObj);
          let extraInfo = "";
          ({ extraInfo, price } = this._addExtraInfo(
            provider,
            extraInfo,
            car,
            price
          ));

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

  _addExtraInfo(provider, extraInfo, car, price) {
    if (provider === "elmo") {
      extraInfo = car.cars.join(", ");
    }
    if (provider === "citybee") {
      if (typeof price === "object") {
        const daysText = price.days > 0 ? price.days + " days " : "";
        const hoursText = price.hours > 0 ? price.hours + " hours " : "";
        extraInfo += `Use package: ${daysText}${hoursText}${price.distance} km `;
        price = price.price;
      }
      const cashback = price * 0.07;
      extraInfo += `| Cashback ${cashback.toFixed(2)}€ `;
    }
    return { extraInfo, price };
  }

  _calculatePrice(provider, car, searchParamsObj) {
    switch (provider) {
      case "elmo": {
        const elmoPriceCalculator = new ElmoPriceCalculator();
        return elmoPriceCalculator.calculatePrice(car, searchParamsObj);
      }
      case "beast": {
        const beastPriceCalculator = new BeastPriceCalculator();
        return beastPriceCalculator.calculatePrice(car, searchParamsObj);
      }
      case "bolt": {
        const boltPriceCalculator = new BoltPriceCalculator();
        return boltPriceCalculator.calculatePrice(car, searchParamsObj);
      }
      case "citybee": {
        const cityBeePriceCalculator = new CityBeePriceCalculator();
        return cityBeePriceCalculator.calculatePrice(car, searchParamsObj);
      }
    }
  }
}
