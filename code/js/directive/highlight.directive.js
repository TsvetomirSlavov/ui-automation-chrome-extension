angular.module('directives.highlight', []).directive('highlight', function () {
        return {
            scope: {
                expression: '='
            },
            link: function (scope, element) {
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