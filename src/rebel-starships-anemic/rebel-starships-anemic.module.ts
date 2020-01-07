import {Module} from '@nestjs/common';
import {StarshipsController} from './starships.controller';
import {StarshipsService} from './starships.service';

@Module({
    controllers: [StarshipsController],
    providers: [StarshipsService],
})
export class RebelStarshipsAnemicModule {
}
