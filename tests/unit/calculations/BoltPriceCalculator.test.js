import { bolt } from "../../../src/providers/shortTerm/bolt";
import BoltPriceCalculator from "../../../src/bll/calculations/priceCalculations/BoltPriceCalculator";
describe("Beast price calculator", function () {
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
});
