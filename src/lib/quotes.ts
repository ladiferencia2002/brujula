export type Category = "biblia" | "estoico" | "mafia" | "cine";

export type Quote = {
  id: string;
  cat: Category;
  text: string;
  source: string;
};

export const CATEGORY_META: Record<Category, { label: string; emoji: string; badge: string }> = {
  biblia: { label: "Biblia", emoji: "✝️", badge: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  estoico: { label: "Estoicos", emoji: "🏛️", badge: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  mafia: { label: "Mafia", emoji: "🕴️", badge: "bg-red-500/15 text-red-300 border-red-500/30" },
  cine: { label: "Cine", emoji: "🎬", badge: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
};

// Los ids se derivan del orden: añade frases nuevas SIEMPRE al final de cada lista
// para no descolocar los favoritos ya guardados.
type Raw = [text: string, source: string];

const BIBLIA: Raw[] = [
  ["Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", "Josué 1:9"],
  ["Todo lo puedo en Cristo que me fortalece.", "Filipenses 4:13"],
  ["Jehová es mi pastor; nada me faltará.", "Salmos 23:1"],
  ["No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré.", "Isaías 41:10"],
  ["Fíate de Jehová de todo tu corazón, y no te apoyes en tu propio entendimiento. Reconócelo en todos tus caminos, y él enderezará tus veredas.", "Proverbios 3:5-6"],
  ["Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", "Jeremías 29:11"],
  ["Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", "Romanos 8:28"],
  ["Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.", "Salmos 46:1"],
  ["No os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.", "Mateo 6:34"],
  ["Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", "Mateo 11:28"],
  ["Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra.", "Salmos 121:1-2"],
  ["Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.", "Proverbios 16:3"],
  ["Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.", "Isaías 40:31"],
  ["Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?", "Salmos 27:1"],
  ["Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.", "2 Timoteo 1:7"],
  ["Hierro con hierro se aguza; y así el hombre aguza el rostro de su amigo.", "Proverbios 27:17"],
  ["Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.", "Eclesiastés 3:1"],
  ["Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.", "Salmos 37:4"],
  ["Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.", "Salmos 34:18"],
  ["No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.", "Romanos 12:2"],
  ["Velad, estad firmes en la fe; portaos varonilmente, y esforzaos.", "1 Corintios 16:13"],
  ["Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.", "Proverbios 4:23"],
  ["Si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.", "Santiago 1:5"],
  ["No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.", "Gálatas 6:9"],
  ["Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.", "Salmos 118:24"],
  ["Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.", "Lamentaciones 3:22-23"],
  ["El que anda con sabios, sabio será; mas el compañero de los necios será quebrantado.", "Proverbios 13:20"],
  ["En paz me acostaré, y asimismo dormiré; porque solo tú, Jehová, me haces vivir confiado.", "Salmos 4:8"],
  ["El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.", "Salmos 91:1"],
  ["La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.", "Juan 14:27"],
  ["Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras.", "Mateo 5:16"],
  ["Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.", "Proverbios 18:10"],
  ["Por la noche durará el lloro, y a la mañana vendrá la alegría.", "Salmos 30:5"],
  ["Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.", "Filipenses 4:6-7"],
  ["La mano de los diligentes gobernará; mas la negligencia será tributaria.", "Proverbios 12:24"],
  ["Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.", "Colosenses 3:23"],
  ["Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.", "Mateo 7:7"],
  ["Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo, porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.", "Deuteronomio 31:6"],
  ["En Dios solamente está acallada mi alma; de él viene mi salvación.", "Salmos 62:1"],
  ["La tribulación produce paciencia; y la paciencia, prueba; y la prueba, esperanza.", "Romanos 5:3-4"],
  ["La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.", "Proverbios 15:1"],
  ["Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría.", "Salmos 90:12"],
  ["Buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", "Mateo 6:33"],
  ["Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", "Hebreos 11:1"],
  ["Mejores son dos que uno, porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero.", "Eclesiastés 4:9-10"],
  ["Mejor es el que tarda en airarse que el fuerte; y el que se enseñorea de su espíritu, que el que toma una ciudad.", "Proverbios 16:32"],
  ["Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.", "Isaías 26:3"],
  ["Echad toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", "1 Pedro 5:7"],
  ["Muchos pensamientos hay en el corazón del hombre; mas el consejo de Jehová permanecerá.", "Proverbios 19:21"],
];

const ESTOICO: Raw[] = [
  ["Si algo externo te angustia, no es esa cosa la que te perturba, sino tu juicio sobre ella. Y ese juicio está en tu mano borrarlo.", "Marco Aurelio · Meditaciones VIII, 47"],
  ["Lo que se interpone en el camino se convierte en el camino.", "Marco Aurelio · Meditaciones V, 20"],
  ["Al amanecer, cuando te cueste levantarte, piensa: me despierto para hacer el trabajo de un ser humano.", "Marco Aurelio · Meditaciones V, 1"],
  ["Ya no pierdas más tiempo discutiendo cómo debe ser un buen hombre. Sé uno.", "Marco Aurelio · Meditaciones X, 16"],
  ["La mejor venganza es no parecerte a quien te hizo daño.", "Marco Aurelio · Meditaciones VI, 6"],
  ["Puedes dejar la vida en este mismo instante. Que eso determine lo que haces, dices y piensas.", "Marco Aurelio · Meditaciones II, 11"],
  ["Tu alma toma el color de tus pensamientos.", "Marco Aurelio · Meditaciones V, 16"],
  ["Sé como el promontorio contra el que las olas rompen sin cesar: permanece firme, y a su alrededor el agua embravecida se calma.", "Marco Aurelio · Meditaciones IV, 49"],
  ["Si no es correcto, no lo hagas; si no es verdad, no lo digas.", "Marco Aurelio · Meditaciones XII, 17"],
  ["Nada le ocurre a nadie que no esté hecho para soportar.", "Marco Aurelio · Meditaciones V, 18"],
  ["Muy poco hace falta para tener una vida feliz; todo está dentro de ti, en tu manera de pensar.", "Marco Aurelio · Meditaciones VII, 67"],
  ["Empieza el día recordando que te cruzarás con gente entrometida, ingrata y arrogante. Ninguno de ellos puede dañarte de verdad.", "Marco Aurelio · Meditaciones II, 1"],
  ["Acepta lo que el destino te trae y ama a las personas con las que te reúne, pero hazlo con todo el corazón.", "Marco Aurelio · Meditaciones VI, 39"],
  ["Haz lo que tienes entre manos con seriedad exacta, sin fingimiento, con afecto y con justicia.", "Marco Aurelio · Meditaciones II, 5"],
  ["No malgastes lo que te queda de vida imaginando lo que hacen los demás.", "Marco Aurelio · Meditaciones III, 4"],
  ["Sufrimos más a menudo en la imaginación que en la realidad.", "Séneca · Cartas a Lucilio, 13"],
  ["No es que tengamos poco tiempo, sino que perdemos mucho.", "Séneca · Sobre la brevedad de la vida, 1"],
  ["Mientras aplazamos la vida, ella se va.", "Séneca · Cartas a Lucilio, 1"],
  ["Nadie es más desdichado que quien nunca ha conocido la adversidad: no ha tenido ocasión de ponerse a prueba.", "Séneca · Sobre la providencia"],
  ["Las dificultades fortalecen la mente, como el trabajo fortalece el cuerpo.", "Séneca"],
  ["Ningún viento es favorable para quien no sabe a qué puerto se dirige.", "Séneca · Cartas a Lucilio, 71"],
  ["Ordena tu vida cada día como si fuera la última: quien da a diario su toque final no carece de tiempo.", "Séneca · Cartas a Lucilio, 101"],
  ["Si sabes usarla, la vida es larga.", "Séneca · Sobre la brevedad de la vida, 2"],
  ["El mayor remedio contra la ira es la demora.", "Séneca · Sobre la ira, II, 29"],
  ["Quien está en todas partes no está en ninguna.", "Séneca · Cartas a Lucilio, 2"],
  ["Largo es el camino de los preceptos; breve y eficaz el de los ejemplos.", "Séneca · Cartas a Lucilio, 6"],
  ["Vivir, Lucilio, es luchar.", "Séneca · Cartas a Lucilio, 96"],
  ["Nada es nuestro, excepto el tiempo.", "Séneca · Cartas a Lucilio, 1"],
  ["No son las cosas las que perturban a las personas, sino los juicios que hacen sobre ellas.", "Epicteto · Enquiridión, 5"],
  ["Hay cosas que dependen de nosotros y cosas que no dependen de nosotros.", "Epicteto · Enquiridión, 1"],
  ["Nada grande se crea de repente, ni siquiera la uva o el higo. Si me dices que quieres un higo, te respondo: hace falta tiempo.", "Epicteto · Disertaciones I, 15"],
  ["Primero dite a ti mismo lo que quieres ser; después haz lo que tengas que hacer.", "Epicteto · Disertaciones III, 23"],
  ["No pidas que las cosas ocurran como quieres; quiere que ocurran como ocurren, y serás feliz.", "Epicteto · Enquiridión, 8"],
  ["Cuando alguien te ofende, recuerda que es tu opinión la que te ofende, no él.", "Epicteto · Enquiridión, 20"],
  ["Nunca digas de nada «lo he perdido», sino «lo he devuelto».", "Epicteto · Enquiridión, 11"],
  ["Las circunstancias no hacen al hombre: lo muestran.", "Epicteto"],
  ["Toda capacidad se fortalece con la práctica: si quieres ser buen corredor, corre.", "Epicteto · Disertaciones"],
];

const MAFIA: Raw[] = [
  ["Voy a hacerle una oferta que no podrá rechazar.", "El Padrino (1972) · Vito Corleone"],
  ["Un hombre que no dedica tiempo a su familia nunca será un hombre de verdad.", "El Padrino (1972) · Vito Corleone"],
  ["Nunca dejes que alguien ajeno a la familia sepa lo que piensas.", "El Padrino (1972) · Vito Corleone"],
  ["Un abogado con su maletín puede robar más que cien hombres con pistolas.", "El Padrino (1972) · Vito Corleone"],
  ["¡Actúa como un hombre!", "El Padrino (1972) · Vito Corleone"],
  ["No es personal, Sonny. Es estrictamente de negocios.", "El Padrino (1972) · Michael Corleone"],
  ["Algún día, y ese día puede que nunca llegue, te pediré que me hagas un favor.", "El Padrino (1972) · Vito Corleone"],
  ["Deja el arma. Llévate los cannoli.", "El Padrino (1972) · Clemenza"],
  ["Creo en América.", "El Padrino (1972) · Bonasera"],
  ["Nunca te pongas del lado de alguien contra la familia.", "El Padrino (1972) · Vito Corleone"],
  ["Mantén cerca a tus amigos, y aún más cerca a tus enemigos.", "El Padrino II (1974) · Michael Corleone"],
  ["Esta es la vida que hemos elegido.", "El Padrino II (1974) · Hyman Roth"],
  ["Sé que fuiste tú, Fredo. Me rompiste el corazón.", "El Padrino II (1974) · Michael Corleone"],
  ["Nunca odies a tus enemigos: afecta a tu juicio.", "El Padrino III (1990) · Michael Corleone"],
  ["Justo cuando creía que estaba fuera, me vuelven a meter dentro.", "El Padrino III (1990) · Michael Corleone"],
  ["Desde que tengo memoria, siempre quise ser un gánster.", "Goodfellas (1990) · Henry Hill"],
  ["Para mí, ser gánster era mejor que ser presidente de los Estados Unidos.", "Goodfellas (1990) · Henry Hill"],
  ["Nunca delates a tus amigos y mantén siempre la boca cerrada.", "Goodfellas (1990) · Jimmy Conway"],
  ["El mundo es tuyo.", "Scarface (1983)"],
  ["Siempre digo la verdad, incluso cuando miento.", "Scarface (1983) · Tony Montana"],
  ["Cuando amas a alguien, tienes que confiar en esa persona. No hay otra manera.", "Casino (1995) · Ace Rothstein"],
  ["Lo más triste de la vida es el talento desperdiciado.", "Una historia del Bronx (1993) · Sonny"],
  ["Las decisiones que tomes moldearán tu vida para siempre.", "Una historia del Bronx (1993) · Calogero"],
  ["No quiero ser producto de mi entorno. Quiero que mi entorno sea producto mío.", "Los infiltrados (2006) · Frank Costello"],
  ["Cuando decides ser algo, puedes serlo. Eso no te lo dicen en la iglesia.", "Los infiltrados (2006) · Frank Costello"],
  ["El más ruidoso de la sala es el más débil de la sala.", "American Gangster (2007) · Frank Lucas"],
  ["—¿Qué hiciste todos estos años? —Me acosté temprano.", "Érase una vez en América (1984) · Noodles"],
];

const CINE: Raw[] = [
  ["Lo que hacemos en la vida tiene su eco en la eternidad.", "Gladiator (2000) · Máximo"],
  ["Fuerza y honor.", "Gladiator (2000) · Máximo"],
  ["No importa lo fuerte que golpees, sino lo fuerte que te golpean y sigues avanzando. Lo que puedes soportar y seguir adelante.", "Rocky Balboa (2006)"],
  ["Ni tú, ni yo, ni nadie golpeará tan fuerte como lo hace la vida.", "Rocky Balboa (2006)"],
  ["El pasado puede doler, pero tal como yo lo veo, puedes huir de él o aprender de él.", "El rey león (1994) · Rafiki"],
  ["La vida es como una caja de bombones: nunca sabes cuál te va a tocar.", "Forrest Gump (1994)"],
  ["Tonto es el que hace tonterías.", "Forrest Gump (1994)"],
  ["La esperanza es algo bueno, quizá lo mejor que hay, y las cosas buenas nunca mueren.", "Cadena perpetua (1994) · Andy Dufresne"],
  ["Ocúpate de vivir o ocúpate de morir.", "Cadena perpetua (1994) · Andy Dufresne"],
  ["Una cosa es conocer el camino, y otra muy distinta recorrerlo.", "Matrix (1999) · Morfeo"],
  ["Lo que posees termina poseyéndote.", "El club de la lucha (1999)"],
  ["Solo cuando lo pierdes todo eres libre para hacer cualquier cosa.", "El club de la lucha (1999)"],
  ["¿Por qué nos caemos, Bruce? Para aprender a levantarnos.", "Batman Begins (2005) · Thomas Wayne"],
  ["O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.", "El caballero oscuro (2008) · Harvey Dent"],
  ["El amor es lo único capaz de trascender el tiempo y el espacio.", "Interstellar (2014)"],
  ["Carpe diem. Aprovechad el día, muchachos: haced extraordinarias vuestras vidas.", "El club de los poetas muertos (1989) · Sr. Keating"],
  ["Siempre hay que mirar las cosas desde otro punto de vista.", "El club de los poetas muertos (1989) · Sr. Keating"],
  ["Todo lo que tenemos que decidir es qué hacer con el tiempo que se nos ha dado.", "El Señor de los Anillos: La Comunidad del Anillo (2001) · Gandalf"],
  ["Hasta la persona más pequeña puede cambiar el curso del futuro.", "El Señor de los Anillos: La Comunidad del Anillo (2001) · Galadriel"],
  ["Ayer es historia, mañana es un misterio, pero hoy es un regalo; por eso se llama presente.", "Kung Fu Panda (2008) · Oogway"],
  ["Tu mente es como esta agua, amigo mío: cuando se agita, cuesta ver; pero si la dejas calmarse, la respuesta se vuelve clara.", "Kung Fu Panda (2008) · Oogway"],
  ["No cualquiera puede convertirse en un gran artista, pero un gran artista puede surgir de cualquier parte.", "Ratatouille (2007) · Gusteau"],
  ["Todos los hombres mueren, pero no todos los hombres viven de verdad.", "Braveheart (1995) · William Wallace"],
  ["No hay malos alumnos, solo malos maestros.", "Karate Kid (1984) · Sr. Miyagi"],
  ["Un gran poder conlleva una gran responsabilidad.", "Spider-Man (2002) · Tío Ben"],
  ["Hazlo, o no lo hagas, pero no lo intentes.", "El Imperio contraataca (1980) · Yoda"],
  ["Nunca dejes que nadie te diga que no puedes hacer algo. Si tienes un sueño, tienes que protegerlo.", "En busca de la felicidad (2006) · Chris Gardner"],
  ["Por si no nos vemos luego: buenos días, buenas tardes y buenas noches.", "El show de Truman (1998) · Truman"],
  ["Ver el mundo, superar obstáculos, acercarse, conocerse y sentir: ese es el propósito de la vida.", "La vida secreta de Walter Mitty (2013)"],
  ["La felicidad solo es real cuando se comparte.", "Hacia rutas salvajes (2007) · Christopher McCandless"],
  ["La aventura está ahí afuera.", "Up (2009) · Carl"],
  ["Sigue nadando.", "Buscando a Nemo (2003) · Dory"],
  ["Detrás de esta máscara hay más que carne: hay una idea, y las ideas son a prueba de balas.", "V de Vendetta (2005) · V"],
  ["Hasta el infinito, ¡y más allá!", "Toy Story (1995) · Buzz Lightyear"],
  ["El miedo lleva a la ira, la ira lleva al odio, el odio lleva al sufrimiento.", "La amenaza fantasma (1999) · Yoda"],
];

function build(cat: Category, raw: Raw[]): Quote[] {
  return raw.map(([text, source], i) => ({ id: `${cat}-${i + 1}`, cat, text, source }));
}

export const QUOTES_BY_CATEGORY: Record<Category, Quote[]> = {
  biblia: build("biblia", BIBLIA),
  estoico: build("estoico", ESTOICO),
  mafia: build("mafia", MAFIA),
  cine: build("cine", CINE),
};

export const ALL_QUOTES: Quote[] = [
  ...QUOTES_BY_CATEGORY.biblia,
  ...QUOTES_BY_CATEGORY.estoico,
  ...QUOTES_BY_CATEGORY.mafia,
  ...QUOTES_BY_CATEGORY.cine,
];

const BY_ID = new Map(ALL_QUOTES.map((q) => [q.id, q]));

export function quoteById(id: string): Quote | undefined {
  return BY_ID.get(id);
}
