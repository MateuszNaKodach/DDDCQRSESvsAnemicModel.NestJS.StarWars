import {Injectable} from '@nestjs/common';

export interface TimeProvider {
    currentDate(): Date;
}

@Injectable()
export class DateTimeProvider implements TimeProvider {
    currentDate(): Date {
        return new Date();
    }
}
