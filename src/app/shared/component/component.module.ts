import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { LoadingComponent } from './loading/loading.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { CitiesTypeaheadComponent } from './cities-typeahead/cities-typeahead.component';


@NgModule({
  declarations: [
    LoadingComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
  ],
  exports:[
    LoadingComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent

  ]
})
export class ComponentModule { }
