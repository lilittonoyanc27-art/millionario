import { QuestionItem, NumberBonusItem } from './types';

export const PRIZE_LADDER: string[] = [
  '500 ֏',
  '1,000 ֏',
  '2,000 ֏',
  '3,000 ֏',
  '5,000 ֏', // Milestone 1
  '10,000 ֏',
  '20,000 ֏',
  '40,000 ֏',
  '75,000 ֏',
  '125,000 ֏', // Milestone 2
  '175,000 ֏',
  '250,000 ֏',
  '350,000 ֏',
  '450,000 ֏',
  '500,000 ֏', // Milestone 3
  '600,000 ֏',
  '700,000 ֏',
  '800,000 ֏',
  '900,000 ֏',
  '1,000,000 ֏', // Grand Prize!
];

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    prizeMoney: '500 ֏',
    esDialog: {
      speaker1: '— El profesor ha dicho que mañana tenemos que entregar el trabajo de Historia.',
      speaker2: '— Sí, pero todavía no he terminado la última parte. Esta tarde voy a ________ la conclusión y revisar las faltas.',
    },
    hyDialog: {
      speaker1: '— Ուսուցիչն ասել է, որ վաղը պետք է հանձնենք պատմության աշխատանքը։',
      speaker2: '— Այո, բայց ես դեռ վերջին մասը չեմ ավարտել։ Այսօր երեկոյան պատրաստվում եմ գրել եզրակացությունը և ստուգել սխալները։',
    },
    options: [
      { key: 'a', es: 'escribir', hy: 'գրել', isCorrect: true },
      { key: 'b', es: 'escribo', hy: 'գրում եմ', isCorrect: false },
      { key: 'c', es: 'escribió', hy: 'գրեց', isCorrect: false },
      { key: 'd', es: 'escribiré', hy: 'կգրեմ', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«Voy a + infinitive» կառուցվածքից հետո օգտագործվում է բայի անորոշ ձևը (escribir):',
  },
  {
    id: 2,
    prizeMoney: '1,000 ֏',
    esDialog: {
      speaker1: '— No entiendo este problema de Matemáticas.',
      speaker2: '— Yo tampoco lo entendía al principio, pero el profesor lo ha explicado otra vez. Si quieres, te ________ cómo se hace.',
    },
    hyDialog: {
      speaker1: '— Ես չեմ հասկանում այս մաթեմատիկական խնդիրը։',
      speaker2: '— Ես էլ սկզբում չէի հասկանում, բայց ուսուցիչը նորից բացատրեց։ Եթե ուզում ես, քեզ ցույց կտամ՝ ինչպես է դա արվում։',
    },
    options: [
      { key: 'a', es: 'enseño', hy: 'ցույց եմ տալիս', isCorrect: true },
      { key: 'b', es: 'enseñas', hy: 'ցույց ես տալիս', isCorrect: false },
      { key: 'c', es: 'enseñamos', hy: 'ցույց ենք տալիս', isCorrect: false },
      { key: 'd', es: 'enseñan', hy: 'ցույց են տալիս (նրանք)', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ես (yo) դերանվան համար ներկա ժամանակում բայի ձևն է՝ enseño (ես քեզ ցույց եմ տալիս / սովորեցնում եմ):',
  },
  {
    id: 3,
    prizeMoney: '2,000 ֏',
    esDialog: {
      speaker1: '— ¿Has preparado la presentación de Ciencias?',
      speaker2: '— Sí, pero me da un poco de vergüenza hablar delante de toda la clase.\n— No te preocupes. Habla despacio y ________ bien tus ideas.',
    },
    hyDialog: {
      speaker1: '— Պատրաստե՞լ ես բնագիտության ներկայացումը։',
      speaker2: '— Այո, բայց մի քիչ ամաչում եմ ամբողջ դասարանի առաջ խոսել։\n— Մի անհանգստացիր։ Դանդաղ խոսիր և լավ բացատրիր քո մտքերը։',
    },
    options: [
      { key: 'a', es: 'explica', hy: 'բացատրի՛ր', isCorrect: true },
      { key: 'b', es: 'explicas', hy: 'բացատրում ես', isCorrect: false },
      { key: 'c', es: 'expliqué', hy: 'բացատրեցի', isCorrect: false },
      { key: 'd', es: 'explicaremos', hy: 'կբացատրենք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Հրամայական եղանակ (Imperativo afirmativo, tú)՝ «explica» (բացատրի՛ր, ինչպես habla):',
  },
  {
    id: 4,
    prizeMoney: '3,000 ֏',
    esDialog: {
      speaker1: '— Hoy no has participado en Educación Física. ¿Qué ha pasado?',
      speaker2: '— Me duele la pierna y el médico me ha dicho que no ________ deporte durante unos días.',
    },
    hyDialog: {
      speaker1: '— Այսօր ֆիզկուլտուրայի դասին չես մասնակցել։ Ի՞նչ է պատահել։',
      speaker2: '— Ոտքս ցավում է, և բժիշկն ասել է, որ մի քանի օր սպորտով չզբաղվեմ։',
    },
    options: [
      { key: 'a', es: 'haga', hy: 'զբաղվեմ / անեմ', isCorrect: true },
      { key: 'b', es: 'hago', hy: 'անում եմ', isCorrect: false },
      { key: 'c', es: 'hice', hy: 'արեցի', isCorrect: false },
      { key: 'd', es: 'haré', hy: 'կանեմ', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Բժիշկն ասել է, որ... (que + subjuntivo) պահանջում է Subjuntivo՝ haga:',
  },
  {
    id: 5,
    prizeMoney: '5,000 ֏',
    esDialog: {
      speaker1: '— ¿Sabes cuándo tenemos el examen de Lengua?',
      speaker2: '— Creo que es el jueves, pero no estoy seguro. Ahora ________ el calendario de la clase.',
    },
    hyDialog: {
      speaker1: '— Գիտե՞ս՝ երբ ունենք լեզվի քննությունը։',
      speaker2: '— Կարծում եմ՝ հինգշաբթի է, բայց վստահ չեմ։ Հիմա ստուգում եմ դասարանի օրացույցը։',
    },
    options: [
      { key: 'a', es: 'reviso', hy: 'ստուգում եմ', isCorrect: true },
      { key: 'b', es: 'revisas', hy: 'ստուգում ես', isCorrect: false },
      { key: 'c', es: 'revisó', hy: 'ստուգեց', isCorrect: false },
      { key: 'd', es: 'revisaremos', hy: 'կստուգենք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«Ahora» (հիմա) գործողությունն անում է խոսողը (yo) -> reviso:',
  },
  {
    id: 6,
    prizeMoney: '10,000 ֏',
    esDialog: {
      speaker1: '— ¿Por qué no has enviado todavía el trabajo por la plataforma?',
      speaker2: '— Porque el archivo pesa demasiado y el sistema no me ________ subirlo.',
    },
    hyDialog: {
      speaker1: '— Ինչո՞ւ դեռ չես ուղարկել աշխատանքը հարթակով։',
      speaker2: '— Որովհետև ֆայլը շատ մեծ է, և համակարգը ինձ չի թողնում այն վերբեռնել։',
    },
    options: [
      { key: 'a', es: 'deja', hy: 'թույլ է տալիս', isCorrect: true },
      { key: 'b', es: 'dejo', hy: 'թույլ եմ տալիս', isCorrect: false },
      { key: 'c', es: 'dejamos', hy: 'թույլ ենք տալիս', isCorrect: false },
      { key: 'd', es: 'dejaron', hy: 'թույլ տվեցին', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ենթական համակարգն է (el sistema, 3-րդ դեմք) -> deja:',
  },
  {
    id: 7,
    prizeMoney: '20,000 ֏',
    esDialog: {
      speaker1: '— En el recreo unos compañeros están organizando un partido de fútbol.',
      speaker2: '— Me gustaría jugar, pero primero ________ un trabajo con Marta.',
    },
    hyDialog: {
      speaker1: '— Ընդմիջմանը մի քանի դասընկերներ ֆուտբոլային խաղ են կազմակերպում։',
      speaker2: '— Ես էլ կուզենայի խաղալ, բայց նախ Մարտայի հետ մի աշխատանք եմ ավարտում։',
    },
    options: [
      { key: 'a', es: 'termino', hy: 'ավարտում եմ', isCorrect: true },
      { key: 'b', es: 'terminas', hy: 'ավարտում ես', isCorrect: false },
      { key: 'c', es: 'terminó', hy: 'ավարտեց', isCorrect: false },
      { key: 'd', es: 'terminarán', hy: 'կավարտեն', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Խոսողը (yo) պատմում է իր ներկա գործողության մասին -> termino:',
  },
  {
    id: 8,
    prizeMoney: '40,000 ֏',
    esDialog: {
      speaker1: '— El profesor está hablando muy rápido y no entiendo todo.',
      speaker2: '— Entonces levanta la mano y pídele que lo ________ más despacio.',
    },
    hyDialog: {
      speaker1: '— Ուսուցիչը շատ արագ է խոսում, և ես ամեն ինչ չեմ հասկանում։',
      speaker2: '— Այդ դեպքում ձեռք բարձրացրու և խնդրիր, որ ավելի դանդաղ բացատրի։',
    },
    options: [
      { key: 'a', es: 'explique', hy: 'բացատրի', isCorrect: true },
      { key: 'b', es: 'explica', hy: 'բացատրում է', isCorrect: false },
      { key: 'c', es: 'explicó', hy: 'բացատրեց', isCorrect: false },
      { key: 'd', es: 'explicará', hy: 'կբացատրի', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Խնդրանք մեկ ուրիշին (pídele que...) պահանջում է Subjuntivo՝ explique:',
  },
  {
    id: 9,
    prizeMoney: '75,000 ֏',
    esDialog: {
      speaker1: '— Mañana tenemos que hacer un trabajo en grupo.',
      speaker2: '— Sí. El profesor quiere que nosotros ________ juntos y repartamos las tareas.',
    },
    hyDialog: {
      speaker1: '— Վաղը պետք է խմբային աշխատանք անենք։',
      speaker2: '— Այո։ Ուսուցիչը ցանկանում է, որ մենք միասին աշխատենք և բաժանենք առաջադրանքները։',
    },
    options: [
      { key: 'a', es: 'trabajemos', hy: 'աշխատենք', isCorrect: true },
      { key: 'b', es: 'trabajamos', hy: 'աշխատում ենք', isCorrect: false },
      { key: 'c', es: 'trabajaremos', hy: 'կաշխատենք', isCorrect: false },
      { key: 'd', es: 'trabajaron', hy: 'աշխատեցին', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ցանկություն արտահայտող «quiere que nosotros...» կառուցվածքից հետո՝ trabajemos (Subjuntivo):',
  },
  {
    id: 10,
    prizeMoney: '125,000 ֏',
    esDialog: {
      speaker1: '— No encuentro mi cuaderno de Inglés.',
      speaker2: '— ¿Has mirado en tu mochila? Esta mañana lo ________ allí.',
    },
    hyDialog: {
      speaker1: '— Չեմ գտնում անգլերենի տետրս։',
      speaker2: '— Պայուսակիդ մեջ նայե՞լ ես։ Այսօր առավոտյան ես այն այնտեղ տեսա։',
    },
    options: [
      { key: 'a', es: 'vi', hy: 'տեսա', isCorrect: true },
      { key: 'b', es: 'veo', hy: 'տեսնում եմ', isCorrect: false },
      { key: 'c', es: 'veré', hy: 'կտեսնեմ', isCorrect: false },
      { key: 'd', es: 'vemos', hy: 'տեսնում ենք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Այս առավոտյան ավարտված անցյալ գործողություն՝ «vi» (ver բայի Pretérito Indefinido, 1-ին դեմք):',
  },
  {
    id: 11,
    prizeMoney: '175,000 ֏',
    esDialog: {
      speaker1: '— ¿Por qué estás tan preocupado?',
      speaker2: '— Porque mañana ________ un examen de Matemáticas y todavía necesito practicar.',
    },
    hyDialog: {
      speaker1: '— Ինչո՞ւ ես այդքան անհանգիստ։',
      speaker2: '— Որովհետև վաղը մաթեմատիկայի քննություն ունեմ և դեռ պետք է վարժվեմ։',
    },
    options: [
      { key: 'a', es: 'tengo', hy: 'ունեմ', isCorrect: true },
      { key: 'b', es: 'tienes', hy: 'ունես', isCorrect: false },
      { key: 'c', es: 'tienen', hy: 'ունեն', isCorrect: false },
      { key: 'd', es: 'tuvimos', hy: 'ունեցանք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Առաջին դեմքով (yo) ներկայացնելիս՝ «tengo» (ունեմ):',
  },
  {
    id: 12,
    prizeMoney: '250,000 ֏',
    esDialog: {
      speaker1: '— ¿Qué ha dicho la profesora sobre el proyecto?',
      speaker2: '— Ha dicho que cada alumno ________ una parte diferente.',
    },
    hyDialog: {
      speaker1: '— Ի՞նչ ասաց ուսուցչուհին նախագծի մասին։',
      speaker2: '— Ասաց, որ յուրաքանչյուր աշակերտ տարբեր մաս է պատրաստում։',
    },
    options: [
      { key: 'a', es: 'prepara', hy: 'պատրաստում է', isCorrect: true },
      { key: 'b', es: 'preparo', hy: 'պատրաստում եմ', isCorrect: false },
      { key: 'c', es: 'preparáis', hy: 'պատրաստում եք', isCorrect: false },
      { key: 'd', es: 'prepararon', hy: 'պատրաստեցին', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«Cada alumno» (յուրաքանչյուր աշակերտ) եզակի 3-րդ դեմք է -> prepara:',
  },
  {
    id: 13,
    prizeMoney: '350,000 ֏',
    esDialog: {
      speaker1: '— No veo bien lo que está escrito en la pizarra.',
      speaker2: '— Si quieres, ________ sentarte un poco más cerca.',
    },
    hyDialog: {
      speaker1: '— Լավ չեմ տեսնում՝ ինչ է գրված գրատախտակին։',
      speaker2: '— Եթե ուզում ես, կարող ես մի քիչ ավելի մոտ նստել։',
    },
    options: [
      { key: 'a', es: 'puedes', hy: 'կարող ես', isCorrect: true },
      { key: 'b', es: 'puedo', hy: 'կարող եմ', isCorrect: false },
      { key: 'c', es: 'podemos', hy: 'կարող ենք', isCorrect: false },
      { key: 'd', es: 'pudieron', hy: 'կարողացան', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«Si quieres» (եթե ուզում ես) -> դիմում է զրուցակցին (tú) -> puedes:',
  },
  {
    id: 14,
    prizeMoney: '450,000 ֏',
    esDialog: {
      speaker1: '— ¿Has entendido las instrucciones del ejercicio?',
      speaker2: '— No del todo. Creo que primero ________ leer el texto y después responder.',
    },
    hyDialog: {
      speaker1: '— Հասկացե՞լ ես առաջադրանքի ցուցումները։',
      speaker2: '— Ոչ ամբողջությամբ։ Կարծում եմ՝ նախ պետք է կարդամ տեքստը, հետո պատասխանեմ։',
    },
    options: [
      { key: 'a', es: 'tengo que', hy: 'պետք է (ես)', isCorrect: true },
      { key: 'b', es: 'tienes que', hy: 'պետք է դու', isCorrect: false },
      { key: 'c', es: 'tiene que', hy: 'պետք է նա', isCorrect: false },
      { key: 'd', es: 'tienen que', hy: 'պետք է նրանք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Խոսողն ասում է իր մասին (creo que yo...) -> tengo que:',
  },
  {
    id: 15,
    prizeMoney: '500,000 ֏',
    esDialog: {
      speaker1: '— La profesora ha pedido que hagamos una presentación sobre un país.',
      speaker2: '— Yo creo que ________ España porque ya conozco bastante sobre el tema.',
    },
    hyDialog: {
      speaker1: '— Ուսուցչուհին խնդրել է, որ որևէ երկրի մասին ներկայացում պատրաստենք։',
      speaker2: '— Կարծում եմ՝ կընտրեմ Իսպանիան, որովհետև թեմայի մասին արդեն բավական գիտեմ։',
    },
    options: [
      { key: 'a', es: 'elegiré', hy: 'կընտրեմ', isCorrect: true },
      { key: 'b', es: 'eliges', hy: 'ընտրում ես', isCorrect: false },
      { key: 'c', es: 'eligió', hy: 'ընտրեց', isCorrect: false },
      { key: 'd', es: 'elegimos', hy: 'ընտրում ենք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ապառնի ժամանակ (Futuro simple, 1-ին դեմք yo)՝ elegiré (կընտրեմ):',
  },
  {
    id: 16,
    prizeMoney: '600,000 ֏',
    esDialog: {
      speaker1: '— Hoy tenemos que leer un texto delante de la clase.\n— Me pongo nervioso cuando todos me miran.',
      speaker2: '— No pasa nada. Si ________ despacio, te van a entender bien.',
    },
    hyDialog: {
      speaker1: '— Այսօր պետք է դասարանի առաջ տեքստ կարդանք։\n— Նյարդայնանում եմ, երբ բոլորը ինձ են նայում։',
      speaker2: '— Ոչինչ։ Եթե դանդաղ կարդաս, քեզ լավ կհասկանան։',
    },
    options: [
      { key: 'a', es: 'lees', hy: 'կարդում ես', isCorrect: true },
      { key: 'b', es: 'leo', hy: 'կարդում եմ', isCorrect: false },
      { key: 'c', es: 'leemos', hy: 'կարդում ենք', isCorrect: false },
      { key: 'd', es: 'leyeron', hy: 'կարդացին', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Իրական պայման (Si + presente) 2-րդ դեմքով (tú)՝ lees:',
  },
  {
    id: 17,
    prizeMoney: '700,000 ֏',
    esDialog: {
      speaker1: '— ¿Quieres venir a la biblioteca después de clase?',
      speaker2: '— Sí, porque necesito ________ información para el proyecto de Geografía.',
    },
    hyDialog: {
      speaker1: '— Ուզո՞ւմ ես դասից հետո գրադարան գալ։',
      speaker2: '— Այո, որովհետև աշխարհագրության նախագծի համար պետք է տեղեկություն փնտրեմ։',
    },
    options: [
      { key: 'a', es: 'buscar', hy: 'փնտրել', isCorrect: true },
      { key: 'b', es: 'busco', hy: 'փնտրում եմ', isCorrect: false },
      { key: 'c', es: 'buscó', hy: 'փնտրեց', isCorrect: false },
      { key: 'd', es: 'buscaron', hy: 'փնտրեցին', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«Necesito + infinitive» -> անորոշ դերբայ՝ buscar (փնտրել):',
  },
  {
    id: 18,
    prizeMoney: '800,000 ֏',
    esDialog: {
      speaker1: '— ¿Por qué has llegado tarde?',
      speaker2: '— Porque el autobús no ________ a tiempo y he tenido que esperar.',
    },
    hyDialog: {
      speaker1: '— Ինչո՞ւ ես ուշացել։',
      speaker2: '— Որովհետև ավտոբուսը ժամանակին չեկավ, և ես ստիպված էի սպասել։',
    },
    options: [
      { key: 'a', es: 'llegó', hy: 'հասավ / եկավ', isCorrect: true },
      { key: 'b', es: 'llega', hy: 'գալիս է', isCorrect: false },
      { key: 'c', es: 'llegaré', hy: 'կգամ', isCorrect: false },
      { key: 'd', es: 'llegamos', hy: 'գալիս ենք', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ավտոբուսը (el autobús, 3-րդ դեմք) անցյալում՝ llegó (Pretérito Indefinido):',
  },
  {
    id: 19,
    prizeMoney: '900,000 ֏',
    esDialog: {
      speaker1: '— El profesor ha dicho que podemos trabajar por parejas.',
      speaker2: '— Perfecto. ¿Quieres que ________ juntos?',
    },
    hyDialog: {
      speaker1: '— Ուսուցիչն ասել է, որ կարող ենք զույգերով աշխատել։',
      speaker2: '— Հիանալի։ Ուզո՞ւմ ես, որ միասին աշխատենք։',
    },
    options: [
      { key: 'a', es: 'trabajemos', hy: 'աշխատենք', isCorrect: true },
      { key: 'b', es: 'trabajamos', hy: 'աշխատում ենք', isCorrect: false },
      { key: 'c', es: 'trabajaron', hy: 'աշխատեցին', isCorrect: false },
      { key: 'd', es: 'trabajarán', hy: 'կաշխատեն', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: '«¿Quieres que nosotros...?» պահանջում է Subjuntivo՝ trabajemos (մենք աշխատենք):',
  },
  {
    id: 20,
    prizeMoney: '1,000,000 ֏',
    esDialog: {
      speaker1: '— No sé qué tengo que estudiar para el examen de Ciencias.',
      speaker2: '— La profesora ha dicho que ________ los temas cuatro, cinco y seis.',
    },
    hyDialog: {
      speaker1: '— Չգիտեմ՝ ինչ պետք է սովորեմ բնագիտության քննության համար։',
      speaker2: '— Ուսուցչուհին ասել է, որ պետք է սովորենք չորրորդ, հինգերորդ և վեցերորդ թեմաները։',
    },
    options: [
      { key: 'a', es: 'estudiemos', hy: 'սովորենք', isCorrect: true },
      { key: 'b', es: 'estudiamos', hy: 'սովորում ենք', isCorrect: false },
      { key: 'c', es: 'estudiaron', hy: 'սովորեցին', isCorrect: false },
      { key: 'd', es: 'estudiaré', hy: 'կսովորեմ', isCorrect: false },
    ],
    correctKey: 'a',
    explanation: 'Ուսուցչուհու կարգադրությունը անուղղակի խոսքում (ha dicho que...) մեր մասին -> estudiemos (Subjuntivo):',
  },
];

export const NUMBERS_DATA: NumberBonusItem[] = [
  { id: 1, number: 126, spanish: 'ciento veintiséis', armenianNote: 'հարյուր քսանվեց' },
  { id: 2, number: 178, spanish: 'ciento setenta y ocho', armenianNote: 'հարյուր յոթանասունութ' },
  { id: 3, number: 234, spanish: 'doscientos treinta y cuatro', armenianNote: 'երկու հարյուր երեսունչորս' },
  { id: 4, number: 289, spanish: 'doscientos ochenta y nueve', armenianNote: 'երկու հարյուր ութսունինը' },
  { id: 5, number: 315, spanish: 'trescientos quince', armenianNote: 'երեք հարյուր տասնհինգ' },
  { id: 6, number: 347, spanish: 'trescientos cuarenta y siete', armenianNote: 'երեք հարյուր քառասունյոթ' },
  { id: 7, number: 402, spanish: 'cuatrocientos dos', armenianNote: 'չորս հարյուր երկու' },
  { id: 8, number: 458, spanish: 'cuatrocientos cincuenta y ocho', armenianNote: 'չորս հարյուր հիսունութ' },
  { id: 9, number: 519, spanish: 'quinientos diecinueve', armenianNote: 'հինգ հարյուր տասնինը' },
  { id: 10, number: 563, spanish: 'quinientos sesenta y tres', armenianNote: 'հինգ հարյուր վաթսուներեք' },
  { id: 11, number: 624, spanish: 'seiscientos veinticuatro', armenianNote: 'վեց հարյուր քսանչորս' },
  { id: 12, number: 678, spanish: 'seiscientos setenta y ocho', armenianNote: 'վեց հարյուր յոթանասունութ' },
  { id: 13, number: 731, spanish: 'setecientos treinta y uno', armenianNote: 'յոթ հարյուր երեսունմեկ' },
  { id: 14, number: 746, spanish: 'setecientos cuarenta y seis', armenianNote: 'յոթ հարյուր քառասունվեց' },
  { id: 15, number: 812, spanish: 'ochocientos doce', armenianNote: 'ութ հարյուր տասներկու' },
  { id: 16, number: 857, spanish: 'ochocientos cincuenta y siete', armenianNote: 'ութ հարյուր հիսունյոթ' },
  { id: 17, number: 903, spanish: 'novecientos tres', armenianNote: 'ինը հարյուր երեք' },
  { id: 18, number: 928, spanish: 'novecientos veintiocho', armenianNote: 'ինը հարյուր քսանութ' },
  { id: 19, number: 976, spanish: 'novecientos setenta y seis', armenianNote: 'ինը հարյուր յոթանասունվեց' },
  { id: 20, number: 1000, spanish: 'mil', armenianNote: 'հազար' },
];
