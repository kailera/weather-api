import { Action, createReducer, on } from "@ngrx/store";
import { Bookmark } from "src/app/shared/models/bookmark.model";

import * as fromHomeActions from '../../home/state/home.actions';
import * as fromBookmarkActions from './bookmark.actions';

export interface BookmarkState{
    list: Bookmark[];
}

export const bookmarkInitialState = {
    list : []
}

const reducer = createReducer(
    bookmarkInitialState,
    on(fromHomeActions.toogleBookmark, (state,{ entity})=>({
        ...state,
        list:toogleBookmark(state.list, entity)
    })),
    on(fromBookmarkActions.removeBookmark,(state, { id })=>({
        ...state,
        list: state.list.filter(b => b.id !== id)
    }))
);

export function bookmarkReducer(state: BookmarkState | undefined, action: Action ){
    return  reducer(state, action)
}

function toogleBookmark(list: Bookmark[], entity: Bookmark):Bookmark[]{
    if (!!list.find(bookmark => bookmark.id === entity.id)) {
        return list.filter(bookmark => bookmark.id !== entity.id)
    }
    return [...list, entity]
}