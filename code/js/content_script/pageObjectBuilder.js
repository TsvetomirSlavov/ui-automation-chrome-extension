var port = chrome.runtime.connect({name: 'contentscript'});
var populatingPageObject = false;

$('body').on('click', function (event) {
    if (populatingPageObject) {
        event.preventDefault();
        var cssSelector = CSSGenerator(event.target);
        var xPathSelector = XPathGenerator(event.target);
        var element = {
            cssSelector: cssSelector,
            xPathSelector: xPathSelector,
            tagName: event.target.tagName.toLowerCase()
        };

        port.postMessage(element);
    }
});

port.onMessage.addListener(function (request) {
    populatingPageObject = request.action === 'start';
});