import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    let snack = this.snackBar.open(message, 'x', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    snack.afterDismissed().subscribe(()=>{
        window.location.reload();
    })
  }
  
  showError(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message+'😟', 'x', {
      panelClass: ['fail-snackbar']
    });
  }
}