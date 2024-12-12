# webtrendmonitor-frontend

The `webtrendmonitor-frontend` is a web frontend application built using Vite, React, and other modern web development tools. The primary function of this application is to provide detailed analytics reports for your website, based on the latest build data.

It integrates seamlessly with your CI/CD pipeline, ensuring that every new build triggers an automatic update of the analytics report, displaying the most recent performance metrics. The report covers four key areas of web performance:

- **SEO (Search Engine Optimization)**: Monitors and provides insights into how well your site is optimized for search engines.
- **Best Practices**: Evaluates the adherence to web development best practices, offering recommendations for improvements.
- **Accessibility**: Assesses the accessibility of your site, ensuring it meets standards that allow users of all abilities to interact with your content.
- **Performance**: Tracks the performance of your website, providing real-time data on load times, resource usage, and overall efficiency.

This tool is designed to help you monitor, analyze, and continuously improve the quality of your website by offering actionable insights across these four critical areas.

---

## Key Sections in the `package.json`

- `name`: `webtrendmonitor-frontend` – The project name.
- `private`: `true` – This marks the project as private, so it won't be published to a package registry.
- `version`: `0.0.0` – The current version of the project.
- `type`: `module` – This defines that the project uses ES modules (ECMAScript modules).
- `homepage`: The homepage URL (which you will need to replace `<username>` with your GitHub username).

---

## Scripts

These are various commands that can be run from the terminal to manage and deploy the project:

- `dev`: Runs the development server using Vite (`vite`).
- `build`: Builds the project for production using Vite (`vite build`).
- `lint`: Runs ESLint to check for issues in the code (`eslint .`).
- `preview`: Previews the built project (`vite preview`).
- `tsc`: Runs TypeScript compiler to check for type errors (`tsc --noEmit`).
- `prepare`: Runs Husky, which is used to manage Git hooks.
- `netlify`: Deploys the project to Netlify (`netlify deploy --prod`).
- `postinstall`: Installs Vite after `npm install` (ensures Vite is installed).
- `deploy`: Deploys the build to GitHub Pages (`gh-pages -d dist`).

---

## Setup Steps

To set up the `webtrendmonitor-frontend` project locally and deploy it to GitHub Pages or Netlify, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/<username>/webtrendmonitor-frontend.git
cd webtrendmonitor-frontend
```
Replace <username> with your actual GitHub username.

### 2. Install Dependencies
Ensure you have Node.js installed. Then, run the following command to install the required dependencies:

```bash
npm install
```
This will install all the dependencies defined in package.json, including React, Vite, TailwindCSS, ESLint, and more.

### 3. Development Environment
Once the dependencies are installed, you can start the development server by running:

```bash
npm run dev
```
This will launch the Vite development server, and you should be able to access the application in your browser at http://localhost:3000 (or whichever port is specified by Vite).

### 4. Build the Project for Production
To build the project for production (optimized and ready for deployment), run:

```bash
npm run build
```
This will create a dist folder with the production-ready files.

### 5. Run Linting and Formatting
To ensure that your code adheres to the linting rules and formatting, you can run:
```bash
npm run lint
```
You can also automatically format your code with Prettier (if configured to do so).

### 6. Preview the Build
After building the project, you can preview the production version locally by running:
```bash
npm run preview
```
This will serve the files as they would be served in production, allowing you to test the built version locally.

### 7. Prepare Git Hooks (Optional)
If you want to set up Git hooks using Husky (e.g., to run tests or linting before commits), you can run:
```bash
npm run prepare
```

### 8. Deploy to GitHub Pages
To deploy the application to GitHub Pages, run the following command:

```bash
npm run deploy
```
This will deploy the contents of the dist folder to a gh-pages branch, which GitHub Pages will serve as the live site.

Make sure the repository is set up to serve content from the gh-pages branch in your GitHub repository settings. To do this, go to the Settings tab of your GitHub repository, scroll down to GitHub Pages, and set the source to the gh-pages branch.

---

## Summary of Deployment Options
GitHub Pages: Use npm run deploy to deploy to GitHub Pages via the gh-pages branch.
By following these steps, you can easily set up and deploy the webtrendmonitor-frontend project to GitHub Pages.
