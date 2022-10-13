
export default class OffersFilter {
  filter(offers, filterConditionsObj) {
    let filteredOffers = [...offers];

    for (const condition in filterConditionsObj) {
      switch (condition) {
        case "bodyType":
          filteredOffers = this._searchOffers(
            filteredOffers,
            filterConditionsObj[condition]
          );
          break;
      }
    }

    return filteredOffers;
  }

  _searchOffers(offers, value) {
    if (!value) return offers;
    return offers.filter((offer) => offer.car.bodyType === value);
  }
}
