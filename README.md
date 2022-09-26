## Firebase Chat App

Note: You should know how to use firebase and must have a project set up on firebase.

### Firstly install yarn.

```
npm install -g yarn
```

### Clone this repo.

```
git clone https://github.com/theunderdogdev/cloud-c.git
```

### Go into directory and install the packages.

```
    cd cloud-c && yarn install
```

### Go to firebase and create a collection.

### Create .env file at the root of the project with the following fields.

```
REACT_APP_apiKey=<your firebase apiKey>
REACT_APP_authDomain=<your firebase authDomain>
REACT_APP_projectId=<your firebase projectId>
REACT_APP_storageBucket=<your firebase storageBucket>
REACT_APP_messagingSenderId=<your firebase messagingSenderId>
REACT_APP_appId=<your firebase appId>
REACT_APP_measurementId=<your firebase measurementId>
REACT_APP_collName=<your collection name>
```

### Run localserver

```
yarn start
```
