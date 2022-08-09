import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // console.log("my msg start: ",err.message,": end");
        if (err.code == 11000 && err?.keyPattern?.email) {
          return throwError(
            () => new BadGatewayException('Email already there'),
          );
        }
        if (err.code == 11000 && err?.keyPattern?.phone) {
          return throwError(
            () => new BadGatewayException('Phone already there'),
          );
        } else if (err.path == '_id') {
          return throwError(() => new BadGatewayException('Invalid id'));
        } else {
          return throwError(() => new BadGatewayException(err));
        }
      }),
    );
  }
}
