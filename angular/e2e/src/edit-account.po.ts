import { browser, by, element } from 'protractor';

export class AppEditAccountPage {

    navigateToEditAccount(): Promise<unknown> {
        return browser.get('/account/editaccount/1') as Promise<unknown>;
    }

    getAddProfileButton(): Promise<unknown> {
        return element(by.css('#add-profile')).getText() as Promise<unknown>;
    }

    getAddPaymentButton(): Promise<unknown> {
        return element(by.css('#add-payment')).getText() as Promise<unknown>;
    }

    clickAddProfileButton(): Promise<unknown> {
        return element(by.css('#add-profile')).click() as Promise<unknown>;
    }
    clickAddPaymentButton(): Promise<unknown> {
        return element(by.css('#add-payment')).click() as Promise<unknown>;
    }

}
