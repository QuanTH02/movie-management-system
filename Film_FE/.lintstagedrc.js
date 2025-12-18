module.exports = {
  // Lint and format TypeScript/JavaScript files
  "**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  // Format JSON, CSS, and other files
  "**/*.{json,css,scss,md}": ["prettier --write"],
};
