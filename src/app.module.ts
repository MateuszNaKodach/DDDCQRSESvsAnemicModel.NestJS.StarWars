import {Module} from '@nestjs/common';
import {RebelStarshipsEventSourcingModule} from './rebel-starships-eventsourcing/rebel-starships-event-sourcing.module';
import { RebelStarshipsAnemicModule } from './rebel-starships-anemic/rebel-starships-anemic.module';

@Module({
    imports: [RebelStarshipsEventSourcingModule, RebelStarshipsAnemicModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
