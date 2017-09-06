// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAxdeAaj7EgOGxAO4FjnOkz79sloECI52k",
    authDomain: "andlinked.firebaseapp.com",
    databaseURL: "https://andlinked.firebaseio.com",
    projectId: "andlinked",
    storageBucket: "andlinked.appspot.com",
    messagingSenderId: "1014735566214"
  }
};

// export const authConfig = {
//   provider: AuthProviders.Password,
//   method: AuthMethods.Password
// };
