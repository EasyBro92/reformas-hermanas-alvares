/* =====================================================================
   DATOS DE LA WEB — aquí se cambia el contenido sin tocar nada más.
   Guarda el archivo y sube el cambio (GitHub: lápiz > "Commit changes").
   ===================================================================== */
window.SITE = {

  /* Contacto. Si el teléfono también es WhatsApp, escribe el número en
     "whatsapp" (sin espacios, con prefijo, p. ej. "34620408298") y aparecerá
     el botón de WhatsApp. */
  contact: {
    phone: "620 408 298",
    email: "reformasabg@gmail.com",
    whatsapp: ""
  },

  /* Cifras de la portada (déjalas vacías si no quieres mostrarlas).
     Ejemplo: years: "12", projects: "150", clients: "98 %" */
  facts: { years: "", projects: "", clients: "" },

  /* Zonas donde trabajáis (separadas por comas). */
  zones: "Girona, Barcelona",

  /* Opiniones reales de clientes. Ejemplo:
     { name: "María", text: "Quedó todo perfecto y limpio.", stars: 5 } */
  reviews: [],

  /* Foto de antes y después de la portada (rutas dentro de la carpeta "fotos"). */
  ba: { before: "fotos/6-reforma-antes.jpg", after: "fotos/7-reforma-despues.jpg" },

  /* Galería "Trabajos". Para añadir una foto: súbela a la carpeta "fotos" y
     añade una línea aquí.
     cat puede ser: reforma, bano, cocina, pintura, suelos, limpieza */
  media: [
    { src: "fotos/6-reforma-antes.jpg", type: "photo", cat: "reforma", caption: "Reforma integral: antes de la obra" },
    { src: "fotos/7-reforma-despues.jpg", type: "photo", cat: "reforma", caption: "Reforma integral: después de la obra" },
    { src: "fotos/1-cocina-blanca-l.jpg", type: "photo", cat: "cocina", caption: "Cocina blanca en L con encimera clara" },
    { src: "fotos/2-bano-mueble-negro.jpg", type: "photo", cat: "bano", caption: "Baño con mueble negro y ducha efecto madera" },
    { src: "fotos/3-cocina-led.jpg", type: "photo", cat: "cocina", caption: "Cocina con iluminación LED bajo los muebles" },
    { src: "fotos/4-bano-espejo-led.jpg", type: "photo", cat: "bano", caption: "Baño con espejo retroiluminado y encimera de madera" },
    { src: "fotos/5-aseo-pared-curva.jpg", type: "photo", cat: "bano", caption: "Aseo con espejo redondo y pared curva con luz LED" }
  ]
};
