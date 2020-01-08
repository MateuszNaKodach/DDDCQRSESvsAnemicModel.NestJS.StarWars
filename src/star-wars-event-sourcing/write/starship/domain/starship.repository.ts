import {Starship} from './starship.aggregate-root';
import {AggregateRootRepository} from '../../sharedkernel/domain/aggregate-root.repository';

export interface StarshipRepository extends AggregateRootRepository<Starship, Starship['id']> {
}
