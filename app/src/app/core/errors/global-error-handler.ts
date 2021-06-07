import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../shared/errors/error.service';
import { NotificationService } from '../shared/errors/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector, private router: Router) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getServerMessage(error);
            stackTrace = errorService.getServerStack(error);
            //notifier.showError(message);
            console.warn(`Server-side error: ${error.status} ${error.message}`)
            if (error.status === 401 || error.status === 403 || error.status === 404) {
                this.router.navigate(['/401'])
            }
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            //notifier.showError(message);
            console.warn(`Client-side error: ${message}`)
        }

        console.error(error);
    }
}