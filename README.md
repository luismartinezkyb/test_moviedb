#Test Movie DB Luis Martinez

## ES - instrucciones

Las instrucciones para el uso de este proyecto son sencillas, necesitaremos una API KEY Para poder compilar el código del servidor: 

1.Tenemos que ir a la página de https://www.themoviedb.org/ y obtener una API_KEY una vez que se inicia sesión.

2.Tendremos que ingresar nuestra API KEY en el archivo */server/.env* donde está el apartado de `API_KEY=`.

3.Una vez que se ingrese la API KEY procederemos a ubicarnos en la raíz del proyecto y ejecutar el comando: 

`npm run install-server` así como tambien `npm run install-client`

### NOTA: Esperamos a que no salga ningun tipo de error y si sale algún error debemos de seguir los siguientes pasos:

*A). Acceder a el folder de cada proyecto y ejecutar un `npm install` para que se instalen las dependencias necesarias


4. Tendremos que verificar que tanto el puerto 3001 como el 5173 de nuestro equipo estén disponibles para su uso

5. Una vez que estén libres tendremos que colocarnos en la raíz del proyecto, abrir 2 ventanas de terminal y ejecutar los comandos:

`npm run server` y en la otra ventana el comando:  `npm run client`

ambos deben de dar mensaje de que se están ejecutando correctamente.

6. Ingresa a tu http://localhost:5173/ Y si se muestran las peliculas favoritas del momento tu proyecto fullstack se ejecuto correctamente!.

## EN - Instructions

1. Enter to the page https://www.themoviedb.org/, sign up and get your free API_KEY
2.  Fill the file `server/.env` with the API_KEY in the `API_KEY=""` area - line 2
3.  Now just run in the main folder the next commands
`npm run install-server` and then if everything works fine just run `npm run install-client`

## NOTE: If something went wrong just enter into every folder (client/server) and then run `npm install`

4.After that you must be sure that you don't have anything runnning in background in the ports 3001 and 5173 in you machine, if you are using one of those ports you need to turn it off to run the project

5.Now that you have all the necessary dependencies, just run inside the main folder in a terminal the next commands: 
`npm run server` after that just run `npm run client`

6.  Now both of the projects have to work fine, enter to your http://localhost:5173/ and it will display all the favorite movies working with the proxy server.

## NOTE: If anything went wrong please contact  me ASAP to let you know how to run the project in a proper way
