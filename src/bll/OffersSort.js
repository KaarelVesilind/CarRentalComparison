import { SortState } from "../../src/models/enums/SortState";

export default class OffersSort {
  sort(offers, sortState, fieldName) {
    if (sortState === SortState.NONE) return offers;

    switch (fieldName) {
      case "price":
        offers.sort((offer1, offer2) => offer1.price - offer2.price);
        break;
      // TODO provider, mark, model, bodyType, gearbox
    }

    if (sortState === SortState.DOWN) offers.reverse();

    return offers;
  }
}
