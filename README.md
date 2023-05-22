# Workii

## Technologies used

| **Angular** | **NgRx** | **Tailwind** |
|-|-|-|
| <a target="_BLANK" href="https://angular.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular" width="64px"></a> | <a target="_BLANK" href="https://ngrx.io/"><img src="https://ngrx.io/assets/images/badge.svg" alt="NgRx" width="64px"></a> | <a target="_BLANK" href="https://tailwindcss.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" width="64px"></a> |


## Table of Contents

- [Workii](#workii)
  - [Technologies used](#technologies-used)
  - [Table of Contents](#table-of-contents)
  - [Project objectives](#project-objectives)
  - [Pre-requisites](#pre-requisites)
  - [Installation and configuration](#installation-and-configuration)
  - [Project File Tree](#project-file-tree)
  - [Architecture](#architecture)
  - [Generate components with commands](#generate-components-with-commands)
  - [Production](#production)
  - [Unit testing](#unit-testing)
- [VSCode Extensions and Tips](#vscode-extensions-and-tips)
- [How can I contribute?](#how-can-i-contribute)
  - [Support](#support)
  - [Join Our Community](#join-our-community)
  - [Read the Contribution Guidelines](#read-the-contribution-guidelines)
  - [Security](#security)
  - [License](#license)
  - [Contributors](#contributors)


>## Brief description
>Workii is a similar project to Workana / Fiver. On this platform it is sought that the talents apply to the different workiis (tasks) that have been published, with the aim of being able to get the reward they are giving for doing it. In addition, the creator of the Workii will have to choose between the talents that have applied, this in order to see who is the ideal person to meet the objectives of the Workii.

## Project objectives
- Facilitating the connection between job seekers and employers who need talent to complete specific tasks (Workiis).
- Create an easy-to-use and accessible platform for talents to apply for different Workiis and for employers to post and manage their jobs.
- Implement a rating and review system that allows employers to rate talent and talent to rate experience with employers. This will help improve the quality and reliability of the platform..
- Develop a secure and transparent payment system that allows employers to reward talents for work completed and ensure the protection of users' financial data.
- Foster the growth of a community of talents and employers in various areas and skills, which will allow users to find job opportunities in different fields and sectors.
- Promote the adoption of the platform globally, with support for multiple languages and currencies, to expand the scope of job opportunities and the diversity of talent available.
- Establish a support system and resources to help users solve problems, learn about best practices and improve their skills on the platform.
- Build a robust and modular code base that allows the open source community to easily contribute to the development and maintenance of the platform.
- Maintain and constantly improve the platform based on user feedback and market trends, ensuring that Workii remains relevant and useful over time.
- Promote ethical and responsible practices in the use of the platform, through the implementation of a code of conduct and clear policies for users.

## Pre-requisites

Before you start, make sure you have the following:

- [git](https://git-scm.com/)
- [node.js version 16 or higher](https://nodejs.org/en)
- [npm package manager](https://www.npmjs.com/)

## Installation and configuration

***Note:** This project has been generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.*

- Run the following command to install all the project dependencies
``` 
npm i o yarn install (Depends on which package manager you use)
```
- Remember that you must run the backend of the project for the correct functioning of the frontend (the instructions for this are in its [respective repository](https://github.com/Tech-Code1/backend-workii))
- Finally run the command `ng s -o` or `ng s` and navigate to the following link `http://localhost:4200/`. The application should load automatically, as well as correctly load the changes.

## Project File Tree

```
.github
  └─ ISSUE_TEMPALTE
        └─ ...
.vscode
  └─ ...
.src
  ├─ app
  |   ├─ Core
  |   |     ├─ guards
  |   |     ├─ interceptors
  |   |     ├─ interfaces
  |   |     ├─ layouts
  |   |     ├─ models
  |   |     └─ state
  |   |          ├─ actions
  |   |          ├─ effects
  |   |          ├─ reducers
  |   |          └─ selectors
  |   ├─ modules
  |   |     ├─ auth
  |   |          ├─ components
  |   |          ├─ DTOs
  |   |          ├─ guards
  |   |          ├─ interfaces
  |   |          ├─ pages
  |   |          └─ services
  |   |     ├─ dashboard
  |   |          └─ ...
  |   |     ├─ landing
  |   |          └─ ...
  |   |     └─ ...
  |   └─ shared
  |          ├─ components
  |          ├─ directives
  |          ├─ DTOs
  |          ├─ lottie
  |          ├─ services
  |          ├─ state
  |          ├─ utils
  |          └─ validators
  ├─ assets
  |  ├─ fonts
  |  ├─ i18n
  |  └─ images
  └─ environments
...
```

## Architecture

![architecture_workii](https://github.com/Tech-Code1/frontend-workii/assets/61479618/cb13425d-2690-4556-ad6a-caba9e00070b)

This project is based on a reactive architecture built on top of Angular and NgRX. NgRX, a Redux implementation for Angular, is used to manage the state of the application through a series of Actions, Reducers, Effects and Selectors.

Actions describe events that occur in the application, Reducers update the state based on these Actions, Effects manage asynchronous tasks, and Selectors extract pieces of information from the state to be used in components.

The project structure follows the Smart/Dumb Components pattern. Smart Components take care of the business logic, interact with services and handle data flow. Dumb Components, on the other hand, are presentational components that receive data through @Inputs and communicate events through @Outputs, allowing them to be reusable and easy to test.

This approach ensures a predictable, efficient and easy to understand architecture, where each part has a clear responsibility, allowing for easier development and maintenance over time.

***Note:** Although the project did not start with this architecture, it has been gradually migrating to this structure.*

Here are some resources for understanding this architecture:

- [Angular Architecture - Smart Components vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [NGRX](https://ngrx.io/)

<div align="right">

[ [ ↑ to top ↑ ] ](#workii)

</div>

## Generate components with commands

The creation of components with the Angular CLI is recommended, to streamline these processes.
Run the following command `ng g c (component-name)` to generate a new component. you can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Production

Run `ng build` to compile the project. The compilation files will be stored in the directory `dist/`.

## Unit testing

The project does not yet have unit tests, as it is a project that is to be released quickly to the public we will omit this part for now.

# VSCode Extensions and Tips

We will add the ESLint, Prettier and Material Icon Theme extensions, then go to the VS Code settings and paste the following:

![settings-vscode](https://github.com/Tech-Code1/frontend-workii/assets/61479618/ac1d546e-46dc-4da8-995f-bfc0318c0012)

```json 
  {
    "editor.formatOnSave": true,
    "prettier.requireConfig": true,
    "editor.guides.bracketPairs": "active",
    "workbench.iconTheme": "material-icon-theme",
    "tabnine.experimentalAutoImports": true,
    "typescript.preferences.importModuleSpecifier": "relative",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
  "prettier.printWidth": 120,
  "window.zoomLevel": 2
  }
```

# How can I contribute?

We welcome contributions from anyone who would like to help improve our project. Whether you're an experienced developer or just starting out, there are plenty of ways to get involved.

## Support

If you need help using our project, please visit our [SUPPORT.md](./docs/SUPPORT.md) file. This document provides information on how to get help from the community, how to report issues, and where to find additional resources.

## Join Our Community

Join our [Discord](https://indiecreatorshq.com/discord) community to connect with other contributors and get help from the maintainers. This is a great place to ask questions, get feedback on your ideas, and collaborate with others on the project.

## Read the Contribution Guidelines

Before you start contributing, please read our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file. This outlines the contribution guidelines and provides instructions for setting up your development environment, submitting pull requests, and more.

We appreciate all contributions, big and small. Thank you for helping to make our project better!

## Security

We take the security of our project seriously. If you discover a security vulnerability, please let us know right away. We will investigate all legitimate reports and do our best to quickly address any issues.

To learn more about our security practices, please read our [SECURITY.md](./docs/SECURITY.md) file.

## License

[MIT License](./LICENSE)

## Contributors

<a href="https://github.com/Tech-Code1/frontend-workii/network/dependencies/contributors">
  <img src="" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<div align="right">

[ [ ↑ to top ↑ ] ](#workii)

</div>

---

**Folow us at**

<a href="https://github.com/Indie-Creator-Community">
<img src="https://img.shields.io/badge/IndieCreatorsHQ-FAFF00?style=for-the-badge&logo=github&logoColor=black">
</a>
<a href="https://indiecreatorshq.com/discord">
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</a>
<a href="https://twitter.com/IndieCreatorsHQ">
<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white">
</a>

---
