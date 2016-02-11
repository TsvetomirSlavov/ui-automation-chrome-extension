function createDocWithTargetElementThatHasId(html) {
	var doc, targetElement;

	doc = document.implementation.createHTMLDocument('Document');
	doc.body.innerHTML = html;

	return doc.getElementById('target-element');
}

function createDocWithTargetElement(html) {
	var doc, targetElement;
	
	doc = document.implementation.createHTMLDocument('Document');
	doc.body.innerHTML = html;
	targetElement = doc.getElementById('target-element');
	targetElement.removeAttribute('id');
	
	return targetElement;
}