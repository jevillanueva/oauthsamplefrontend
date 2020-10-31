# Basic Auth y OAuth2 Google UI
Adicionar antes de compilar la variable de entorno con el id de la app de Google
En caso de utilizar docker-compose para compilar la imagen adicionar el argumento
```yaml
...
  args:
    - GOOGLE_CLIENT_ID=ID_APP
...
```
## Para crear la imagen de Docker Compilada React y ejecutar
```sh
$ docker build . --build-arg GOOGLE_CLIENT_ID=APP_ID -f Dockerfile.prod -t jv/fastapioauthui
```
Para ejecutar 
```sh
$ docker run -p 80:80 jv/fastapioauthui
```

## Para crear la imagen de Docker En modo de desarrollo  de React y ejecutar

```sh
$ docker build . --build-arg GOOGLE_CLIENT_ID=APP_ID -f Dockerfile.dev -t jv/fastapioauthui
```
Para ejecutar 
```sh
$ docker run  -p 3000:3000 jv/fastapioauthui
```
Para probar conjuntamente con el api en desarrollo desde dos rutas distintas utilizar el proxy en el package.json
```js
{
  ...,
  "proxy": "http://localhost:8000"
}

```



# Default Readme.md 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.