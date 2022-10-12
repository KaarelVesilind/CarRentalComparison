import BeastPriceCalculator from "../../../src/bll/calculations/priceCalculations/BeastPriceCalculator";
import {beast} from "../../../src/providers/shortTerm/beast";

describe("Beast price calculator", function () {

    const beastPriceCalculator = new BeastPriceCalculator();

    test("Tesla Model 3 Standard Range - 30min", async () => {
        // ARRANGE
        const car = beast.cars.find(car => car.name === "Tesla Model 3 Standard Range");
        const searchParamsObj = {
            distance: 0,
            days: 1,
            hours: 0,
            minutes: 30,
        }

        // ACT
        const result = beastPriceCalculator.calculatePrice(car, searchParamsObj)

        // ASSERT
        expect(result).toBe(14.99);
    })


})
