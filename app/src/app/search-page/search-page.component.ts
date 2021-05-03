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
        { descripcion: "Todo", id: "search"},
        { descripcion: "Título" , id: "title"},
        { descripcion: "Descripción" , id: "description"},
        { descripcion: "Puntaje", id: "points"},
      ]);

    defaultValue: SimpleOption =  { descripcion: "Todo", id: "search"};
    
    filterToApply: string = '';

    filter$: BehaviorSubject<string> = new BehaviorSubject('');

    formGroup:FormGroup
      
    constructor(private fb: FormBuilder){ }
    
    ngOnInit(): void {
        this.formGroup = this.fb.group(
        {
            todo: [{value: '', disabled: false}],
            genre: [{ value: '', disabled: false }],
            title: [{ value: '', disabled: false }],
            description: [{ value: '', disabled: false }],
            points: [{ value: '', disabled: false }],
        });
    }
        
    
    goSearch(){
        const todo = this.formGroup.get('todo').value.replace(/\s/g, '%');
        const genre = this.formGroup.get('genre').value.replace(/\s/g, '%');
        const title = this.formGroup.get('title').value.replace(/\s/g, '%');
        const description = this.formGroup.get('description').value.replace(/\s/g, '%');
        const points = this.formGroup.get('points').value.replace(/\s/g, '%');



        if(!!title || !!genre || !!description || !!points || !!todo){
            const searchFilter = !!todo ? `search=${todo}` : '';
            const titleSearch = !!title ? `title=${title}` : '';
            const genresFilter = !!genre ? `genre=${genre}` : '';
            const descriptionFilter = !!description ? `description=${description}` : '';
            const pointsFilter = !!points ? `points=${points}` : '';

            const arrayFilter = [searchFilter, titleSearch, genresFilter,descriptionFilter, pointsFilter];

            const filtrerToApply = arrayFilter.filter((filter)=> !!filter).join('&');


            this.filter$.next(filtrerToApply);
        }

        // else{
        //     alert('Seleccionar algo');
        //     return;
        // }   
    } 
}
