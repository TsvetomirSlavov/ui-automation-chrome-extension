var uiAutomationApp = angular.module('uiAutomationApp', [
    'directives.javaPageObject',
    'directives.highlight',
    'directives.selectOnClick',

    'hljs'
]);

uiAutomationApp.controller('UIAutomationController', function ($scope) {

    $scope.xPathExpression = '';
    $scope.cssExpression = '';

    updateCssAndXpathExpressions();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
        updateCssAndXpathExpressions();
    });

    function updateCssAndXpathExpressions() {
        chrome.devtools.inspectedWindow.eval('(' + XPathGenerator.toString() + ')($0)', function (res) {
            $scope.xPathExpression = res;
            $scope.$apply();
        });

        chrome.devtools.inspectedWindow.eval('(' + CSSGenerator.toString() + ')($0)', function (res) {
            $scope.cssExpression = res;
            $scope.$apply();
        });
    }

    $scope.elementClicked = function (element) {
        $scope.$broadcast('elementClicked', element);
        $scope.$apply();
    };

});

function elementClicked(element) {
    angular.element(document.getElementById('ui-automation-app')).scope().elementClicked(element);
}