import { Menu } from '@grammyjs/menu';

export abstract class CustomMenu {
    private readonly _menuIdentifier: string;
    private readonly _menuText: string;

    protected constructor(menuIdentifier: string, menuText: string) {
        this._menuIdentifier = menuIdentifier;
        this._menuText = menuText;
    }

    abstract getMenu(): Menu;

    getMenuIdentifier(): string {
        return this._menuIdentifier;
    }

    getMenuText(): string {
        return this._menuText;
    }
}
