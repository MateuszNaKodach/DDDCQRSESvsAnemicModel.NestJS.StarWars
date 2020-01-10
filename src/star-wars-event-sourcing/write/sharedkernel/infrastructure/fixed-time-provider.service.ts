import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../application/time.provider';
import {TestTimeProvider} from './test-time-provider.service';

@Injectable()
export class FixedTimeProvider implements TimeProvider, TestTimeProvider {

    constructor(private date: Date) {
    }

    static withFixedDate(date: Date) {
        return new FixedTimeProvider(date);
    }

    currentDate(): Date {
        return this.date;
    }

    moveCurrentDateTo(date: Date) {
        this.date = date;
    }
}
