# Landing RestHUB · decisiones de diseño

Rediseño por secciones a partir del pedido de Rodrigo (2026-10-06): la landing «es un poco AI
slop: tarjetas con glassmorfismo flotantes, raras, sin personalidad». Objetivo: impactante pero
limpia, **sin fondos blancos ni crema**, sin caer en maximalismo.

Método: skill `impeccable` (registro *brand*) + `arkos-design` (medir referencias, una sección
por vez). Nada se sube sin visto bueno.

## Referencias medidas (2026-10-06, sonda en navegador, escritorio 1912 px)

| Sitio | Fondo dominante (por alto de página) | Display | CTA | Imagen |
|---|---|---|---|---|
| Toast `pos.toasttab.com` | blanco + `#F9F5F3` (crema) 10 % | Effra 100 px / 400 | naranja, cápsula (a ojo) | foto real de cocina, recuadro redondeado |
| Owner `owner.com` | blanco 60 % + `#FBF8F5` (crema) 28 % | STK Bureau Sans 80 px / 600, −0,04 em | casi negro | celular con su producto sobre bloque verde |
| Sunday `sundayapp.com` | blanco + negro 18 % | Helvetica Neue 64 px / 400, −0,05 em | negro; marca magenta `#FF17E9` | su producto en manos de clientes reales |
| Fudo `fu.do/es-pe` | blanco 46 % + `#FFFBEB` / `#FFFAEC` (crema) 44 % | Barlow 64 px / 700 | naranja `#FF5023`, cápsula | mesa de madera con platos y su POS |
| Restaurant.pe | celeste claro + imagen | Montserrat 700 (sin h1; h2 de 24 px) | azul `#3B82F6`, radio 4 | banner promocional en modal |
| Deliverect `deliverect.com/es` | blanco + `#08090A` 25 % | GT Pressura 64 px / 600, mayúsculas | verde `#038851`, radio 8 | su app sobre bloque verde |

**Qué dice la categoría:**
1. Es **blanca o crema con un acento cálido** (naranja en Toast y Fudo). Ir a petróleo ya diferencia.
2. Nadie usa vidrio ni tarjetas flotantes: el producto se muestra **real y en contexto**.
3. Títulos en grotescas apretadas; ninguna serif itálica.
4. Cuando hay color fuerte, va en **un bloque** detrás del producto (Owner, Deliverect), no en manchas.

## Diagnóstico del diseño anterior

- Paleta = la de Tailwind por defecto: `#1E293B` slate-800, `#F59E0B` amber-500, `#0D9488`
  teal-600, `#0F172A` slate-900. Por eso se ve genérica aunque esté bien aplicada.
- Inter + Playfair itálica: las dos son elecciones por defecto de generadores.
- Hero con video de stock de restaurante con copas de vino (no es el público: pollerías,
  cevicherías, menús), dos tarjetas de vidrio flotando, manchas de degradado teal/ámbar, «scroll».
- 23 secciones y 28 108 px de alto (≈ 30 pantallas); solo «módulos» ocupa 6 100 px.
- Cada título con una palabra de color distinto (ámbar, teal, verde): ningún color significa nada.

## Decisiones

D1–D4 (paleta «petróleo y ají» y un hero partido con la captura de Caja) quedaron
**descartadas** el 2026-10-06: Rodrigo vio el hero «básico y vacío». Se rehízo con el flujo de
impeccable v4.5 (preguntas, sorteo de direcciones `6f6a662a`, lienzo con tres propuestas
interactivas) y eligió **B · La comanda del mozo**. Contrato de dirección en
`.impeccable/surfaces/components-sections-hero-tsx.md`.

| # | Decisión | Por qué |
|---|---|---|
| **D5** | **Paleta de marca real, llevada a materiales del servicio.** Mostrador obsidiana `#121212` (fondo), papel del talonario `#EEF5F2`, copia de cocina menta `#9EDCCB`, copia de caja ámbar `#F4C27A`, tinta carbón `#23286B`, numerador `#A4521C`; acción ámbar `#F59E0B` con texto obsidiana (8,7:1); menta `#5DC9A5` para lo positivo (9,2:1). Todos los pares de texto pasan AA (tabla en `globals.css`). | Son los colores del manual de marca (obsidiana, menta, ámbar) y del aviso `ADRestHUB.png`, no inventados. Ni blanco ni crema de fondo: lo claro es papel que flota sobre el mostrador. |
| **D6** | **Archivo** con eje de ancho: condensada 62,5 / 900 para titulares y cifras, cursiva semibold para lo escrito a mano (tinta carbón), texto en ancho normal. | Es la misma familia de la carta del comensal en el producto (`pos/Resthub/DESIGN.md`): landing y producto se sienten una marca. |
| **D7** | **Hero «la comanda del mozo»:** titular en dos líneas («bajo control.» en menta) con texto y acciones al lado; debajo, el escenario a todo el ancho: riel de cocina con comandas colgadas, talonario interactivo (borde troquelado, numerador, renglones) y caja con el cobrado del día y la pila de copias por cobrar. Arranca en pleno servicio (Mesa 4 escrita, dos pedidos en cocina) y el visitante lo continúa: toca platos, «Mandar a cocina · S/ total» cuelga el ticket y deja la copia en caja. Datos de ejemplo, rotulados. | «Mostrar el sistema, no describirlo» y que el dueño lo toque (pedido de Rodrigo). Un pedido, tres copias es el recorrido real del producto (POS → KDS → caja). Nada arranca vacío. |
| **D8** | **Nav:** transparente sobre el hero, mostrador sólido al bajar (sin desenfoque); acción ámbar; menú completo desde `lg`. | Coherente con D5; el vidrio era parte del problema anterior. |

## Estructura de la página (aprobada por Rodrigo el 2026-10-07)

De 23 secciones (≈ 30 pantallas) a 10, sin perder datos reales: lo repetido se fusiona y lo que
ya cuenta el hero se quita. Se avanza una sección por vez, con preview de Vercel y visto bueno.

1. Hero ✔ · 2. Así se ve por dentro (Gallery + EditorialGrid) ✔ · 3. ¿Cuánto te deja cada plato?
(FoodCost) · 4. Se cayó el internet (Offline) · 5. Cada uno con su pantalla (interludio +
ExpandingRoles) · 6. Todo lo que incluye (StickyModules + Integrations + Why + Messages; recoge los
datos de Stats y el último paso de Flow) · 7. Cómo cambia el día a día (vs) · 8. Gente detrás +
7 cupos (Founder + Socios Fundadores) · 9. Precios (+ PricingPivot) · 10. De cero a operativo +
FAQ + CTA + Footer. Se van MarqueeStrip, Stats, Flow y MidStatement.

| # | Decisión | Por qué |
|---|---|---|
| **D9** | **Así se ve por dentro:** las 4 pantallas reales como 4 puestos (Mozo, Cocina, Caja, Dueño) en pestañas; el puesto elegido se vuelve la copia de su color y su pantalla se ve grande dentro de un marco de papel. La demo en vivo cierra la sección. Fuera las 7 fotos de stock de EditorialGrid (etiquetas como «12 mesas activas» o «BI · Dashboard en vivo» sobre fotos ajenas). | «Solo lo que existe hoy» (PRODUCT.md): nada de imágenes ajenas presentadas como el sistema funcionando. Pantalla grande y legible en vez de cuatro miniaturas iguales. Las fotos reales del local entran aquí cuando lleguen. |

## Movimiento

Una entrada orquestada: palabras del titular (GSAP existente), texto y escenario suben, y la
comanda inicial «se escribe» renglón por renglón. Firma: al mandar la comanda, el ticket se
cuelga en el riel y la copia cae en la caja (≤ 0,6 s, `ease-out`). Todo se apaga con
`prefers-reduced-motion`. De paso se corrigió `BlurFade`: su estado inicial dependía del
movimiento reducido y rompía la hidratación (el bloque podía quedar oculto).

## Pendiente (una sección por vez, con visto bueno)

1. Fotos reales del local (las pasa Rodrigo) para las secciones con imagen.
2. `StatementInterlude` (bloque negro de 2 844 px justo después del hero).
3. Stats → quitar el patrón «número grande + etiqueta».
4. Galería «Así se ve por dentro», Why, EditorialGrid, StickyModules (6 100 px: recortar).
5. Resto de secciones; al final retirar Inter, Playfair y los colores viejos de `globals.css`.
6. Proponer recorte de largo total (hoy ≈ 30 pantallas).
