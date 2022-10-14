import { bolt } from "../../src/providers/shortTerm/bolt";
import OffersSort from "../../src/bll/OffersSort";
import { SortState } from "../../src/models/enums/SortState";

describe("Offers sort", function () {
  const offersSort = new OffersSort();

  test("price in descending order", async () => {
    // ARRANGE
    const offers = bolt.cars.map((car, index) => {
      return { price: index };
    });

    // ACT
    const result = offersSort.sort(offers, SortState.DOWN, "price");

    // ASSERT
    expect(
      result.every((offer, index) => result[index].price > offer.price),
      `List is not in descending order \n received: ${JSON.stringify(result)}`
    ).toBe(true);
  });
});
