var uiAutomationApp = angular.module('uiAutomationApp', [
    'directives.javaPageObject',
    'directives.highlight',
    'directives.selectOnClick',

    'hljs',
    'ngclipboard'
]);

uiAutomationApp.controller('UIAutomationController', function ($scope, $q) {

    $scope.xPathExpression = '';
    $scope.cssExpression = '';

    updateCssAndXpathExpressions();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
        updateCssAndXpathExpressions();
    });

    function isFrameActive(frameURL) {
        var deferred = $q.defer();
        chrome.devtools.inspectedWindow.eval('$0', {frameURL: frameURL}, function (res) {
            if (res) {
                deferred.resolve(frameURL);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }

    function getFrameURL() {

        function getFrameSources() {
            var frames = document.getElementsByTagName('iframe');
            var sources = [];
            for (var i = 0; i < frames.length; i++) {
                sources.push(frames[i].src);
            }
            return sources;
        }

        var deferred = $q.defer();

        chrome.devtools.inspectedWindow.eval('(' + getFrameSources.toString() + ')()', function (frameURLs) {
            for (var i = 0; i < frameURLs.length; i++) {
                isFrameActive(frameURLs[i]).then(function (val) {
                    deferred.resolve(val);
                })
            }
        });
        return deferred.promise;
    }

    function updateCssAndXpathExpressions() {

        function updateWithOptions(options) {
            chrome.devtools.inspectedWindow.eval('(' + XPathGenerator.toString() + ')($0)', options, function (res) {
                $scope.xPathExpression = res;
                $scope.$apply();
            });

            chrome.devtools.inspectedWindow.eval('(' + CSSGenerator.toString() + ')($0)', options, function (res) {
                $scope.cssExpression = res;
                $scope.$apply();
            });
        }

        chrome.devtools.inspectedWindow.eval('$0', function (res) {
            var options = {};
            if (!res) {
                getFrameURL().then(function (frameURL) {
                    options.frameURL = frameURL;
                    updateWithOptions(options);
                });
            } else {
                updateWithOptions(options);
            }
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