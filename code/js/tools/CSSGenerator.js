function CSSGenerator(domElement, doc) {

    function getNthOfTypeIndex(domElement) {
        if (domElement.parentNode) {
            var nthOfType = 1, children = domElement.parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                var sibling = children[i];
                if (sibling === domElement) {
                    return nthOfType;
                } else if (sibling.tagName === domElement.tagName) {
                    nthOfType++;
                }
            }
        }
    }

    function getSiblingsOfSameTypeCount(domElement) {
        var count = 0, children = domElement.parentNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            var sibling = children[i];
            if (sibling.tagName === domElement.tagName && sibling !== domElement) {
                count++;
            }
        }
        return count;
    }


    function handleIdSelector(element) {
        return '#' + element.id;
    }

    function getDocument() {
        if (doc) {
            return doc;
        }
        return document;
    }

    function handleElementWithName(elements, element) {
        var nameSelector = element.lowerCasedTagName + '[name=\'' + element.name + '\']';

        var hitsCount = getDocument().querySelectorAll(nameSelector).length;
        if (hitsCount === 1) {
            return nameSelector;
        }

        var siblingsAlsoMatchInputSelector = element.parentNode.querySelectorAll(nameSelector).length > 1;
        if (siblingsAlsoMatchInputSelector) {
            return generatePath(elements) + ' > ' + getNthOfTypeTagSelectorWithName(element);
        } else {
            return generatePath(elements) + ' > ' + nameSelector;
        }
    }

    function getNthOfTypeSuffix(element) {
        return element.nthOfType === 1 && element.siblingsOfSameTypeCount === 0 ? '' : ':nth-of-type(' + element.nthOfType + ')';
    }

    function getNthOfTypeTagSelectorWithName(element) {
        return element.lowerCasedTagName + '[name=\'' + element.name + '\']' + getNthOfTypeSuffix(element);
    }

    function getNthOfTypeTagSelector(element) {
        return element.lowerCasedTagName + getNthOfTypeSuffix(element);
    }

    function handleNthOfTypeSelector(elements, element) {
        if (elements.length === 0) {
            return getNthOfTypeTagSelector(element);
        } else {
            return generatePath(elements) + ' > ' + getNthOfTypeTagSelector(element);
        }
    }

    function handleCssClassSelector(elements, element) {
        var selectorByClasses = '.' + element.cssClasses.join('.');
        var classCount = element.cssClasses.length;
        var hitsCount = getDocument().querySelectorAll(selectorByClasses).length;
        if (hitsCount === 1 && classCount < 3) {
            return selectorByClasses;
        } else {
            var siblingsAlsoMatchCssSelector = element.parentNode.querySelectorAll(selectorByClasses).length > 1;
            if (siblingsAlsoMatchCssSelector || classCount > 1) {
                return handleNthOfTypeSelector(elements, element);
            } else {
                return generatePath(elements) + ' > ' + selectorByClasses;
            }
        }
    }

    function generatePath(elements) {
        var targetElement = elements.pop();

        if (targetElement.id) {
            return handleIdSelector(targetElement);
        }

        if (targetElement.name) {
            return handleElementWithName(elements, targetElement);
        } else if (targetElement.cssClasses) {
            return handleCssClassSelector(elements, targetElement);
        } else {
            return handleNthOfTypeSelector(elements, targetElement);
        }
    }

    function Element(domElement) {
        this.id = domElement.id;
        this.cssClasses = domElement.getAttribute('class') ? domElement.getAttribute('class').match(/\S+/g) : undefined;
        this.nthOfType = getNthOfTypeIndex(domElement);
        this.lowerCasedTagName = domElement.tagName.toLowerCase();
        this.name = domElement.getAttribute('name');
        this.id = domElement.id;
        this.siblingsOfSameTypeCount = getSiblingsOfSameTypeCount(domElement);
        this.parentNode = domElement.parentNode;
    }

    function createElementsMostSpecificLast(domElement) {
        if (!domElement || domElement.nodeType !== Node.ELEMENT_NODE) {
            return [];
        }
        return createElementsMostSpecificLast(domElement.parentNode).concat([new Element(domElement)]);
    }

    return generatePath(createElementsMostSpecificLast(domElement));
}