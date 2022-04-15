import dotenv from 'dotenv';
dotenv.config();

import { Client, Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import keepAlive from './server';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const mongoUri = process.env.MONGO_DB_URI;


client.on('ready', () => {
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandDir: path.join(__dirname, 'commands'),
    // The name of the local folder for your feature files
    // TODO: uncomment if you have features to add
    // featureDir: path.join(__dirname, 'features'),
    // Allow importing of .ts files if you are using ts-node
    typeScript: false,
    testServers: (process.env.TEST_GUILD_IDS || '').split(','),
    mongoUri,
  }).setDefaultPrefix('*')
    .setCategorySettings([
      {
        name: 'Configuration',
        emoji: '⚙️',
      },
    ]);
});

// hack to keep repl.it process alive
// see './server.ts' for more info
keepAlive();

client.login(process.env.CLIENT_TOKEN);
