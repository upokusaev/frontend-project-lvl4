install: install-deps

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

dev:
	make build && make start

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
