import { bolt } from "../../../src/providers/shortTerm/bolt";
import BoltPriceCalculator from "../../../src/bll/calculations/priceCalculations/BoltPriceCalculator";
describe("Bolt price calculator", function () {
  const boltPriceCalculator = new BoltPriceCalculator();

  test("Volkswagen T-Roc - 30min", async () => {
    // ARRANGE
    const car = bolt.cars.find((car) => car.name === "VW T-Roc");
    const searchParamsObj = {
      distance: 0,
      days: 0,
      hours: 0,
      minutes: 30,
    };

    // ACT
    const result = boltPriceCalculator.calculatePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(4.5);
  });
  test("Volkswagen T-Roc - 1day 9h 50min", async () => {
    // ARRANGE
    const car = bolt.cars.find((car) => car.name === "VW T-Roc");
    const searchParamsObj = {
      distance: 0,
      days: 1,
      hours: 9,
      minutes: 50,
    };

    // ACT
    const result = boltPriceCalculator.calculatePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(61.8);
  });
  test("Volkswagen T-Roc -  2h 50min", async () => {
    // ARRANGE
    const car = bolt.cars.find((car) => car.name === "VW T-Roc");
    const searchParamsObj = {
      distance: 0,
      days: 0,
      hours: 2,
      minutes: 50,
    };

    // ACT
    const result = boltPriceCalculator.calculatePrice(car, searchParamsObj);

    // ASSERT
    expect(result).toBe(20.37);
  });
});
