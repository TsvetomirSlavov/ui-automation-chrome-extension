describe('XPathGenerator', function() {

	describe('DOM with IDs', function() {

		it("finds element with id", function() {
			targetElement = createDocWithTargetElementThatHasId('<div id="target-element"></div>');
			expect(XPathGenerator(targetElement)).toEqual('//*[@id=\'target-element\']');
		});
	});

	describe('DOM with classses', function() {
		var targetElement;

		it("finds element with class that has siblings of same type", function() {
			targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="another-element-class"></div>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div[1]');
		});

		it("finds element with class that has no siblings of same type", function() {
			targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><li class="another-element-class"></li>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div');
		});

		it("finds first element with class that siblings also have", function() {
			targetElement = createDocWithTargetElement('<div id="target-element" class="element-class"></div><div class="element-class"></div>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div[1]');
		});

		it("finds second element with class that siblings also have", function() {
			targetElement = createDocWithTargetElement('<div class="element-class"></div><div id="target-element" class="element-class"></div>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div[2]');
		});
	});

	describe('DOM with inputs', function() {

		it("finds element with input that has unique name", function() {
			targetElement = createDocWithTargetElement('<input id="target-element" name="input-name" />');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/input');
		});

		it("finds element with input that has nonunique name", function() {
			targetElement = createDocWithTargetElement('<input name="input-name" /><input id="target-element" name="input-name" />');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/input[2]');
		});
	});

	describe('DOM with siblings of same type', function() {

		it("finds element that has siblings of same type", function() {
			targetElement = createDocWithTargetElement('<div id="target-element"></div><div></div><div></div>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div[1]');
		});
	});

	describe('DOM with no siblings', function() {

		it("finds element that has no siblings", function() {
			targetElement = createDocWithTargetElement('<div id="target-element"></div>');
			expect(XPathGenerator(targetElement)).toEqual('/html/body/div');
		});
	});

});