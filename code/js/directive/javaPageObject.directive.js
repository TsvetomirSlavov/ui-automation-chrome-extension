angular.module('directives.javaPageObject', [])
    .directive('javaPageObject', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/code/js/directive/javaPageObject.directive.html',
            link: function ($scope) {

                $scope.fields = [];
                $scope.sourceCode = '';
                $scope.trackingClicks = false;
                var toContentScriptChannel = chrome.runtime.connect({name: 'tocontentscriptchannel'});
                toContentScriptChannel.postMessage({action: "stop"});

                $scope.clearFields = function () {
                    $scope.fields = [];
                };

                $scope.$on('elementClicked', function (event, element) {
                    var javaField = JavaGenerator.fieldFromCSS(element.cssSelector, $scope.fields.length);
                    if (!fieldExists(javaField)) {
                        $scope.fields.unshift(javaField);
                    }
                });

                function fieldExists(javaField) {
                    var fieldAnnotation = javaField.split('\n')[0];
                    for (var i = 0; i < $scope.fields.length; i++) {
                        if (fieldAnnotation === $scope.fields[0].split('\n')[0]) {
                            return true;
                        }
                    }
                    return false;
                }

                $scope.$watch(
                    function () {
                        return $("#java-original-code")[0].textContent;
                    },
                    function (val) {
                        $scope.sourceCode = val;
                    }
                );

                $scope.startPopulatingPageObject = function () {
                    $scope.trackingClicks = true;
                    notifyContentScriptToStartTrackingClicks();
                };

                $scope.stopPopulatingPageObject = function () {
                    $scope.trackingClicks = false;
                    notifyContentScriptToStopTrackingClicks();
                };

                function notifyContentScriptToStartTrackingClicks() {
                    toContentScriptChannel.postMessage({action: "start"});
                }

                function notifyContentScriptToStopTrackingClicks() {
                    toContentScriptChannel.postMessage({action: "stop"});
                }
            }
        };
    });