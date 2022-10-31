import { elmo } from "../../../src/providers/shortTerm/elmo";
import ElmoPriceCalculator from "../../../src/bll/calculations/priceCalculations/ElmoPriceCalculator";
describe("Elmo price calculator", function () {
  const elmoPriceCalculator = new ElmoPriceCalculator();

  test("Volkswagen e-Up!'19 - 3801km 38day 1h 1min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Volkswagen e-Up!'19");
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
    expect(Number(result.toFixed(2))).toBe(974.81);
  });

  test("Volkswagen e-Up!'19 - 28day ", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Volkswagen e-Up!'19");
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
  test("Volkswagen e-Up!'19 -  6day 23h 59min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Volkswagen e-Up!'19");
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

  test("Volkswagen e-Up!'19 -  23h 59min", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Volkswagen e-Up!'19");
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
    expect(Number(result.toFixed(2))).toBe(33);
  });

  test("Volkswagen e-Up!'19 -  23h 59min 101km", async () => {
    // ARRANGE
    const car = elmo.cars.find((car) => car.name === "Volkswagen e-Up!'19");
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
    expect(Number(result.toFixed(2))).toBe(53.1);
  });
});
