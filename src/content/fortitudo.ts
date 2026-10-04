import type { Language } from "../i18n";
import type { ImageMetadata } from "astro";
import danteCityOfDis from "../assets/dante-city-of-dis.png";
import aeneasLibyanCoast from "../assets/aeneas-libyan-coast.png";

type LocalizedText = Record<Language, string>;

export interface Passage {
  translation: LocalizedText;
  reference?: LocalizedText;
  note?: LocalizedText;
}

export interface CanonEntry {
  author: LocalizedText;
  work: LocalizedText;
  context?: LocalizedText;
  image?: {
    src: ImageMetadata;
    alt: LocalizedText;
    caption?: LocalizedText;
    position?: string;
  };
  passages: Passage[];
}

// Add another entry here; the page renders each passage with its source and optional note.
export const fortitudoEntries: CanonEntry[] = [
  {
    author: { pt: "Séneca", en: "Seneca" },
    work: { pt: "Cartas a Lucílio, Carta I", en: "Letters to Lucilius, Letter I" },
    passages: [
      {
        translation: {
          pt: "Procede deste modo, caro Lucílio: reclama o direito de dispores de ti, concentra e aproveita todo o tempo que até agora te era roubado, te era subtraído, que te fugia das mãos. Convence-te de que as coisas são tal como as descrevo: uma parte do tempo é-nos tomada, outra parte vai-se sem darmos por isso, outra deixamo-la escapar. Mas o pior de tudo é o tempo desperdiçado por negligência. Se bem reparares, durante grande parte da vida agimos mal, durante a maior parte não agimos nada, durante toda a vida agimos inutilmente.",
          en: "Proceed in this way, dear Lucilius: claim the right to dispose of yourself, gather and make use of all the time that until now was stolen from you, taken from you, or slipped through your hands. Be convinced that things are as I describe them: some of our time is taken from us, some passes without our noticing, and some we let slip away. But worst of all is the time wasted through negligence. If you look closely, for much of our life we act badly, for most of it we do nothing, and throughout our life we act to no purpose.",
        },
        reference: { pt: "Carta I, 1", en: "Letter I, 1" },
      },
      {
        translation: {
          pt: "Podes indicar-me alguém que dê o justo valor ao tempo, aproveite bem o seu dia e pense que diariamente morre um pouco? É um erro imaginar que a morte está à nossa frente: grande parte dela já pertence ao passado, toda a nossa vida pretérita é já do domínio da morte!",
          en: "Can you point to anyone who gives time its proper value, makes good use of the day, and understands that each day they die a little? It is a mistake to imagine that death lies ahead of us: much of it already belongs to the past; all our past life is already in death’s domain!",
        },
        reference: { pt: "Carta I, 2", en: "Letter I, 2" },
      },
      {
        translation: {
          pt: "Procede, portanto, caro Lucílio, conforme dizes: preenche todas as tuas horas! Se tomares nas mãos o dia de hoje conseguirás depender menos do dia de amanhã. De adiamento em adiamento, a vida vai-se passando. Nada nos pertence, Lucílio, só o tempo é mesmo nosso.",
          en: "Proceed, then, dear Lucilius, as you say: fill all your hours! If you take hold of today, you will depend less on tomorrow. As we keep putting things off, life passes by. Nothing belongs to us, Lucilius; time alone is truly ours.",
        },
        reference: { pt: "Carta I, 2–3", en: "Letter I, 2–3" },
      },
    ],
  },
  {
    author: { pt: "Dante Alighieri", en: "Dante Alighieri" },
    work: { pt: "Inferno, Canto VIII", en: "Inferno, Canto VIII" },
    context: {
      pt: "Às portas da Cidade de Dite, os anjos caídos recusam passagem a Dante e Virgílio. Dante teme, e até Virgílio parece perturbado. Ainda assim, Virgílio o lembra de que o caminho que lhes foi concedido não pode, em última instância, ser tomado deles.",
      en: "At the gates of the City of Dis, the fallen angels refuse Dante and Virgil passage. Dante is afraid, and even Virgil appears troubled. Still, Virgil reminds him that the road they have been given cannot ultimately be taken from them.",
    },
    image: {
      src: danteCityOfDis,
      position: "center 58%",
      alt: {
        pt: "Dante e Virgílio diante dos portões da cidade de Dite em chamas",
        en: "Dante and Virgil before the burning gates of the City of Dis",
      },
      caption: {
        pt: "Dante e Virgílio diante das portas da Cidade de Dite — Inferno, VIII–IX",
        en: "Dante and Virgil before the gates of the City of Dis — Inferno, VIII–IX",
      },
    },
    passages: [
      {
        translation: {
          pt: "Não temas; ninguém pode impedir nossa passagem, pois ela nos foi concedida por quem tem tal autoridade.",
          en: "Do not fear; no one can take our passage from us, for it has been granted by one with such authority.",
        },
        reference: { pt: "Inferno VIII, 104–111", en: "Inferno VIII, 104–111" },
      },
      {
        translation: {
          pt: "Conforta teu espírito cansado e alimenta-o com boa esperança.",
          en: "Comfort your weary spirit and feed it with good hope.",
        },
        note: {
          pt: "Um lembrete para preservar a esperança antes que as circunstâncias melhorem, não apenas depois.",
          en: "A reminder to preserve hope before circumstances have improved, not only after.",
        },
      },
    ],
  },
  {
    author: { pt: "Virgílio", en: "Virgil" },
    work: { pt: "Eneida, Livro I", en: "Aeneid, Book I" },
    context: {
      pt: "Depois de uma tempestade que dispersa a frota troiana, Eneias e seus companheiros chegam exaustos à costa da Líbia. Já em segurança relativa, ele tenta restaurar-lhes a coragem, mesmo ocultando o próprio sofrimento.",
      en: "After a storm scatters the Trojan fleet, Aeneas and his companions reach the coast of Libya exhausted. In relative safety, he tries to restore their courage, even as he hides his own suffering.",
    },
    image: {
      src: aeneasLibyanCoast,
      alt: {
        pt: "Eneias fala aos companheiros exaustos na costa da Líbia, com a frota sobrevivente ao fundo.",
        en: "Aeneas speaks to his exhausted companions on the coast of Libya, with the surviving fleet behind them.",
      },
      caption: {
        pt: "Eneias encoraja os companheiros na costa da Líbia após a tempestade — Eneida, I",
        en: "Aeneas encourages his companions on the coast of Libya after the storm — Aeneid, I",
      },
    },
    passages: [
      {
        translation: {
          pt: "Talvez um dia até estas coisas sejam lembradas com alegria.",
          en: "Perhaps one day even these things will be a joy to remember.",
        },
        reference: { pt: "Eneida I, 203", en: "Aeneid I, 203" },
      },
    ],
  },
];
