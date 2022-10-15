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

  test("motorType ELECTRIC", async () => {
    // ARRANGE
    const expectedOffersIds = [4, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    filterConditionsObj.motor.ELECTRIC = true;

    // ACT
    const result = offersFilter.filter(offers, filterConditionsObj);

    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("betFriendly true", async () => {
    // ARRANGE
    const expectedOffersIds = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    filterConditionsObj.petFriendly = true;

    // ACT
    const result = offersFilter.filter(offers, filterConditionsObj);

    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });
});
