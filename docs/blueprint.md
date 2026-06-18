# **App Name**: MARIFER MODA

## Core Features:

- Gestión del Carrito y Estado: Implementación de las funcionalidades principales del carrito de compras, incluyendo añadir, eliminar y actualizar cantidades, así como el cálculo de estados derivados para el total de artículos y el precio total en Pesos Uruguayos (UYU), gestionado mediante React Context.
- Navegación por Categorías de Productos: Un componente 'CategoryScroll' de desplazamiento táctil horizontal que presenta botones de filtro tipo cápsula para categorías clave de productos como 'Pantalones', 'Buzos Oversize', 'Remeras' y 'Pijamas Polar Soft'.
- Tarjetas de Producto Responsivas: Visualización de productos mediante el componente 'ProductCard', con un diseño limpio de 2 columnas optimizado para dispositivos móviles. Cada tarjeta incluye imagen del producto, título, precio con posibles descuentos, el texto 'Hasta 12 cuotas sin recargo' y un botón de acción destacado 'Ver prendas'.
- Panel de Carrito Interactivo: Un componente 'CartDrawer' deslizante que permite a los usuarios gestionar cantidades de artículos y ver desgloses de precios claros, incluyendo opciones de envío local (DAC / Mirtrans). Incluye un botón principal 'Comprar por WhatsApp' que genera un mensaje de WhatsApp formateado con el contenido final del carrito.
- Modelos de Datos con Tipado Seguro: Definiciones estrictas de TypeScript para 'Product' (incluyendo id, título, descripción, precio, categoría, imágenes, variantes) y 'CartItem' (producto, talle elegido, cantidad) para garantizar un manejo de datos robusto en toda la aplicación.

## Style Guidelines:

- Fondo principal de la aplicación: Blanco lino suave (#F9F6FC) para asegurar comodidad y prevenir la fatiga visual en dispositivos móviles.
- Color de acción principal: Violeta orquídea vibrante (#6C429C) para elementos interactivos y botones de llamada a la acción, transmitiendo una sensación premium y de moda.
- Color de acento e indicador de éxito: Verde retail seguro (#10B981) para confirmaciones, mensajes de éxito y el botón crucial 'Comprar por WhatsApp', infundiendo confianza.
- Color de tipografía: Violeta berenjena profundo (#251642) para el texto principal y encabezados, garantizando una alta legibilidad y un contraste sofisticado.
- Acento de fondo secundario: Un gris-lavanda sutil (#F4F0F7) para fondos de componentes internos o separadores para añadir profundidad sin distraer.
- Fuente para encabezados y visualización de precios: 'Montserrat' (sans-serif) por su fuerte presencia geométrica, mejorando la visibilidad de títulos y precios.
- Fuente para cuerpo de texto e información de productos: 'Inter' (sans-serif) por su alta legibilidad y eficiencia en el renderizado de descripciones y escalas de talles en navegadores móviles.
- Uso de un conjunto de iconos de línea modernos y limpios para el carrito, la navegación y otras acciones de la interfaz, manteniendo una estética minimalista y optimizados para toques móviles.
- Diseño de cuadrícula responsivo 'mobile-first' para la exhibición de productos con una disposición de alto volumen de conversión. Utiliza elementos de ancho completo en pantallas pequeñas, pasando a diseños de múltiples columnas en dispositivos más grandes.
- Implementación de animaciones fluidas y sutiles para las transiciones del panel del carrito, interacciones con las tarjetas de productos y filtrado de categorías para proporcionar una experiencia de usuario suave y atractiva.