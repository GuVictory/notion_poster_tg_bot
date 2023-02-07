// import { Client as NotionClient } from '@notionhq/client';
import * as dotenv from 'dotenv';
import { Bot } from './bot/bot';
// import { Logger } from './utils/logger';
dotenv.config();

const bot = new Bot(process.env.TG_BOT_TOKEN || '');

/** const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_ID;

async function addItem(text?: string, url?: string, haveMedia = false, forward = false) {
    if (text === undefined || url === undefined) {
        return;
    }

    try {
        await notion.pages.create({
            // eslint-disable-next-line camelcase
            parent: { database_id: databaseId! },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: text.split('\n')[0],
                            },
                        },
                    ],
                },
                'Ссылка на пост': {
                    url,
                },
                Медиа: {
                    checkbox: haveMedia,
                },
                Пересланное: {
                    checkbox: forward,
                },
            },
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        // eslint-disable-next-line camelcase
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: text,
                                },
                            },
                        ],
                    },
                },
            ],
        });
    } catch (error) {
        console.error(error);
    }
}

bot.on('msg', (ctx) => {
    Logger.i.info(ctx.msg);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore not correct tupings in library
    const chatId = ctx.msg.sender_chat?.username;

    const messageId = ctx.msg.message_id;
    const linkToPost = `https://t.me/${chatId}/${messageId}`;

    if (ctx.msg.text || ctx.msg.caption) {
        addItem(
            ctx.msg.text || ctx.msg.caption,
            linkToPost,
            ctx.msg.caption !== undefined,
            ctx.msg.forward_from_chat !== undefined,
        );
    }
});

bot.start().then(() => Logger.i.info('Bot started'));
**/

// https://grammy.dev/plugins/parse-mode.html#usage-improving-formatting-experience
// https://developers.notion.com/reference/post-page
