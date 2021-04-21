import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Units } from 'src/app/shared/models/units.model';
import { AppState } from 'src/app/shared/state/app.reducer';


import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import * as fromConfigActions from '../../../../shared/state/config/config.actions';
@Component({
  selector: 'app-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.css']
})
export class UnitSelectorComponent implements OnInit {

  units$: Observable<Units>;
  unit: Units;

  unitsEnum = Units;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.units$ = this.store.pipe(select(fromConfigSelectors.selectConfigUnit));
    this.units$
      .subscribe(unit => this.unit = unit);
  }
  updateUnit(unit: Units){
    this.store.dispatch(fromConfigActions.updateUnit({ unit }));
  }

}
