import {Module} from '@nestjs/common';
import {StarshipsController} from './starship/starships.controller';
import {StarshipsService} from './starship/starships.service';

@Module({
    controllers: [StarshipsController],
    providers: [StarshipsService],
})
export class StarWarsAnemicModule {
}
