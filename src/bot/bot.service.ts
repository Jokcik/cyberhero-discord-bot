import {Injectable, OnModuleInit} from '@nestjs/common';
import * as Discord from 'discord.js'
import {UtilsService} from "./utils";

export interface Message {
  content: string;
  reply();
}

@Injectable()
export class BotService implements OnModuleInit {
  private client;
  public allowNameChannels: string[] = [ 'объявления' ];

  constructor(private utilsService: UtilsService) {
  }

  onModuleInit(): any {
    this.client = new Discord.Client();
    this.client.on('ready', () => this.ready());
    this.client.on('message', msg => {});

    this.client.login('NjE3NjA4OTE3OTcwODQ1Njk2.XWwE_Q.iFVBJW0QoKm_NAuc5UYz_098xQw');
  }

  private ready() {
    console.log(`Logged in as ${this.client.user.tag}!`);
    // console.log(Object.keys(this.client));
    // this.client.channels.forEach(channel => {
    //   // console.log(key, this.client.channels.get(key));
    //   // console.log(key);
    //   if (channel.sendMessage) {
    //     console.log('111');
    //     // channel.sendMessage('@everyone Welcom to server')
    //   }
    // });
    // const channel = this.client.channels.get('617625254055116815');
    // const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // console.log(channel.members.get('429197096114192385').sendMessage('test'));
    // setTimeout(() => channel.sendMessage('Welcome to server);'), 3000)

    // this.sendMessageToUsers([ '429197096114192385' ], 'eeeee');
    // this.createCup('CYBERHERO HEARTHSTONE 1X1 PREMIUM CUP #19', 'https://cyberhero.tele2.ru/cups/cyberhero-hearthstone-1x1-premium-cup-19', "2019-09-01T13:20:49.531Z", 5000);
  }

  public getChannels(all: boolean = false) {
    const channels = [];
    this.client.channels.forEach(channel => {
      if (channel.sendMessage && (all || this.allowNameChannels.includes(channel.name))) {
        channels.push(channel);
      }
    });

    return channels;
  }

  public sendMessageToChannels(message: string) {
    const channels = this.getChannels();
    channels.forEach(channel => channel.send(`@everyone ${message}`));
  }

  public async sendMessageToUsers(users: string[], message: string) {
    const userObj = {};
    const channels = this.getChannels();

    for (let channel of channels) {
      const channelUsers = users.map(user => channel.members.get(user)).filter(value => !!value);
      channelUsers.forEach(user => userObj[user.id] = user);
    }

    const ids = Object.keys(userObj);
    for (let id of ids) {
      await userObj[id].sendMessage(message).catch((e) => console.log(e));
    }
  }

  public async checkGroupMember(groupId: string, userId: string) {
    const channel = this.getChannels(true).find(channel => channel.id === groupId);
    if (!channel) { return false; }

    let memberUser = false;
    let g = await channel.guild.fetchMembers();
    g.members.forEach((member) => {
      if (member.id === userId) {
        memberUser = true;
      }
    });

    return memberUser;
  }
}
