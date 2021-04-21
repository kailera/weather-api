import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

import * as fromBookmarkActions from '../../state/bookmark.actions';
import * as fromBookmarksSelectors from '../../state/bookmark.selectors';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.css']
})
export class BookmarksPage implements OnInit {

  bookmarks$: Observable<Bookmark[]>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.bookmarks$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarkList));
  }

  removeBookmark(id:number){
    this.store.dispatch(fromBookmarkActions.removeBookmark({ id }))
  }
}
