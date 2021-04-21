import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { WheaterService } from "../../../shared/services/wheater.service";

import * as fromRouterSelectors from '../../../shared/state/router/router.selectors';
import * as fromDetailsActions from '../../../pages/details/state/details.actions';
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { Params } from "@angular/router";

@Injectable()
export class DetailsEffects{
    loadCurrentWeather$ = createEffect(()=> this.actions$
        .pipe(
            ofType(fromDetailsActions.loadWeatherDetails),
            withLatestFrom(this.store.pipe(select(fromRouterSelectors.selectRouterQueryParams))),
            mergeMap(([, queryParams]: [any, Params]) => 
                combineLatest([
                    this.weatherservice.getcityWeatherByCoord(queryParams.lat, queryParams.lon),
                    this.weatherservice.getWeatherDetails(queryParams.lat, queryParams.lon), 
                ])
            ),
            catchError((err, caught$) =>{
                this.store.dispatch(fromDetailsActions.loadWeatherDetailsFailed());
                return caught$;
            }),
            map(([current, daily]) => {
                const entity = daily;
                entity.city = {...current.city, timeZone: daily.city.timeZone};
                return fromDetailsActions.loadWeatherDetailsSuccess({ entity });
              }),
            )
        )
    

    constructor(private actions$: Actions,
                private store: Store,
                private weatherservice: WheaterService){}
} 