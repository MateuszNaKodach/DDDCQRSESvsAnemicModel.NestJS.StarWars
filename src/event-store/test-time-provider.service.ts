import {TimeProvider} from './time.provider';

export abstract class TestTimeProvider extends TimeProvider {

    abstract moveCurrentDateTo(date: Date);
}
