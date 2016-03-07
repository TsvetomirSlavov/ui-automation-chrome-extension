var JavaGenerator = {

    fieldFromCSS: function (cssExpression, existingFieldsLength) {
        var onlyIdSelector = cssExpression.indexOf('#') === 0 && cssExpression.indexOf(' ') === -1;
        var annotation = onlyIdSelector ? '@FindBy(id = "' + cssExpression.substring(1) + '")' : '@FindBy(css = "' + cssExpression + '")';
        var field = 'private WebElement element' + (existingFieldsLength + 1) + ';';

        return annotation + '\n    ' + field;
    }
};