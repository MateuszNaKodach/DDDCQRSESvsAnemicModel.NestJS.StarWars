import {Fraction} from '../write/domain/fraction.enum';
import {FleetState} from './fleet-state.read-model';

export interface FleetStateRepository {

    findBy(fraction: Fraction): Promise<FleetState>;

    save(fleetState: FleetState): Promise<void>;
}
