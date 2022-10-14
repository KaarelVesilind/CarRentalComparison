import OffersFilter from "../../src/bll/OffersFilter";
import { bolt } from "../../src/providers/shortTerm/bolt";
import { filterConditionsObj } from "../../src/models/FilterConditionsObj";

describe("Offers filter", function () {
  const offersFilter = new OffersFilter();

  test("bodyType HATCHBACK count", async () => {
    // ARRANGE
    const offers = bolt.cars.map((car) => {
      return { car };
    });
    const _filterConditionsObj = JSON.parse(
      JSON.stringify(filterConditionsObj)
    );
    _filterConditionsObj.bodyType.HATCHBACK = true;

    // ACT
    const result = offersFilter.filter(offers, _filterConditionsObj);

    // ASSERT
    expect(result.length).toBe(7);
  });
});
