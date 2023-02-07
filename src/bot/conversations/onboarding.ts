import { Logger } from '../../utils/logger';
import { BotContext, BotConversation } from '../bot';
import { DoneMenu } from '../menus/doneMenu';
import { NewUserSettingsMenu } from '../menus/newUserSettingsMenu';

export const onboarding = async (conversation: BotConversation, ctx: BotContext) => {
    Logger.i.debug(`Onboarding for with chat id: ${ctx.chat?.id} started`);

    await ctx.reply(
        'Привет 🖐\n Я могу помочь тебе быстро сохранять все текстовые посты из канала в телеграм в базу данных Notion!\n\nДля подключения нового канала нажми на кнопку ниже!',
        {
            // eslint-disable-next-line camelcase
            reply_markup: NewUserSettingsMenu.getInstance().getMenu(),
        },
    );

    let channelUrlCollected = false;
    let channelLink: URL | undefined = undefined;

    while (!channelUrlCollected) {
        channelUrlCollected = true;
        channelLink = await conversation.form.url(async () => {
            Logger.i.debug('Not Walid Url');
            await ctx.reply('Кажется, это не верная ссылка, попробуй еще раз!');
            channelUrlCollected = false;
        });

        if (channelLink.hostname !== 't.me') {
            await ctx.reply('Кажется, это не ссылка на канал в телеграм, попробуй еще раз!');
            channelUrlCollected = false;
        }
    }

    // channelLink?.href

    if (ctx.chat?.id) {
        await ctx.api.sendMessage(
            ctx.chat?.id,
            '2️⃣ Дальше мне нужно, чтобы ты отправил Notion API ключ 🔑 \n\n [Инструкция](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration)',
            {
                // eslint-disable-next-line camelcase
                parse_mode: 'MarkdownV2',
            },
        );
    }

    const notionApiKey = await conversation.form.text();

    if (ctx.chat?.id) {
        await ctx.api.sendMessage(
            ctx.chat?.id,
            '3️⃣ Теперь тебе надо создать базу данных, настроить ее и подключить свой API ключ к ней\\! \n\n [Инструкция](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration)',
            {
                // eslint-disable-next-line camelcase
                parse_mode: 'MarkdownV2',
                // eslint-disable-next-line camelcase
                reply_markup: DoneMenu.getInstance().getMenu(),
            },
        );
    }

    await conversation.wait();

    await ctx.reply(
        `И последнее, добавь меня в качесте администратора в канал ${channelLink?.href}\n\nИ все, поздравляю 🥳, теперь все сообщения из канала будут сохраняться в твоей базе данных!`,
    );
};
