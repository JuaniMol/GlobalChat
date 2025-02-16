# Bienvenidos a GlobalChat 👋

Esta es una app móvil hecha con [Expo](https://expo.dev) usando el comando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requerimientos

- Node.js versión 16 o superior
- npm o yarn
- Un dispositivo móvil o emulador para pruebas

## Instrucciones para ejecutar

1. Instala las dependencias

   ```bash
   npm install
   ```

2. Inicia la app

   ```bash
    npx expo start
   ```

Como salida se abre un servidor de Expo que se puede ejecutar en simuladores. Se recomienda descargar en iOS o Android la app de Expo Go y escanear el código QR de la consola.

Enlaces útiles:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Estructura del proyecto

```
src/
├── components/    # Componentes reutilizables
├── app/           # Pantallas principales
├── hooks/         # Custom hooks
├── styles/        # Estilos compartidos
└── assets/        # Imagenes y fuentes
```

## Decisiones técnicas

1. Almacenamiento local: Se utiliza async storage para guardar los datos del usuario y facilitar el acceso desde diferentes pantallas como `editProfile.tsx`. En un entorno de producción, yo recomendaría almacenar únicamente tokens de autenticación (JWT) en el almacenamiento local.

2. Perfil de usuario: La implementación del perfil considera el nombre de usuario (Username) ingresado en el login como identificador principal del usuario.

3. Imágenes de perfil: La pantalla `chats.tsx` está preparada para mostrar fotos de perfil personalizadas. Por defecto, muestra una imagen predeterminada hasta que el backend proporcione las URLs correspondientes.

4. Librerías principales:
   - `expo-router`: Navegación entre pantallas
   - `react-native-vector-icons`: Iconos para la interfaz
   - `expo-image-picker`: Selección de imágenes desde la galería
   - `@react-native-async-storage/async-storage`: Almacenamiento local

5. Arquitectura: Se implementó una estructura modular con componentes atómicos reutilizables, hooks personalizados y estilos compartidos para mejorar la mantenibilidad y escalabilidad del código.