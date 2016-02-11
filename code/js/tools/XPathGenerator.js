function XPathGenerator(element) {

	function getSiblingsOfSameTypeCount(element) {
		var count = 0;
		if(element.parentNode && element.parentNode.nodeType === Node.ELEMENT_NODE) {
			var children = element.parentNode.childNodes;
			for(var i = 0; i < children.length; i++) {
				var sibling = children[i];
				if (sibling.tagName === element.tagName && sibling !== element) {
		            count++;
		        }
		    }
		}
		return count;
	}

	function getNthOfTypeIndex(element) {
		var nthOfType = 1;
		var children = element.parentNode.childNodes;
		for(var i = 0; i < children.length; i++) {
			var sibling = children[i];
	        if (sibling === element) {
				return nthOfType;
	        } else if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
	            nthOfType++;
	        }
	    }
	}

	function getElementIndexSuffix(element) {
		var siblingsOfSameTypeCount = getSiblingsOfSameTypeCount(element);
		return siblingsOfSameTypeCount === 0 ? '' : '[' + getNthOfTypeIndex(element) + ']';
	}

	function getXPath(element) {
	    if (element.id) {
	        return "//*[@id='" + element.id + "']";
	    }

	    if (element.tagName.toLowerCase() === 'html') {
	        return '/' + element.tagName.toLowerCase();
	    }

		if(element.parentNode) {
		    var siblings = element.parentNode.childNodes;

		    for (var i = 0; i < siblings.length; i++) {
		        var sibling = siblings[i];
    
		        if (sibling === element) {
					return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + getElementIndexSuffix(element);
				}
		    }
		}
	}
	
	return getXPath(element);
}
