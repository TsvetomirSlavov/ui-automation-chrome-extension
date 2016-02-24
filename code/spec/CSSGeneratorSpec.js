describe('CSSGenerator', function () {

    describe('DOM with IDs', function () {
        var targetElement;

        it("finds element with id", function () {
            targetElement = createDocWithTargetElementThatHasId('<div id="target-element"></div>');
            expect(CSSGenerator(targetElement)).toEqual('#target-element');
        });
    });

    describe('DOM with classses', function () {
        var targetElement;

        it("finds element with class that has siblings of same type", function () {
            targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="another-element-class"></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > .element-class');
        });

        it("finds element with class that has no siblings of same type", function () {
            targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><li class="another-element-class"></li>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > .element-class');
        });

        it("finds first element with class that siblings also have", function () {
            targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="element-class"></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > div:nth-of-type(1)');
        });

        it("finds second element with class that siblings also have", function () {
            targetElement = createDocWithTargetElement('<div class="element-class"></div><div id="target-element" class="element-class"></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > div:nth-of-type(2)');
        });

        it("finds element with class that has extra spaces", function () {
            targetElement = createDocWithTargetElement('<div id="target-element" class=" element-class "></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > .element-class');
        });
    });

    describe('DOM with name attribute', function () {
        var targetElement;

        it("finds input element that has unique name", function () {
            targetElement = createDocWithTargetElement('<input name="second-input-name" /><input id="target-element" name="input-name" />');
            expect(CSSGenerator(targetElement)).toEqual('html > body > input[name=\'input-name\']');
        });

        it("finds input element that has nonunique name", function () {
            targetElement = createDocWithTargetElement('<input name="input-name" /><input id="target-element" name="input-name" />');
            expect(CSSGenerator(targetElement)).toEqual('html > body > input[name=\'input-name\']:nth-of-type(2)');
        });

        it("finds button element that has unique name", function () {
            targetElement = createDocWithTargetElement('<button id="target-element" name="button-name">Button</button>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > button[name=\'button-name\']');
        });

        it("finds button element that has nonunique name", function () {
            targetElement = createDocWithTargetElement('<button name="button-name">Button 1</button><button id="target-element" name="button-name">Button 2</button>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > button[name=\'button-name\']:nth-of-type(2)');
        });

    });

    describe('DOM with siblings of same type', function () {
        var targetElement;

        it("finds element that has siblings of same type", function () {
            targetElement = createDocWithTargetElement('<div id="target-element"></div><div></div><div></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > div:nth-of-type(1)');
        });
    });

    describe('DOM with no siblings', function () {
        var targetElement;

        it("finds element that has no siblings", function () {
            targetElement = createDocWithTargetElement('<div id="target-element"></div>');
            expect(CSSGenerator(targetElement)).toEqual('html > body > div');
        });
    });

});