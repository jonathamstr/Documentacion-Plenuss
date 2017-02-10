# Documentacion-Plenuss
## Documentos para la parte del servidor
En esta parte del sistema nos encontramos con el back-end que responder  a las diferentes peticiones que se pueden realizar con las bases de datos. 

## Requerimientos

Node.js v4.5.0
El sistema fue probado contra esta version. 
Las demas dependencias se encuentran dentro del paquete de package.json

En caso de que se tengan errores en las dependencias, se puede utilizar el comando 
`
  npm install 
  `
 para poder instalar las dependencias que se necesitan. Se necesita realizar el comando al mismo nivel del archivo package.json.
 Este es el archivo que es buscado por npm para realizar install o start.
 
 Para poder iniciar el servidor se necesita se ejecuta el comando `npm start`. 
 
 El sistema est'a utilizando el sistema de express para responder a la pagina y se est'a utilizando la librer'ia de tedious para poderser conectar a la base de datos de SQL Server.
 
 Se puede cambiar facilmente la librer'ia que se est'a utilizando, solo se tienen que cambiar las funciones. 
 
 Para poder utilizar m'as a fondo el sistema y modificarlo, se encontraran explicaciones dentro de cada uno de los archivos y ademas de un archivo readme en cada uno de ellos.
