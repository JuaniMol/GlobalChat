# Bienvenidos a GloalChat 👋

Esta es una app mobile hecha con [Expo](https://expo.dev) usando el comando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Instrucciones para ejecutar

1. Instala las dependencias

   ```bash
   npm install
   ```

2. Inicia la app

   ```bash
    npx expo start
   ```

Como salida abre un servidor de expo que se puede correr en simuladores. Yo recomiendo bajarse en iOS o Android la app de Expo Go y escanear el código QR de la consola

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Decisiones más importantes

1. Decidí guardar los datos del usuario en el async storage para podes acceder más facil desde otra pantalla como `editProfile.tsx`, si tuviera un backend seguro guardaria solo en el async storage el token JWT u otro método utilizado para distinguir al usuario desde el backend.

2. Me parecio raro en el mockup la data de UserProfile ya que hace referencia a John, que es un contacto del usuario y tiene informacion de lo que seria una pantalla de ver la data de ese contacto. Primero pensé que se referia al usuario logueado. Finalmente para editar el perfil del usuario decidí considerar el Nombre como el Username ingresado en el login.

3. Dejé abierta la posibilidad en la pantalla `chats.tsx` de que los usuarios tengan su propia foto de perfil. En el momento que el backend envie la url de la foto, será mostrada. Caso contrario, muestra una foto default.

4. Las librerias externas que utilicé son:

   - `expo-router` para la navegación entre pantallas.
   - `react-native-vector-icons` para iconos en botones.
   - `expo-image-picker` para seleccionar una imagen desde la galería.
   - `@react-native-async-storage/async-storage` para guardar en el dispositivo información del usuario.