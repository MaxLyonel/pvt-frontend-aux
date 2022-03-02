# PVT-FRONTEND

## Requisitos
    
- Instalar ***Node.js*** en su versión reciente de *LTS*, (Al momento de que se redactó esta documentación, la versión LTS de node es: ***LTS v16.14.0***).

- Instalar yarn versión más reciente.

Puede instalar ***Node.js*** en su versión LTS, a través de ***nvm*** (herramienta para administrar múltiples versiones de Node.js) o consultar la [documentación oficial](https://nodejs.org/es/docs/) para su instalación.

## Instalación de la última versión LTS de node mediante nvm

### Instalación de la herramienta nvm

La instalación de la herramienta para administrar múltiples versiones de Node.j (nvm) se lo realiza con el siguiente comando:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

Activando la variable de entorno de *NVM* con el siguiente comando:

`source ~/.bashrc`

Instalando la versión LTS v16.14.0 de Node.js:

`nvm install v16.14.0`

Compruebe la instalación con el siguiente comando:

`node --version`


## Instalación de yarn 

Primero se debe importar la clave GPG, con el siguiente comando:

`curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`

Habilitando el repositorio y añadiendo el repositorio yarn en Ubuntu:

`echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

Actualizar el caché e instalar yarn

`sudo apt update && sudo apt install yarn`

Compruebe que tenga instalado yarn:

`yarn --version`

## Puglins

El directorio de complementos contiene complemento de JavaScript que desea ejecutar antes de instanciar la aplicación raiz Vue.js. Puede agregar acá complementos Vue e inyectar funciones o constantes, mediante la adición de la ruta a los plugins en el archivo `nuxt.config.js`.

Más información sobre el uso de este directorio en la [documentación](https://nuxtjs.org/docs/directory-structure/plugins/).


### Instalar el plugin **dotenv**

Puede realizar la instalación con el administrador de paquetes *npm*:

`npm install @nuxtjs/dotenv`

O con el administrador de paquetes *yarn*:

`yarn add @nuxtjs/dotenv`

## Configuraciones

Debe realizar una serie de configuraciones en el proyecto antes de poder ejecutarlo.

### Adicionar el archivo .env

Este archivo nos sirve para personalizar las variables de entorno de nuestra aplicación. Debe configurar el archivo, con los siguientes parámetros:

`APP_TITLE = Plataforma Virtual de Trámites`

`BASE_URL = http://<ip-backend>:<puerto>`

La ip y el puerto deben apuntar a donde esta implementado el **BACKEND**.


## Modo Ejecución

Para ejecutar el proyecto, utilizamos el administrador de paquetes yarn. 

- Instalar dependenias

    `yarn install`
    
- Hacer correr el proyecto:

    `yarn dev`