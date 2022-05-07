describe('Login page', () => {
    it('should set correct title from server side', async () => {
        await page.setJavaScriptEnabled(false);
        await page.goto("https://dashboard.chydata.dev/login");
        await expect(page.title()).resolves.not.toMatch("VLC Dashboard");
        await expect(page.title()).resolves.toMatch("เข้าสู่ระบบ");
    })

    it('should set correct title eventually', async () => {
        await page.setJavaScriptEnabled(true);
        await page.goto("https://dashboard.chydata.dev/login");
        await expect(page.title()).resolves.not.toMatch("VLC Dashboard");
        await expect(page.title()).resolves.toMatch("เข้าสู่ระบบ");
    })
;})