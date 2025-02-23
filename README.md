# Creative Fabrica - QA Automation Engineer Assignment

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/playwright-tested-brightgreen.svg)](https://playwright.dev/)

## Table of Contents

- [Project Description](#project-description)
  - [Main Features](#main-features)
  - [Project Structure](#project-structure)
  - [Development Process](#development-process)
- [Installation](#installation)
- [Usage](#usage)
- [CI with GitHub Actions](#ci-with-github-actions)
- [License](#license)
- [Contact Information](#contact-information)

## Project Description

This project is an automated testing suite developed for the Creative Fabrica website. It focuses on automating functional, SEO and performance tests using Playwright and Lighthouse with TypeScript. The goal is to validate critical web elements, SEO-related metadata, and ensure that the page performance meets high standards. The testing framework is designed for both manual and automated execution, with CI/CD pipeline readiness.

### Main Features

- Playwright-based end-to-end (E2E) testing
- Automated SEO audits using Lighthouse
- Performance testing with real-time reports
- Mobile view/emulation support
- Headless and headed execution modes
- Supports testing for structured data, meta tags, and accessibility
- Custom HTML reports generation
- Browser-specific test execution

### Project Structure
<details>
  <summary>Click to expand</summary>

```
creativefabrica-automation-assignment/
│
├── tests/                     # Contains all test cases
│   ├── seo_tests.spec.ts      # SEO-specific tests
│   ├── performance_tests.spec.ts # Performance tests using Lighthouse
│   ├── ui_tests.spec.ts       # UI and functional testing
│
├── utils/                     # Utility functions and helpers
│   ├── lighthouseUtils.ts     # Lighthouse audit helper functions
│   ├── pageFixtures.ts        # Fixtures for page setup and teardown
│
├── reports/                   # Generated HTML and JSON reports
│
├── eslint.config.mjs          # ESLint configuration file
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
```
</details>

## Development Process
<details>
  <summary>Click to expand</summary>
<br>
This project was developed through an iterative process that combined AI-driven automation with manual refinement.

The approach focused on leveraging AI to accelerate the creation of test cases and streamline code generation, while ensuring quality through hands-on validation and adjustments. Emphasis was placed on building meaningful, reliable tests that deliver real value, refining the output with best practices.

**The result is a well-documented, scalable solution designed to balance automation efficiency with human expertise.**

1. **Search for latest AI tools and projects for automation**
    - Interesting [case study/article](https://testomat.io/blog/playwright-ai-revolution-in-test-automation/#limitations-of-auto-playwright) that helped me guide
    - ["AI doesn’t belong in test runtime"](https://www.octomind.dev/blog/ai-doesnt-belong-in-test-runtime): Article explaining why these methods don’t work in real prod scenarios

2. **Definition of test cases with AI, which can be translated to:**
    - Manual tests cases (Test management tool)
    - Automation test cases backlog (manual refinement based on team’s priorities)

3. **Creation of a draft code base**
    - ChatGPT
    - Codegen from Playwright
    - Usage of AI tool to easily add tests

4. **Verification of AI-generated code**
    - The code actually works and is testing valuable functionality vs automated useless tasks
    - "Manual" changes and fixes (with help of GitHub Copilot and ChatGPT)
        1. Update dependencies
        2. Update execution settings
        3. Add cookies and alerts handling before even testing something
        4. Delete useless TCs, redundant methods, refactor
        5. Fix selectors, methods, failing tests
        6. Apply actual best practices (Playwright + TypeScript)

5. **Final touches + more complex tasks that required automation knowledge/experience**
    - CICD Integration
    - Retries
    - Reporting

6. **Documentation of project:**
    - README
    - Development Process

### **Comparison with another recent automation project not using AI**

[Studocu QA Engineer Assignment](https://github.com/RicardoToledo/studocu-qa-engineer-assignment)

</details>

## Installation
#### Prerequisites

- Node.js: [Download](https://nodejs.org/)
- Git: [Download](https://git-scm.com/)

> Make sure you have these prerequisites installed before proceeding with the project setup and running.
1. **Clone the repository:**

```bash
git clone https://github.com/RicardoToledo/creativefabrica-automation-assignment.git
cd creativefabrica-automation-assignment
```

2. **Install dependencies:**

```bash
npm install
npx playwright install
```

## Usage

### Running Tests

The test suite can be executed using any of the `npm` scripts listed below to run tests in your desired configuration. Simply run one of the following commands in your terminal follwing this standard.

```bash
npm run <command>
```
Use the following npm scripts to run the tests:

| Command                      | Description                                       |
|------------------------------|---------------------------------------------------|
| `npm run test`              | Runs all tests using Chromium, Firefox, Safari, and mobile Chrome |
| `npm run test:desktop`              | Runs all tests using desktop Chromium, Firefox, Safari                   |
| `npm run test:mobile`              | Runs all tests using mobile Chrome                   |
| `npm run test:desktop:headless`              | Runs all tests in desktop browsers in headless mode                   |
| `npm run test:mobile:headless`              | Runs all tests using mobile Chrome in headless mode      |
| `npm run test:ui`          | Runs only UI-related tests                   |
| `npm run test:seo`          | Runs only SEO-related tests                   |
| `npm run test:performance`  | Runs only performance-related tests   |
| `npm run test:ai`  | Runs only AI made tests   |
| `npm run test:debug`  | Runs all tests in Playwright's debug mode   |
| `npm run lint`              | Lints the project files                           |

#### Running the tests without npm scripts

> To run the test suite with different settings or to specify tests without using npm scripts, please refer to the Playwright's [Running and debugging tests](https://playwright.dev/docs/running-tests) documentation.

## CI with GitHub Actions

The project integrates [GitHub Actions](https://github.com/features/actions) for its CI pipeline. A workflow is already set up in this repository, automating a full test run on an [Ubuntu](https://ubuntu.com/) virtual machine whenever a push or pull request is created for the `main` branch.

The configuration file for this setup is located at: [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml)

## License

This project is licensed under the [MIT License](LICENSE).

## Contact Information

For any questions or feedback, feel free to reach out to the author: [Ricardo Toledo](https://github.com/RicardoToledo).
