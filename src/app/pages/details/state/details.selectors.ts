import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DetailsState } from "./details.reducer";

export const selectDetailsState = createFeatureSelector<DetailsState>('details');

export const selectDetailsEntity = createSelector(
    selectDetailsState,
    (detailsstate:DetailsState) => detailsstate.entity,
);

export const selectDetailsLoading = createSelector(
    selectDetailsState,
    (detailsstate: DetailsState) => detailsstate.loading,
);

export const selectDetailsFailure = createSelector(
    selectDetailsState,
    (detailsstate: DetailsState) => detailsstate.error,
)
