export const languages = {
  pt: {
    label: "BR",
    locale: "pt-BR",
    homePath: "/",
    shortsPath: "/shorts/",
  },
  en: {
    label: "EN",
    locale: "en",
    homePath: "/en/",
    shortsPath: "/en/shorts/",
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "pt";

export const homeCopy = {
  pt: {
    title: "misa",
    description:
      "Site pessoal de Misael Lucas: notas, shorts e pequenos registros.",
    latestShort: "Último short",
    shortsSection: "Shorts",
    shortsHref: languages.pt.shortsPath,
    bio: {
      heading: "Hi, I'm Misa.",
      role: "Fullstack Developer • MERN",
      intro: "Gosto de construir ferramentas que resolvem problemas reais.",
      work: [
        "Atualmente trabalho na gestão de uma clínica, lidando com todos os aspectos operacionais, além de desenvolver um ERP próprio (MERN + Cloud + Metabase).",
      ],
      interests: "opsec • cybersecurity • white hat • muay thai • weight lifting",
      location: "Santana do Ipanema, Alagoas.",
    },
  },
  en: {
    title: "misa",
    description:
      "Misael Lucas' personal site: notes, shorts, and small records.",
    latestShort: "Latest short",
    shortsSection: "Shorts",
    shortsHref: languages.en.shortsPath,
    bio: {
      heading: "Hi, I'm Misa.",
      role: "Fullstack Developer • MERN",
      intro: "I like building tools that solve real problems.",
      work: [
        "Currently, I work in the management of a medical clinic, handling all operational aspects, while also developing an in-house ERP (MERN + Cloud + Metabase).",
      ],
      interests: "opsec • cybersecurity • white hat • muay thai • weight lifting",
      location: "Santana do Ipanema, Alagoas.",
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

  if (pathname === "/shorts" || pathname === "/shorts/") {
    return languages.en.shortsPath;
  }

  return languages.en.homePath;
}
