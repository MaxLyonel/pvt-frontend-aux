# PVT-FRONTEND

# Requisitos

- Instalar *Node Versión Manager* (***nvm***) herramienta para administrar mútiples versions de *Node.js*
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
- Activando la variable de entorno de *NVM* con el siguiente comando:
    `source ~/.bashrc`
- Instalar ***Node.js*** en su útlima versión:
    `nvm install node`
    El proyecto está construido con la versión sudo apt update && sudo apt install yarn de *node.js v16.14.0*. Por lo tanto debemos cambiarlo, con el siguiente comando:
    - Instalando la versión *v16.14.0*
        `nvm install v16.14.0`
    - Cambiar de versión:
        `nvm use v16.14.0`
- Instalar yarn:
    Importando la clave GPG, con el siguiente comando:

`curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`

Habilitando el repositorio y añadiendo el repositorio yarn en *Ubuntu*:

`echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

Actualizar el caché e instalar yarn

`sudo apt update && sudo apt install yarn`

Compruebe que tenga instalado yarn:

`yarn --version`

- Configurar el archivo ***.env*** con la dirección del ***BACKEND***
    `BASE_URL = http://<ip-backend>:<puerto>`

## Modo Ejecución

- Descargar dependencias para el frontend:
    `yarn install`
- Hacer correr el proyecto:
    `yarn dev`