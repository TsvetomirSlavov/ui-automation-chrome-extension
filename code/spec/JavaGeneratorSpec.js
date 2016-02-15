describe('JavaGenerator', function () {

    describe('CSS expression with ID selector', function () {

        it('generates By.id when ID is the only selector', function () {
            expect(JavaGenerator.fromCSS('#element-id')).toEqual(
                'private final WebElement element = getDriver().findElement(By.id("#element-id"));');
        });

        it('generates By.cssSelector when ID is followed by other selectors', function () {
            expect(JavaGenerator.fromCSS('#element-id li')).toEqual(
                'private final WebElement element = getDriver().findElement(By.cssSelector("#element-id li"));');
        });
    });

    describe('CSS expression with class selector', function () {

        it('generates By.cssSelector', function () {
            expect(JavaGenerator.fromCSS('#element-id')).toEqual(
                'private final WebElement element = getDriver().findElement(By.id("#element-id"));');
        });
    });

    describe('XPath expression', function () {

        it('generates By.xpath', function () {
            expect(JavaGenerator.fromXPath('//*[@id=\'element-id\']')).toEqual(
                'private final WebElement element = getDriver().findElement(By.xpath("//*[@id=\'element-id\']"));');
        });
    });
});