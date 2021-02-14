install:
	npm install
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
lintfix:
	npx eslint --fix .
test:
	npx jest
test-coverage:
	npx jest --coverage
