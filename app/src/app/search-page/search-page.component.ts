import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SimpleOption } from '../core/models/simple-option';


@Component({
    selector: 'app-home-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchComponent implements OnInit{

    options$: Observable<SimpleOption[]> = of([
        { descripcion: "Todo", id: "Todo"},
        { descripcion: "Título" , id: "title"},
        { descripcion: "Descripción" , id: "description"},
        { descripcion: "Puntaje", id: "points"},
      ]);
      defaultValue: SimpleOption =  { descripcion: "Todo", id: "Todo"};
      
      filterToApply: string = '';

      filter$: BehaviorSubject<string>;

      formGroup:FormGroup

      
    constructor(private fb: FormBuilder){ }
    
    ngOnInit(): void {
        this.formGroup = this.fb.group(
        {
            option: [{value: '', disabled: false}],
            filter: [{ value: '', disabled: false }],
        });
    }
        
    
    goSearch(){
        const option = this.formGroup.get('option').value;
        const filter = this.formGroup.get('filter').value;

        console.log(`option: ${option}`)
        console.log(`filter: ${filter}`)

        if(!!option || !!filter){
            alert('Seleccionar algo')
        }
    } 
}