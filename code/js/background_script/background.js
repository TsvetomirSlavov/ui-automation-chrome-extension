var toDevToolsChannel;
var toContentScriptChannelLatestMsg;

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'contentscript') {
        port.onMessage.addListener(function (msg) {
            toDevToolsChannel.postMessage(msg);
        });
    } else if (port.name === 'devtools') {
        toDevToolsChannel = port;
    } else if (port.name === 'tocontentscriptchannel') {
        port.onMessage.addListener(function (msg) {
            chrome.tabs.query({active: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, msg);
                toContentScriptChannelLatestMsg = msg;
            });
        });
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    chrome.tabs.query({active: true}, function (tabs) {
        if (changeInfo.status === 'complete' && tabs[0].id === tabId) {
            chrome.tabs.sendMessage(tabs[0].id, toContentScriptChannelLatestMsg);
        }
    });
});