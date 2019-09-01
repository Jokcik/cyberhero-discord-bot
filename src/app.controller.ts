import {Body, Controller, Get, Post} from '@nestjs/common';
import {BotService} from "./bot/bot.service";

@Controller()
export class AppController {
  constructor(private readonly botService: BotService) {
  }

  @Post('send-channels')
  public sendToChannels(@Body('message') message: string) {
    if (!message) { return; }
    this.botService.sendMessageToChannels(message);
  }

  @Post('send-users')
  public sendToUsers(@Body('user') user: string, @Body('message') message: string) {
    if (!user) { return; }

    const users = user.split(',');
    this.botService.sendMessageToUsers(users, message);
  }
}
