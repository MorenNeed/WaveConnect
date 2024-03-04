# WaveConnect

WaveConnect is a messaging app that connects people using React, Express, TypeScript, Node.js, Firebase, Firestore, and more.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development](#development)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/MorenNeed/WaveConnect.git`
2. Navigate to the project directory: `cd WaveConnect`
3. Install dependencies: `npm install`

## Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firebase Authentication with Email/Password provider
3. Create a Firestore database
4. Obtain Firebase configuration credentials
5. Create a `.env` file in the root directory and add the following:

```
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

## Usage

1. Start the development server: `npm run start:dev`
2. Open your browser and go to `http://localhost:3000`

## Development

- Build TypeScript files: `npm run build:dev`
- Start the Express server: `npm run start:dev`

## Dependencies

- [@emotion/react](https://www.npmjs.com/package/@emotion/react): For styling React components
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled): For styled components with Emotion
- [@material-ui/core](https://www.npmjs.com/package/@material-ui/core): React components that implement Google's Material Design
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material): Material-UI icons as React components
- [@mui/material](https://www.npmjs.com/package/@mui/material): Material-UI components for React
- [@mui/styled-engine-sc](https://www.npmjs.com/package/@mui/styled-engine-sc): Material-UI styled engine for styled-components
- [@mui/styles](https://www.npmjs.com/package/@mui/styles): Material-UI styles solution for JSS
- [axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file
- [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack): A secure webpack plugin that supports dotenv and other environment variables
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [firebase](https://www.npmjs.com/package/firebase): Firebase JavaScript SDK
- [firebase-admin](https://www.npmjs.com/package/firebase-admin): Firebase Admin Node.js SDK
- [passport](https://www.npmjs.com/package/passport): Simple, unobtrusive authentication for Node.js
- [passport-local](https://www.npmjs.com/package/passport-local): Local username and password authentication strategy for Passport
- [react](https://www.npmjs.com/package/react): A JavaScript library for building user interfaces
- [react-dom](https://www.npmjs.com/package/react-dom): React package for working with the DOM
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): DOM bindings for React Router
- [styled-components](https://www.npmjs.com/package/styled-components): Visual primitives for the component age
- [uuid](https://www.npmjs.com/package/uuid): Simple, fast generation of RFC4122 UUIDs

## Dev Dependencies

- [@types/express](https://www.npmjs.com/package/@types/express): TypeScript definitions for Express
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [@types/react](https://www.npmjs.com/package/@types/react): TypeScript definitions for React
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): TypeScript definitions for React DOM
- [@types/uuid](https://www.npmjs.com/package/@types/uuid): TypeScript definitions for UUID
- [css-loader](https://www.npmjs.com/package/css-loader): CSS file loader module for webpack
- [nodemon](https://www.npmjs.com/package/nodemon): Monitor for any changes in your node.js application and automatically restart the server
- [sass](https://www.npmjs.com/package/sass): Sass compiler written in Dart
- [sass-loader](https://www.npmjs.com/package/sass-loader): Sass loader for webpack
- [style-loader](https://www.npmjs.com/package/style-loader): Style loader module for webpack
- [ts-loader](https://www.npmjs.com/package/ts-loader): TypeScript loader for webpack
- [typescript](https://www.npmjs.com/package/typescript): TypeScript is a language for application-scale JavaScript
- [webpack](https://www.npmjs.com/package/webpack): A static module bundler for modern JavaScript applications
- [webpack-cli](https://www.npmjs.com/package/webpack-cli): Command line interface for webpack

## Authors

- Roshchupkin Oleksii

## License

This project is licensed under the ISC License.
