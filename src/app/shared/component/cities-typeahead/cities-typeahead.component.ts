import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.css'],

})
// control value acessor -> torna um componente um formulario do tipo abstract control -> util em formularios muito utilizados
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {
  search: string;
  dataSource$: Observable<CityTypeaheadItem[]>

  private onChange :(value: CityTypeaheadItem) => void;
  private onTouched: () => void;
  disabled:boolean;
  loading: boolean;
  
  constructor(private citiesservice: CitiesService,
              @Optional() @Self() public control: NgControl) {
                control.valueAccessor = this;
               }

  ngOnInit(): void {
    this.dataSource$ = new Observable(
      (subscriber:Subscriber<string>) =>subscriber.next(this.search)
    ).pipe(
      switchMap((query:string) => this.citiesservice.getCities( query ))// switch map interrompe a execucao caso venha uma informacao nova de cima
    )
  }

  //quando o novo abstract  control for modificado
  registerOnChange(fn:(value: CityTypeaheadItem)=> void){
    this.onChange = fn;
  }

  // tocado
  registerOnTouched(fn:()=>void){
    this.onTouched = fn;
  }

  //  se o componente pai setar pra disable
  setDisabledState(isDisabled: boolean){
    this.disabled = isDisabled;
  }

  // se o componente pai setar um valor
  writeValue(){

  }

  onSelected(match: TypeaheadMatch){
    this.onTouched();
    this.onChange(match.item);
  }

}
