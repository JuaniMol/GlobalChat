# Componentes de GlobalChat

## Estructura de Componentes

### Componentes de Chat
- `ChatHeader`: Muestra la información del contacto en el chat actual
- `MessageList`: Renderiza la lista de mensajes con scroll optimizado
- `MessageInput`: Campo de texto para escribir y enviar mensajes
- `ChatItem`: Elemento individual de la lista de chats

### Componentes de Perfil
- `ProfileHeader`: Cabecera de la pantalla de perfil
- `ProfileImage`: Maneja la visualización y selección de imagen de perfil

## Guías de Uso

### ChatItem
```tsx
<ChatItem 
  chat={chatObject} // Objeto con la información del chat
/>
```

### MessageList
```tsx
<MessageList 
  messages={messagesArray} // Array de mensajes
  flatListRef={ref} // Referencia para control de scroll
/>
```

### ProfileImage
```tsx
<ProfileImage 
  imageUri={uri} // URI de la imagen
  onPickImage={handlePickImage} // Función para seleccionar imagen
/>
```
