export const languages = {
  pt: {
    label: "BR",
    locale: "pt-BR",
    homePath: "/",
    fortitudoPath: "/fortitudo/",
    statementPath: "/statement/",
    booksPath: "/books/",
    portfolioPath: "/portfolio/",
    productivityPath: "/productivity/",
  },
  en: {
    label: "EN",
    locale: "en",
    homePath: "/en/",
    fortitudoPath: "/en/fortitudo/",
    statementPath: "/en/statement/",
    booksPath: "/en/books/",
    portfolioPath: "/en/portfolio/",
    productivityPath: "/en/productivity/",
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "pt";
export const languagePreferenceKey = "misaa-language";

export const homeCopy = {
  pt: {
    title: "misa",
    description: "It's misa!",
    bio: {
      heading: "Hi, it's Misa!",
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
    description: "It's misa!",
    bio: {
      heading: "Hi, it's Misa!",
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

  if (pathname === "/en/fortitudo" || pathname === "/en/fortitudo/") {
    return languages.pt.fortitudoPath;
  }

  if (pathname === "/en/statement" || pathname === "/en/statement/") {
    return languages.pt.statementPath;
  }

  if (pathname === "/en/books" || pathname === "/en/books/") {
    return languages.pt.booksPath;
  }

  if (
    pathname === "/en/productivity" ||
    pathname === "/en/productivity/" ||
    pathname === "/en/pdf/productivity" ||
    pathname === "/en/pdf/productivity/"
  ) {
    return languages.pt.productivityPath;
  }

  if (pathname === "/fortitudo" || pathname === "/fortitudo/") {
    return languages.en.fortitudoPath;
  }

  if (pathname === "/statement" || pathname === "/statement/") {
    return languages.en.statementPath;
  }

  if (pathname === "/books" || pathname === "/books/") {
    return languages.en.booksPath;
  }

  if (["/productivity", "/productivity/", "/pdf/productivity", "/pdf/productivity/"].includes(pathname)) {
    return languages.en.productivityPath;
  }

  return languages.en.homePath;
}
