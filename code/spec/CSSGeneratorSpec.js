describe('CSSGenerator', function () {

    describe('DOM with IDs', function () {
        var createdDom;

        it("finds element with id", function () {
            createdDom = createDocWithTargetElementThatHasId('<div id="target-element"></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('#target-element');
        });
    });

    describe('DOM with classses', function () {
        var createdDom;

        it("finds element with class that has siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="another-element-class"></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('.element-class');
        });

        it("finds element with class that has no siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><li class="another-element-class"></li>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('.element-class');
        });

        it("finds first element with class that siblings also have", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="element-class"></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > div:nth-of-type(1)');
        });

        it("finds second element with class that siblings also have", function () {
            createdDom = createDocWithTargetElement('<div class="element-class"></div><div id="target-element" class="element-class"></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > div:nth-of-type(2)');
        });

        it("finds element with class that has extra spaces", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class=" element-class "></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('.element-class');
        });

        it("does not use class selector with more than two classes", function () {
            createdDom = createDocWithTargetElement('<div><div id="target-element" class="element-class-1 element-class-2 element-class-3"></div></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > div > div');
        });
    });

    describe('DOM with name attribute', function () {
        var createdDom;

        it("finds input element that has unique name", function () {
            createdDom = createDocWithTargetElement('<div id="div-id"><div><button id="target-element" name="button-name">Button</button></div></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('button[name=\'button-name\']');
        });

        it("finds input element that has nonunique name", function () {
            createdDom = createDocWithTargetElement('<input name="input-name" /><input id="target-element" name="input-name" />');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > input[name=\'input-name\']:nth-of-type(2)');
        });

        it("finds button element that has unique name", function () {
            createdDom = createDocWithTargetElement('<button id="target-element" name="button-name">Button</button>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('button[name=\'button-name\']');
        });

        it("finds button element that has nonunique name", function () {
            createdDom = createDocWithTargetElement('<button name="button-name">Button 1</button><button id="target-element" name="button-name">Button 2</button>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > button[name=\'button-name\']:nth-of-type(2)');
        });

        it("uses name attribute instead of CSS class", function () {
            createdDom = createDocWithTargetElement('<button id="target-element" name="button-name" class="button-class">Button 1</button>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('button[name=\'button-name\']');
        });
    });

    describe('DOM with siblings of same type', function () {
        var createdDom;

        it("finds element that has siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element"></div><div></div><div></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > div:nth-of-type(1)');
        });
    });

    describe('DOM with no siblings', function () {
        var createdDom;

        it("finds element that has no siblings", function () {
            createdDom = createDocWithTargetElement('<div id="target-element"></div>');
            expect(CSSGenerator(createdDom.targetElement, createdDom.doc)).toEqual('html > body > div');
        });
    });

});