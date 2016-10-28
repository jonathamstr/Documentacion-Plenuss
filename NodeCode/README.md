# Parte de la aplicaci'on

## package.json
Es el archivo que responde a npm cuando se realizan los comandos npm install y npm start.

En este caso est'a realizando el comando `node server.js` cuando realizamos el npm start. (Hacer npm start o node server.js tienen el mismo resultado.)

## server.js
Archivo principal ejecutado por el sistema, es donde se est'a ejecutando el servidor. Aqui tenemos el servidor de expres,
podemos encontrar los diferentes URI que a los que contestar'a el sistema. Tenemos que se usa la gramatica estricta de 
Ecmascript. Encontramos que por default el sistema est'a escuchando al puerto 8000.
El archivo esta utiliznado las otras URI para poder realizar las diferentes peticiones al sistema.

## node_modules
Guarda las dependencias instaladas para que funcione el sistema. 

## Handrels
En esta carpeta de datos tenemos los diferentes manejadores de datos. Aqui almacenamos los diferentes archivos
que responden a las peticioens que tienen los usuarios. 

