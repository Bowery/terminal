all:
	@echo "--> Building Application"
	@bash --norc ./scripts/build_ui.sh
	@echo "--> Starting Application"
	@electron .

deps:
	npm install electron-prebuilt -g

.PHONY: all
