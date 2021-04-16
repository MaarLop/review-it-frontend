import { Component } from '@angular/core';
import { Review } from '../core/models/review-model';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

loading = false;
hashtags1: string []= ['#Accion', '#Drama', '#Netflix', '#Hoy']
hashtags2: string []= ['#hashtags']
hashtags3: string []= ['#SorryButNoTSorry', '#estoEsUnaReseña', '#malisimaaa']

reviews = [new Review('Esto es un titulo1', 'Esto es una descripcion de reseña', new Date(), 5, this.hashtags1),
    new Review('Esto es un titulo2', 'Esto es una descripcion de reseña', new Date(), 4, this.hashtags1),
    new Review('Esto es un titulo3', 'Esto es una descripcion de reseña', new Date(), 3, this.hashtags2),
    new Review('Esto es un titulo4', 'Esto es una descripcion de reseña', new Date(), 1, this.hashtags3),
];
    
    constructor(){
    }
}