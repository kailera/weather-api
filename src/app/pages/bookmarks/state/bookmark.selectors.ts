import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookmarkState } from "./bookmark.reducer";

export const selectBookmark = createFeatureSelector('bookmark');

export const selectBookmarkList = createSelector(
    selectBookmark,
    (bookmarkState:BookmarkState) => bookmarkState.list

)