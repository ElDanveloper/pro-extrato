import {ErrorHandler, Injectable} from '@angular/core';

import * as Sentry from "@sentry/browser";
import {environment} from "../../../environments/environment";

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor() {}
    handleError(error) {
        if(environment.production) {
        const eventId = Sentry.captureException(error.originalError || error);
       // throw error;
        }
    }
}
