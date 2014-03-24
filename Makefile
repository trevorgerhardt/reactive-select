
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

lint: index.js test/index.js
	@jshint index.js test/index.js

node_modules:
	@npm install

test: build lint test/index.js
	@component test phantom

.PHONY: clean
