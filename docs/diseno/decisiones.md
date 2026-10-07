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
(FoodCost) ✔ · 4. Se cayó el internet (Offline) ✔ · 5. Cada uno con su pantalla (interludio +
ExpandingRoles) ✔ · 6. Todo lo que incluye ✔ (StickyModules + Integrations + Why + Messages; recoge los
datos de Stats y el último paso de Flow) · 7. Cómo cambia el día a día (vs) ✔ · 8. Gente detrás +
7 cupos (Founder + Socios Fundadores) ✔ · 9. Precios (+ PricingPivot) ✔ · 10. De cero a operativo +
FAQ + CTA ✔ + Footer ✔. Se van MarqueeStrip, Stats, Flow y MidStatement.

| # | Decisión | Por qué |
|---|---|---|
| **D9** | **Así se ve por dentro:** las 4 pantallas reales como 4 puestos (Mozo, Cocina, Caja, Dueño) en pestañas; el puesto elegido se vuelve la copia de su color y su pantalla se ve grande dentro de un marco de papel. La demo en vivo cierra la sección. Fuera las 7 fotos de stock de EditorialGrid (etiquetas como «12 mesas activas» o «BI · Dashboard en vivo» sobre fotos ajenas). | «Solo lo que existe hoy» (PRODUCT.md): nada de imágenes ajenas presentadas como el sistema funcionando. Pantalla grande y legible en vez de cuatro miniaturas iguales. Las fotos reales del local entran aquí cuando lleguen. |
| **D10** | **¿Cuánto te deja cada plato?:** la receta del lomo saltado como hoja impresa (insumos, costo S/ 11.20) con un «Precio en carta» que se mueve (− / +) y recalcula «Te deja» y el % al instante; la alerta de stock va en una copia ámbar. Receta a la izquierda, titular y puntos a la derecha. | El dolor central de PRODUCT.md («vendo pero no sé si gano») se toca, no se describe. Mismos números que antes (S/ 35, S/ 23.80, 68 %). |
| **D11** | **Se cayó el internet:** franja de calma en `mostrador-2` entre dos secciones densas; la copia ámbar guarda 3 pedidos en cola y la menta confirma que todo sincronizó. | Ritmo: una sección densa se gana una tranquila. El ámbar vuelve a significar «pendiente» y la menta «salió bien». |
| **D12** | **Cada uno con su pantalla:** el interludio de 300 vh y ExpandingRoles se vuelven un «Cuadro de accesos» impreso (filas = roles, columnas = lo que ven, checks en tinta). Al elegir un rol su fila se vuelve copia menta y abajo se lee qué hace. En el celular, una tira de papel por rol. Fuera el «< 200 ms» y los chips de colores sueltos. | Muestra lo que el sistema hace de verdad (permisos por rol) en un objeto del oficio, sin scroll secuestrado de 3 pantallas. |
| **D13** | **Todo lo que incluye = La carta:** los 6 módulos como platos de una carta impresa («Pedidos ……… Incluido»), en dos columnas (para el servicio / para el dueño y el contador), y al pie «Aceptamos: Yape · Plin · Culqi · Izipay · Visa · Mastercard» y «Facturamos: SUNAT y SIRE», como en cualquier carta peruana. Debajo, cuatro datos de confianza (15 locales, 1,699 pruebas antes de cada actualización, datos cifrados, soporte desde Perú). Fusiona StickyModules (6 100 px), Integrations, Why, Messages, Stats y Flow. | Una sola pieza clara en vez de seis secciones que repetían «6 módulos». Se quitó el «48 módulos» de Stats (contradecía los 6) y la venta semanal de maqueta. |
| **D14** | **Cómo cambia el día a día:** tabla contra cuaderno y Excel, y contra un sistema solo de boletas; la columna de RestHUB es una sola copia menta que corre de arriba abajo, las otras quedan en gris con su marca (no / a medias / sí). En el celular, un bloque por tarea con la respuesta de RestHUB primero. | Comparar es trabajo de una tabla; el mundo entra por la copia menta, no por tarjetas. |
| **D15** | **Gente detrás + 7 cupos:** Rodrigo y Emilio en fotos grandes con marco de papel (no círculos chicos), WhatsApp y LinkedIn; al lado, el Programa Socios Fundadores como un ticket de reserva en copia ámbar: el 7 grande, los tres beneficios como líneas de ticket con su valor, las condiciones en tinta y «Postular a un cupo». Fusiona Founder y Testimonials. | «Personas reales detrás» (PRODUCT.md) con la cara a escala; el programa se lee como lo que es, una reserva con condiciones. |
| **D16** | **Precios:** tres tickets de papel (Starter, Pro, Enterprise) con el precio en display, la nota «≈ S/ 13 al día» en tinta y los checks en tinta; Pro, el recomendado, en copia ámbar, un poco más alto y primero en el celular. El precio fundador queda en una línea que apunta al programa (sin repetir el bloque de la sección 8). Fuera PricingPivot: lo que decía ya está en el encabezado. | Tres opciones como máximo, el recomendado distinto por color y forma, y la acción (WhatsApp) en cada ticket. |
| **D17** | **Cierre:** «De cero a operativo en 72 horas» cuelga los tres días del mismo riel de cocina del hero (secuencia real, numerada 1/3, 2/3, 3/3; el día del primer turno en copia menta); el FAQ va sobre el mostrador con filetes y el mismo contenido de `lib/faqs` (schema FAQPage); el CTA final es la comanda del visitante («1 × Demo en vivo · 15 min · 0.00», «Implementación guiada · incluida», «Total hoy S/ 0.00») con «Solicitar acceso», «Agendar demo» y WhatsApp. Fuera la foto de stock del fondo, el resplandor y la Playfair itálica. | La página abre con la comanda de la Mesa 4 y cierra con la del visitante: un final anclado en el mismo mundo. |
| **D18** | **Todo lo demás en el mismo mundo:** pie de página plano (novedades, enlaces a las secciones nuevas, contacto); barra fija y aviso de cookies sin vidrio (la barra en mostrador sólido, las cookies como papelito); botón de WhatsApp sin resplandor ni pulso infinito y oscurecido a `#128C4A` (el `#25D366` daba 1.98:1 con el ícono); avisos como papelitos del color de su significado; modal de contacto como hoja de papel (y se asoció la etiqueta de «Mensaje»); checkout sin vidrio y con la acción ámbar; `/gracias` como recibo; páginas legales con grises AA; imagen para redes con la comanda. Archivo es la fuente por defecto del sitio y se retiraron Inter, Playfair, los tokens viejos y las clases que solo usaban las secciones quitadas. Se borraron CaseStudy, Modules y Roles (no se usaban). | Que no quede ninguna pieza del mundo anterior a la vista. |
| **D19** | **Revisión final de la página completa** (revisor de impeccable, 8 correcciones, todas resueltas): imagen para redes con Archivo real; checkout como hoja de papel con la copia ámbar del total (y en el celular una tira con plan y total, la X en franja fija y el formulario con scroll: antes el botón de pagar quedaba fuera de alcance); legales sin etiqueta y con H1 condensado; «Cupos limitados» en vez de «Programa cerrado»; color con significado en los titulares (menta solo hero, comparativa y cierre; ámbar en plata: costo por plato, sin internet y precios); Así se ve por dentro, Roles y Precios con titular y texto apilados; galería con recorte exacto por puesto en el celular (textos de 12 px o más); «Precios» en la navegación; radios 4–8 en todo el sitio (`--radius` 8 px). | Lo que un revisor independiente marcó como material frente al contrato de dirección; veredicto final: ship. |

## Movimiento

Una entrada orquestada: palabras del titular (GSAP existente), texto y escenario suben, y la
comanda inicial «se escribe» renglón por renglón. Firma: al mandar la comanda, el ticket se
cuelga en el riel y la copia cae en la caja (≤ 0,6 s, `ease-out`). Todo se apaga con
`prefers-reduced-motion`. De paso se corrigió `BlurFade`: su estado inicial dependía del
movimiento reducido y rompía la hidratación (el bloque podía quedar oculto).

## Pendiente

1. Fotos reales del local (las pasa Rodrigo) para sumar a «Así se ve por dentro».
2. Pasada opcional de pulido de la escala tipográfica (tamaños sueltos de 13, 14, 19 y 22 px en el talonario y en la comanda del cierre).
