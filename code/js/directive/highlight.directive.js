angular.module('directives.highlight', []).directive('highlight', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {},
        link: function (scope, element) {

            scope.$watch(
                function () {
                    return element[0].textContent;
                },
                function (val) {
                    element[0].innerHTML = hljs.highlight('java', val).value;
                }
            );
        }
    };
});