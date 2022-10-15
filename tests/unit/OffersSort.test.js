import OffersSort from "../../src/bll/OffersSort";
import { SortState } from "../../src/models/enums/SortState";
import { offersTestData } from "../helpers/OffersTestData";

describe("Offers sort", function () {
  const offersSort = new OffersSort();

  test("price in descending order", async () => {
    // ARRANGE
    const offers = offersTestData;

    // ACT
    const result = offersSort.sort(offers, SortState.DOWN, "price");

    // ASSERT
    expect(
      result.every(
        (offer, index) => index === 0 || offer.price <= result[index - 1].price
      ),
      `List is not in descending order \n received: ${JSON.stringify(result)}`
    ).toBe(true);
  });

  test("providers in ascending order", async () => {
    // ARRANGE
    const offers = offersTestData;

    // ACT
    const result = offersSort.sort(offers, SortState.UP, "provider");
    // ASSERT
    expect(
      result.every(
        (offer, index) =>
          index === 0 || offer.provider >= result[index - 1].provider
      ),
      `List is not in descending order \n received: ${JSON.stringify(result)}`
    ).toBe(true);
  });

  test("model names in descending order", async () => {
    // ARRANGE
    const offers = offersTestData;

    // ACT
    const result = offersSort.sort(offers, SortState.DOWN, "name");
    // ASSERT
    expect(
      result.every(
        (offer, index) =>
          index === 0 || offer.car.name <= result[index - 1].car.name
      ),
      `List is not in descending order \n received: ${JSON.stringify(result)}`
    ).toBe(true);
  });
});
