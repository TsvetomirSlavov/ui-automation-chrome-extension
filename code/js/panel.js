var uiAutomationApp = angular.module('uiAutomationApp', []);

uiAutomationApp.controller('UIAutomationController', function ($scope, $window) {

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

uiAutomationApp.directive('selectOnClick', function () {
    return function (scope, element, attrs) {

        element.bind('click', function () {
            var range = document.createRange();
            range.selectNodeContents(element[0]);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
    };
});

uiAutomationApp.directive('highlight', function ($timeout) {
    return {
        scope: {
            expression: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('expression',
                function (newValue, oldValue) {
                    if (newValue !== oldValue && newValue) {
                        element[0].innerHTML = hljs.highlight('java', newValue).value;
                    }
                }
            );
        }
    };
});