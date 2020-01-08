import {Starship} from './starship.aggregate-root';
import {AggregateRootRepository} from './aggregate-root.repository';

export interface StarshipRepository extends AggregateRootRepository<Starship, Starship['id']> {
}
