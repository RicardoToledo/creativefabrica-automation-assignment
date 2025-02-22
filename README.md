# Creative Fabrica - QA Automation Engineer Assignment
 Automation Assignment

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/playwright-tested-brightgreen.svg)](https://playwright.dev/)

## Table of Contents

- [Project Description](#project-description)
- [Main Features](#main-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)
- [Contact Information](#contact-information)

## Project Description

This project is an automated testing suite developed for the Creative Fabrica website. It focuses on automating functional, SEO and performance tests using Playwright and Lighthouse with TypeScript. The goal is to validate critical web elements, SEO-related metadata, and ensure that the page performance meets high standards. The testing framework is designed for both manual and automated execution, with CI/CD pipeline readiness.

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

### Main Features

- Playwright-based end-to-end (E2E) testing
- Automated SEO audits using Lighthouse
- Performance testing with real-time reports
- Mobile view/emulation support
- Headless and headed execution modes
- Supports testing for structured data, meta tags, and accessibility
- Custom HTML reports generation
- Browser-specific test execution

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
| `npm run test:ui`          | Runs only SEO-related tests                   |
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
