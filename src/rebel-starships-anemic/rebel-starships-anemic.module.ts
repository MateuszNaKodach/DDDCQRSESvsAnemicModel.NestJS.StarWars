import {Module} from '@nestjs/common';
import {RebelStarshipsController} from './rebel-starships.controller';
import {RebelStarshipsService} from './rebel-starships.service';

@Module({
    controllers: [RebelStarshipsController],
    providers: [RebelStarshipsService],
})
export class RebelStarshipsAnemicModule {
}
