Restaurant Manager: Sistema Integral de Gestión SaaS 

Restaurant Manager es una plataforma de gestión operativa de grado empresarial diseñada para digitalizar las operaciones internas de un restaurante. El proyecto comprende el desarrollo de un backend robusto y una aplicación frontend optimizada para terminales táctiles
.
 Visión del Proyecto (Full-Stack)
El sistema está diseñado para ser utilizado exclusivamente por el personal del restaurante (administradores, camareros y cocina) a través de tablets o terminales internas, eliminando la necesidad de procesos manuales y mejorando la comunicación en tiempo real
.
 Frontend (Angular & Tailwind CSS)
La interfaz de usuario se desarrollará como una Single Page Application (SPA) moderna, enfocada en la velocidad y la usabilidad en entornos de alto tráfico:
Framework: Angular, aprovechando su potencia para manejar estados complejos y comunicaciones asíncronas
.
Estilado: Tailwind CSS, permitiendo un diseño responsivo, limpio y altamente eficiente para dispositivos móviles y tablets
.
Usuarios Finales: Camareros para la toma de pedidos, cocineros para la gestión de comandas y administradores para el control total del negocio
.
 Backend (Node.js & Express)
Una API REST profesional construida bajo una arquitectura de 6 capas que garantiza escalabilidad y seguridad
:
Seguridad: Autenticación JWT con sistema de Access y Refresh Tokens
.
Persistencia: MongoDB con Mongoose para una gestión flexible de usuarios, productos, pedidos y mesas
.
Integridad: Validación estricta de datos mediante Zod

Arquitectura del Sistema

El proyecto sigue una estructura empresarial para separar claramente las responsabilidades:
Backend: Routes, Middleware, Controllers, Services, Repositories y Models
.
Frontend: Arquitectura basada en componentes de Angular, servicios de comunicación con la API y diseño modular con Tailwind

Roles y Permisos

El sistema implementa un control de acceso por roles (RBAC)
:
Admin: Gestión del menú, supervisión de pedidos y administración de empleados
.
Waiter: Gestión de mesas en tiempo real y creación de pedidos desde la tablet
.
Cocina (Módulo Futuro): Visualización y cambio de estado de comandas en tiempo real
.
 Roadmap de Desarrollo
Fase 1: Backend Core: Autenticación segura y gestión de catálogo
.
Fase 2: Gestión Operativa: Módulos de Orders (Pedidos) y Tables (Mesas)
.
Fase 3: Comunicación Real-Time: Implementación de Socket.IO para sincronizar sala y cocina al instante
.
Fase 4: Frontend Interno: Construcción de la interfaz con Angular y Tailwind CSS
