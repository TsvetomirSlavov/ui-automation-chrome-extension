angular.module('directives.selectOnClick', []).directive('selectOnClick', function () {
    return function (scope, element) {

        element.bind('click', function () {
            var range = document.createRange();
            range.selectNodeContents(element[0]);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
    };
});