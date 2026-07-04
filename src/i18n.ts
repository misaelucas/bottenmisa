export const languages = {
  pt: {
    label: "BR",
    locale: "pt-BR",
    homePath: "/",
    shortsPath: "/shorts/",
    booksPath: "/books/",
    productivityPath: "/pdf/productivity/",
  },
  en: {
    label: "EN",
    locale: "en",
    homePath: "/en/",
    shortsPath: "/en/shorts/",
    booksPath: "/en/books/",
    productivityPath: "/en/pdf/productivity/",
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "pt";

export const homeCopy = {
  pt: {
    title: "misa",
    description:
      "misa the botter.",
    latestShort: "Último short",
    shortsSection: "Shorts",
    shortsHref: languages.pt.shortsPath,
    bio: {
      heading: "Hi, I'm Misa.",
      role: "Fullstack Developer",
      intro: "Humanos foram feitos para criar, não para consumir.",
      work: [
        "Eu crio software para ajudar a mim mesmo e outras pessoas, e também gosto de escrever. Meus projetos públicos estão no GitHub. Esta é minha página pessoal e, por enquanto, ela ainda está mal escrita.",
      ],
      interests: "agorism • hacktivism • muay thai • weight lifting",
      location: "Brasil.",
    },
  },
  en: {
    title: "misa",
    description:
      "misa the botter.",
    latestShort: "Latest short",
    shortsSection: "Shorts",
    shortsHref: languages.en.shortsPath,
    bio: {
      heading: "Hi, I'm Misa.",
      role: "Fullstack Developer",
      intro: "Humans were made to create and not to consume.",
      work: [
        "I do create software to help myself and others and am a kinda of writer myself. My public projects you can find them at my GitHub. This is my personal page and it's poorly written for now.",
      ],
      interests: "agorism • hacktivism • muay thai • weight lifting",
      location: "Brazil.",
    },
  },
} as const;

export const shortsCopy = {
  pt: {
    title: "Shorts",
    description:
      "Notas curtas, updates e pequenos fragmentos que não viram artigo completo.",
    emptyTitle: "Ainda não tem shorts publicados.",
    homeLink: "Voltar para a home",
    distanceSuffix: "antes",
  },
  en: {
    title: "Shorts",
    description:
      "Short notes, updates, and small fragments that do not become full articles.",
    emptyTitle: "No shorts published yet.",
    homeLink: "Back home",
    distanceSuffix: "earlier",
  },
} as const;

export const booksCopy = {
  pt: {
    title: "Livros",
    description: "Leituras a partir de 28 de março.",
    eyebrow: "leituras a partir de 28 de março",
    publishedLabel: "publicado",
    readLabel: "lido",
    readAtLabel: "lido em",
    currentLabel: "lendo atualmente",
  },
  en: {
    title: "Books",
    description: "Readings from March 28 onward.",
    eyebrow: "readings from March 28 onward",
    publishedLabel: "published",
    readLabel: "read",
    readAtLabel: "read on",
    currentLabel: "current reading",
  },
} as const;

export function getLanguageFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/")
    ? "en"
    : defaultLanguage;
}

export function getLanguageHomePath(language: Language) {
  return languages[language].homePath;
}

export function getAlternateLanguage(language: Language): Language {
  return language === "pt" ? "en" : "pt";
}

export function getAlternatePath(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") {
    return languages.pt.homePath;
  }

  if (pathname === "/en/shorts" || pathname === "/en/shorts/") {
    return languages.pt.shortsPath;
  }

  if (pathname === "/en/books" || pathname === "/en/books/") {
    return languages.pt.booksPath;
  }

  if (
    pathname === "/en/pdf/productivity" ||
    pathname === "/en/pdf/productivity/"
  ) {
    return languages.pt.productivityPath;
  }

  if (pathname === "/shorts" || pathname === "/shorts/") {
    return languages.en.shortsPath;
  }

  if (pathname === "/books" || pathname === "/books/") {
    return languages.en.booksPath;
  }

  if (pathname === "/pdf/productivity" || pathname === "/pdf/productivity/") {
    return languages.en.productivityPath;
  }

  return languages.en.homePath;
}
