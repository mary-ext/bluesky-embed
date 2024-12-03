#!/usr/bin/env bash

set -euo pipefail

if [[ -n $(git status --porcelain) ]]; then
	echo 'Working directory is not clean'
	git status --short
	exit 1
fi

GIT_COMMIT=$(git rev-parse HEAD)

rsync -aHAX --delete --exclude=.git --exclude=.nojekyll dist/ pages/
touch pages/.nojekyll

git -C pages/ add .
git -C pages/ commit -m "deploy: ${GIT_COMMIT}"
git -C pages/ push
