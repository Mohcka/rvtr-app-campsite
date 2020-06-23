import { AppEditAccountPage } from './edit-account.po';
import { browser, logging, by, element } from 'protractor';

describe('project rvtr-app-campsite', () => {
    let page: AppEditAccountPage;

    beforeEach(() => {
        page = new AppEditAccountPage();

    });

    it('should find the payment add button', () => {
        page.navigateToEditAccount();
        expect(page.getAddProfileButton()).toContain('Add');
    });

    it('should write a profile name', () => {
        page.navigateToEditAccount();
        page.clickAddProfileButton();
        const profileName = element(by.id('firstName'));
        profileName.sendKeys('Ada');
        expect(profileName.getAttribute('value'))
            .toEqual('Ada');
    });

    it('should write card name', () => {
        page.navigateToEditAccount();
        page.clickAddPaymentButton();
        const cardName = element(by.id('card-name'));
        cardName.sendKeys('Visa');
        expect(cardName.getAttribute('value'))
            .toEqual('Visa');
    });

    xit('should change postal code', () => {

        page.navigateToEditAccount();
        const postalCode = element(by.id('postal-code'));
        // generates random 5 digit output to be used as postal code.
        const randomPostalCode = ('' + Math.random()).substring(2, 7);
        postalCode.sendKeys(randomPostalCode);
        element(by.id('update-button')).click();
        // looks for text in alert box.
        const timeoutInMilliseconds = 1000;
        browser.wait(browser.ExpectedConditions.alertIsPresent(), timeoutInMilliseconds);
        const alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual('Account updated!');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.INFO,
            } as logging.Entry)
        );
    });
});
