import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../application/time.provider';

@Injectable()
export class SystemTimeProvider implements TimeProvider {
    currentDate(): Date {
        return new Date();
    }
}
