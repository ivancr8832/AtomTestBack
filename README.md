# AtomTestBack

Este proyecto es un backend desarrollado en Node.js que implementa el patrón Repository como parte de una arquitectura limpia (Clean Architecture). La elección de este patrón permite que la aplicación tenga una capa de abstracción adicional entre el dominio de la lógica de negocio y los detalles específicos de la infraestructura, como bases de datos o APIs externas. Esto proporciona flexibilidad y escalabilidad, permitiendo movernos entre distintos repositorios o fuentes de datos sin afectar las capas superiores de la aplicación.

## Estructura del Proyecto

La estructura del proyecto sigue principios de Clean Architecture, dividiendo el código en capas bien definidas para fomentar el desacoplamiento y la facilidad de mantenimiento:

- **Domain**: Contiene las entidades y casos de uso de la aplicación. Esta capa representa la lógica de negocio pura y no depende de detalles de infraestructura.
- **Application**: Encapsula los casos de uso de la aplicación, orquestando la lógica de negocio definida en la capa de Domain.
- **Infrastructure**: Define los detalles de infraestructura como la conexión a la base de datos y las implementaciones de repositorios.
- **Interfaces**: Gestiona los puntos de entrada y salida de la aplicación, como controladores de API, manejo de HTTP, validaciones y transformaciones de datos.

## Uso del Patrón Repository

El patrón Repository permite gestionar el acceso a los datos de manera centralizada y desacoplada de los detalles de implementación específicos (por ejemplo, SQL, NoSQL, etc.). En este proyecto, el patrón Repository se utiliza para abstraer el acceso a los datos de la lógica de negocio, permitiendo que cada repositorio implemente una interfaz común que la capa de aplicación pueda consumir sin conocer detalles específicos de la infraestructura.

### Ventajas del Patrón Repository en Clean Architecture

- **Desacoplamiento**: La lógica de negocio no depende de detalles específicos de almacenamiento de datos. Esto permite cambiar el origen de los datos (por ejemplo, de MongoDB a PostgreSQL) sin modificar la lógica de negocio.
- **Facilidad de prueba**: Al tener interfaces claramente definidas, es sencillo crear mocks o stubs de repositorios para realizar pruebas unitarias.
- **Reusabilidad**: Las implementaciones de repositorios pueden ser reutilizadas o intercambiadas por otras con el mismo contrato (interface).