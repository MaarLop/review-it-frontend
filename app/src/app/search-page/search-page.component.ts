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
        { descripcion: "Usuario", id: "userName"},
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
            userName: [{ value: '', disabled: false }],
        });
    }
        
    
    goSearch(){
        const todo = this.formGroup.get('todo').value.replace(/\s/g, '%20');
        const genre = this.formGroup.get('genre').value.replace(/\s/g, '%20');
        const title = this.formGroup.get('title').value.replace(/\s/g, '%20');
        const description = this.formGroup.get('description').value.replace(/\s/g, '%20');
        const points = this.formGroup.get('points').value.replace(/\s/g, '%20');
        const userName = this.formGroup.get('userName').value.replace(/\s/g, '%20');

        let arrayFilter = [];
        if(!!title || !!genre || !!description || !!points || !!userName || !!todo){
            const searchFilter = !!todo ? `search=${todo}` : '';
            const titleSearch = !!title ? `title=${title}` : '';
            const genresFilter = !!genre ? `genre=${genre}` : '';
            const descriptionFilter = !!description ? `description=${description}` : '';
            const pointsFilter = !!points ? `points=${points}` : '';
            const userNameFilter = !!userName ? `userName=${userName}` : '';
            arrayFilter = [searchFilter, titleSearch, genresFilter,descriptionFilter, pointsFilter, userNameFilter];

        }
        const filtrerToApply = arrayFilter.filter((filter)=> !!filter).join('&');
        this.filter$.next(filtrerToApply); 
    } 

    cleanFilter(){
        this.formGroup.get('todo').setValue('');
        this.formGroup.get('genre').setValue('');
        this.formGroup.get('title').setValue('');
        this.formGroup.get('description').setValue('');
        this.formGroup.get('points').setValue('');
        this.formGroup.get('userName').setValue('');
        this.goSearch();
    }
}
