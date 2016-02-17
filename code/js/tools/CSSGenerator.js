function CSSGenerator(domElement) {

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

    function handleInputWithName(elements, element) {
        var inputSelector = 'input[name=\'' + element.name + '\']';
        var siblingsAlsoMatchInputSelector = element.parentNode.querySelectorAll(inputSelector).length > 1;
        if (siblingsAlsoMatchInputSelector) {
            return generatePath(elements) + ' > ' + getNthOfTypeInputTagSelector(element);
        } else {
            return generatePath(elements) + ' > ' + inputSelector;
        }
    }

    function getNthOfTypeSuffix(element) {
        return element.nthOfType === 1 && element.siblingsOfSameTypeCount === 0 ? '' : ':nth-of-type(' + element.nthOfType + ')';
    }

    function getNthOfTypeInputTagSelector(element) {
        return 'input[name=\'' + element.name + '\']' + getNthOfTypeSuffix(element);
    }

    function getNthOfTypeTagSelector(element) {
        return element.lowerCasedTagName + getNthOfTypeSuffix(element);
    }

    function handleNthOfTypeSelector(elements, element) {
        var lowerCasedTagName = element.lowerCasedTagName;

        if (lowerCasedTagName === 'input' && element.name) {
            return handleInputWithName(elements, element);
        }

        if (elements.length === 0) {
            return getNthOfTypeTagSelector(element);
        } else {
            return generatePath(elements) + ' > ' + getNthOfTypeTagSelector(element);
        }
    }

    function handleCssClassSelector(elements, element) {
        var selectorByClasses = '.' + element.cssClasses.join('.');
        var hitsCount = document.querySelectorAll(selectorByClasses).length;
        if (hitsCount === 1) {
            return selectorByClasses;
        } else {
            var siblingsAlsoMatchCssSelector = element.parentNode.querySelectorAll(selectorByClasses).length > 1;
            if (siblingsAlsoMatchCssSelector) {
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

        if (targetElement.cssClasses) {
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