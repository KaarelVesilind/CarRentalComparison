import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "counter",
  state: () => ({
    distance: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    offers: [
      {
        id: 1,
        price: 1.2,
        car: "Audi A3",
        //image: "https://i.imgur.com/8Q3ZQ2M.jpg",
        provider: "Hertz",
      },
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setRentDetails(distance, days, hours, minutes) {
      this.distance = distance;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.calculateOffers();
    },
    calculateOffers() {
      return null;
    },
  },
});
