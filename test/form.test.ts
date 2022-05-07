describe('Login page form', () => {
    beforeEach(async () => {
        await jestPuppeteer.resetBrowser();
        await jestPuppeteer.resetPage();
    })
    it('should retain long password', async () => {
        await page.goto("https://dashboard.chydata.dev/login");
        await page.setRequestInterception(true);
        const longPassword = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';
        await page.type('input[name=username]', 'test-1234');
        await page.type('input[name=passcode]', longPassword);
        page.on('request', (req) => {
            if (req.method() === 'POST') {
                const textPayload = req.postData();
                if (textPayload !== undefined) {
                    const payloadRequest = JSON.parse(textPayload);
                    const {username, password} = payloadRequest["variables"];
                    expect(username).toMatch("test-1234");
                    expect(password).toMatch(longPassword);
                }
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.click('.ordinary-button');
        await page.waitForRequest((req) => req.method() === 'POST');
    })

    it('should reponse correctly when unauthorized', async () => {
        await page.goto("https://dashboard.chydata.dev/login");
        const passcode = '1234';
        await page.type('input[name=username]', 'test-1234');
        await page.type('input[name=passcode]', passcode);

        let [_] = await Promise.all([page.click('button[class=ordinary-button]')]);
        let finalResp = await page.waitForResponse((resp) => resp.request().method() === 'POST');
        expect(finalResp.status()).toBe(401);
        await page.close();
    })
});