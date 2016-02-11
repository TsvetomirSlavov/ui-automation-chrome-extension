function CSSGenerator(element) {

	function getNthOfTypeIndex(element) {
		if(element.parentNode) {
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
	}

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

	function getKeyInfoOfElements(element) {
		var keyInfoOfElements = [];
		
		if(!element) {
			return keyInfoOfElements;
		}
	
		function populateElements(element) {
			var keyInfoOfElement = {
				id: element.id,
				cssClasses: element.getAttribute('class') ? element.getAttribute('class').split(' ') : undefined,
				nthOfType: getNthOfTypeIndex(element),
				tagName: element.tagName.toLowerCase(),
				name: element.getAttribute('name'),
				siblingsOfSameTypeCount: getSiblingsOfSameTypeCount(element),
				originalElement: element
			}
		
			keyInfoOfElements.unshift(keyInfoOfElement);

			if(element.parentNode && element.parentNode.nodeType === Node.ELEMENT_NODE) {
				return populateElements(element.parentNode);
			}
		}
	
		populateElements(element);
		return keyInfoOfElements;
	}

	function handleIdSelector(element) {
		return '#' + element.id;
	}
	
	function handleNthOfTypeSelector(keyInfoOfElements, element) {
		var tagName = element.tagName;
		
		if(tagName === 'input' && element.name) {
			tagName = 'input[name=\'' + element.name + '\']';
		}
		
		var selectorByNthOfType = element.nthOfType === 1 && element.siblingsOfSameTypeCount === 0 ? '' : ':nth-of-type(' + element.nthOfType + ')';
		
		if(keyInfoOfElements.length === 0) {
			return tagName + selectorByNthOfType;			
		} else {
			return findBestCssSelector(keyInfoOfElements) + ' > ' +  tagName + selectorByNthOfType;			
		}
	}

	function handleCssClassSelector(keyInfoOfElements, element) {
		var selectorByClasses = '.' + element.cssClasses.join('.');
		var hitsCount = document.querySelectorAll(selectorByClasses).length;
		if(hitsCount === 1) {
			return selectorByClasses;
		} else {
			var siblingsAlsoMatchCssSelector = element.originalElement.parentNode.querySelectorAll(selectorByClasses).length > 1;
			if(siblingsAlsoMatchCssSelector) {
				return handleNthOfTypeSelector(keyInfoOfElements, element);
			} else {
				return findBestCssSelector(keyInfoOfElements) + ' > '+ selectorByClasses;	
			}
		}		
	}

	function findBestCssSelector(keyInfoOfElements) {	
		var targetElement = keyInfoOfElements[keyInfoOfElements.length - 1];
		keyInfoOfElements.pop();
	
		if(targetElement.id) {
			return handleIdSelector(targetElement);
		}
	
		if (targetElement.cssClasses) {
			return handleCssClassSelector(keyInfoOfElements, targetElement)
		} else {
			return handleNthOfTypeSelector(keyInfoOfElements, targetElement)
		}
	}

	var keyInfoOfElements = getKeyInfoOfElements(element);
	return findBestCssSelector(keyInfoOfElements);	
}