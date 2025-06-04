<p align="center">
  <img src="https://colraices.com/img/colraices.webp">
</p>

# Perfil cliente

El proyecto **Perfil cliente** consiste en desarrollar una Single Page Application (SPA) utilizando ReactJS para crear un formulario controlado que muestre una lista de resultados en tiempo real, estos resultados incluyen el cálculo de la cuota máxima para la solicitud de crédito, así como unas validaciones de viabilidad. Además, se utilizó SASS para crear el diseño de la aplicación de acuerdo al mockup previamente establecido por el equipo de diseño.

## Objetivo del proyecto

Permitir mediante una interfaz gráfica a los usuarios poder realizar la simulación de su cupo de crédito de acuerdo a unas variables dadas. El usuario podrá visualizar los resultados en 3 diferentes propuestas (bancos), adicionalmente, el usuario podrá cambiar los datos suministrados inicialmente para regenerar los resultados sin necesidad de tener que volver a llenar el formulario completo.

## Desarrolladores

-   [@cristianorregodev - Cristian Orrego](https://github.com/cristianorregodev)
-   [@hvmble - Mauricio Montoya](https://github.com/hvmble)

## Referencias de colores

| Color      | Hex                                                              |
| ---------- | ---------------------------------------------------------------- |
| Primario   | ![#354676](https://via.placeholder.com/10/354676?text=+) #354676 |
| Énfasis    | ![#caa55e](https://via.placeholder.com/10/caa55e?text=+) #caa55e |
| Background | ![#f7f7f6](https://via.placeholder.com/10/f7f7f6?text=+) #f7f7f6 |
| Blanco     | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |

## Funciones

-   Resultado en tiempo real
-   Cálculo de cupo máximo
-   Validación de viabilidad
-   Diseño responsivo

# Manual de Despliegue a Producción

## Contexto Inicial

El proyecto se debe ubicar dentro de la ruta `/home/dev`. Si la carpeta del proyecto aún no existe, se debe crear al clonar el repositorio en la ubicación especificada. El proceso descrito a continuación es para realizar el despliegue a producción.

## Pasos para el Primer Despliegue a Producción

## 1. Acceso al Servidor de Producción

Se debe acceder al servidor de producción mediante SSH.

```bash
ssh root@207.244.243.237 -p 9122
```

## 2. Navegar a la Carpeta del Proyecto

Se debe navegar al directorio del proyecto. Si no existe la carpeta del proyecto, se debe clonar el repositorio.
Si el directorio ya existe, navega a él:

```bash
cd /home/dev/nombre-proyecto
```

Si el directorio no existe, clona el repositorio en /home/dev/:

```bash
git clone https://url-del-repositorio.git
```

## 3. Obtener Últimos Cambios del Repositorio

Se debe ejecutar un git pull desde la rama main del repositorio remoto para obtener la última versión del código.

```bash
git pull origin main
```

## 4. Creación del Archivo de Variables de Entorno (.env)

Se debe crear un archivo .env para definir las variables de entorno de producción. Este archivo debe contener la configuración necesaria para enlazar con la API de producción.

Ejemplo de contenido del archivo .env

```bash
# VITE_AUTH_ENDPOINT='http://localhost:8080/api/auth/login'
# VITE_API_URL='http://localhost:8080/api'
# VITE_CDC_URL='http://localhost:5173/'
```

## 5. Instalación de Dependencias

Se deben instalar las dependencias necesarias del proyecto utilizando npm. Este proyecto solo utiliza npm, no se usa yarn u otro gestor de paquetes.

```bash
npm install
```

## 6. Generación del Build de Producción

Se debe ejecutar el comando para generar el build de producción.

```bash
npm run build
```

## 7. Configuración del Servidor Web

Si es necesario, se debe configurar el servidor web para que apunte a la carpeta donde se generó el build de producción (generalmente dist/ o similar).

## 8. Verificación

Una vez completado el despliegue, se debe verificar que la aplicación esté funcionando correctamente en el entorno de producción. Asegurar de que la conexión a la API de producción funcione correctamente.
