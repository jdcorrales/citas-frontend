Citas frontend es una app de agenda de prestaciones para sedes, consume los servicios api rest de [citas](https://github.com/jdcorrales/citas) por medio de ajax

## Instalación

### Clonar el repositorio

``` bash
# clonar repositorio
$ git clone https://github.com/jdcorrales/citas-frontend.git as citas-frontend

# ingresar al proyecto
$ cd citas-frontend

# instalar las dependencias
$ npm install

#duplicar archivo .env.example
$ cp .env.example .env
```
En el archivo .env en la variable de entorno
VUE_APP_API reemplace http://localhost por la url de la aplicación [citas](https://github.com/jdcorrales/citas) y agrege al final de la url /api/v1/ ejemplo:

```
VUE_APP_API=http://citas.test/api/v1/
```

## Uso

``` bash
# ejecute el comando dentro del projecto citas-frontend
npm run serve
```
en un navegado ingrese a http://localhost:8080

para ingresar a la aplicación use las siguientes credenciales de pruebas

Email
```
administrator@prueba.com.co
```
Password
```
secret
```