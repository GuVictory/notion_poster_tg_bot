import { Menu } from '@grammyjs/menu';
import { CustomMenu } from './menu';

export class DoneMenu extends CustomMenu {
    private static instance: DoneMenu;

    static getInstance(): DoneMenu {
        if (DoneMenu.instance === undefined) {
            DoneMenu.instance = new DoneMenu();
        }
        return DoneMenu.instance;
    }

    private constructor() {
        super('notion-db-configured-menu', 'Настройте базу данных в Notion.');
    }

    getMenu = (): Menu => {
        const menu = new Menu(this.getMenuIdentifier())
            .text('Готово!', async (ctx) => {
                if (ctx.chat?.id) {
                    await ctx.api.sendMessage(
                        ctx.chat?.id,
                        '4️⃣ Почти готово, осталась пара шагов\\!\n\nОтправь мне ID своей базы данных\\!\n\n[Инструкция](https://developers.notion.com/docs/create-a-notion-integration#step-3-save-the-database-id)',
                        {
                            // eslint-disable-next-line camelcase
                            parse_mode: 'MarkdownV2',
                        },
                    );
                }
            })
            .row();

        return menu;
    };
}
