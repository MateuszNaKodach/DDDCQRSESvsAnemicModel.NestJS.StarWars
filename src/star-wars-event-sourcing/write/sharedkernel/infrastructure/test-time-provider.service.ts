import {TimeProvider} from '../application/time.provider';

export interface TestTimeProvider extends TimeProvider {

    moveCurrentDateTo(date: Date);
}
