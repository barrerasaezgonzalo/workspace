# Workspace

Workspace es una aplicación de gestión de tareas diseñada para organizar y administrar proyectos en un solo lugar.

## Funcionalidades

- Crear, editar y eliminar tareas
- Organizar tareas por estado
- Mover tareas entre columnas mediante Drag & Drop
- Añadir fechas y horarios a las tareas
- Crear y gestionar subtareas
- Buscar tareas
- Vista de calendario
- Notificaciones de tareas
- Diseño responsive para escritorio y dispositivos móviles
- Persistencia de datos con Supabase

## Tecnologías

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- dnd-kit
- Lucide React

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/barrerasaezgonzalo/workspace
cd workspace
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env.local` con las credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

## Capturas

<img width="1919" height="901" alt="Screen2" src="https://github.com/user-attachments/assets/ef0e34b5-636c-4ec4-9461-1d3c1e625770" />
<img width="1911" height="764" alt="Screen1" src="https://github.com/user-attachments/assets/c978aab9-e6c5-48d8-a286-26d2a24e4e1e" />

## Vercel URL

https://workspace-gold-nu-83.vercel.app
