import { elmo } from "../../../src/providers/shortTerm/elmo";
import ElmoPriceCalculator from "../../../src/bll/calculations/priceCalculations/ElmoPriceCalculator";
describe("Elmo price calculator", function () {
  const elmoPriceCalculator = new ElmoPriceCalculator();

  test("Rent 1 - 101km 1day 1h 1min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Rent1");
    const searchParamsObj = {
      distance: 3801,
      days: 38,
      hours: 1,
      minutes: 1,
    };

    // ACT
    let result = elmoPriceCalculator.calculatePrice(car, searchParamsObj);
    result = result.price ?? result;

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(971.81);
  });
});
