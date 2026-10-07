// Fuente única de las preguntas frecuentes: la usa la sección FAQ y el schema FAQPage.
export const faqs = [
  {
    q: "¿En cuánto tiempo puedo tener RestHUB operativo?",
    a: "No prometemos \"listo en 5 minutos\". Un sistema que gestiona caja, cocina, contabilidad y empleados requiere configuración real. Estimamos 1 a 3 días de implementación guiada. Después, la operación diaria es fluida.",
  },
  {
    q: "¿Funciona para una cadena con múltiples locales?",
    a: "Sí. RestHUB está diseñado para 1 a 15 locales: gestión centralizada, reportes consolidados, roles independientes por sede y configuración compartida o independiente según necesites.",
  },
  {
    q: "¿Puedo saber cuánto me cuesta cada plato?",
    a: "Sí. Cargas la receta de cada plato una vez, y RestHUB descuenta los ingredientes del inventario con cada venta. Ves el costo real por plato, cuánto te deja, y recibes alertas antes de quedarte sin un insumo. Las mermas también se registran para que el stock cuadre con la realidad.",
  },
  {
    q: "¿Qué pasa si se cae internet?",
    a: "El POS y el KDS tienen operación offline básica: puedes seguir tomando órdenes y gestionando caja. Al recuperar conexión, la sincronización es automática.",
  },
  {
    q: "¿El contador puede acceder sin ver toda la operación?",
    a: "Exactamente para eso están los roles. El Contador tiene acceso exclusivo a contabilidad, reportes financieros y balance — sin ver la operación ni tocar órdenes. Credenciales totalmente independientes.",
  },
  {
    q: "¿RestHUB reemplaza mi sistema de delivery?",
    a: "No somos Rappi, iFood ni UberEats. RestHUB opera el restaurante por dentro. La integración con plataformas de delivery puede ser parte del roadmap, pero nunca será la identidad del producto.",
  },
  {
    q: "¿Los datos de mi restaurante son seguros?",
    a: "La seguridad está en la arquitectura base. Cada transacción, acceso y reporte está protegido con encriptación en tránsito y en reposo. Los roles garantizan que nadie accede a lo que no le corresponde.",
  },
];
