function createDocWithTargetElementThatHasId(html) {
    var doc;

    doc = document.implementation.createHTMLDocument('Document');
    doc.body.innerHTML = html;

    return {targetElement: doc.getElementById('target-element'), doc: doc};
}

function createDocWithTargetElement(html) {
    var doc, targetElement;

    doc = document.implementation.createHTMLDocument('Document');
    doc.body.innerHTML = html;
    targetElement = doc.getElementById('target-element');
    targetElement.removeAttribute('id');

    return {targetElement: targetElement, doc: doc};
}