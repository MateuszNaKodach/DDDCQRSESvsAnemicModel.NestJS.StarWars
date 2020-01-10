import {Injectable} from '@nestjs/common';
import {TimeProvider} from './time.provider';

@Injectable()
export class SystemTimeProvider implements TimeProvider {
    currentDate(): Date {
        return new Date();
    }
}
