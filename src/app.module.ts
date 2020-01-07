import {Module} from '@nestjs/common';
import {RebelStarshipsModule} from './rebel-starships/write/rebel-starships.module';

@Module({
    imports: [RebelStarshipsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
