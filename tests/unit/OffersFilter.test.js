import OffersFilter from "../../src/bll/OffersFilter";
import { offersTestData } from "../helpers/OffersTestData";
import { filterConditionsObj } from "../../src/models/FilterConditionsObj";

describe("Offers filter", function () {
  const offersFilter = new OffersFilter();

  test("bodyType HATCHBACK", async () => {
    // ARRANGE
    const expectedOffersIds = [4, 1, 5, 11, 13];
    const offers = offersTestData;
    filterConditionsObj.bodyType.HATCHBACK = true;

    // ACT
    const result = offersFilter.filter(offers, filterConditionsObj);

    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });
});
