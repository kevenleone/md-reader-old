import { createContext } from "react";

import { ActionMap } from "@/types";

export enum SearchTypes {
  CHANGE_PAGE = "CHANGE_PAGE",
  CHANGE_PAGE_SIZE = "CHANGE_PAGE_SIZE",
  CLEAR = "CLEAR",
  REMOVE_FILTER = "REMOVE_FILTER",
  SEARCH = "SEARCH",
  SORT = "SORT",
  UPDATE_FILTERS_AND_SORT = "UPDATE_FILTERS_AND_SORT",
}

export type ActionsPayload = {
  [SearchTypes.CLEAR]: null;
  [SearchTypes.CHANGE_PAGE]: number;
  [SearchTypes.CHANGE_PAGE_SIZE]: number;
  [SearchTypes.REMOVE_FILTER]: string;
  [SearchTypes.SORT]: string;
  [SearchTypes.SEARCH]: string;
  [SearchTypes.UPDATE_FILTERS_AND_SORT]: {
    filters: any;
    sort: string;
  };
};

type InitialState = {
  filters: any;
  keywords: string;
  page: number;
  pageSize: number;
  sort: string;
};

export type SearchActions =
  ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

const initialState = {
  filters: {},
  keywords: "",
  page: 1,
  pageSize: 20,
  sort: "",
};

const reducer = (state: InitialState, action): InitialState => {
  switch (action.type) {
    case SearchTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SearchTypes.CHANGE_PAGE_SIZE:
      return {
        ...state,
        page: 0,
        pageSize: action.payload,
      };
    case SearchTypes.CLEAR:
      return {
        ...state,
        filters: {},
        keywords: "",
      };
    case SearchTypes.REMOVE_FILTER: {
      const { filterKey } = action;
      const updatedFilters = { ...state.filters };

      delete updatedFilters[filterKey];

      return {
        ...state,
        filters: updatedFilters,
      };
    }
    case SearchTypes.SEARCH:
      return {
        ...state,
        keywords: action.payload,
        page: 0,
      };
    case SearchTypes.SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SearchTypes.UPDATE_FILTERS_AND_SORT:
      return {
        ...state,
        filters: action.payload.filters,
        page: 0,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
};

const SearchContext = createContext<
  [InitialState, (param: SearchActions) => void]
>([initialState, null]);

export { reducer };
export default SearchContext;
