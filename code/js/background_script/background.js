var toDevToolsChannel;
var toContentScriptChannel;

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'contentscript') {
        toContentScriptChannel = port;
        port.onMessage.addListener(function (msg) {
            toDevToolsChannel.postMessage(msg);
        });
    } else if (port.name === 'devtools') {
        toDevToolsChannel = port;
    } else if (port.name === 'tocontentscriptchannel') {
        port.onMessage.addListener(function (msg) {
            toContentScriptChannel.postMessage(msg);
        });
    }
});