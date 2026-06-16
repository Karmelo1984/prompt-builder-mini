# AI Prompt & Workflow Builder · Programación IA

Wizard interactivo de 5 pasos para construir prompts optimizados para GPT, Claude y Claude Code. En V1 se generan prompts; futuras versiones incluirán skills, hooks e instrucciones.

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Producción
npm run build
```

Abre `http://localhost:5173` en tu navegador.

---

## Estructura del proyecto

```
prompt-builder/
├── src/
│   ├── app.ts                    # Entrada principal (orquestación)
│   ├── config/
│   │   └── app-info.ts          # Metadata de la app
│   ├── data/
│   │   └── catalogs.ts          # Datos (flows, tipos, restricciones, outputs)
│   ├── handlers/
│   │   └── index.ts             # Bindings de eventos
│   ├── models/
│   │   ├── Flow.ts              # DTO para Flow
│   │   ├── PromptType.ts        # DTO para PromptType
│   │   ├── Prompt.ts            # DTO para Prompt
│   │   ├── mappers.ts           # Transformación de datos → DTOs
│   │   └── index.ts             # Exportaciones
│   ├── services/
│   │   └── PromptBuilder.ts     # Lógica de negocio
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── ui/
│   │   └── renderer.ts          # Lógica de renderizado (DOM)
│   └── validation/
│       └── PromptValidator.ts   # Validación de prompts
├── index.html                    # Template HTML
├── styles.css                    # Estilos CSS
├── vite.config.ts               # Configuración de Vite
├── tsconfig.json                # Configuración de TypeScript
├── package.json                 # Dependencias y scripts
└── README.md                     # Este archivo
```

---

## Arquitectura

```
Datos crudos (HTML/Catálogos)
    ↓
Mappers (transformación)
    ↓
DTOs (Flow, PromptType, Prompt)
    ↓
PromptValidator (validación)
    ↓
PromptBuilder (lógica)
    ↓
Renderer (UI/DOM)
    ↓
Handlers (eventos)
    ↓
DOM
```

---

## Flujo de la aplicación

La pantalla está dividida en dos zonas:

- **Izquierda**: Wizard de 5 pasos
- **Derecha**: Prompt generado (actualización en vivo)

### Pasos del wizard

1. **Flujo de decisión** — Elige qué tipo de trabajo delegar (fix, build, review, understand, decide)
2. **Selecciona situación** — Elige la situación específica (debug, feature, review, etc.)
3. **Rellena contexto mínimo** — Proporciona: stack, rol, proyecto, objetivo, por qué, input, ejemplos
4. **Restricciones** — Selecciona restricciones explícitas
5. **Salida requerida** — Define el formato de salida esperado

### Regla de reseteo en cascada

Si cambias un paso anterior, los posteriores se limpian:
- Cambiar paso 1 → limpia pasos 2, 3, 4, 5
- Cambiar paso 2 → limpia pasos 3, 4, 5
- Cambiar paso 3 → limpia pasos 4, 5
- Cambiar paso 4 → limpia paso 5

---

## Tipos de prompt incluidos

- Debug / traceback
- Feature
- Code review
- Refactor seguro
- Tests
- SQL / rendimiento
- Explicar código
- Migración
- Regex
- Arquitectura / decisión

---

## Características

✓ **TypeScript strict** — Tipado completo  
✓ **Hot reload** — Cambios en vivo durante desarrollo  
✓ **DTOs tipadas** — Modelos concretos para transformación de datos  
✓ **Validación** — Reglas de negocio desacopladas  
✓ **Modo compacto** — Alterna entre XML y formato compacto  
✓ **Recomendaciones** — Restricciones y salida según el tipo de situación  
✓ **Copiar/Descargar** — Acciones rápidas sobre el prompt  
✓ **Tema claro/oscuro** — Toggle de tema  
✓ **Footer corporativo** — Autor, versión, repositorio  
✓ **Sin dependencias externas** — Solo TypeScript + Vite  

---

## Desarrollo

### Scripts disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo con hot reload
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
```

### Estructura de tipos

```typescript
// Models (DTOs)
Flow → identificador, label, tipos permitidos
PromptType → rol, objetivo, restricciones, salida recomendada
Prompt → rol, stack, objetivo, input, restricciones, outputs

// Validación
PromptValidator → valida prompts contra reglas de negocio

// Servicios
PromptBuilder → gestiona estado de la app y lógica de generación

// UI
Renderer → maneja toda la lógica de DOM
```

---

## Despliegue en GitHub Pages

Esta app está configurada para desplegarse automáticamente en GitHub Pages con GitHub Actions.

### Activar el despliegue

1. Ve a **Settings → Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz push a `main` o ejecuta el workflow manualmente desde la pestaña **Actions**
4. El sitio se desplegará en: `https://karmelo1984.github.io/prompt-builder/`

### Cómo funciona

- El workflow `.github/workflows/deploy-pages.yml` se ejecuta en cada push a `main`
- Compila el proyecto con `npm run build` con `VITE_BASE=/prompt-builder/`
- Sube el directorio `dist` a GitHub Pages
- El build local (`npm run build` sin VITE_BASE) sigue siendo `/` por defecto

---

## Próximos pasos

- [ ] Tests unitarios (Vitest)
- [ ] Historial de prompts (IndexedDB)
- [ ] Export/Import de configuraciones
- [ ] Changelog automático

---

## Licencia

Proyecto local. Libre para uso personal y educativo.

