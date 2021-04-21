import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Units } from 'src/app/shared/models/units.enum';

import { ComponentPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal/';

import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import * as fromBookmarkSelectors from '../../../bookmarks/state/bookmark.selectors';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather$: Observable<CityWeather>;
  cityWeather : CityWeather; //elimina a opcao de ter q dar unsubscribe depois
  loading$:Observable<boolean>;
  error$:Observable<boolean>;
  bookmarkList$:Observable<Bookmark[]>;
  isCurrentFavorite$: Observable<boolean>;
  unit$: Observable<Units>;

  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;


  
  private componentDestroyed$  = new Subject();

  private portalOutlet: PortalOutlet;
  
  constructor(private store: Store,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  ngOnInit() {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutocomplete = new FormControl(undefined);
    
    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({id: value.geonameid.toString()}));
        }
      });


    this.cityWeather$ = this.store
    .pipe(select(fromHomeSelectors.selectCurrentWeather));

    this.cityWeather$
        .pipe(
          takeUntil(this.componentDestroyed$))
               // precisa dar subscribe pq é um observable (async, ver a parada de cima)
          .subscribe(cityweather => this.cityWeather = cityweather) //dou subscribe nessa informacao e salvo na variavel e nao em um observable, observable morre, variavel nao  
    
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));

    this.bookmarkList$ = this.store.pipe(select(fromBookmarkSelectors.selectBookmarkList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarkList$])
      .pipe(
        map(([current, bookmarksList]) => {
          if (!!current) {
            return bookmarksList.some(bookmark => bookmark.id === current.city.id);
          }
          return false;
        }),
      );
      this.unit$ = this.store.pipe(select(fromConfigSelectors.selectConfigUnit));

      this.setupPortal();

  }

  doSearch(){
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather( {query} )) // enviando o valor para a action que irá modificar a store (lembrar que quem faz isso é dispatch)
  }

  onToogleBookmark(){ // cria um bookmark e deixa pra salvar
    const bookmark = new Bookmark();
    bookmark.name = this.cityWeather.city.name;
    bookmark.coord = this.cityWeather.city.coord;
    bookmark.country = this.cityWeather.city.country;
    bookmark.id = this.cityWeather.city.id;
    this.store.dispatch(fromHomeActions.toogleBookmark({ entity:bookmark}));    
  }

  ngOnDestroy(){
    this.componentDestroyed$.next(); // take until mata a subscription
    this.componentDestroyed$.complete(); //
    this.store.dispatch(fromHomeActions.clearHomeState());
    this.portalOutlet.detach(); // desliga o portal 
  }

  // injetar um componente inteiro, portal angular cdk
  private setupPortal(){
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el, //elemento que vira o portal  
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
  }
}
