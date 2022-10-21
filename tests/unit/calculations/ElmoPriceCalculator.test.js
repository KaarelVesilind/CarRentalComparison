import { elmo } from "../../../src/providers/shortTerm/elmo";
import ElmoPriceCalculator from "../../../src/bll/calculations/priceCalculations/ElmoPriceCalculator";
describe("Elmo price calculator", function () {
  const elmoPriceCalculator = new ElmoPriceCalculator();

  test("Rent 1 - 3801km 38day 1h 1min", async () => {
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

  test("Rent 1 -  28day ", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Rent1");
    const searchParamsObj = {
      distance: 0,
      days: 28,
      hours: 0,
      minutes: 0,
    };

    // ACT
    let result = elmoPriceCalculator.calculatePrice(car, searchParamsObj);
    result = result.price ?? result;

    // ASSERT
    expect(Number(result.toFixed(2))).toBe(700);
  });
  test("Rent 1 -  6day 23h 59min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Rent1");
    const searchParamsObj = {
      distance: 0,
      days: 6,
      hours: 23,
      minutes: 59,
    };

    // ACT
    let result = elmoPriceCalculator.calculatePrice(car, searchParamsObj);
    result = result.price ?? result;
    // ASSERT
    expect(Number(result.toFixed(2))).toBe(225);
  });

  test("Rent 1 -  23h 59min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Rent1");
    const searchParamsObj = {
      distance: 0,
      days: 0,
      hours: 23,
      minutes: 59,
    };

    // ACT
    let result = elmoPriceCalculator.calculatePrice(car, searchParamsObj);
    result = result.price ?? result;
    // ASSERT
    expect(Number(result.toFixed(2))).toBe(30);
  });

  test("Rent 1 -  23h 59min 101km", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Rent1");
    const searchParamsObj = {
      distance: 101,
      days: 0,
      hours: 23,
      minutes: 59,
    };

    // ACT
    let result = elmoPriceCalculator.calculatePrice(car, searchParamsObj);
    result = result.price ?? result;
    // ASSERT
    expect(Number(result.toFixed(2))).toBe(50.1);
  });
});
