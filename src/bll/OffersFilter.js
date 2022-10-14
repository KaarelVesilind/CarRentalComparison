export default class OffersFilter {
  filter(offers, filterConditionsObj) {
    let filteredOffers = [...offers];

    for (const condition in filterConditionsObj) {
      switch (condition) {
        case "bodyType":
          filteredOffers = this._searchBodyTypes(
            filteredOffers,
            filterConditionsObj[condition]
          );
          break;
        // TODO cargo, petFriendly, gearBox, provider
      }
    }

    return filteredOffers;
  }

  _searchBodyTypes(offers, value) {
    const haveSomeBodyType = Object.values(value).some((bodyType) => bodyType);
    if (!haveSomeBodyType) return offers;
    return offers.filter((offer) => value[offer.car.bodyType]);
  }
}
