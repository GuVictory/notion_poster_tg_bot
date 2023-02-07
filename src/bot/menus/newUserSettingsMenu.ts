import { Menu } from '@grammyjs/menu';
import { CustomMenu } from './menu';

export class NewUserSettingsMenu extends CustomMenu {
    private static instance: NewUserSettingsMenu;

    static getInstance(): NewUserSettingsMenu {
        if (NewUserSettingsMenu.instance === undefined) {
            NewUserSettingsMenu.instance = new NewUserSettingsMenu();
        }
        return NewUserSettingsMenu.instance;
    }

    private constructor() {
        super(
            'new-user-settings-menu',
            'Выберите одну из настроек для получения дополнительной информации.',
        );
    }

    getMenu = (): Menu => {
        const menu = new Menu(this.getMenuIdentifier())
            .text('Добавить новый канал', async (ctx) => {
                if (ctx.chat?.id) {
                    await ctx.api.sendMessage(
                        ctx.chat?.id,
                        '1️⃣ Для начала отправь мне ссылку на канал, который хочешь подключить!',
                    );
                }
            })
            .row();

        return menu;
    };
}
