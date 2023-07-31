#Test Movie DB Luis Martinez

## ES - instrucciones

Las instrucciones para el uso de este proyecto son sencillas, necesitaremos una API KEY Para poder compilar el código del servidor: 

1.Tenemos que ir a la página de https://www.themoviedb.org/ y obtener una API_KEY una vez que se inicia sesión.

2.Tendremos que ingresar nuestra API KEY en el archivo */server/.env* donde está el apartado de `API_KEY=`.

3.Una vez que se ingrese la API KEY procederemos a ubicarnos en la raíz del proyecto y ejecutar el comando: 

`npm run install-server` así como tambien `npm run install-client`

### NOTA: Esperamos a que no salga ningun tipo de error y si sale algún error debemos de seguir los siguientes pasos:

*A). Acceder a el folder de cada proyecto y ejecutar un `npm install` para que se instalen las dependencias necesarias
*B). Volvemos a el conteo de pasos.

4. Tendremos que verificar que tanto el puerto 3001 como el 5173 de nuestro equipo estén disponibles para su uso

5. Una vez que estén libres tendremos que colocarnos en la raíz del proyecto, abrir 2 ventanas de terminal y ejecutar los comandos:

`npm run server` y en la otra ventana el comando:  `npm run client`

ambos deben de dar mensaje de que se están ejecutando correctamente.

6. Ingresa a tu http://localhost:5173/ Y si se muestran las peliculas favoritas del momento tu proyecto fullstack se ejecuto correctamente!.

