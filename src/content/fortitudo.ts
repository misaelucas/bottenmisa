import type { Language } from "../i18n";
import type { ImageMetadata } from "astro";
import danteCityOfDis from "../assets/dante-city-of-dis.png";
import aeneasLibyanCoast from "../assets/aeneas-libyan-coast.png";

type LocalizedText = Record<Language, string>;

export interface Passage {
  original: string[];
  translation: LocalizedText;
  reference?: LocalizedText;
  note?: LocalizedText;
}

export interface CanonEntry {
  author: LocalizedText;
  work: LocalizedText;
  originalLangCode?: string;
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
    author: { pt: "Dante Alighieri", en: "Dante Alighieri" },
    work: { pt: "Inferno, Canto VIII", en: "Inferno, Canto VIII" },
    originalLangCode: "it",
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
        original: [
          "Non temer; ché ’l nostro passo",
          "non ci può tòrre alcun: da tal n’è dato.",
        ],
        translation: {
          pt: "Não temas; ninguém pode impedir nossa passagem, pois ela nos foi concedida por quem tem tal autoridade.",
          en: "Do not fear; no one can take our passage from us, for it has been granted by one with such authority.",
        },
        reference: { pt: "Inferno VIII, 104–111", en: "Inferno VIII, 104–111" },
      },
      {
        original: ["Conforta e ciba di speranza buona."],
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
    originalLangCode: "la",
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
        original: ["Forsan et haec olim meminisse iuvabit."],
        translation: {
          pt: "Talvez um dia até estas coisas sejam lembradas com alegria.",
          en: "Perhaps one day even these things will be a joy to remember.",
        },
        reference: { pt: "Eneida I, 203", en: "Aeneid I, 203" },
      },
    ],
  },
];
