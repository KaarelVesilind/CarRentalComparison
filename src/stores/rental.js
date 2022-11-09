import { defineStore } from "pinia";
import SearchParamsObj from "@/models/SearchParamsObj";
import FilterConditionsObj from "@/models/FilterConditionsObj";
import { SortState } from "@/models/enums/SortState";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    offers: [],
    searchParamsObj: JSON.parse(JSON.stringify(SearchParamsObj)),
    filterConditionsObj: JSON.parse(JSON.stringify(FilterConditionsObj)),
    sortParamsObj: {
      sortState: SortState.UP,
      sortingFieldName: "price",
    },
  }),
  actions: {},
});
