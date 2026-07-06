/* script.js — Cookies, Analytics y Tienda */

/* ANALYTICS */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

function loadAnalytics() {
    try {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CSSZGRB6CC';
        document.head.appendChild(s);
        gtag('js', new Date());
        gtag('config', 'G-CSSZGRB6CC');
    } catch(e) {}
}

/* STORAGE con fallback para Brave  */
var _mem = {};

function storageGet(key) {
    if (_mem[key] !== undefined) return _mem[key];
    try { var v = localStorage.getItem(key);   if (v !== null) return v; } catch(e) {}
    try { var v = sessionStorage.getItem(key); if (v !== null) return v; } catch(e) {}
    return null;
}

function storageSet(key, value) {
    _mem[key] = value;
    try { localStorage.setItem(key, value);   } catch(e) {}
    try { sessionStorage.setItem(key, value); } catch(e) {}
}

/* COOKIES + BOTÓN ARRIBA */
document.addEventListener('DOMContentLoaded', function () {

    if (storageGet('cookiesDecision') === 'accepted') loadAnalytics();

    var overlay = document.getElementById('jm-consent-overlay');
    if (overlay) {
        if (!storageGet('cookiesDecision')) overlay.style.display = 'flex';

        var aBtn = document.getElementById('jm-consent-accept');
        var rBtn = document.getElementById('jm-consent-reject');

        if (aBtn) aBtn.addEventListener('click', function () {
            storageSet('cookiesDecision', 'accepted');
            overlay.style.display = 'none';
            loadAnalytics();
        });

        if (rBtn) rBtn.addEventListener('click', function () {
            storageSet('cookiesDecision', 'rejected');
            overlay.style.display = 'none';
        });
    }

    var btn = document.getElementById('btn-top');
    if (btn) {
        window.addEventListener('scroll', function () {
            btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/* TIENDA */
document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('view-categorias')) return;

    var CATEGORIAS = [
        {
            id: 'accesorios',
            nombre: 'Accesorios',
            descripcion: 'Pulseras, colgantes, collares y pendientes con energía.',
            imagen: 'imagenes/tienda/accesorios/accesorios.jpeg',
            subcategorias: [
                { id: 'pulseras',    nombre: 'Pulseras',                 descripcion: 'Brazaletes de energía con cristales naturales.',  imagen: 'imagenes/tienda/accesorios/pulseras/pulseras.png',
                    subcategorias: [
                        { id: 'pulseras-energia',          nombre: 'Pulseras de Energía',            descripcion: 'Brazaletes de energía con cristales naturales para el equilibrio diario.', imagen: 'imagenes/tienda/accesorios/pulseras/pulseraChakras.png' },
                        { id: 'pulseras-piedras-preciosas', nombre: 'Pulseras de Piedras Preciosas',  descripcion: 'Pulseras de fragmentos de piedras preciosas para potenciar tu energía.',    imagen: 'imagenes/tienda/accesorios/pulseras/chakraPreciosas.png' },
                        { id: 'pulseras-piedra-lava',       nombre: 'Pulseras de Piedra de Lava',     descripcion: 'Pulseras de piedra volcánica con símbolos de protección y suerte.',         imagen: 'imagenes/tienda/accesorios/pulseras/budaChakraLava.png' },
                    ]
                },

                { id: 'colgantes',   nombre: 'Colgantes',                descripcion: 'Colgantes con símbolos de protección y amor.',     imagen: 'imagenes/tienda/accesorios/colgantes/colgantes.png',
                    subcategorias: [
                        { id: 'colgantes-arbol-vida',        nombre: 'Colgantes de Árbol de Vida',      descripcion: 'Colgantes con el símbolo del Árbol de la Vida en piedras naturales.', imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaAgataNegra.png' },
                        { id: 'colgantes-piedras-preciosas', nombre: 'Colgantes de Piedras Preciosas',  descripcion: 'Colgantes de piedras preciosas en distintos diseños y cortes.',       imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasAmatista.png' },
                        { id: 'colgantes-manos-curativas',   nombre: 'Colgantes de Manos Curativas',    descripcion: 'Colgantes de manos curativas que sostienen piedras naturales.',       imagen: 'imagenes/tienda/accesorios/colgantes/manosCurativas/manosCurativasAmatista.png' },
                    ]
                },
                { id: 'expositores', nombre: 'Expositores y Accesorios', descripcion: 'Complementos para exhibir tus accesorios.',        imagen: 'imagenes/tienda/accesorios/expositores/expositores.png' },
            ]
        },
        
        {   
            id: 'aromaterapia', 
            nombre: 'Aromaterapia',                 
            descripcion: 'Aceites esenciales y difusores para armonizar tu espacio.', 
            imagen: 'imagenes/tienda/aromaterapia/aromaterapia.jpeg',
            subcategorias: [
                { id: 'aceites-esenciales', nombre: 'Aceites Esenciales', descripcion: 'Aceites esenciales puros para aromaterapia y bienestar.', imagen: 'imagenes/tienda/aromaterapia/aceitesEsenciales/aceitesEsenciales.png' },
                { id: 'difusores', nombre: 'Difusores de Coche', descripcion: 'Difusores de coche para aromaterapia y bienestar mientras conduces.', imagen: 'imagenes/tienda/aromaterapia/difusoresCoche/difusores.png' }
            ]
        },
        {   
            id: 'Bano-Cuerpo', 
            nombre: 'Baño y Cuerpo',                 
            descripcion: 'Productos para el cuidado personal y el bienestar.', 
            imagen: 'imagenes/tienda/banoYCuerpo/banoYCuerpo.png',
            subcategorias: [
                { id: 'mascarillas-faciales', nombre: 'Mascarillas Faciales', descripcion: 'Mascarillas faciales naturales para un cuidado intensivo.', imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillasFaciales.png' },
                { id: 'rodillos-faciales', nombre: 'Rodillos Faciales', descripcion: 'Rodillos faciales de piedras preciosas.', imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodillosFaciales.png' }
            ]  },

        { 
            id: 'bolsos',       
            nombre: 'Bolsos, Mochilas y Neceseres',  
            descripcion: 'Lleva contigo la magia a donde vayas.',                    
            imagen: 'imagenes/tienda/bolsos/bolsos.jpeg',
            subcategorias: [
                { id: 'bolsas-nepal', nombre: 'Bolsas de Nepal', descripcion: 'Bolsas artesanales llenas de color y autenticidad. Diseños únicos con la esencia mística y el espíritu libre del Himalaya.', imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsosNepal.png' },
                { id: 'bolsas-fieltro', nombre: 'Bolsas de Fieltro', descripcion: 'Bolsas de textura suave, cálida y resistente. Un accesorio artesanal, cómodo y original para darle un toque creativo a tu día a día.', imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsasFieltro.png' },
                { id: 'bolsas-canamo', nombre: 'Bolsas de Cáñamo', descripcion: 'Bolsas ecológicas de fibra natural, duraderas y de aire rústico. La opción perfecta para un estilo de vida sostenible, bohemio y consciente.', imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsasCanamo.png' },
                { id: 'bolsas-flecos', nombre: 'Bolsas de Flecos', descripcion: 'Bolsas de espíritu libre y movimiento desenfadado. El accesorio ideal para aportar dinamismo, textura y un toque boho-chic a cualquier look.', imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsosFlecos.png' },
                { id: 'bolsos-etnicos', nombre: 'Bolsos Étnicos', descripcion: 'Bolsos vibrantes con estampados tradicionales y símbolos cargados de energía. Estilo hippie y relajado con personalidad propia.', imagen: 'imagenes/tienda/bolsos/bolsosEtnicos/bolsosEtnicos.png' },
                { id: 'bolsas-jacquard', nombre: 'Bolsas Jacquard', descripcion: 'Bolsas de tejido geométrico resistente y de aire bohemio-urbano. Espaciosas, juveniles y perfectas para el ritmo de tu rutina.', imagen: 'imagenes/tienda/bolsos/bolsosJacquard/bolsosJacquard.png' },
                { id: 'bolsos-asa-piel', nombre: 'Bolsas con Asa de Piel', descripcion: 'Bolsas de base natural que combinan la calidez textil con la elegancia y resistencia de las asas de piel. Estilo orgánico y atemporal.', imagen: 'imagenes/tienda/bolsos/bolsosAsaPiel/bolsosAsaPiel.png' }
            ]   },

        { 
            id: 'cristales',    
            nombre: 'Cristales y Esoterismo',        
            descripcion: 'Cristales de poder y herramientas esotéricas.',            
            imagen: 'imagenes/tienda/cristalesYesoterismo/cristales.jpeg'      },

        { 
            id: 'fragancias',   
            nombre: 'Fragancias para el Hogar',      
            descripcion: 'Aromas que limpian y protegen tu hogar.',                  
            imagen: 'imagenes/tienda/fraganciaHogar/fragancias.jpeg'     },

        { 
            id: 'hogar',        
            nombre: 'Hogar y Jardín',                
            descripcion: 'Decora tu espacio con intención y energía positiva.',      
            imagen: 'imagenes/tienda/hogarYjardin/hogarJardin.jpeg'          },

        { 
            id: 'inciensos',    
            nombre: 'Inciensos y Quemadores',        
            descripcion: 'Purifica y eleva la energía con inciensos naturales.',     
            imagen: 'imagenes/tienda/inciensosYquemadores/inciensos.jpeg'      },

        { 
            id: 'instrumentos', 
            nombre: 'Instrumentos Musicales',        
            descripcion: 'Sonidos sanadores para meditación y ritual.',              
            imagen: 'imagenes/tienda/instrumentosMusicales/instrumentosMusicales.png'   },

        { 
            id: 'ropa',         
            nombre: 'Ropa',                          
            descripcion: 'Prendas con simbolismo y energía espiritual.',            
            imagen: 'imagenes/tienda/ropa/ropa.jpeg'           },

        { 
            id: 'te',           
            nombre: 'Té Artesanal',                  
            descripcion: 'Infusiones naturales para el cuerpo y el espíritu.',      
            imagen: 'imagenes/tienda/teArtesanal/teArtesanal.jpeg'             },

        { 
            id: 'velas',        
            nombre: 'Velas y Portavelas',            
            descripcion: 'Ilumina tus rituales con velas energizadas.',            
            imagen: 'imagenes/tienda/velas/velas.jpeg'          }
    ];

    var PRODUCTOS = {
        'pulseras-energia': [
            { nombre: 'Brazalete de Energía — Piedra de los Chakras',       descripcion: 'Lleva contigo la armonía de los 7 chakras y transforma tu día.', imagen: 'imagenes/tienda/accesorios/pulseras/pulseraChakras.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-poder-piedras-de-los-chakras776' },
            { nombre: 'Brazalete de Energía — Ágata Negra',       descripcion: 'Piedra de protección, éxito y coraje. Protege a las personas de cosas como el estrés y los malos sueños.',      imagen: 'imagenes/tienda/accesorios/pulseras/pulseraAgataNegra.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-agata-negra772' },
            { nombre: 'Brazalete de Energía — Ágata de Musgo',     descripcion: 'Esta piedra atrae la riqueza, la prosperidad y favorece la recuperación tras una enfermedad. Además, potencia la concentración mental y la resistencia física. ',    imagen: 'imagenes/tienda/accesorios/pulseras/pulseraAgataMusgo.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-agata-de-musgo767' },
            { nombre: 'Brazalete de Energía — Ojo de Tigre',       descripcion: 'El ojo de tigre es una piedra poderosa que fomenta la armonía, el equilibrio y ayuda a liberar el miedo y la ansiedad.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraOjoTigre.png',    url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-ojo-de-tigre763' },
            { nombre: 'Brazalete de Energía — Sodalita',           descripcion: 'La sodalita fomenta la paz interior, la claridad mental y la expresión honesta de los sentimientos. Es una piedra ideal para calmar la mente, disipar miedos y fortalecer la autoestima.',    imagen: 'imagenes/tienda/accesorios/pulseras/pulseraSodalita.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-sodalita758' },
            { nombre: 'Brazalete de Energía — Opalite',            descripcion: 'Piedra de alta vibración que aporta paz interior, equilibra las emociones y disipa la fatiga. Además, potencia la claridad mental y ayuda a transitar con éxito los momentos de cambio y transición.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraOpalite.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-opalite754' },
            { nombre: 'Brazalete de Energía — Jaspe Verde',        descripcion: 'El Jaspe Verde ayuda a absorber la energía negativa y restablecer la armonía tanto mental como físicamente.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraJaspeVerde.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-jaspe-verde750' },
            { nombre: 'Brazalete de Energía — Jaspe Blanco',       descripcion: 'El Jaspe Blanco ayuda a equilibrar las emociones y mejora la capacidad de relajarse y estar tranquilo.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraJaspeBlanco.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-jaspe-blanco747'  },
            { nombre: 'Brazalete de Energía — Jade',               descripcion: 'El jade es la piedra definitiva de la prosperidad, la buena fortuna y la pureza, ideal para atraer la abundancia. Además, promueve la armonía emocional, la paz interior y protege contra las energías negativas.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraJade.png',    url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-jade743' },
            { nombre: 'Brazalete de Energía — Granate de Sangre',  descripcion: 'El granate de sangre ayuda a elevar el estado de ánimo y aumentar la positividad.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraGranateSangre.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-granate-de-sangre738'  },
            { nombre: 'Brazalete de Energía — Cuarzo Rosa',        descripcion: 'El cuarzo rosa Aporta energía de determinación, compromiso y cuidado en tu día a día. Además, es ideal para calmar la mente y liberar los sentimientos de ira o resentimiento.',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraCuarzoRosa.png',    url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-cuarzo-rosa735' },
            { nombre: 'Brazalete de Energía — Cristal de Miel',    descripcion: 'El cristal de miel (calcita miel) es una piedra de optimismo y poder personal que amplifica la energía, la motivación y la confianza en uno mismo. Además, disipa los bloqueos mentales, atrae la abundancia y aporta una profunda sensación de calidez y paz interior.',          imagen: 'imagenes/tienda/accesorios/pulseras/pulseraCristalMiel.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-cristal-de-miel731'    },
            { nombre: 'Brazalete de Energía — Amatista',           descripcion: 'La amatista tiene beneficios para la salud, como ser capaz de ayudar a modular los patrones de sueño para obtener un sueño nocturno saludable y también ayudar a mejorar el estado de ánimo. ',     imagen: 'imagenes/tienda/accesorios/pulseras/pulseraAmatista.png',          url: 'https://ai6mq0-4x.myshopify.com/es/products/brazalete-de-energia-amatista728'           },
        ],

        'pulseras-piedras-preciosas': [
            { nombre: 'Brazalete de Piedras Preciosas — Chakra',   descripcion: 'Conecta con la fuerza de la tierra y equilibra tu energía con la piedra de lava volcánica, el canal perfecto para armonizar tus 7 chakras.',     imagen: 'imagenes/tienda/accesorios/pulseras/chakraPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-chakra234'           },
            { nombre: 'Brazalete de Piedras Preciosas — Ágata negra',   descripcion: 'Lleva contigo la elegancia natural y la máxima protección del ágata negra, una piedra ideal para absorber las energías negativas y mantener tu equilibrio.',     imagen: 'imagenes/tienda/accesorios/pulseras/AgataNegraPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-agata-negra255'           },
            { nombre: 'Brazalete de Piedras Preciosas — Amatista',   descripcion: 'Conecta con tu intuición y transforma el estrés en paz interior. Esta pulsera de fragmentos de amatista es el amuleto perfecto para la calma y la claridad mental.',     imagen: 'imagenes/tienda/accesorios/pulseras/AmatistaPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-amatista226'           },
            { nombre: 'Brazalete de Piedras Preciosas — Aventurina Verde',   descripcion: 'Atrae la abundancia, la buena fortuna y las nuevas oportunidades con la vibrante energía de la aventurina verde, la piedra de la prosperidad por excelencia.',     imagen: 'imagenes/tienda/accesorios/pulseras/aventurineGreenPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-aventurine-green230'           },
            { nombre: 'Brazalete de Piedras Preciosas — Cuarzo Rosa',   descripcion: 'Abre tu corazón al amor incondicional, la autoestima y la sanación emocional con la suave y poderosa energía del cuarzo rosa.',     imagen: 'imagenes/tienda/accesorios/pulseras/cuarzoRosaPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-cuarzo-rosa238'           },
            { nombre: 'Brazalete de Piedras Preciosas — Granate de Sangre',   descripcion: 'Enciende tu fuego interior, tu pasión y tu fuerza vital con el granate de sangre, una piedra poderosa para despertar la energía y la motivación.',     imagen: 'imagenes/tienda/accesorios/pulseras/granateSangrePreciosas.png',       url: 'https://cz7l0oa2jv4g38j6-94867816834.shopifypreview.com/products_preview?preview_key=2332d2cc536275fa23f5b7e9d0189459'           },
            { nombre: 'Brazalete de Piedras Preciosas — Jaspe Blanco',   descripcion: 'Purifica tu mente y encuentra la paz interior con el jaspe blanco, una piedra que aporta claridad, serenidad y limpieza energética a tu día a día.',     imagen: 'imagenes/tienda/accesorios/pulseras/jaspeBlancoPreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-jaspe-blanco245'           },
            { nombre: 'Brazalete de Piedras Preciosas — Ojo de Tigre',   descripcion: 'Despierta tu poder interior y protégete de las malas vibras con el ojo de tigre, la piedra de la fuerza, la autoconfianza y la mirada enfocada hacia el éxito.',     imagen: 'imagenes/tienda/accesorios/pulseras/ojoTigrePreciosas.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-fragmentos-de-piedras-preciosas-ojo-de-tigre248'           },
            { nombre: 'Brazalete de Piedras Preciosas — Piedra de Coralita',   descripcion: 'Inyéctale energía, optimismo y alegría a tus días con la piedra de coralita, un mineral vibrante ideal para despertar el entusiasmo y la creatividad.',     imagen: 'imagenes/tienda/accesorios/pulseras/piedraCoralitaPreciosas.png',       url: 'https://cz7l0oa2jv4g38j6-94867816834.shopifypreview.com/products_preview?preview_key=469b4f635433d559264e27256c302085'           },
        ],

        'pulseras-piedra-lava': [
            { nombre: 'Pulsera de Piedra de Lava - Buda - Chakra',   descripcion: 'Encuentra tu paz zen y alinea tu energía interior. La fuerza de la piedra de lava se une a la sabiduría de Buda y la armonía de los 7 chakras en este amuleto único.',     imagen: 'imagenes/tienda/accesorios/pulseras/budaChakraLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-buda-chakra729'           },
            { nombre: 'Pulsera de Piedra de Lava - Buda - Cuarzo Rosa',   descripcion: 'Conecta con la sabiduría de Buda y abre tu corazón a la calma. La fuerza protectora de la piedra de lava se fusiona con la suave energía de amor propio del cuarzo rosa.',     imagen: 'imagenes/tienda/accesorios/pulseras/cuarzoRosaBudaLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-buda-cuarzo-rosa732'           },
            { nombre: 'Pulsera de Piedra de Lava - Elefante - Chakra',   descripcion: 'Atrae la buena suerte, la sabiduría y la prosperidad con el poder del elefante místico, mientras la piedra de lava y los 7 chakras equilibran y protegen tu energía universal',     imagen: 'imagenes/tienda/accesorios/pulseras/chakraElefanteLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-elefante-chakra736'           },
            { nombre: 'Pulsera de Piedra de Lava - Hamsa - Chakra',   descripcion: 'Mantén alejadas las malas energías y alinea tu ser. El poder protector de la mano de Hamsa se une al arraigo de la piedra de lava y la armonía de tus 7 chakras.',     imagen: 'imagenes/tienda/accesorios/pulseras/chakraHamsaLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-hamsa-chakra742'           },
            { nombre: 'Pulsera de Piedra de Lava - Hamsa - Ojo de tigre',   descripcion: 'Un escudo impenetrable contra las malas energías. El poder místico de la mano de Hamsa se une a la fuerza protectora del ojo de tigre y al arraigo de la piedra volcánica.',     imagen: 'imagenes/tienda/accesorios/pulseras/ojoTigreHamsaLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-hamsa-ojo-de-tigre745'           },
            { nombre: 'Pulsera de Piedra de Lava - Hoja - Turquesa',   descripcion: 'Conecta con la frescura de la naturaleza y tu paz interior. La pureza y sanación de la turquesa se une al símbolo de la hoja y a la fuerza protectora de la piedra volcánica.',     imagen: 'imagenes/tienda/accesorios/pulseras/hojaTurquesaLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-hoja-turquesa749'           },
            { nombre: 'Pulsera de Piedra de Lava - Pescado - Amatista',   descripcion: 'Fluye con la vida y transforma tu energía en paz pura. El símbolo místico del pescado, representante de la abundancia y la intuición, se une a la transmutación de la amatista y el arraigo de la piedra volcánica.',     imagen: 'imagenes/tienda/accesorios/pulseras/pescadoAmatistaLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-pescado-amatista752'           },
            { nombre: 'Pulsera de Piedra de Lava - Sistema solar - Oro',   descripcion: 'Fluye con la vida y transforma tu energía en paz pura. El símbolo místico del pescado, representante de la abundancia y la intuición, se une a la transmutación de la amatista y el arraigo de la piedra volcánica.',     imagen: 'imagenes/tienda/accesorios/pulseras/sistemaSolarOroLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-sistema-solar-oro755'           },
            { nombre: 'Pulsera de Piedra de Lava - Sistema solar - Plata',   descripcion: 'Lleva la majestuosidad del universo en tu muñeca con un toque de elegancia plateada, combinando la fuerza volcánica de la piedra de lava con los colores del sistema solar.',     imagen: 'imagenes/tienda/accesorios/pulseras/sistemaSolaPlataLava.png',       url: 'https://ai6mq0-4x.myshopify.com/es/products/pulsera-de-piedra-de-lava-sistema-solar-plata758'           }
        ],

        'colgantes-arbol-vida': [
            { nombre: 'Colgante Árbol de la Vida - Ágata Negra',       descripcion: 'Conecta tus raíces con la tierra y protege tu energía. Este colgante del Árbol de la Vida en ágata negra es el amuleto perfecto para transformar la negatividad en fuerza y estabilidad.', imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaAgataNegra.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-agata-negra635' },
            { nombre: 'Colgante Árbol de la Vida - Amatista',       descripcion: 'Conecta tu sabiduría interior con el universo. Este colgante del Árbol de la Vida en amatista transforma el estrés en paz pura y eleva tu vibración espiritual.',      imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaAmatista.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-amatista609' },
            { nombre: 'Colgante Árbol de la Vida - Chakra',     descripcion: 'Armoniza tu ser desde la raíz hasta la corona. Este colgante del Árbol de la Vida conecta tu crecimiento personal con la vibración de tus 7 chakras para que fluyas en perfecta sintonía con el universo. ',    imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaChakra.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-chakra612' },
            { nombre: 'Colgante Árbol de la Vida - Cornalina',       descripcion: 'Enciende tu fuego interior y haz florecer tus proyectos. Este colgante del Árbol de la Vida en cornalina te llena de motivación, creatividad y la valentía necesaria para alcanzar tus metas.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaCornalina.png',    url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-cornalina615' },
            { nombre: 'Colgante Árbol de la Vida - Cristal de Roca',  descripcion: 'Limpia tu mente, amplifica tu energía y florece con fuerza. Este colgante del Árbol de la Vida en cristal de roca actúa como un canalizador de luz pura, eliminando bloqueos y aportando claridad a tus decisiones.',    imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaCristalRoca.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-cristal-de-roca618' },
            { nombre: 'Colgante Árbol de la Vida - Cuarzo Rosa',      descripcion: 'Abre tu corazón al amor incondicional y florece desde el interior. Este colgante del Árbol de la Vida en cuarzo rosa es el amuleto perfecto para sanar tus emociones, atraer la paz y recordarte tu propio valor.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaCuarzoRosa.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-cuarzo-rosa622' },
            { nombre: 'Colgante Árbol de la Vida - Jade',      descripcion: 'Atrae la abundancia, la buena suerte y la armonía a tu vida. Este colgante del Árbol de la Vida en jade es un amuleto ancestral diseñado para hacer florecer tus proyectos mientras protege tu camino con su energía de prosperidad.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaJade.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-jade625' },
            { nombre: 'Colgante Árbol de la Vida - Jaspe Rojo',      descripcion: 'Conecta con la fuerza de la tierra y enciende tu resistencia. Este colgante del Árbol de la Vida en jaspe rojo es el amuleto perfecto para darte estabilidad, potenciar tu energía vital y darte el empuje necesario en el día a día.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaJaspeRojo.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-jaspe-rojo629' },
            { nombre: 'Colgante Árbol de la Vida - Ojo de Tigre',      descripcion: 'Mantén tu mirada fija en el éxito. Este colgante del Árbol de la Vida en ojo de tigre es el amuleto definitivo para potenciar tu seguridad personal, tomar decisiones con determinación y atraer la abundancia.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaOjoTigre.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-ojo-de-tigre632' },
            { nombre: 'Colgante Árbol de la Vida - Sodalita',      descripcion: 'Conecta con tu verdad interior y aclara tu mente. Este colgante del Árbol de la Vida en sodalita une la sabiduría de tus raíces con una energía que estimula el pensamiento racional, la intuición y la verdad.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaSodalita.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-arbol-de-la-vida-sodalita583' },
            { nombre: 'Collar Árbol de la Vida - Amatista',      descripcion: 'Paz mental, intuición y crecimiento sagrado. Un diseño místico que une la fuerza del Árbol de la Vida con la energía protectora y transmutadora de la amatista.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaPiedraAmatista.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-arbol-de-la-vida-amatista596' },
            { nombre: 'Collar Árbol de la Vida - Cuarzo Rosa',      descripcion: 'Amor propio, paz interna y crecimiento sagrado. Un diseño lleno de ternura que une la sabiduría del Árbol de la Vida con la suave vibración sanadora del cuarzo rosa.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaPiedraCuarzoRosa.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-arbol-de-la-vida-cuarzo-rosa599' },
            { nombre: 'Collar Árbol de la Vida - Ojo de Tigre',      descripcion: 'Coraje, protección y prosperidad. Un diseño sagrado que une el simbolismo del Árbol de la Vida con la mirada audaz y el escudo contra las malas energías que ofrece el ojo de tigre.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaPiedraOjoTigre.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-arbol-de-la-vida-ojo-de-tigre603' },
            { nombre: 'Collar Árbol de la Vida - Ónix Negro',      descripcion: 'Echa raíces fuertes y blinda tu camino. Este collar del Árbol de la Vida en ónix negro es el amuleto definitivo para mantener los pies en la tierra mientras tus metas crecen libres de envidias, absorbiendo cualquier energía negativa para transformarla en fortaleza.',     imagen: 'imagenes/tienda/accesorios/colgantes/arbolVida/arbolVidaPiedraOnix.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-arbol-de-la-vida-onix-negro606' },
        ],

        'colgantes-manos-curativas': [
            { nombre: 'Colgante de Manos Curativas de Piedras Preciosas - Amatista',       descripcion: 'Permite que la energía universal guíe tu bienestar. Este colgante de manos curativas sostiene con delicadeza una amatista, creando el canal perfecto para transmutar el estrés en paz pura y sanar tu cuerpo, mente y espíritu.', imagen: 'imagenes/tienda/accesorios/colgantes/manosCurativas/manosCurativasAmatista.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-manos-curativas-de-piedras-preciosas-amatista567' },
            { nombre: 'Colgante de Manos Curativas de Piedras Preciosas - Cuarzo Rosa',       descripcion: 'Permite que la energía universal mime tu alma. Este colgante de manos curativas sostiene con ternura un cuarzo rosa, creando el canal perfecto para sanar heridas emocionales, disolver tensiones y abrir tu corazón al amor incondicional.',      imagen: 'imagenes/tienda/accesorios/colgantes/manosCurativas/manosCurativasCuarzoRosa.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-manos-curativas-de-piedras-preciosas-cuarzo-rosa570' },
            { nombre: 'Colgante de Manos Curativas de Piedras Preciosas - Ojo de Tigre',       descripcion: 'Toma el control de tu energía y camina con paso firme. Este colgante de manos curativas sostiene el poder del ojo de tigre, canalizando una fuerza protectora que disipa los miedos, ahuyenta las malas vibraciones y potencia tu confianza.',      imagen: 'imagenes/tienda/accesorios/colgantes/manosCurativas/manosCurativasOjoTigre.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-manos-curativas-de-piedras-preciosas-ojo-de-tigre574' },
        ],

        'colgantes-piedras-preciosas': [
            { nombre: 'Colgante de Punto Clásico de Piedras Preciosas - Amatista',     descripcion: 'Dirige tu energía hacia la paz y la claridad. El diseño en punta clásica actúa como un canalizador natural, potenciando la vibración transmutadora de la amatista para elevar tu intuición y disipar cualquier energía negativa a tu alrededor. ',    imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasAmatista.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-punto-clasico-de-piedras-preciosas-amatista577' },
            { nombre: 'Colgante de Punto Clásico de Piedras Preciosas - Cuarzo Rosa',       descripcion: 'Dirige tu energía hacia el amor propio y la armonía. El diseño en punta clásica actúa como un canalizador natural, proyectando la suave vibración del cuarzo rosa para abrir tu corazón, sanar emociones y atraer relaciones sinceras a tu vida.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasCuarzoRosa.png',    url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-punto-clasico-de-piedras-preciosas-cuarzo-rosa580' },
            { nombre: 'Colgante de Punto Clásico de Piedras Preciosas - Ojo de Tigre',  descripcion: 'Dirige tu voluntad y manifiesta tus metas con absoluta seguridad. El diseño en punta clásica actúa como un canalizador natural, proyectando la poderosa vibración del ojo de tigre para afilar tu enfoque, atraer la prosperidad y darte la claridad necesaria para triunfar.',    imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasOjoTigre.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-de-punto-clasico-de-piedras-preciosas-ojo-de-tigre586' },
            { nombre: 'Colgante Plano de Piedras Preciosas - Cuarzo de Roca',      descripcion: 'Limpia tu mente y amplifica tu luz interior. El diseño plano de este colgante permite que el cuarzo de roca descanse suavemente sobre tu piel, actuando como un escudo protector que purifica tu energía, elimina bloqueos y aporta una claridad absoluta a tus días.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasCuarzoRoca.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-plano-de-piedras-preciosas-cuarzo-de-roca564' },
            { nombre: 'Colgante Plano de Piedras Preciosas - Cuarzo Rosa',      descripcion: 'Conecta con tu esencia y abraza tu paz interior. El diseño plano de este colgante permite que el cuarzo rosa descanse suavemente sobre tu piel, creando un contacto directo que reconforta el alma, sana las emociones y abre tu corazón al amor incondicional.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPreciosasCuarzoRosaPlano.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-plano-de-piedras-preciosas-cuarzo-rosa560' },
            { nombre: 'Colgante Plano Piedra Preciosa - Ágata Negra',      descripcion: 'Blinda tu energía y camina con absoluta seguridad. El diseño plano de este colgante permite que el ágata negra descanse suavemente sobre tu piel, actuando como un escudo protector que absorbe las malas vibraciones, calma los miedos y te mantiene con los pies firmes en la tierra.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/piedrasPReciosasAgataNegraPlano.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/colgante-plano-piedra-preciosa-agata-negra557' },
            { nombre: 'Collar de gemas envueltas en espiral - Amatista',      descripcion: 'Dirige tu energía hacia la calma y la intuición. El diseño en espiral actúa como un conductor natural, expandiendo la vibración transmutadora de la amatista para disipar el estrés diario, limpiar tu aura y proteger tu paz interior con elegancia.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/gemaEspiralAmatista.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-de-gemas-envueltas-en-espiral-ametista590' },
            { nombre: 'Collar de Piedras Preciosas Envueltas en Cascada - Ónix Negro en bruto',      descripcion: 'Blinda tu energía con la fuerza pura de la tierra. El diseño en cascada abraza el ónix negro en su estado natural y más potente, creando un escudo inquebrantable que absorbe la negatividad, bloquea las malas vibraciones y te mantiene con los pies firmes.',     imagen: 'imagenes/tienda/accesorios/colgantes/piedrasPreciosas/gemaEspiralOnix.png',     url: 'https://ai6mq0-4x.myshopify.com/es/products/collar-de-piedras-preciosas-envueltas-en-cascada-onix-negro-en-bruto593' },
        ],

        'expositores' : [
            { nombre: 'Bandeja de Exhibición de Doce Bahías',     descripcion: 'Optimiza tu espacio y cautiva a tus clientes desde el primer vistazo. El diseño de doce bahías independientes te permite clasificar, proteger y resaltar la belleza de tus piezas, creando una presentación impecable que eleva el valor percibido de tus productos y fomenta la compra. ',    imagen: 'imagenes/tienda/accesorios/expositores/bandejaDoceBahias.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bandeja-de-exhibicion-de-doce-bahias831' },
            { nombre: 'Bandeja de Exhibición de Veinticuatro Compartimentos',     descripcion: 'Optimiza tu espacio y cautiva a tus clientes desde el primer vistazo. El diseño de veinticuatro bahías independientes te permite clasificar, proteger y resaltar la belleza de tus piezas, creando una presentación impecable que eleva el valor percibido de tus productos y fomenta la compra. ',    imagen: 'imagenes/tienda/accesorios/expositores/bandejaVeinticuatroCompartimentos.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bandeja-de-exhibicion-de-veinticuatro-compartimentos828' },
            { nombre: 'Busto Clásico Lrg - Crema',     descripcion: 'Eleva la categoría de tus piezas con un fondo de pura sofisticación. El tamaño grande y las líneas del busto clásico realzan la caída natural de collares y colgantes, mientras que su tono crema suave aporta una calidez luminosa que hace resaltar los colores de cualquier gema o metal.',    imagen: 'imagenes/tienda/accesorios/expositores/bustoLrg.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/busto-clasico-lrg-crema838' },
            { nombre: 'Busto Clásico Med - Chocolate',     descripcion: 'Crea contrastes magnéticos que hagan brillar tu colección. El tamaño mediano es ideal para una gran variedad de longitudes de collares, mientras que su profundo tono chocolate aporta una calidez lujosa que hace resaltar de forma espectacular los reflejos del oro, la plata y las gemas más luminosas. ',    imagen: 'imagenes/tienda/accesorios/expositores/bustoMed.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/busto-clasico-med-chocolate835' },
            { nombre: 'Expositor Collar Lrg - Crema',     descripcion: 'Exhibe tus diseños largos con una caída impecable y natural. Su tamaño grande evita que las piezas pierdan su forma, mientras que el suave tono crema crea un fondo luminoso que realza al instante el brillo de cada metal y gema. ',    imagen: 'imagenes/tienda/accesorios/expositores/expositorCollarLrg.png',      url: 'https://cz7l0oa2jv4g38j6-94867816834.shopifypreview.com/products_preview?preview_key=c0727d7803007d8b267cbb11c260c93e' },
            { nombre: 'Expositor Collar Pequeño - Chocolate',     descripcion: 'Exhibe tus diseños más delicados con un contraste sofisticado. Su tamaño pequeño es ideal para gargantillas y cadenas finas, mientras que el profundo tono chocolate crea un fondo cálido que realza al instante el brillo del oro, la plata y las gemas. ',    imagen: 'imagenes/tienda/accesorios/expositores/expositorCollarPeq.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/expositor-collar-pequeno-chocolate841' },
            { nombre: 'Pantalla Colgante (11 pines)',     descripcion: 'Organiza tus opciones favoritas en un solo lugar y dale un toque elegante a tu espacio. Sus 11 pines te permiten colgar una gran variedad de collares o cadenas de forma ordenada, evitando que se enreden y permitiendo que elijas el look perfecto a la perfección. ',    imagen: 'imagenes/tienda/accesorios/expositores/pantallaColgante.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/pantalla-colgante-11-pines825' },
            { nombre: 'Rama única y soporte de Buda - Blanqueado',     descripcion: 'Aporta paz a tu espacio mientras organizas tus joyas favoritas. La figura de Buda aporta serenidad y la rama blanqueada te permite colgar tus collares de forma natural, transformando tus accesorios diarios en una pieza de decoración zen. ',    imagen: 'imagenes/tienda/accesorios/expositores/soporteBuda.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rama-unica-y-soporte-de-buda-blanqueado852' },
            { nombre: 'Soporte Pulsera Lrg "T" - Crema',     descripcion: 'Organiza tus pulseras y relojes favoritos en un solo lugar con total elegancia. Su diseño en "T" de tamaño grande te permite colocar varias piezas sin que se amontonen, mientras que su suave tono crema aporta una luz preciosa a tu tocador.',    imagen: 'imagenes/tienda/accesorios/expositores/SoportePulseraLrg.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/soporte-pulsera-lrg-t-crema848' },
        ],

        'aceites-esenciales' : [
            { nombre: 'Set de aceites esenciales para aromaterapia: Los 12 mejores',     descripcion: 'Crea el ambiente perfecto para cada momento en tu hogar. Esta colección con los 12 mejores aceites te permite relajar tu mente, purificar el aire o recargar tu energía, transformando tu espacio en un auténtico santuario de bienestar diario.',    imagen: 'imagenes/tienda/aromaterapia/aceitesEsenciales/setAromaterapiaMejores.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/aromatherapy-essential-oil-set-the-top-12965' },
            { nombre: 'Set de aceites esenciales para aromaterapia - Primavera',     descripcion: 'Llena tu hogar con la frescura y vitalidad de la naturaleza. Esta selección de aromas inspirados en la primavera purifica tu espacio, renueva tu energía y envuelve cada habitación en una atmósfera alegre, luminosa y relajante. ',    imagen: 'imagenes/tienda/aromaterapia/aceitesEsenciales/aceitesEsencialesPrimavera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/set-de-aceites-esenciales-para-aromaterapia-primavera979' },
            { nombre: 'Set de aceites esenciales para aromaterapia - Set de otoño',     descripcion: 'Crea una atmósfera cálida, acogedora y llena de paz en tu hogar. Estos aromas inspirados en el otoño son perfectos para reconfortar tu mente, purificar el espacio y envolver tus tardes en una sensación de abrazo, calma y descanso.',    imagen: 'imagenes/tienda/aromaterapia/aceitesEsenciales/aceitesEsencialesPrimavera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/set-de-aceites-esenciales-para-aromaterapia-set-de-otono982' },
            { nombre: 'Set de aceites esenciales para aromaterapia - Verano',     descripcion: 'Llena tu hogar de frescura, sol y una energía totalmente renovada. Estos aromas inspirados en el verano son perfectos para revitalizar tu mente, purificar el aire y envolver tus espacios en una atmósfera limpia, vibrante y llena de positividad. ',    imagen: 'imagenes/tienda/aromaterapia/aceitesEsenciales/aceitesEsencialesPrimavera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/set-de-aceites-esenciales-para-aromaterapia-verano949' },
        ],

        'difusores' : [
            { nombre: 'Kit difusor para coche - Hamsa - 30mm',     descripcion: 'Transforma tus viajes en momentos de paz. La mano de Hamsa protege tu coche mientras el difusor de 30mm esparce tus aceites esenciales favoritos, manteniendo el ambiente fresco, relajado y lleno de buena energía.',    imagen: 'imagenes/tienda/aromaterapia/difusoresCoche/difursorCocheHamsa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/kit-difusor-para-coche-hamsa-30mm908' },
            { nombre: 'Kit difusor para coche - Estaño yoga chakra - 30mm',     descripcion: 'Optimiza tu espacio y cautiva a tus clientes desde el primer vistazo. El diseño de veinticuatro bahías independientes te permite clasificar, proteger y resaltar la belleza de tus piezas, creando una presentación impecable que eleva el valor percibido de tus productos y fomenta la compra. ',    imagen: 'imagenes/tienda/aromaterapia/difusoresCoche/difusorCocheChakra.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/kit-difusor-para-coche-estano-yoga-chakra-30mm905' },
        ],

        'mascarillas-faciales' : [
            { nombre: 'Mascarilla Arcilla Verde 80g',     descripcion: 'La mascarilla de arcilla verde de Illite de AW-Dropshipping ayuda a restaurar la piel y equilibrar el PH natural de la piel, por eso se recomienda tanto a pieles grasas, mixtas y secas.',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaVerde.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mascarilla-arcilla-verde-80g935' },
            { nombre: 'Mascarilla Arcilla Rosa 50g',     descripcion: 'La mascarilla de arcilla rosa de caolín de AW-Dropshipping es una mezcla entre la arcilla blanca de caolín y arcilla roja de caolín. Se recomienda para pieles secas o deshidratadas porque no extrae la grasa.',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mascarilla-arcilla-rosa-50g975' },
            { nombre: 'Mascarilla Arcilla Roja 80g',     descripcion: 'Esta mascarilla proporciona una limpieza profunda ya que está enriquecida con minerales naturales, es rica en óxido de hierro, cobre y baja en aluminio. Desintoxica y tonifica la piel.',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaRoja.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mascarilla-arcilla-roja-80g972' },
            { nombre: 'Arcilla de Caolín 50g',     descripcion: 'Esta mascarilla Limpia en profundidad y puede ayudar a absorber la grasa de la piel. La arcilla de caolín es una de las mejor valoradas del mercado.',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaCaolin.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/arcilla-de-caolin-50g969' },
            { nombre: 'Arcilla bentonita 80g',     descripcion: 'La arcilla de bentonita o también conocida como arcilla de montmorillonita, ayuda a tratar el acné, heridas, o alergias de la piel. Para pieles normales con tendencia a pieles grasas. ',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/arcilla-bentonita-80g962' },
            { nombre: 'Arcilla Amarilla 80g',     descripcion: 'La mascarilla de arcilla amarilla extrae las impurezas de la piel y estimula la circulación de la piel. Se recomienda para pieles normales con tendencia a pieles grasas.',    imagen: 'imagenes/tienda/banoYCuerpo/mascarillasFaciales/mascarillaAmarilla.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/arcilla-amarilla-80g959' },
        ],

        'rodillos-faciales' : [
            { nombre: 'Rodillo Piedras Preciosas para Cara- Cuarzo rosa',     descripcion: 'Este rodillo de cuarzo rosa reduce la hinchazón y estimula la circulación de tu rostro mientras equilibra tus emociones. Un aliado perfecto para liberar el estrés y cuidar tu piel en un solo gesto.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloPiedraPreciosaCuarzoRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-piedras-preciosas-para-cara-cuarzo-rosa942' },
            { nombre: 'Rodillo Piedras Preciosas para Cara- Amatista',     descripcion: 'Este rodillo de amatista reduce la hinchazón y estimula la circulación de tu rostro mientras aporta calma a tu rutina. Una piedra de protección ideal para aliviar el estrés, equilibrar las emociones y cuidar tu piel a diario.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloPiedraPreciosaAmatista.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-piedras-preciosas-para-cara-amatista939' },
            { nombre: 'Rodillo con Vibración de Piedras Preciosas - Jade',     descripcion: 'Este rodillo facial de jade con vibración reduce la hinchazón, alivia la tensión muscular y activa la circulación de tu rostro. Gracias a las propiedades del jade, equilibra la energía de tu cuerpo mientras reduce el estrés y la ansiedad en tu rutina diaria.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloVibracionJade.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-con-vibracion-de-piedras-preciosas-jade955' },
            { nombre: 'Rodillo con Vibración de Piedras Preciosas - Cuarzo rosa',     descripcion: 'Este rodillo de cuarzo rosa con vibración activa la circulación, alivia la tensión muscular y reduce la hinchazón de tu rostro. Potenciado por la energía del chakra del corazón, equilibra tus emociones y libera el estrés en cada uso.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloVibracionCuarzoRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-con-vibracion-de-piedras-preciosas-cuarzo-rosa952' },
            { nombre: 'Rodillo con Vibración de Piedras Preciosas - Cuarzo de Roca',     descripcion: 'Este rodillo de cristal de roca con vibración reduce la hinchazón, alivia la tensión y activa la circulación de tu rostro. Gracias a las propiedades de este cuarzo, aporta una mayor claridad mental y frescura a tu rutina de cuidado diario.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloVibracionCuarzoRoca.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-con-vibracion-de-piedras-preciosas-cuarzo-de-roca945' },
            { nombre: 'Mini Rodillo de Piedras Preciosas - Cuarzo rosa',     descripcion: 'Este mini rodillo de cuarzo rosa con sodalita es perfecto para llevar en el bolso y relajar los músculos del rostro en cualquier lugar. Reduce la hinchazón y estimula la circulación mientras equilibra tus emociones y libera el estrés estés donde estés.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/miniRodilloCuarzoRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mini-rodillo-de-piedras-preciosas-cuarzo-rosa922' },
            { nombre: 'Mini Rodillo de Piedras Preciosas - Obsidiana negra',     descripcion: 'Este mini rodillo de obsidiana es perfecto para llevar en el bolso y relajar los músculos del rostro en cualquier lugar. Reduce la hinchazón y estimula la circulación a la vez que te protege de las energías negativas y mejora tu concentración estés donde estés.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/miniRodilloObsidiana.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mini-rodillo-de-piedras-preciosas-obsidiana-negra925' },
            { nombre: 'Mini Rodillo de Piedras Preciosas - Cuarzo de roca',     descripcion: 'Este mini rodillo de cristal de roca es perfecto para llevar en el bolso y relajar los músculos del rostro en cualquier lugar. Reduce la hinchazón y estimula la circulación a la vez que aporta una mayor claridad mental y frescura vayas donde vayas.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/miniRodilloCuarzoRoca.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mini-rodillo-de-piedras-preciosas-cuarzo-de-roca915' },
            { nombre: 'Mini Rodillo de Piedras Preciosas - Amatista',     descripcion: 'Este mini rodillo de amatista y jade es ideal para viajes, reduciendo la hinchazón y estimulando la circulación facial en cualquier lugar. Combina sus beneficios estéticos con las propiedades calmantes de la amatista para aliviar el estrés y equilibrar las emociones.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/miniRodilloAmatista.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mini-rodillo-de-piedras-preciosas-amatista919' },
            { nombre: 'Rodillo Facial de Piedras Preciosas - Cuarzo Rosa',     descripcion: 'Este rodillo de cuarzo rosa con sodalita está diseñado para masajear la mandíbula, reducir la hinchazón y activar la circulación. Además, relaja los músculos faciales mientras equilibra tus emociones y libera el estrés.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloMandibulaCuarzoRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-facial-de-piedras-preciosas-cuarzo-rosa932' },
            { nombre: 'Rodillo Facial de Piedras Preciosas - Amatista',     descripcion: 'Este rodillo de amatista con sodalita está diseñado para masajear la mandíbula, reducir la hinchazón y activar la circulación del rostro. Gracias a las propiedades de la amatista, aporta un efecto calmante que equilibra las emociones y alivia el estrés.',    imagen: 'imagenes/tienda/banoYCuerpo/rodillosFaciales/rodilloMandibulaAmatista.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rodillo-facial-de-piedras-preciosas-amatista929' },
        ],

        'bolsas-nepal' : [
            { nombre: 'Bolsa bandolera Nepal - Verano en la playa',     descripcion: 'Esta bolsa bandolera "Nepal - Verano en la playa" combina un estilo artesanal con tonos verdes y ocres perfectos para el verano. Cómoda, práctica y con un toque desenfadado, es ideal para llevar tus esenciales a la playa o en tus paseos.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bandoleraVerano.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-bandolera-nepal-verano-en-la-playa303' },
            { nombre: 'Bolsa bandolera Nepal - Azul marino',     descripcion: 'Esta bolsa bandolera "Nepal - Azul marino" destaca por su diseño artesanal de rayas en tonos azules y morados. Cómoda, práctica y con un estilo desenfadado, es el accesorio perfecto para llevar tus esenciales en tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaAzulMarino.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-bandolera-nepal-azul-marino338' },
            { nombre: 'Bolsa bandolera Nepal - Montaña Trek Tan & Verdes',     descripcion: 'Esta bolsa bandolera artesanal, con sus características rayas en burdeos, verde y ocre, es la compañera perfecta para tu día a día o tus aventuras. Su diseño rústico y práctico te ofrece comodidad y estilo sin esfuerzo.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaMontaniaTrekTan.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-bandolera-nepal-montana-trek-tan-verdes335' },
            { nombre: 'Bolsa bandolera Nepal -Prados de primavera Verde y Azul',     descripcion: 'Esta bolsa bandolera destaca por su diseño artesanal con rayas en tonos azul turquesa y verde. Cómoda, práctica y con un estilo fresco y desenfadado, es el accesorio ideal para llevar tus esenciales a la playa, de paseo o en tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaPradosPrimavera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-bandolera-nepal-prados-de-primavera-verde-y-azul249' },
            { nombre: 'Bolso Bandolera Nepal (Correa Ajustable) - Azul de las Profundidades del Mar',     descripcion: 'Esta bolsa bandolera "Nepal - Azul de las Profundidades del Mar" cuenta con un diseño artesanal y correa ajustable. Práctica, cómoda y en tonos azules profundos, es ideal para llevar tus esenciales a diario con un toque desenfadado.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaAzulProfundidades.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-bandolera-nepal-correa-ajustable-azul-de-las-profundidades-del-mar236' },
            { nombre: 'Bolso Bandolera Nepal (Correa Ajustable) - Primavera Meadows Verde y Azul',     descripcion: 'Esta bolsa bandolera "Nepal - Primavera Meadows Verde y Azul" cuenta con un diseño artesanal y correa ajustable. Práctica, cómoda y con rayas en frescos tonos verdes y azules, es ideal para llevar tus esenciales a diario con un toque desenfadado.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaPrimaveraMeadows.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-bandolera-nepal-correa-ajustable-primavera-meadows-verde-y-azul325' },
            { nombre: 'Bolso Bandolera Nepal (Correa Ajustable) - Rojos del atardecer',     descripcion: 'Esta bolsa bandolera "Nepal - Rojos del atardecer" cuenta con un diseño artesanal y correa ajustable. Práctica, cómoda y con rayas en cálidos tonos rojos inspirados en el ocaso, es ideal para llevar tus esenciales a diario con un toque desenfadado.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaRojosAtardecer.png',      url: 'http://ai6mq0-4x.myshopify.com/es/products/bolso-bandolera-nepal-correa-ajustable-rojos-del-atardecer332' },
            { nombre: 'Bolso bandolera Nepal - Flores silvestres',     descripcion: 'Esta bolsa bandolera "Nepal - Flores silvestres" destaca por su estilo artesanal con un diseño inspirado en la naturaleza. Cómoda, práctica y con un toque fresco y desenfadado, es el accesorio ideal para llevar tus esenciales en tu día a día o en tus paseos.',    imagen: 'imagenes/tienda/bolsos/bolsosNepal/bolsaFloresSilvestres.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/nepal-sling-bag-wild-flowers289' },
        ],

        'bolsas-fieltro' : [
            { nombre: 'Bolsa de abejas de fieltro al agua - Un asa con imán - Naranja amanecer',     descripcion: 'Esta bolsa de fieltro al agua "Abejas - Naranja amanecer" cuenta con un diseño artesanal, un asa cómoda y un práctico cierre de imán. Ligera, original y con un vibrante color naranja, es ideal para llevar tus esenciales a diario con un toque alegre y natural.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaNaranja.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-abejas-de-fieltro-al-agua-un-asa-con-iman-naranja-amanecer306' },
            { nombre: 'Bolsa de abejas de fieltro al agua - Un asa con imán - Tonos Verdes',     descripcion: 'Esta bolsa de fieltro al agua "Abejas - Tonos Verdes" cuenta con un diseño artesanal, un asa cómoda y un práctico cierre de imán. Ligera, original y con frescos matices verdes, es ideal para llevar tus esenciales a diario con un toque alegre y natural.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaVerde.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-abejas-de-fieltro-al-agua-un-asa-con-iman-tonos-verdes354' },
            { nombre: 'Bolsa de fieltro para abejas - Un asa con imán - Azul y verde',     descripcion: 'Bolsa artesanal de fieltro con un original diseño de abejas en tonos azul y verde. Ligera, eco-friendly y con un práctico cierre de imán, es perfecta para darle un toque alegre y natural a tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaAzul.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-fieltro-para-abejas-un-asa-con-iman-azul-y-verde190' },
            { nombre: 'Bolso de abejas de fieltro al agua - Un asa con imán - Tonos lavanda',     descripcion: 'Bolsa artesanal de fieltro al agua con un original diseño de abejas en tonos lavanda. Ligera, eco-friendly y con un práctico cierre de imán, es perfecta para darle un toque delicado, relajante y único a tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaLavanda.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-de-abejas-de-fieltro-al-agua-un-asa-con-iman-tonos-lavanda216' },
            { nombre: 'Bolsa de fieltro con forma de árbol y colmena - 35 x 27 cm',     descripcion: 'Bolsa artesanal de fieltro con un original diseño de árbol y colmena en un tamaño de 35 x 27 cm. Ligera, eco-friendly y espaciosa, es perfecta para darle un toque creativo, natural y único a tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaArbolColmena.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-fieltro-con-forma-de-arbol-y-colmena-35-x-27-cm293' },
            { nombre: 'Bolsa de fieltro para jardín de hadas - 35 x 27 cm',     descripcion: 'Bolsa artesanal de fieltro con un encantador diseño de jardín de hadas en un tamaño de 35 x 27 cm. Ligera, eco-friendly y espaciosa, es perfecta para añadir un toque de magia, fantasía y originalidad a tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaJardinHadas.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-fieltro-para-jardin-de-hadas-35-x-27-cm350' },
            { nombre: 'Bolsa de fieltro para jardín de setas - 35 x 27 cm',     descripcion: 'Bolsa artesanal de fieltro con un colorido diseño de jardín de setas en un tamaño de 35 x 27 cm. Ligera, eco-friendly y espaciosa, es perfecta para añadir un toque de bosque, fantasía y originalidad a tu día a día.',    imagen: 'imagenes/tienda/bolsos/bolsasFieltro/bolsaSetas.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-fieltro-para-jardin-de-setas-35-x-27-cm297' },
        ],

        'bolsas-canamo' : [
            { nombre: 'Bolsa de cuerda de cáñamo Tiedye',     descripcion: 'Bolsa artesanal de cuerda de cáñamo con un vibrante y psicodélico diseño *tie-dye*. Súper resistente, ecológica y de espíritu libre, es el accesorio ideal para llevar a la playa, a festivales o para darle un rollazo bohemio y lleno de color a tus días.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaCuerdaTiedye.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-cuerda-de-canamo-tiedye213' },
            { nombre: 'Bolsa de estudio de cáñamo Tiedye con bolsillo frontal',     descripcion: 'Bolsa de estudio artesanal de cáñamo con un vibrante diseño *tie-dye* y un práctico bolsillo frontal para tus imprescindibles. Ecológica, resistente y de estilo bohemio, es perfecta para llevar tus apuntes, libros o portátil a clase con una energía súper libre y original.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaEstudioTiedye.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolsa-de-estudio-de-canamo-tiedye-con-bolsillo-frontal196' },
            { nombre: 'Bolso bandolera de cáñamo teñido con 2 cremalleras y solapa',     descripcion: 'Bolso bandolera de cáñamo con un llamativo diseño teñido, doble cremallera y solapa para mantener todo seguro y organizado. Compacto, ecológico y súper resistente, es el complemento de estilo urbano y alternativo ideal para moverte con comodidad en tus planes diarios.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaBandolera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-bandolera-de-canamo-tenido-con-2-cremalleras-y-solapa187' },
            { nombre: 'Bolso bandolera de cáñamo teñido con 1 cremallera',     descripcion: 'Bolso bandolera de cáñamo con un llamativo diseño teñido y una práctica cremallera principal para un acceso rápido y seguro. Súper ligero, ecológico y de aire alternativo, es el accesorio minimalista ideal para llevar lo justo y moverte con total libertad.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaBandolera1Cremallera.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-bandolera-de-canamo-tenido-con-1-cremallera272' },
            { nombre: 'Mochila grande de cáñamo Tiedye - Mandala',     descripcion: 'Mochila grande de cáñamo con un llamativo estampado *tie-dye* y un diseño central de mandala. Espaciosa, ecológica y muy resistente, es el accesorio perfecto para tus viajes, festivales o el día a día con un estilo bohemio, místico y lleno de energía.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/mochilaMandala.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mochila-grande-de-canamo-tiedye-mandala275' },
            { nombre: 'Mochila mediana de cáñamo Tiedye - 7 chakras',     descripcion: 'Mochila mediana de cáñamo con un colorido estampado *tie-dye* y los símbolos de los 7 chakras. Cómoda, ecológica y resistente, es perfecta para tu rutina con un estilo espiritual, alternativo y lleno de buena energía.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/mochilaChakras.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mochila-mediana-de-canamo-tiedye-7-chakras206' },
            { nombre: 'Mochila mediana de cáñamo Tiedye sin estampado',     descripcion: 'Mochila mediana de cáñamo con un colorido estampado *tie-dye* sin dibujos añadidos. Cómoda, ecológica y compacta, es ideal para tu día a día si buscas un diseño alternativo y vibrante que deje todo el protagonismo a los matices del teñido.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/mochilaSinEstampado.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mochila-mediana-de-canamo-tiedye-sin-estampado255' },
            { nombre: 'Mochila enrollable Trekking de cáñamo - Salvia',     descripcion: 'Mochila de trekking enrollable en cáñamo verde salvia. Duradera, ecológica y con capacidad adaptable, es ideal para tus aventuras o el día a día con un estilo sostenible y aventurero.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/mochilaSalvia.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/mochila-enrollable-trekking-de-canamo-salvia281' },
            { nombre: 'Bolso para Portátil Soft Banjar - Rosa',     descripcion: 'Bolso para portátil acolchado con el exótico diseño de la tela *Soft Banjar* en un vibrante tono rosa. Ligero, suave y con un estilo étnico inconfundible, es ideal para proteger tu tecnología con un toque chic, alegre y lleno de personalidad vayas donde vayas.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaPortatil.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-para-portatil-soft-banjar-rosa319' },
            { nombre: 'Bolso para Portátil Soft Banjar - Elegante Oscuro',     descripcion: 'Bolso para portátil acolchado con el exótico diseño de la tela *Soft Banjar* en un sofisticado tono elegante oscuro. Combina una protección suave y ligera para tu tecnología con un estilo étnico sobrio, refinado y lleno de personalidad para tu entorno profesional o diario.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bolsaPortatilOscuro.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-para-portatil-soft-banjar-elegante-oscuro285' },
            { nombre: 'Riñonera de cáñamo Tiedye',     descripcion: 'Riñonera de cáñamo con un vibrante estampado *tie-dye*. Cómoda, ecológica y compacta, es el accesorio de estilo alternativo ideal para llevar tus imprescindibles con total libertad y un toque de color único en tu día a día o festivales.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bandoleraNormal.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/rinonera-de-canamo-tiedye223' },
            { nombre: 'Bolso Tipo Cinturón de Estilo Cáñamo y Algodón (o Riñonera) - Azul',     descripcion: 'Riñonera artesanal de cáñamo y algodón en color azul. Cómoda, resistente y ecológica, es el accesorio de estilo bohemio ideal para llevar tus imprescindibles con total libertad en tu día a día o festivales.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bandoleraAzul.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-tipo-cinturon-de-estilo-canamo-y-algodon-o-rinonera-azul269' },
            { nombre: 'Bolso Tipo Cinturón de Estilo Cáñamo y Algodón (o Riñonera) - Salvia',     descripcion: 'Riñonera artesanal de cáñamo y algodón en un tono verde salvia. Cómoda, resistente y ecológica, es el accesorio de estilo bohemio ideal para llevar tus imprescindibles con total libertad en tu día a día o festivales..',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bandoleraSalvia.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-tipo-cinturon-de-estilo-canamo-y-algodon-o-rinonera-salvia245' },
            { nombre: 'Bolso Tipo Cinturón de Estilo Cáñamo y Algodón (o Riñonera) - Vino',     descripcion: 'Riñonera artesanal de cáñamo y algodón en un profundo tono rojo vino. Cómoda, resistente y ecológica, es el accesorio de estilo bohemio ideal para llevar tus imprescindibles con total libertad en tu día a día o festivales.',    imagen: 'imagenes/tienda/bolsos/bolsasCanamo/bandoleraVino.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-tipo-cinturon-de-estilo-canamo-y-algodon-o-rinonera-vino278' },
        ],

        'bolsas-flecos' : [
            { nombre: 'Bolso con flecos - Estampado de Elefante',     descripcion: 'Bolso de hombro con flecos y un original estampado de elefantes. De aire desenfadado y bohemio, combina el movimiento de sus flecos con un diseño étnico encantador, siendo el complemento perfecto para darle un toque divertido y único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsaElefantes.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-con-flecos-estampado-de-elefante312' },
            { nombre: 'Bolso con flecos - Hamsa',     descripcion: 'Bolso con flecos y el místico símbolo de la mano de Hamsa. De aire bohemio y protector, es el complemento perfecto para añadir personalidad y un toque espiritual único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsoHamsa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-con-flecos-hamsa265' },
            { nombre: 'Bolso con flecos - Bordado De Patrón De Verano',     descripcion: 'Bolso con flecos decorado con un fresco y colorido bordado de patrón de verano. De aire bohemio y desenfadado, es el accesorio ideal para aportar frescura, movimiento y un toque artesanal y vibrante a tus looks en los días más soleados.',    imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsoPatronVerano.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-con-flecos-bordado-de-patron-de-verano328' },
            { nombre: 'Bolso con flecos - Bordado Elefante',     descripcion: 'Bolso con flecos decorado con un detallado bordado de elefante. De aire bohemio y artesanal, combina el movimiento de sus flecos con la esencia étnica de su diseño, siendo ideal para añadir textura, personalidad y un toque único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsoBordadoElefante.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-con-flecos-bordado-elefante341' },
            { nombre: 'Bolso con flecos - Bordado Mandela',     descripcion: 'Bolso con flecos decorado con un detallado bordado de mandala. De aire bohemio y espiritual, combina el movimiento de sus flecos con un diseño místico y simétrico, siendo el accesorio ideal para aportar armonía, textura y un toque artístico a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsasFlecos/bolsoMandala.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-con-flecos-bordado-mandela226' },
        ],

        'bolsos-etnicos' : [
            { nombre: 'Bolso Étnico Estilo Hippie - Arena / paz',     descripcion: 'Bolso étnico de estilo hippie en tono arena con el clásico símbolo de la paz. Cómodo, ligero y de aire desenfadado, es el accesorio ideal para quienes buscan un look relajado, bohemio y con un mensaje positivo en su día a día.',    imagen: 'imagenes/tienda/bolsos/bolsosEtnicos/bolsoPeace.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-etnico-estilo-hippie-arena-paz200' },
            { nombre: 'Bolso Étnico Estilo Hippie - Chocolate / Elefante',     descripcion: 'Bolso étnico de estilo hippie en tono chocolate con un encantador diseño de elefante. De aire rústico, relajado y bohemio, es un accesorio cómodo y con personalidad, ideal para llevar tus esenciales diarios con un toque de esencia artesanal y mística.',    imagen: 'imagenes/tienda/bolsos/bolsosEtnicos/bolsoChocolateElefante.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-etnico-estilo-hippie-chocolate-elefante322' },
            { nombre: 'Bolso Étnico Estilo Hippie - Púrpura / espiral',     descripcion: 'Bolso étnico de estilo hippie en tono púrpura con un llamativo diseño de espiral. De aire psicodélico, relajado y bohemio, es un accesorio vibrante y cómodo, ideal para llenar de color, energía y magnetismo tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsosEtnicos/bolsoEspiral.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-etnico-estilo-hippie-purpura-espiral252' },
            { nombre: 'Bolso Étnico Estilo Hippie - Teal / Om',     descripcion: 'Bolso étnico de estilo hippie en tono *teal* (azul verdoso) con el sagrado símbolo del Om. De aire sereno, místico y bohemio, es un accesorio cómodo y relajado, ideal para aportar un toque de paz, espiritualidad y un color vibrante a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsosEtnicos/bolsoOm.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-etnico-estilo-hippie-teal-om232' },
        ],

        'bolsas-jacquard' : [
            { nombre: 'Bolso Jacquard - Bolso Estudiantil Rosa',     descripcion: 'Bolso estudiantil de tejido jacquard en tonos rosas. Con un diseño resistente, espacioso y de aire bohemio-urbano, es el accesorio ideal para llevar tus cuadernos o esenciales del día a día con total comodidad y un toque de estilo retro, alegre y juvenil.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/bolsoEstudiantilRosa.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-jacquard-bolso-estudiantil-rosa242' },
            { nombre: 'Bolso Jacquard - Bolso Estudiantil Verde Azulado',     descripcion: 'Bolso estudiantil de tejido jacquard en un atractivo tono verde azulado. Con un diseño resistente, espacioso y de aire bohemio-urbano, es el accesorio ideal para llevar tus cuadernos o esenciales del día a día con total comodidad y un toque de estilo retro, fresco y versátil.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/bolsoEstudiantilVerdeAzulado.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-jacquard-bolso-estudiantil-verde-azulado300' },
            { nombre: 'Tejido Jacquard - Mochila peq. Rosada',     descripcion: 'Mochila pequeña de tejido jacquard en tonos rosados. Compacta, resistente y de aire bohemio, es el accesorio ideal para moverte con total libertad en tu día a día, aportando un toque sutil de color, estilo retro y practicidad a tus looks más casuales.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/mochilaPeqRosada.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/tejido-jacquard-mochila-peq-rosada259' },
            { nombre: 'Tejido Jacquard - Mochila peq. Teal',     descripcion: 'Mochila pequeña de tejido jacquard en un vibrante tono *teal* (azul verdoso). Compacta, resistente y de aire bohemio, es el accesorio ideal para moverte con total libertad en tu día a día, aportando frescura, practicidad y un toque de estilo retro a tus looks más casuales.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/mochilaPeqTeal.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/tejido-jacquard-mochila-peq-teal316' },
            { nombre: 'Tejido Jacquard - Mochila Rosada Grande',     descripcion: 'Mochila pequeña de tejido jacquard en un vibrante tono *teal* (azul verdoso). Compacta, resistente y de aire bohemio, es el accesorio ideal para moverte con total libertad en tu día a día, aportando frescura, practicidad y un toque de estilo retro a tus looks más casuales.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/mochilaRosada.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/tejido-jacquard-mochila-rosada229' },
            { nombre: 'Tejido Jacquard - Mochila Teal Grande',     descripcion: 'Mochila pequeña de tejido jacquard en un vibrante tono *teal* (azul verdoso). Compacta, resistente y de aire bohemio, es el accesorio ideal para moverte con total libertad en tu día a día, aportando frescura, practicidad y un toque de estilo retro a tus looks más casuales.',    imagen: 'imagenes/tienda/bolsos/bolsosJacquard/mochilaTeal.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/tejido-jacquard-mochila-teal309' },
        ],

        'bolsos-asa-piel' : [
            { nombre: 'Bolso Natural Asa de Piel - Flor de la Vida',     descripcion: 'Bolso natural con asas de piel y el símbolo de la Flor de la Vida. De aire orgánico, místico y elegante, es el accesorio ideal para aportar armonía, resistencia y un toque espiritual único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsosAsaPiel/bolsoFlorVida.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-natural-asa-de-piel-flor-de-la-vida344' },
            { nombre: 'Bolso Natural Asa de Piel - Inspiración',     descripcion: 'Bolso natural con asas de piel y un diseño de libre inspiración. De aire orgánico, artesanal y elegante, es el accesorio ideal para aportar calidez, resistencia y un toque de originalidad único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsosAsaPiel/bolsoInspiracion.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-natural-asa-de-piel-inspiracion347' },
            { nombre: 'Bolso Natural Asa de piel - Mandela',     descripcion: 'Bolso natural con asas de piel y un detallado diseño de mandala. De aire orgánico, espiritual y elegante, es el accesorio ideal para aportar armonía, resistencia y un toque artístico único a tus looks diarios.',    imagen: 'imagenes/tienda/bolsos/bolsosAsaPiel/bolsoMandala.png',      url: 'https://ai6mq0-4x.myshopify.com/es/products/bolso-natural-asa-de-piel-mandela209' },
        ],
    };

    /* ESTADO  */
    var nav = { nivel: 'categorias', cat: null, sub: null, subsub: null };

    /* HELPERS  */

    /* Muestra una vista y oculta las otras */
    function mostrarVista(id) {
        ['view-categorias', 'view-secundario', 'view-terciario', 'view-productos'].forEach(function (v) {
            document.getElementById(v).style.display = v === id ? '' : 'none';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* Genera el HTML de una tarjeta de categoría o subcategoría */
    function tarjetaHtml(item, fnClick) {
        var img = item.imagen
            ? '<img src="' + item.imagen + '" alt="' + item.nombre + '" loading="lazy">'
            : '<div class="categoria-placeholder"></div>';
        return '<div class="categoria-card" onclick="' + fnClick + '(\'' + item.id + '\')" role="button" tabindex="0">'
                + '<div class="categoria-img-wrap">' + img + '</div>'
                + '<div class="categoria-info">'
                + '<h3 class="categoria-nombre">' + item.nombre + '</h3>'
                + '<p class="categoria-desc">' + item.descripcion + '</p>'
                + '<span class="btn-ver-todos">Ver todos</span>'
                + '</div></div>';
    }

    /* Mensaje cuando una sección aún no tiene contenido */
    function proximamente() {
        return '<div class="pronto-contenedor">'
                + '<span class="pronto-icono">✨</span>'
                + '<h3>¡Próximamente!</h3>'
                + '<p>Estamos preparando esta sección con mucho amor. Vuelve pronto.</p>'
                + '</div>';
    }

    /* Genera el HTML de la lista de productos y muestra la vista final */
    function renderProductos(nombre, lista) {
        document.getElementById('productos-title').textContent = nombre + (lista.length ? ' (' + lista.length + ')' : '');
        document.getElementById('productos-grid').innerHTML = lista.length
            ? lista.map(function (p) {
                var img = p.imagen
                    ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy">'
                    : '<div class="producto-placeholder"></div>';
                var btn = p.url
                    ? '<a href="' + p.url + '" target="_blank" class="btn-comprar-tienda">Comprar</a>'
                    : '';
                return '<article class="producto-tienda-card">'
                        + '<div class="producto-img-wrap">' + img + '</div>'
                        + '<div class="producto-tienda-info">'
                        + '<h3 class="producto-tienda-nombre">' + p.nombre + '</h3>'
                        + '<p class="producto-tienda-desc">' + p.descripcion + '</p>'
                        + btn
                        + '</div></article>';
                }).join('')
            : proximamente();
        mostrarVista('view-productos');
    }

    /* NAVEGACIÓN */

    /* Vista inicial: todas las categorías */
    document.getElementById('categorias-grid').innerHTML =
        CATEGORIAS.map(function (c) { return tarjetaHtml(c, 'navegarACategoria'); }).join('');

    /* Nivel 1 → subcategorías de una categoría */
    window.navegarACategoria = function (idCat) {
        var cat = CATEGORIAS.find(function (c) { return c.id === idCat; });
        if (!cat) return;
        nav.cat   = cat;
        nav.sub   = null;
        nav.nivel = 'subcategorias';
        document.getElementById('section-title').textContent = cat.nombre;
        document.getElementById('secundario-grid').innerHTML = (cat.subcategorias && cat.subcategorias.length)
            ? cat.subcategorias.map(function (s) { return tarjetaHtml(s, 'navegarASubcategoria'); }).join('')
            : proximamente();
        mostrarVista('view-secundario');
    };

    /* Nivel 2 → sub-subcategorías (si existen) o productos de una subcategoría */
    window.navegarASubcategoria = function (idSub) {
        var sub = nav.cat && nav.cat.subcategorias && nav.cat.subcategorias.find(function (s) { return s.id === idSub; });
        if (!sub) return;
        nav.sub    = sub;
        nav.subsub = null;

        if (sub.subcategorias && sub.subcategorias.length) {
            nav.nivel = 'subsubcategorias';
            document.getElementById('terciario-title').textContent = sub.nombre;
            document.getElementById('terciario-grid').innerHTML =
                sub.subcategorias.map(function (ss) { return tarjetaHtml(ss, 'navegarASubSubcategoria'); }).join('');
            mostrarVista('view-terciario');
            return;
        }

        nav.nivel = 'productos';
        renderProductos(sub.nombre, PRODUCTOS[idSub] || []);
    };

    /* Nivel 3 → productos de una sub-subcategoría */
    window.navegarASubSubcategoria = function (idSubSub) {
        var subsub = nav.sub && nav.sub.subcategorias && nav.sub.subcategorias.find(function (s) { return s.id === idSubSub; });
        if (!subsub) return;
        nav.subsub = subsub;
        nav.nivel  = 'productos';
        renderProductos(subsub.nombre, PRODUCTOS[idSubSub] || []);
    };

    /* Volver a la vista de todas las categorías */
    window.irATienda = function () {
        nav = { nivel: 'categorias', cat: null, sub: null, subsub: null };
        mostrarVista('view-categorias');
    };

    /* Volver a las subcategorías de la categoría actual */
    window.irACategoria = function () {
        if (nav.cat) window.navegarACategoria(nav.cat.id);
    };

    /* Volver a las sub-subcategorías de la subcategoría actual */
    window.irASubcategoria = function () {
        if (nav.sub) window.navegarASubcategoria(nav.sub.id);
    };

    document.getElementById('btn-volver').addEventListener('click',   window.irATienda);
    document.getElementById('btn-volver-3').addEventListener('click', window.irACategoria);
    document.getElementById('btn-volver-2').addEventListener('click', function () {
        if (nav.subsub) window.irASubcategoria();
        else window.irACategoria();
    });
});