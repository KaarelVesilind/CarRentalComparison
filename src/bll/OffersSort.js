import { SortState } from "../../src/models/enums/SortState";

export default class OffersSort {
  sort(offers, sortState, fieldName) {
    if (sortState === SortState.NONE) return offers;

    switch (fieldName) {
      case "price":
        offers.sort((offer1, offer2) => offer1.price - offer2.price);
        break;
      case "provider":
        offers.sort((offer1, offer2) =>
          offer1.provider.localeCompare(offer2.provider)
        );
        break;
      case "name":
        offers.sort((offer1, offer2) =>
          offer1.car.name.localeCompare(offer2.car.name)
        );
        break;
      case "gearBox":
        offers.sort((offer1, offer2) =>
          offer1.car.gearBox.localeCompare(offer2.car.gearBox)
        );
        break;
      // TODO bodyType
    }

    if (sortState === SortState.DOWN) offers.reverse();

    return offers;
  }
}
