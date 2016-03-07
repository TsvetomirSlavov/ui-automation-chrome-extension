var toDevToolsChannel;

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'contentscript') {
        port.onMessage.addListener(function (msg) {
            toDevToolsChannel.postMessage(msg);
        });
    } else if (port.name === 'devtools') {
        toDevToolsChannel = port;
    } else if (port.name === 'tocontentscriptchannel') {
        port.onMessage.addListener(function (msg) {
            chrome.tabs.query({active: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, msg);
            });
        });
    }
});