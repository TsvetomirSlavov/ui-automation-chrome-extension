function createSidebar() {
    chrome.devtools.panels.elements.createSidebarPane("UI Automation", function (sidebar) {
        var _window;

        sidebar.setPage("/code/html/panel.html");
        sidebar.setHeight("100vh");

        var port = chrome.runtime.connect({name: 'devtools'});
        port.onMessage.addListener(function (msg) {
            _window.elementClicked(msg);
        });

        sidebar.onShown.addListener(function (window) {
            _window = window;
        });
    });
}

createSidebar();