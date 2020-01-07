import {AggregateRoot} from '@nestjs/cqrs';
import {AggregateId} from './aggregate-id.valueobject';

export interface AggregateRootRepository<T extends AggregateRoot, I extends AggregateId> {

    save(aggregate: T): Promise<void>;

    findById(id: I): Promise<T | null>;

}
