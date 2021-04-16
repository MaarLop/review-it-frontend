import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-only',
  templateUrl: './read-only.component.html',
  styleUrls: ['./read-only.component.scss'],
})
export class ReadOnlyComponent {
  @Input() label: string;
}
