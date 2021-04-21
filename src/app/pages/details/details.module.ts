import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './container/details/details.page';
import { RouterModule } from '@angular/router';
import { DetailsGuard } from './services/details.guard';
import { DetailsEffects } from './state/details.effects';
import { detailsReducer } from './state/details.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';



@NgModule({
  declarations: [
    DetailsPage,
    DailyWeatherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path:'', component:DetailsPage, canActivate: [DetailsGuard]},
    ]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentModule
    ],
    providers:[DetailsGuard]
})
export class DetailsModule { }
