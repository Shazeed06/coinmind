import { site } from "./site";

type Thing = Record<string, unknown>;

export function org(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    description: site.description,
    email: site.email,
    foundingDate: "2026",
    areaServed: ["IN", "US", "GB", "Worldwide"],
    publishingPrinciples: `${site.url}/editorial-standards`,
    knowsAbout: ["Personal finance", "Income tax", "Mutual funds and SIP", "Fixed deposits", "PPF, EPF and NPS", "AI tools"],
  };
}

export function website(): Thing {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function person(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.author.name,
    description: site.author.bio,
    knowsAbout: ["Personal finance", "Indian income tax", "Mutual funds", "Financial planning"],
  };
}

export function siteGraph(): Thing {
  return { "@context": "https://schema.org", "@graph": [org(), website(), person()] };
}

export function breadcrumb(items: { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function webApp(name: string, slug: string, category: string): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${site.url}/${slug}`,
    applicationCategory: category === "Health" ? "HealthApplication" : category === "Utility" ? "UtilitiesApplication" : "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function softwareApp(name: string, slug: string, description: string, features: string[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url: `${site.url}${slug}`,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    featureList: features,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqPage(faqs: { q: string; a: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function article(headline: string, description: string, date: string, image?: string): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: { "@type": "Person", name: site.author.name, knowsAbout: "Personal finance, mutual funds, taxation" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: date,
    dateModified: date,
    image: image || `${site.url}/opengraph-image`,
  };
}

export function howTo(name: string, description: string, steps: { name: string; text: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

export function speakable(path: string, cssSelector: string[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}${path}`,
    speakable: { "@type": "SpeakableSpecification", cssSelector },
  };
}

export function collectionPage(name: string, description: string, items: { name: string; url: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Thing", name: item.name, url: `${site.url}${item.url}` },
      })),
    },
  };
}

export function definedTerm(term: string, description: string): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description,
    inLanguage: "en",
    url: `${site.url}/glossary`,
  };
}

export function financialProduct(name: string, description: string, category: string): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    description,
    category,
    feesAndCommissionsSpecification: "Varies by provider. See SEBI/AMFI guidelines.",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function renderLd(data: Thing): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
