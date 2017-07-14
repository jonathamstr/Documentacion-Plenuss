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

## Handlers
En esta carpeta de datos tenemos los diferentes manejadores de datos. Aqui almacenamos los diferentes archivos
que responden a las peticioens que tienen los usuarios. 

# Definiciones de datos 

Dentro de nuestra base de datos tendremos tres tablas que seran utilizadas para poder manejar los datos que vamos a tratar para poder realizar
nuestras peticiones al servidor.
```SQL
create table p_dic(id int not null autoincrement,nombre varchar(50),proceso varchar(50),tabla varchar(50),columna varchar(50))

create table p_proc(id int,nombre varchar(50),clave varchar(50))

create table p_relacion(id int not null autoincrement,tabla01 varchar(50),tabla02 varchar(50),columna1 varchar(50),columna2 varchar(50))


--create table tabla01(id int,venta int,cliente varchar)


--create table tabla02(id int,venta int,articulo varchar)

select * from tabla01
select * from tabla02
select * from p_dic

--insert into p_dic values(1,'Venta','V01','tabla01','venta')
--insert into p_dic values(1,'Cliente','V01','tabla01','cliente')
--insert into p_dic values(1,'Cliente','V01','tabla02','Articulo')

--insert into p_relacion values(1,'tabla01','tabla02','venta','venta')

select * from p_relacion
```