import { PayloadAction } from "@reduxjs/toolkit";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState: FilterSliceState = {
  //   status: "All",
  status: StatusFilters.All,
  colors: [],
};

export default function filtersReducer(
  state = initialState,
  action: FilterAction
) {
  switch (action.type) {
    case "filters/statusFilterChanged": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}

/* Types */
type FilterSliceState = {
  status: FilterStatus;
  colors: string[];
};

type FilterStatus = (typeof StatusFilters)[keyof typeof StatusFilters];

// Action types
type FilterAction = PayloadAction<string, "filters/statusFilterChanged">;
