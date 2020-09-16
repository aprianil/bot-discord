# Contributing to Closa Community


The following is a set of guidelines for contributing to Closa and its packages, which are hosted in the [Closa Organization](https://github.com/beclosa) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Closa Community](#closa-community)
  * [Tech Stack](#tech-stack)
  * [Run Bot in local computer](#local-development)



[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)


## What should I know before I get started?

### **Closa Community**

#### Vision

>help every individual do what matters every day.

### Mission

>To make that vision come true, we do that by creating a community where we value the process, consistency, persistence, and shared experience. Starting by connecting interesting people to do 1 on 1 session and work on their ambitious personal project together.

---

- We believe meeting with new passionate Individuals will lead you to something greater in life.
- We believe doing what matters every day will help you to achieve what do you want in life and live life to the fullest.
- We believe everything between human start with an intimate talk that will unlock the opportunities in the future.

---

Our community helps you build the right habits. Remove Distraction. Meet New Individuals. Learn and grow together. So we make every day counts.

### Principles

>1.  Do what matters
>2. 1% better every day
>3. Dream Big but Focus at the moment.
>4. Consistency > Outcomes
>5. Document > Perfection
>6. Try! → Make it Work → Make it Pretty → Make >it Fast
>7. There is no right or wrong, only key >learnings.
>8. Show your work & Share your Learnings
>9. Value the 1 on 1 Relationship  
>10. Pay it forward!  

### **Main Tech Stack**
- Bot Discord
  - Nodejs
  - Discordjs
- API
  - Express
  - Sequelize
  - Postgres
  - JWT

### Local development
- install [postgres](https://www.postgresql.org/download/) on your local computer
- Install [Postman](https://www.postman.com/downloads/) or similar apps for testing API
- Join Discord Server Closa Development 
- Running bot closa, you just need run `node app.js` on your terminal
---

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Closa. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior, and find related reports :mag_right:.

When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/beClosa/bot-discord/blob/master/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.


#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined, create an issue on that repository and provide the following information by filling in [the template](https://github.com/beClosa/bot-discord/blob/master/.github/ISSUE_TEMPLATE/bug_report.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. e.g. which command exactly you used or what is your activity in discord. When listing steps, **don't just say what you did, but explain how you did it** ?
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots or animated GIFs** which show you following the described steps and clearly demonstrate the problem. 
You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Closa, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/closa/.github/blob/master/.github/ISSUE_TEMPLATE/feature_request.md), including the steps that you imagine you would take if the feature you're requesting existed.

### Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests. Most labels are used across all Closa repositories.

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in.

#### Type of Issue and Issue State

| Label name |  Description |
| --- | --- |
| `enhancement` | Feature requests. |
| `bug` |  Confirmed bugs or reports that are very likely to be bugs. |
| `help-wanted` |  The Closa core team would appreciate help from the community in resolving these issues. |
| `more-information-needed` |  More information needs to be collected about these problems or feature requests (e.g. steps to reproduce). |

#### Pull Request Labels

| Label name | Description |
| --- | --- |
| `work-in-progress` | Pull requests which are still being worked on, more changes will follow. |
| `needs-review` | Pull requests which need code review, and approval from maintainers. |
| `under-review` | Pull requests being reviewed by maintainers. |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again. |
