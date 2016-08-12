# How to contribute

## Creating an Issue

The [Mozilla guidelines for writing bug reports](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines) is fantastic, so I won't repeat the whole thing here. Here is a general summary of what to do when submitting a bug report:

* Open one issue per bug, question, or feature request.
* Search existing [Issues](https://github.com/chimericdream/node-toodledo/issues) to be sure your issue hasn't already been reported.
* If reporting a bug, be as clear as possible. Precise steps to reproduce the error are ideal.

## Making Changes

* Create a branch from the `master` branch. If your branch contains a fix for a specific issue, it should follow the `issues/{number}` convention. Feature branches should be named `feature/{your-feature-name}`.
* Commit messages should be clear, and preferably be prefixed with the branch name (e.g. "[issues/123] your message here"). (Save [this GitHub gist](https://gist.github.com/chimericdream/058548e6a59c2040f52df261e4c502a0) as `.git/hooks/prepare-commit-msg` in your repository to do this automatically.)
* Run the ESLint script on your changes to ensure consistent code style.

## Submitting the Pull Request

* Push your branch to your fork of the repository.
* Submit a pull request from your issue or feature branch to the `master` branch on the `node-toodledo` repository.
* Make sure your pull request builds successfully, including the ESLint script and the test suite.
* If your code adds a new feature or fixes a bug in an existing feature, it should include the appropriate unit tests.
* Be sure to tag any issues your pull request is taking care of / contributing to.
  * Adding "Closes #123" or "Fixes #456" to a pull request will auto close the issue once the PR is merged.
