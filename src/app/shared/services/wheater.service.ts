import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CityDailyWeather, CityWeather } from '../models/weather.model';
import { AppState } from '../state/app.reducer';
import { responseToCityDailyWeather, responseToCityWeather } from '../utils/response.utils';

import * as fromConfigSelectors from '../state/config/config.selectors';
import { Units } from '../models/units.model';

@Injectable({
  providedIn: 'root'
})
export class WheaterService implements OnDestroy {

  private units: Units;
  private serviceDestroyed$ = new Subject();
  constructor(private httpclient: HttpClient,
              private store: Store<AppState>) {
                store
                  .pipe(
                    select(fromConfigSelectors.selectConfigUnit),
                    takeUntil(this.serviceDestroyed$),
                  )
                  .subscribe((unit: Units)=>this.units = unit)
               }
  ngOnDestroy(){
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  getCityWeatherByQuery(query:string):Observable<CityWeather>{
    const params = new HttpParams({ fromObject:{ q:query }});
    return this.doGet('weather', params)
      .pipe(
        map((response) => responseToCityWeather(response))
      );
  }

  getCityWeatherById(id: string): Observable<CityWeather> {
    const params = new HttpParams({fromObject: {id}});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getcityWeatherByCoord(lat:number, lon:number):Observable<CityWeather>{
    const params = new HttpParams({fromObject:{
      lat:lat.toString(),
      lon:lon.toString(),
    }});
    return this.doGet<any>('weather', params)
      .pipe(map(response=> responseToCityWeather(response)));
  }


  getWeatherDetails(lat:number, lon:number):Observable<CityDailyWeather>{
    const params = new HttpParams({fromObject:{
      lat:lat.toString(),
      lon:lon.toString(),
      exclude: 'minutely, hourly',
    }});
    return this.doGet<any>('onecall', params)
      .pipe(map(response => responseToCityDailyWeather(response)));
  }


  //funcao que gera a url com os parametros desejados
  private doGet<T> (url:string, params: HttpParams):Observable<T>{
    params = params.append('appid', environment.apiKey);
    params = params.append('lang', 'pt_BR');

    if(this.units !== Units.SI){
      params = params.append('units', this.units.toLocaleLowerCase());
    }

    return this.httpclient.get<T>(`https://api.openweathermap.org/data/2.5/${url}`, {params});
  }
}
