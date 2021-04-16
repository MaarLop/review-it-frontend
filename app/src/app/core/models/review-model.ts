export class Review{
    title: string;
    body: string;
    points: number;
    date: Date;
    hashtags: string[];

    constructor(titulo: string, descripcion: string, fecha: Date, puntaje: number, hashtags){
        this.title=titulo;
        this.body= descripcion;
        this.date= fecha;
        this.points = puntaje;
        this.hashtags = hashtags;
    }
}