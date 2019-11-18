# Catan

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).

## Installation

### Running Catan

You need [`npm`](https://www.npmjs.com/get-npm) installed, and then:

```
git clone https://gitlab.com/m3j2/catan.git
cd catan
npm install
echo 'REACT_APP_API="http://localhost:8000/"' > .env
npm run mockapi &
npm start
```

And that's it!

### Developing Catan

For developing you will need more specific dependencies, in particular, `npm
6.11.3` which comes with `node v12.11.1` and we recommend installing it with
[`nvm`](https://github.com/nvm-sh/nvm#installation-and-update) like so:

```
nvm install 12.11.1
nvm use 12.11.1
```

Then do `npm install` inside the project folder.

Setup the API address environment variable (next is the mock API default's):

```
echo 'REACT_APP_API="http://localhost:8000/"' > .env
```

For running catan run `npm start` and for running the mockapi `npm run mockapi`.

# Wiki

We have more documentation in the [repo's
wiki](https://gitlab.com/m3j2/catan/wikis/home), check it out!
