var JavaGenerator = {

    fromXPath: function(xPathExpression) {
        return 'private final WebElement element = getDriver().findElement(By.xpath("' + xPathExpression + '"));';
    },
    fromCSS: function(cssExpression) {
        var onlyIdSelector = cssExpression.startsWith('#') && cssExpression.indexOf(' ') === -1;
        var bySelector = onlyIdSelector ? 'By.id("' + cssExpression + '")' : 'By.cssSelector("' + cssExpression + '")';
        return 'private final WebElement element = getDriver().findElement(' + bySelector + ');';
    }
};