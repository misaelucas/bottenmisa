export const languages = {
  pt: {
    label: "BR",
    locale: "pt-BR",
    homePath: "/",
    shortsPath: "/shorts/",
    booksPath: "/books/",
    portfolioPath: "/portfolio/",
    productivityPath: "/pdf/productivity/",
  },
  en: {
    label: "EN",
    locale: "en",
    homePath: "/en/",
    shortsPath: "/en/shorts/",
    booksPath: "/en/books/",
    portfolioPath: "/en/portfolio/",
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
      intro: "",
      work: [
        "Tempo para ti e tempo para mim, e tempo ainda para uma centena de indecisões, e para uma centena de visões e revisões, antes de se tomar uma torrada e um chá.",
      ], 
      interests: "poesia • hacktivism • muay thai • levantamento de peso",
      location: "In the wired.",
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
      intro: "",
      work: [
        "Time for you and time for me, and time yet for a hundred indecisions, and for a hundred visions and revisions, before the taking of a toast and tea.",
      ],
      interests: "poetry • hacktivism • muay thai • weight lifting",
      location: "In the wired.",
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
  if (pathname === "/portfolio/anno-domini" || pathname === "/portfolio/anno-domini/") {
    return "/en/portfolio/anno-domini/";
  }

  if (pathname === "/en/portfolio/anno-domini" || pathname === "/en/portfolio/anno-domini/") {
    return "/portfolio/anno-domini/";
  }

  if (pathname === "/portfolio" || pathname === "/portfolio/") {
    return languages.en.portfolioPath;
  }

  if (pathname === "/en/portfolio" || pathname === "/en/portfolio/") {
    return languages.pt.portfolioPath;
  }

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
