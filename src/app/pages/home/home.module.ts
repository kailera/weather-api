import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { homeReducer } from './state/home.reducer';
import { HomeEffects } from './state/home.effects';

import { HomePage } from './container/home/home.page';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { RouterModule } from '@angular/router';
import { UnitSelectorComponent } from './container/unit-selector/unit-selector.component';


@NgModule({
  declarations: [
    HomePage,
    CurrentWeatherComponent,
    UnitSelectorComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
