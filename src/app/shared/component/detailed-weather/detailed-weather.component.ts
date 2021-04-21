import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Units } from '../../models/units.model';
import { Weather } from '../../models/weather.model';
import { unitToSymbol } from '../../utils/units.utils';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent  {
  //componente responsavel APENAS pelo clima
  
  @Input() weather:  Weather;
  @Input() unit: Units;


  get weatherIcon():string{
    return `https://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
  }

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  }

}
