import { Bot } from 'grammy';
import { Client as NotionClient } from '@notionhq/client';
import * as dotenv from 'dotenv';
dotenv.config();

const bot = new Bot(process.env.TG_BOT_TOKEN || '');

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_ID;

async function addItem(text?: string, url?: string) {
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
                link: {
                    url,
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
    console.log(ctx.msg);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore not correct tupings in library
    const chatId = ctx.msg.sender_chat?.username;

    const messageId = ctx.msg.message_id;
    const linkToPost = `https://t.me/${chatId}/${messageId}`;

    if (ctx.msg.text || ctx.msg.caption) addItem(ctx.msg.text || ctx.msg.caption, linkToPost);
});

bot.start();
