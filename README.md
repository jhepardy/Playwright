Act as a senior QA Automation Architect.

Design a scalable, production-grade Playwright test automation framework with the following requirements:

PROJECT CONTEXT:
- Language: (JavaScript / TypeScript)
- Test Runner: Playwright Test
- Application Type: (Web / Mobile Web / API hybrid)
- Team Size: (small team)
- CI/CD: (e.g. GitHub Actions / Jenkins / GitLab)
- Execution: (Local + Docker + CI parallel execution)

ARCHITECTURE REQUIREMENTS:
- Use clean architecture and separation of concerns
- Implement Page Object Model (POM) or better alternative if applicable
- Support data-driven testing (JSON / API-driven)
- Modular and reusable actions (click, type, wait, API capture, etc.)
- Environment-based configuration (dev, staging, prod)
- Built-in retry and error handling
- Logging and reporting (HTML report + screenshots + traces)
- Parallel execution support
- Tagging and test grouping

ADVANCED FEATURES:
- API + UI hybrid testing
- Test data management strategy
- Dynamic locators handling
- Auto-waiting and flaky test handling strategy
- Screenshot/video on failure
- Custom utilities (e.g. login helper, API interceptor)
- Support for iframe, multi-tab, and file upload

DELIVERABLES:
1. Folder structure with explanation
2. Sample implementation for:
   - Base test setup
   - Page Object
   - Test spec
   - Utility/helper module
3. Example config file (playwright.config)
4. Example CI/CD pipeline setup
5. Best practices and anti-patterns

CONSTRAINTS:
- Code should be clean, modular, and scalable
- Avoid overengineering but ensure extensibility
- Follow real-world industry standards

OUTPUT FORMAT:
- Use clear sections
- Provide code snippets
- Explain WHY each decision is made
