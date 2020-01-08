import {FleetStateRepository} from '../fleet-state.repository';
import {Fraction} from '../../../write/sharedkernel/domain/fraction.enum';
import {FleetState} from '../fleet-state.read-model';

export class InMemoryFleetStateRepository implements FleetStateRepository {

    private repository: { [k in string]: FleetState } = {};

    findBy(fraction: Fraction): Promise<FleetState | null> {
        return Promise.resolve(this.repository[fraction]);
    }

    save(fleetState: FleetState): Promise<void> {
        this.repository[fleetState.fraction] = fleetState;
        return Promise.resolve();
    }

}
