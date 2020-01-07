import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../application/time.provider';

@Injectable()
export class DateTimeProvider implements TimeProvider {
    currentDate(): Date {
        return new Date();
    }
}
