import { defineStore } from "pinia";
import OffersCalculator from "../bll/calculations/OffersCalculator";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    offers: [],
  }),
  actions: {
    setRentDetails(searchParamsObj) {
      const offersCalculator = new OffersCalculator();
      this.offers = offersCalculator.calculateOffers(searchParamsObj);
    },
  },
});
