# Frontend con redux y Vite

### Para iniciar desde 0:

Se debe acceder a https://vite.dev/guide/ para copiar el npm  
`npm install -D vite`  
Dentro del cmd se muestran varias opciones. En este caso se utiliza ``Framework`` y ``TypeScripy``  
Esto crea el template del proyecto, con sus carpetas.  
Se debe instalar redux dentro del proyecto, utilizando la terminal para ingresar el comando:  
`npm install @reduxjs/toolkit`  
Se necesita react redux, el cual se instala facilmente con el comando:  
`npm install react-redux`
Lo importante para que funcione este proyecto, es que contenga un API (conexion al backend) un Slice (Administrador de Estados), un store (guardar estados y datos) y mostrarlo en UI.  
  
Después de instalar las dependencias, se deben crear varios archivos que se necesitan para el funcionamiento.  
``habitAPI`` y ``habitSlice``  
En la api se utiliza para crear la conexión al backend, para que haga solicitudes al backend.  
Para el Slice, se crean los estados de nuestra aplicación, en este caso, para agregar los habitos a la UI.  
Se modifica el `main.tsx` para que muestre lo que tenemos en nuestro almacenamiento (store).  

Para forzar que el estado se conecte y muestre lo guardado en el backend, se debe crear un nuevo tsx con la clase, en este caso colocamos habits.tsx para tenerlo mejor identificado.  
Dentro de este archivo, colocamos una función map, para que recorra la clase habitos, logrando que imprima dentro de la UI todo los habitos pertenecientes a nuestro grupo de arreglo.  

Como ultimo paso, debemos modificar la pantalla principal del proyecto y modificarlo, el archivo `App.tsx` es el que contiene el diseño de la página que se muestra en pantalla.  
Lo importante que se debe cambiar, es importar todos los cambios y métodos que utilizamos para organizar estados, recorrer nuestro arreglo, y mostrar el arreglo. Utilizando dispatch. Indicamos que la página, al cargarse nuevamente, inicie un cambio de estado, que fuerza a una actualización en los datos, creando una petición a nuestro backend, así siempre se mantiene actualizado nuestro UI con todos los cambios que se almacenen desde el backend.  


### Inicio rapido del proyecto  
Para ejecutar el programa, se utiliza el comando:  
`npm run dev`
