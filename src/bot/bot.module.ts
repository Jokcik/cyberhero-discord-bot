import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import {UtilsService} from "./utils";

@Module({
  providers: [
    BotService,
    UtilsService
  ],
  exports: [
    BotService
  ]
})
export class BotModule {
}
