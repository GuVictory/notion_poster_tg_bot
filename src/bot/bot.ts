import { Bot as GrammyBot, Context, Filter, session } from 'grammy';
import { Logger } from '../utils/logger';
// import { StartMenu } from './menus/startMenu';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { run } from '@grammyjs/runner';
import {
    Conversation,
    ConversationFlavor,
    conversations,
    createConversation,
} from '@grammyjs/conversations';
import { onboarding } from './conversations/onboarding';
import { NewUserSettingsMenu } from './menus/newUserSettingsMenu';
import { DoneMenu } from './menus/doneMenu';

export type BotContext = Context & ConversationFlavor;
export type BotConversation = Conversation<BotContext>;

export class Bot {
    private readonly bot: GrammyBot<BotContext>;

    constructor(botToken: string) {
        this.bot = new GrammyBot(botToken);

        const throttler = apiThrottler();
        this.bot.api.config.use(throttler);

        this.bot.use(NewUserSettingsMenu.getInstance().getMenu());
        this.bot.use(DoneMenu.getInstance().getMenu());

        this.bot.use(session({ initial: () => ({}) }));
        this.bot.use(conversations());
        this.bot.use(createConversation(onboarding));

        this.setupStartAction(this.bot);

        this.bot.catch((err) => {
            Logger.i.error('Caught bot error', err);
        });

        this.bot.init().then(() => {
            run(this.bot);
            Logger.i.info(`Bot started - https://t.me/${this.bot.botInfo.username}`);
        });
    }

    private async setActive(
        ctx: Filter<Context, 'my_chat_member'> | Filter<Context, 'msg::bot_command'>,
    ) {
        Logger.i.info(`User ${ctx.chat.id} start bot`);
    }

    private async setupStartAction(bot: GrammyBot<BotContext>) {
        bot.command('start', async (ctx) => {
            this.setActive(ctx);
            Logger.i.debug(ctx.conversation);
            if (ctx.conversation) await ctx.conversation.enter('onboarding');
        });
    }
}
