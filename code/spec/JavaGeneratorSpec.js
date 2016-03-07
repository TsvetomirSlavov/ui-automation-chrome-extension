describe('JavaGenerator', function () {

    describe('CSS expression with ID selector', function () {

        it('generates By.id annotation when ID is the only selector', function () {
            expect(JavaGenerator.fieldFromCSS('#element-id', 0)).toEqual(
                '@FindBy(id = "element-id")\n' + '    private WebElement element1;');
        });

        it('generates By.cssSelector when ID is followed by other selectors', function () {
            expect(JavaGenerator.fieldFromCSS('#element-id li', 1)).toEqual(
                '@FindBy(css = "#element-id li")\n' + '    private WebElement element2;');
        });
    });

});