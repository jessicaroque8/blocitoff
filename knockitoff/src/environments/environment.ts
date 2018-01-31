// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCj8HyNNfiPLmalubuCsV7UzdvchbaEoU8',
    authDomain: 'knockitoff-8.firebaseapp.com',
    databaseURL: 'https://knockitoff-8.firebaseio.com/',
    projectId: 'knockitoff-8',
    // storageBucket: 'gs://knockitoff-8.appspot.com/',
    // messagingSenderId: '<your-messaging-sender-id>'
  }
};
