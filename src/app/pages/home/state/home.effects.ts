// effects são sideeffects que reagem do lado do servidor, trazendo dados de fora
// effects são servicos, assim precisam ser injectables

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { CityWeather } from "src/app/shared/models/weather.model";
import { WheaterService } from "src/app/shared/services/wheater.service";

import * as fromHomeActions from './home.actions';
@Injectable()

export class HomeEffects{

    loadCurrentWeather$ = createEffect(()=> this.actions$
        .pipe(
            ofType(fromHomeActions.loadCurrentWeather),
            mergeMap(({ query })=>this.weatherservice.getCityWeatherByQuery(query)),
            catchError((err, caught$)=>{
                this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
                return caught$;
            }),
            map((entity: any)=>fromHomeActions.loadCurrentWeatherSuccess({ entity})),   
        ),
    );

    loadCurrentWeatherById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromHomeActions.loadCurrentWeatherById),
      mergeMap(({ id }: { id: string }) =>
        this.weatherservice.getCityWeatherById(id)
      ),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: CityWeather) => fromHomeActions.loadCurrentWeatherSuccess({entity})),
    )
  );

    constructor(private actions$: Actions,
                private store: Store,
                private weatherservice: WheaterService){

    }

}