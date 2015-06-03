all:
	@echo "--> Building Application"
	@bash --norc ./scripts/build_ui.sh
	@echo "--> Starting Application"
	@electron .

test:
	@echo "No tests..."

deps:
	npm install electron-prebuilt -g

.PHONY: all
