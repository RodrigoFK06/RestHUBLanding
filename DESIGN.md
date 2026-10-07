---
name: RestHUB
description: La comanda que ya no se pierde. Landing de RestHUB en el mundo «la comanda del mozo».
colors:
  ambar: "#F59E0B"
  ambar-hover: "#FBB53C"
  ambar-oscuro: "#6B3A10"
  menta: "#5DC9A5"
  menta-oscura: "#0B5544"
  copia-cocina: "#9EDCCB"
  copia-caja: "#F4C27A"
  numerador: "#A4521C"
  tinta: "#23286B"
  impreso: "#3F5A52"
  papel: "#EEF5F2"
  papel-linea: "#C3D6CF"
  mostrador: "#121212"
  mostrador-2: "#1C1C1C"
  linea: "#2A2A2A"
  blanco: "#FFFFFF"
  texto-2: "#CFCFCF"
  texto-3: "#A8A8A8"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 6.8vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62.5"
  cifra:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 62.5"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 62.5"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "0.05em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  tinta:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 2
  button:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: 1
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.03em"
rounded:
  etiqueta: "3px"
  hoja: "4px"
  control: "8px"
  accion: "10px"
  riel: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "48px"
components:
  button-accion:
    backgroundColor: "{colors.ambar}"
    textColor: "{colors.mostrador}"
    typography: "{typography.button}"
    rounded: "{rounded.accion}"
    padding: "0 24px"
    height: "52px"
  button-accion-hover:
    backgroundColor: "{colors.ambar-hover}"
  button-borde:
    backgroundColor: "transparent"
    textColor: "{colors.blanco}"
    rounded: "{rounded.accion}"
    padding: "0 16px"
    height: "40px"
  link-menta:
    textColor: "{colors.blanco}"
    typography: "{typography.button}"
    height: "44px"
  link-menta-hover:
    textColor: "{colors.menta}"
  boton-plato:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.mostrador}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  boton-plato-activo:
    backgroundColor: "{colors.copia-cocina}"
  boton-mandar:
    backgroundColor: "{colors.mostrador}"
    textColor: "{colors.blanco}"
    typography: "{typography.button}"
    rounded: "{rounded.accion}"
    height: "52px"
  boton-mandar-disabled:
    backgroundColor: "#767676"
  talonario:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.mostrador}"
    rounded: "{rounded.hoja}"
    padding: "8px 28px 20px"
  ticket-cocina:
    backgroundColor: "{colors.copia-cocina}"
    textColor: "{colors.mostrador}"
    rounded: "{rounded.etiqueta}"
    padding: "10px 12px 12px"
  copia-caja:
    backgroundColor: "{colors.copia-caja}"
    textColor: "{colors.mostrador}"
    rounded: "{rounded.etiqueta}"
    padding: "12px 16px"
  estado-preparando:
    backgroundColor: "{colors.mostrador}"
    textColor: "{colors.copia-cocina}"
    typography: "{typography.label}"
    rounded: "{rounded.etiqueta}"
    padding: "4px 8px"
  estado-listo:
    backgroundColor: "{colors.menta-oscura}"
    textColor: "{colors.blanco}"
    typography: "{typography.label}"
    rounded: "{rounded.etiqueta}"
    padding: "4px 8px"
  aviso-mostrador:
    backgroundColor: "{colors.mostrador-2}"
    textColor: "{colors.texto-2}"
    rounded: "{rounded.accion}"
    padding: "16px 20px"
  nav:
    backgroundColor: "{colors.mostrador}"
    textColor: "{colors.texto-2}"
    padding: "16px 40px"
---

# Design System: RestHUB

## Overview

**Creative North Star: "La comanda del mozo"**

Un pedido, tres copias: la mesa, la cocina y la caja. El sistema visual sale de los materiales reales del servicio de un restaurante peruano: un mostrador obsidiana que es el fondo de todo, un talonario de comandas en papel menta pálido con numerador impreso y tinta carbón escrita a mano, una copia menta que se cuelga en el riel de cocina y una copia ámbar que cae en la caja. Lo claro nunca es la página: es papel que flota sobre el mostrador.

La densidad es la de un mostrador en pleno servicio: mucha información pequeña y concreta (mesa, hora, importes en soles) ordenada por las reglas de un formulario impreso, con titulares condensados enormes arriba que dicen una sola cosa. Archivo es la única familia; su eje de ancho separa lo impreso (condensada 900), lo explicado (ancho normal) y lo escrito por el mozo (cursiva semibold en tinta). El movimiento también es del oficio: la tinta se escribe, la hoja nueva sube, el ticket se cuelga y la copia cae.

Se rechazan de forma confirmada: fondos de página blancos o crema, vidrio y desenfoque, tarjetas translúcidas flotantes, degradados que finjan metal o brillo, el hero partido de categoría (titular a un lado, captura del producto al otro) y la paleta por defecto de Tailwind (slate, teal) con Inter y Playfair.

**Key Characteristics:**
- Fondo obsidiana plano; lo claro solo existe como papel con sombra.
- Una sola familia (Archivo) con tres voces por eje de ancho y estilo.
- Ámbar para actuar, menta para lo que salió bien; cada color tiene un oficio.
- Radios chicos de papelería (3–4 px) y de control (8–10 px); nada en cápsula.
- Cifras siempre tabulares, en soles, con el formato `S/ 2,267.00`.
- Movimiento corto que imita el gesto físico, apagado con `prefers-reduced-motion`.

## Colors

Obsidiana de marca como mostrador, menta y ámbar de marca como las dos copias del talonario, y una tinta carbón azulada como única voz manuscrita.

### Primary
- **Ámbar de acción** (`ambar`): la acción principal («Solicitar acceso»), siempre con texto obsidiana encima (8.7:1). También rotula la columna de Caja y el aviso de cupos. Al pasar o enfocar sube a **Ámbar claro** (`ambar-hover`).
- **Ámbar tostado** (`ambar-oscuro`): solo texto sobre la copia de caja (5.7:1).

### Secondary
- **Menta de marca** (`menta`): lo positivo y lo que funciona sobre el mostrador: la segunda línea del titular («bajo control.»), el rótulo de Cocina y el subrayado del enlace secundario (9.2:1).
- **Menta profunda** (`menta-oscura`): texto sobre papel y copias cuando hay que decir «está bien» (estado Listo, diferencia de caja S/ 0.00); 5.7:1 sobre la copia de cocina.
- **Copia de cocina** (`copia-cocina`): el papel de los tickets colgados en el riel, el plato ya pedido en el talonario y la selección de texto sobre papel.

### Tertiary
- **Copia de caja** (`copia-caja`): el papel de las copias por cobrar apiladas en la caja.
- **Numerador** (`numerador`): lo que va impreso en rojo óxido en un talonario: el N° de comanda, el monto por cobrar y la acción destructiva chica «Borrar comanda» (5:1 sobre papel).

### Neutral
- **Mostrador obsidiana** (`mostrador`): fondo de toda sección del mundo, texto sobre papel y el botón «Mandar a cocina».
- **Mostrador alto** (`mostrador-2`): la única superficie elevada sobre el mostrador (aviso posterior al envío), separada por borde, no por sombra.
- **Filete** (`linea`): bordes y divisores sobre el mostrador (pie del hero, nav al bajar).
- **Blanco** (`blanco`): texto principal y énfasis sobre el mostrador; nunca fondo.
- **Texto segundo** (`texto-2`): párrafo principal sobre el mostrador (12:1).
- **Texto tercero** (`texto-3`): notas, contadores y aclaraciones (7.9:1).
- **Papel del talonario** (`papel`): la hoja original y el cierre de caja.
- **Renglón** (`papel-linea`): renglones cada 32 px y casillas de la cabecera del talonario.
- **Tinta carbón** (`tinta`): todo lo que el mozo «escribe» (mesa, mozo, hora, platos) y el anillo de foco sobre papel (12:1).
- **Impreso** (`impreso`): rótulos impresos del formulario (Mesa, Mozo, Hora, Cant., Descripción, Importe) y líneas punteadas del cierre (6.8:1).

### Legado (pendiente de migración, no forma parte del sistema)
Las secciones aún no migradas usan `--color-ink` #0F172A, `--color-night` #1E293B, `--color-amber`, `--color-teal` #0D9488, `--color-teal-l`, `--color-mist`, `--color-mist-d`, `--color-green-ok`, las variables neutras de shadcn (`--background`, `--primary`, `--radius`…), las clases `.btn-amber`, `.btn-ghost-light`, `.pricing-cta-*`, y las fuentes Inter (`--font-sans`) y Playfair (`--font-display`). Se retiran sección por sección; ninguna superficie nueva las usa.

### Named Rules
**The Mostrador Rule.** El fondo de página es siempre `mostrador`. Lo claro (papel, copias) entra solo como objeto que flota sobre él, nunca como fondo de sección.

**The Un Color, Un Oficio Rule.** Ámbar es actuar y caja; menta es cocina y lo que salió bien; numerador es lo impreso en rojo; tinta es lo escrito a mano. No se colorea una palabra solo para decorar un título.

**The Foco en Tinta Rule.** Sobre el mostrador el foco es ámbar (blanco sobre el botón ámbar); dentro de papel (`.comanda-papel`) el foco y la selección pasan a tinta y copia de cocina, porque el ámbar no llega a 3:1 sobre papel.

## Typography

**Display Font:** Archivo condensada, eje `wdth` 62.5, peso 900 (con ui-sans-serif, system-ui)
**Body Font:** Archivo en ancho normal (con ui-sans-serif, system-ui)
**Label/Mono Font:** Archivo `wdth` 75 en mayúsculas para rótulos; no hay monoespaciada en el mundo

**Character:** Una sola familia, la misma de la carta del comensal en el producto, que cambia de voz con su eje: condensada y negra como lo impreso en una carta o un talonario, normal para explicar, cursiva semibold para lo que escribe el mozo.

### Hierarchy
- **Display** (900, `wdth` 62.5, clamp(3.25rem, 6.8vw, 6rem), 0.9): el titular del hero en dos líneas; una idea, la segunda línea en menta.
- **Cifra** (900, `wdth` 62.5, 34 px, 1): importes y totales; baja a 30 px en copias, 22 px en montos secundarios y clamp(1.875rem, 2.4vw, 2.25rem) en el cobrado del día. Siempre `tabular-nums`.
- **Headline** (900, `wdth` 62.5, 20–26 px, 1, mayúsculas): el nombre impreso del documento («Comanda», «Cierre de caja»).
- **Title** (900, `wdth` 75, 15 px, mayúsculas, 0.05em): rótulo de cada columna del escenario (Cocina, Caja) con su ícono, y cabecera de ticket o copia (Mesa · hora).
- **Body** (400, clamp(1.0625rem, 1.2vw, 1.125rem), 1.55): el párrafo junto al titular, máximo 44ch; el énfasis va en semibold blanco.
- **Body chico** (400, 15 px, 1.625): notas al pie de cada columna, máximo 34ch, en `texto-3`.
- **Tinta** (600 cursiva, 17 px en renglones de 32 px; 16 px en la cabecera; 14 px en tickets): solo datos «escritos a mano».
- **Botón** (800, 17 px; 14–16 px en nav y aviso): todas las acciones.
- **Label** (800, 12 px, mayúsculas, 0.03em): estados (Preparando, Listo) y leyendas de copia.

### Named Rules
**The Tres Voces Rule.** Condensada = impreso, titulares y cifras. Normal = lo que explicamos. Cursiva semibold en tinta = lo que escribe el mozo. Una voz nunca hace el trabajo de otra.

**The Cifra Tabular Rule.** Todo importe, hora o número de comanda usa cifras tabulares y el formato peruano `S/ 1,234.50`.

## Layout

Contenedor de hasta 1376 px con márgenes laterales de 20 px, 32 px desde `sm` y 40 px desde `lg`. El hero abre a 96 px del borde superior (deja pasar la nav fija) y cierra a 56 px con un filete inferior.

La cabecera del hero es una grilla de dos columnas desde `lg`: el titular ocupa lo que sobra y el texto con acciones vive en una columna de 520 px alineada abajo, con 56 px de separación. Debajo, el escenario ocupa todo el ancho y cambia de forma por tramos: una columna en móvil (talonario primero, luego cocina y caja); dos columnas desde `md` con el talonario a todo el ancho arriba; tres columnas desde `xl` (cocina · talonario de 500 px · caja, 40 px de separación) y talonario de 540 px con 48 px de separación desde 1440 px. El talonario nunca pasa de 560 px.

El ritmo vertical usa pasos de 8, 12, 16, 24, 40 y 48 px; las columnas laterales bajan 24 px respecto del talonario en `xl` para que el papel central mande. Las anclas de sección respetan un desplazamiento de 84 px por la nav fija.

## Elevation & Depth

Híbrido estricto: el mostrador es plano y se ordena con bordes (`linea`) y un único tono elevado (`mostrador-2`); la sombra existe solo porque el papel flota sobre él. Las sombras son largas, oscuras y con difusión negativa, de modo que el papel parece despegado de una superficie real y no brilla.

### Shadow Vocabulary
- **Talonario** (`box-shadow: 0 34px 64px -26px rgba(0,0,0,0.9)`): la hoja principal, la de mayor altura.
- **Cierre de caja** (`box-shadow: 0 18px 30px -16px rgba(0,0,0,0.85)`): papel apoyado en la columna de caja.
- **Ticket colgado** (`box-shadow: 0 16px 28px -14px rgba(0,0,0,0.8)`): tickets en el riel.
- **Copia apilada** (`box-shadow: 0 14px 26px -14px rgba(0,0,0,0.8)`): copias por cobrar.

### Named Rules
**The Papel Que Flota Rule.** Solo el papel proyecta sombra. Botones, avisos y la nav sobre el mostrador no tienen sombra ni resplandor; se distinguen por color y borde.

## Shapes

Formas de papelería: esquinas casi rectas en lo que es papel (3 px en tickets, copias y chips de estado; 4 px en la hoja del talonario, que además lleva borde superior troquelado de semicírculos de 5 px cada 16 px), 8 px en los botones de plato y 10 px en las acciones (radio que hoy hereda de la variable `--radius` de shadcn). El riel de cocina es la única forma totalmente redondeada. El papel se gira levemente solo desde `lg` (talonario −0.8°, copias de fondo 1° y 2.2°, tickets −1.6° y 1.3°, copias de caja entre −1.4° y 1.1°); los controles nunca se giran.

## Components

### Buttons
Directos y sólidos, sin sombra, con hundimiento al presionar.
- **Shape:** esquinas suaves (10 px); nunca cápsula.
- **Primary (acción):** fondo ámbar, texto obsidiana extrabold de 17 px, 52 px de alto y 24 px de relleno lateral, flecha a la derecha de 20 px con trazo 2.5. En nav baja a 40 px de alto y 14 px; en el aviso del escenario, 48 px.
- **Hover / Focus:** pasa a ámbar claro en 180 ms con `--ease-snappy`; foco con contorno blanco de 2 px a 2 px de distancia; al presionar escala a 0.97 en 130 ms.
- **Con borde (nav):** transparente, texto blanco bold, borde de 1 px gris #4A4A4A que sube a #7A7A7A y un velo blanco del 5 % al pasar.
- **Mandar a cocina:** botón del talonario a todo el ancho, fondo obsidiana y texto blanco, 52 px; al pasar se vuelve negro puro y al presionar escala a 0.98. Deshabilitado en gris #767676 con su propia instrucción («Toca un plato para empezar»).
- **Botón de plato:** 44 px de alto, borde obsidiana de 1.5 px, papel de fondo; pedido marcado en copia de cocina con «× n»; hover #DCEBE6, presión 0.96.

### Enlace secundario
Texto blanco semibold de 17 px subrayado en menta de 2 px a 6 px de la línea base; al pasar el texto se vuelve menta y el subrayado engrosa a 3 px. Altura táctil de 44 px.

### Chips de estado
- **Style:** 12 px extrabold en mayúsculas, radio de 3 px, 4 × 8 px de relleno.
- **State:** Preparando = obsidiana con texto copia de cocina; Listo = menta profunda con texto blanco.

### Cards / Containers
- **Corner Style:** 10 px para el aviso sobre el mostrador; 3–4 px para todo lo que es papel.
- **Background:** `mostrador-2` sobre el mostrador; `papel`, `copia-cocina` o `copia-caja` para documentos.
- **Shadow Strategy:** ver Elevation & Depth; solo el papel tiene sombra.
- **Border:** 1 px `linea` sobre el mostrador; sobre papel, divisores de 2 px obsidiana (cabecera y total), casillas de 1 px `papel-linea` y líneas punteadas `impreso`.
- **Internal Padding:** 20 px en el aviso; 20–28 px en el talonario; 12–16 px en tickets y copias.

### Navigation
Fija arriba, en Archivo. Transparente sobre el hero y con fondo obsidiana sólido y filete inferior al pasar los 60 px de scroll (transición de color de 300 ms, sin desenfoque). Logo invertido a 24 px de alto; enlaces de 15 px medium en `texto-2` que pasan a blanco; a la derecha, botón con borde «Probar la demo» y acción ámbar «Solicitar acceso». Por debajo de `lg`, hamburguesa de tres trazos que se cruza en X y menú obsidiana a todo el ancho que entra desde −8 px con `@starting-style`, con acciones apiladas de 48 px.

### El talonario (componente firma)
Hoja de papel con borde superior troquelado, cabecera con logo, «Comanda» en condensada y N° en numerador; casillas Mesa · Mozo · Hora con rótulo impreso y dato en tinta; columnas Cant. / Descripción / Importe sobre renglones de 32 px; total en cifra de 34 px tras un divisor de 2 px; grilla de platos (2 columnas, 3 desde `sm`) y el botón «Mandar a cocina · S/ total». Detrás asoman la copia de cocina y la de caja, desplazadas y giradas. Cada renglón nuevo se escribe de izquierda a derecha (`clip-path`, 0.45 s, cubic-bezier(0.65, 0, 0.35, 1)); la hoja siguiente sube 14 px en 0.42 s.

### Riel de cocina y pila de caja
El riel es una barra plana gris #3A3A3A de 10 px, redondeada, sin degradados; los tickets cuelgan de un gancho de 36 × 14 px y entran desde arriba a la derecha girando 9° hasta su giro de reposo (0.6 s, `--ease-snappy`). En la caja, el cierre del día es papel con troquel inferior y las copias se apilan desplazadas 11 px y reducidas un 2.5 % por nivel; la nueva cae desde la izquierda con 80 ms de retraso.

## Do's and Don'ts

### Do:
- **Do** usar `mostrador` como fondo de toda sección que migre al mundo y meter lo claro solo como papel con sombra.
- **Do** poner una sola acción ámbar con texto obsidiana por bloque, de 52 px de alto en contenido y 40 px en la nav.
- **Do** escribir con Archivo cursiva semibold en `tinta` solo los datos que un mozo escribiría a mano.
- **Do** rotular formularios impresos con mayúsculas extrabold y tracking de 0.03–0.05em en `impreso`, como en un talonario real.
- **Do** mostrar todos los montos con cifras tabulares y el formato `S/ 2,267.00`.
- **Do** cambiar el foco a `tinta` dentro de cualquier papel (`.comanda-papel`).
- **Do** mantener la interfaz bajo 240 ms (presión 130 ms, controles 180 ms) y las entradas de escena en 0.6–0.7 s, y apagar toda animación con `prefers-reduced-motion`.
- **Do** dar a todo control táctil al menos 44 px de alto.

### Don't:
- **Don't** usar fondos de página blancos ni crema.
- **Don't** usar vidrio, desenfoque, tarjetas translúcidas flotantes ni manchas de degradado.
- **Don't** imitar metal o brillo con degradados; los materiales son planos y dibujados.
- **Don't** usar botones en cápsula ni resplandor ámbar alrededor de la acción.
- **Don't** pintar cada título con una palabra de un color distinto; el color tiene oficio, no adorna.
- **Don't** usar Inter, Playfair ni los colores slate/teal heredados en superficies nuevas.
- **Don't** poner sombra en superficies del mostrador ni girar controles; solo el papel flota y se inclina.
- **Don't** bajar de 12 px de texto en superficies nuevas.
