describe('XPathGenerator', function () {

    describe('DOM with IDs', function () {
        var createdDom;

        it("finds element with id", function () {
            createdDom = createDocWithTargetElementThatHasId('<div id="target-element"></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('//*[@id=\'target-element\']');
        });
    });

    describe('DOM with classses', function () {
        var createdDom;

        it("finds element with class that has siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="another-element-class"></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div[1]');
        });

        it("finds element with class that has no siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><li class="another-element-class"></li>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div');
        });

        it("finds first element with class that siblings also have", function () {
            createdDom = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="element-class"></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div[1]');
        });

        it("finds second element with class that siblings also have", function () {
            createdDom = createDocWithTargetElement('<div class="element-class"></div><div id="target-element" class="element-class"></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div[2]');
        });
    });

    describe('DOM with inputs', function () {
        var createdDom;

        it("finds element with input that has unique name", function () {
            createdDom = createDocWithTargetElement('<input id="target-element" name="input-name" />');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/input');
        });

        it("finds element with input that has nonunique name", function () {
            createdDom = createDocWithTargetElement('<input name="input-name" /><input id="target-element" name="input-name" />');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/input[2]');
        });
    });

    describe('DOM with siblings of same type', function () {
        var createdDom;

        it("finds element that has siblings of same type", function () {
            createdDom = createDocWithTargetElement('<div id="target-element"></div><div></div><div></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div[1]');
        });
    });

    describe('DOM with no siblings', function () {
        var createdDom;

        it("finds element that has no siblings", function () {
            createdDom = createDocWithTargetElement('<div id="target-element"></div>');
            expect(XPathGenerator(createdDom.targetElement, createdDom.doc)).toEqual('/html/body/div');
        });
    });

});