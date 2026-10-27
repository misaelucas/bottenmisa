export const languages = {
  pt: {
    label: "BR",
    locale: "pt-BR",
    homePath: "/",
    fortitudoPath: "/fortitudo/",
    statementPath: "/statement/",
    booksPath: "/books/",
    portfolioPath: "/portfolio/",
  },
  en: {
    label: "EN",
    locale: "en",
    homePath: "/en/",
    fortitudoPath: "/en/fortitudo/",
    statementPath: "/en/statement/",
    booksPath: "/en/books/",
    portfolioPath: "/en/portfolio/",
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
        "Aristóteles disse que algumas pessoas só eram aptas a ser escravas. Não o contradigo. Mas rejeito a escravidão porque não vejo homens aptos a ser senhores.",
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
        "Aristotle said that some people were only fit to be slaves. I do not contradict him. But I reject slavery because I see no men fit to be masters.",
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
  if (["/portfolio/gridscope", "/portfolio/gridscope/"].includes(pathname)) return "/en/portfolio/gridscope/";
  if (["/en/portfolio/gridscope", "/en/portfolio/gridscope/"].includes(pathname)) return "/portfolio/gridscope/";

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

  if (pathname === "/fortitudo" || pathname === "/fortitudo/") {
    return languages.en.fortitudoPath;
  }

  if (pathname === "/statement" || pathname === "/statement/") {
    return languages.en.statementPath;
  }

  if (pathname === "/books" || pathname === "/books/") {
    return languages.en.booksPath;
  }

  return languages.en.homePath;
}
