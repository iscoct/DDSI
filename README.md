# DDSI
Proyecto de DDSI

## Avisos
* Datos de la base de datos
 > __Nombre__: aux\
 __Usuario__: iscoct\
 __Contraseña__: Vamos a aprobar DDSI de 3\
 \
 Se pueden cambiar en el archivo _operaciones.js_, pero si se hace no subir la modificación a Git

* Guía de instalación
> * __Instalar NodeJS__
>   * sudo apt update
>   * sudo apt install nodejs
>   * sudo apt install npm (Opcional, solo si node os dice que no encuentra el módulo sql, habría que hacer: node install sql en la carpeta DDSI)
> * __Instalar MySQL__
> * Entrar en MySQL, crear usuario con GRANT ALL PRIVILEGES ON 'iscoct'@'localhost' IDENTIFIED BY 'Vamos a aprobar DDSI de 3';
> * Crear base de datos con CREATE DATABASE AUX;
> * Haciendo cd a Comun/js, ejecutamos: node operacionesTablas.js (las tablas se deberían crear correctamente)
> * Desde DDSI, haciendo _node <Nombre>/js/server.js_ arrancamos un servidor
> * Una vez configurada bien la base de datos y creado el usuario, por este orden se puede comprobar el buen funcionamiento de estos
> * Comprobamos que con el fichero operacionesTablas.js en Comun/js, al hacer node operacionesTablas.js una vez insertado nuestras tablas y tuplas en crearTodasLasTuplas/crearLasTablas, este crea todas las tablas y tuplas correctamente
> * __Mi recomendación es que creeis un fichero operacionesMarketing.js (en vuestro caso con vuestras operacionesX.js) y una vez implementado cada operación siguiendo el modelo de mi fichero, vayais probando debajo de la función que la operación funciona__
> * Vamos creando una a una las operaciones que tenemos que realizar utilizando a ser preferible funciones de Comun/js/operaciones.js y vamos comprobando el buen funcionamiento estas
> * Creamos server.js y vamos probando que las operaciones se conectan bien entre server.js y operaciones.js, para ello en el navegador ponemos localhost:808X/__codigoOperacion(recomendable)__?nombreCampoFormulario1=valor1&...
> * Creamos los html con los formularios


* Si vais a hacer varios cambios seguidos hacedlos todos de golpe por favor :sweat_smile:

## Cosas por hacer
**Comunes**
  * Función para mostrar las tablas
  * Añadir botón de volver tras realizar una solicitud
  * Mejorar la presentación de los HTML __(opcional)__
    > Podemos mirar Twitter Bootstrap, creo que era bastante sencillo de utilizar

**Recursos Humanos**
  * Modificar el mostrar por pantalla de DBMS
  * Creación de tablas e inserción de tuplas :heavy_check_mark:
  * Operaciones JS
    * Crear Empleado :heavy_check_mark:
    * Modificar Empleado __(Por comprobar)__
    * Consultar Empleado :heavy_check_mark:
    * Eliminar Empleado __(Por comprobar)__  
    * Crear Departamento :heavy_check_mark:
    * Modificar Departamento __(Por comprobar)__
    * Consultar Departamento :heavy_check_mark:
    * Eliminar Departamento __(Por comprobar)__  
    * Operaciones adicionales (cursor, tabla Pertenece y demás)
