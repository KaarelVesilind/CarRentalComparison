import OffersFilter from "../../src/bll/OffersFilter";
import { offersTestData } from "../helpers/OffersTestData";
import filterConditionsObj from "../../src/models/FilterConditionsObj";

describe("Offers filter", function () {
  const offersFilter = new OffersFilter();

  test("bodyType HATCHBACK", async () => {
    // ARRANGE
    const expectedOffersIds = [4, 1, 5, 11, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.bodyType.HATCHBACK = true;

    // ACT
    const result = offersFilter.filter(offers, conditionsObj);

    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("motorType ELECTRIC", async () => {
    // ARRANGE
    const expectedOffersIds = [4, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.motorType.ELECTRIC = true;

    // ACT
    const result = offersFilter.filter(offers, conditionsObj);
    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("petFriendly true", async () => {
    // ARRANGE
    const expectedOffersIds = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.petFriendly = true;

    // ACT
    const result = offersFilter.filter(offers, conditionsObj);
    // ASSERT
    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("gearBox MANUAL", async () => {
    const expectedOffersIds = [6];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.gearBox.MANUAL = true;

    const result = offersFilter.filter(offers, conditionsObj);

    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("it should filter by motorType ELECTRIC and HYBRID", async () => {
    const expectedOffersIds = [1, 4, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.motorType.ELECTRIC = true;
    conditionsObj.motorType.HYBRID = true;
    conditionsObj.petFriendly = true;

    const result = offersFilter.filter(offers, conditionsObj);

    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("provider elmo", async () => {
    const expectedOffersIds = [11, 12, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));
    conditionsObj.provider.elmo = true;

    const result = offersFilter.filter(offers, conditionsObj);

    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

  test("no filter", async () => {
    const expectedOffersIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const offers = offersTestData;
    const conditionsObj = JSON.parse(JSON.stringify(filterConditionsObj));

    const result = offersFilter.filter(offers, conditionsObj);

    expect(result.map((offer) => offer.id).sort()).toEqual(
      expectedOffersIds.sort()
    );
  });

});
