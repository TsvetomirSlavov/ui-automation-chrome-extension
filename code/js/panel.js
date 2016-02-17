var uiAutomationApp = angular.module('uiAutomationApp', [
    'directives.highlight',
    'directives.selectOnClick'
]);

uiAutomationApp.controller('UIAutomationController', function ($scope) {

    $scope.xPathExpression = '';
    $scope.cssExpression = '';

    updateCssAndXpathExpressions();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
        updateCssAndXpathExpressions();
    });

    function getJavaXPathExpression(xPathExpression) {
        return JavaGenerator.fromXPath(xPathExpression);
    }

    function getJavaCssExpression(cssExpression) {
        return JavaGenerator.fromCSS(cssExpression);
    }

    function updateCssAndXpathExpressions() {
        chrome.devtools.inspectedWindow.eval('(' + XPathGenerator.toString() + ')($0)', function (res) {
            $scope.xPathExpression = res;
            $scope.javaXPathExpression = getJavaXPathExpression(res);
            $scope.$apply();
        });

        chrome.devtools.inspectedWindow.eval('(' + CSSGenerator.toString() + ')($0)', function (res) {
            $scope.cssExpression = res;
            $scope.javaCssExpression = getJavaCssExpression(res);
            $scope.$apply();
        });
    }
});