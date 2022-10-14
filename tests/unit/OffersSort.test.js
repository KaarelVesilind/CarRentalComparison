import OffersSort from "../../src/bll/OffersSort";
import { SortState } from "../../src/models/enums/SortState";

describe("Offers sort", function () {
  const offersSort = new OffersSort();

  test("price in descending order", async () => {
    // ARRANGE
    const offers = [...Array(10)].map(() => {
      return {
        price: Math.floor(Math.random() * 10000),
      };
    });

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
});
