function createSidebar() {
	chrome.devtools.panels.elements.createSidebarPane("UI Automation",
         function(sidebar) {
           sidebar.setPage("/code/html/panel.html");
		   sidebar.setHeight("220px");
	   });
}

createSidebar();