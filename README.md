# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

## Task 2 - S3 and Cloud Front

### `task 2.1`

[S3 bucket link](http://rsschool-module2-antonp.s3-website-eu-west-1.amazonaws.com/) - the 403 error should be shown

[Cloud Front link](https://d21fx92dxw2icu.cloudfront.net/) - should be available.

Fro this task S3 bucket and Cloud Front Distribution were created manually.

### `task 2.2`

To deploy S3 bucket, go the `cdk-ts` folder and run `npm run cdk:deploy` command. The configuration is described in `cdk-ts-stack.ts` file.

Whenever you redeploy your website to the S3 bucket, CloudFront will automatically serve the latest content without needing an explicit invalidation.

Links:

[S3 bucket link](http://rs-aws-module2-antonp-automated.s3-website-eu-west-1.amazonaws.com/) - the 403 error should be shown

[Cloud Front link](https://d3u8c9svdogi62.cloudfront.net/) - should be available.

P.S. For both tasks two different buckets and cloud front distributions are used.

