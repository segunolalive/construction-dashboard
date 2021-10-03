# Construction Dashboard

## Local setup

### Install Project dependencies

- Clone this repo and open the root of the project in your terminal.
- Install dependencies by running the following command in your terminal.

```sh
yarn
```

If you use npm, run:

```sh
npm i
```

### Running the App

To run the app (UI) in development mode, run:

```sh
yarn start
```

OR

```sh
npm start
```

The app would be launched on port **3000**.

### Running the Backend Server

To start the backend server, run the following in a separate terminal

```sh
yarn start:server
```

OR

```sh
npm run start:server
```

The backend server will be started on port **4000**. Network requests between the front-end and backend are proxied, so you can make network requests like they're running on the same port.

### Building For Production

To create a production build, run:

```sh
yarn build
```

OR

```sh
npm run build
```

## Disclaimer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
