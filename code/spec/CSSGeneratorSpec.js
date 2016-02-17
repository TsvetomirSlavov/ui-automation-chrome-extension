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

    describe('DOM with inputs', function () {
        var targetElement;

        it("finds element with input that has unique name", function () {
            targetElement = createDocWithTargetElement('<input name="second-input-name" /><input id="target-element" name="input-name" />');
            expect(CSSGenerator(targetElement)).toEqual('html > body > input[name=\'input-name\']');
        });

        it("finds element with input that has nonunique name", function () {
            targetElement = createDocWithTargetElement('<input name="input-name" /><input id="target-element" name="input-name" />');
            expect(CSSGenerator(targetElement)).toEqual('html > body > input[name=\'input-name\']:nth-of-type(2)');
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