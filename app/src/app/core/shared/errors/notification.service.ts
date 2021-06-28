import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public router: Router, public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    let snack = this.snackBar.open(message, 'x', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    snack.afterDismissed().subscribe(()=>{
        window.location.reload();
    })
  }

  showSuccessAfter(message: string): void {
    this.reloadComponent();
    this.snackBar.open(message, 'x', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
  
  showError(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message+'😟', 'x', {
      panelClass: ['fail-snackbar']
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}