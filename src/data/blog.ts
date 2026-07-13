export type BlogCategory =
  | "functionalHealth"
  | "sleep"
  | "nutrition"
  | "exercise"
  | "aging"
  | "womensHealth"
  | "breathing";

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  date: string;
  readTime: number;
  image?: string;
  pt: {
    title: string;
    excerpt: string;
    content: string;
    metaDescription: string;
  };
  en: {
    title: string;
    excerpt: string;
    content: string;
    metaDescription: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-e-saude-funcional",
    category: "functionalHealth",
    date: "2026-06-15",
    readTime: 6,
    pt: {
      title: "O que é Saúde Funcional?",
      excerpt:
        "Entenda como a Saúde Funcional vai além dos sintomas e cuida das causas raiz do desequilíbrio.",
      metaDescription:
        "Descubra o que é Saúde Funcional, seus pilares e como essa abordagem integrada melhora sua qualidade de vida.",
      content: `A Saúde Funcional é uma abordagem que busca identificar e tratar as causas raiz dos desequilíbrios de saúde, em vez de apenas aliviar sintomas isolados.

Diferente de modelos puramente reativos, ela integra movimento, nutrição, sono, saúde mental, respiração, espiritualidade, conexão com a natureza, propósito de vida e ecossistema social.

Para mulheres acima de 40 anos, idosos e famílias no Canadá, essa abordagem oferece um caminho acolhedor e personalizado para prevenção e envelhecimento saudável.

O objetivo não é perfeição, mas equilíbrio sustentável — hábitos realistas que você consegue manter e que transformam sua energia, autonomia e bem-estar ao longo do tempo.`,
    },
    en: {
      title: "What is Functional Health?",
      excerpt:
        "Learn how Functional Health goes beyond symptoms to address the root causes of imbalance.",
      metaDescription:
        "Discover what Functional Health is, its pillars, and how this integrated approach improves your quality of life.",
      content: `Functional Health is an approach that seeks to identify and address the root causes of health imbalances, rather than merely relieving isolated symptoms.

Unlike purely reactive models, it integrates movement, nutrition, sleep, mental health, breathing, spirituality, connection with nature, life purpose, and social ecosystem.

For women over 40, seniors, and families in Canada, this approach offers a welcoming, personalized path to prevention and healthy aging.

The goal isn't perfection, but sustainable balance — realistic habits you can maintain that transform your energy, autonomy, and well-being over time.`,
    },
  },
  {
    slug: "como-melhorar-seu-sono",
    category: "sleep",
    date: "2026-06-20",
    readTime: 5,
    pt: {
      title: "Como melhorar seu sono",
      excerpt:
        "Dicas práticas para noites mais reparadoras e dias com mais energia.",
      metaDescription:
        "Aprenda estratégias simples para melhorar a qualidade do sono e recuperar sua energia diária.",
      content: `O sono é um dos pilares mais importantes da Saúde Funcional. Durante o descanso, seu corpo se recupera, consolida memórias e regula hormônios essenciais.

Para melhorar seu sono, comece com uma rotina consistente: deite-se e acorde nos mesmos horários, mesmo nos fins de semana.

Evite telas uma hora antes de dormir e prefira ambientes escuros e frescos. A alimentação também influencia — jantares leves e anti-inflamatórios favorecem o descanso.

Técnicas de respiração consciente e redução do estresse complementam essas mudanças. Se as dificuldades persistirem, buscar acompanhamento profissional pode fazer toda a diferença.`,
    },
    en: {
      title: "How to improve your sleep",
      excerpt:
        "Practical tips for more restorative nights and days with more energy.",
      metaDescription:
        "Learn simple strategies to improve sleep quality and restore your daily energy.",
      content: `Sleep is one of the most important pillars of Functional Health. During rest, your body recovers, consolidates memories, and regulates essential hormones.

To improve your sleep, start with a consistent routine: go to bed and wake up at the same times, even on weekends.

Avoid screens an hour before bed and prefer dark, cool environments. Nutrition also matters — light, anti-inflammatory dinners support better rest.

Conscious breathing techniques and stress reduction complement these changes. If difficulties persist, professional guidance can make all the difference.`,
    },
  },
  {
    slug: "alimentacao-anti-inflamatoria",
    category: "nutrition",
    date: "2026-06-25",
    readTime: 7,
    pt: {
      title: "Alimentação Anti-inflamatória",
      excerpt:
        "Como a nutrição consciente reduz inflamação e aumenta sua vitalidade.",
      metaDescription:
        "Guia prático sobre alimentação anti-inflamatória para mais energia e prevenção de doenças crônicas.",
      content: `A inflamação crônica silenciosa está ligada a diversas condições de saúde. Uma alimentação anti-inflamatória é uma das ferramentas mais poderosas da Saúde Funcional.

Priorize vegetais coloridos, gorduras saudáveis como azeite e abacate, proteínas de qualidade e grãos integrais. Reduza açúcares refinados, alimentos ultraprocessados e excesso de álcool.

Cada pessoa responde de forma diferente — por isso a personalização é fundamental. Observe como seu corpo reage e ajuste gradualmente.

Pequenas mudanças consistentes, como adicionar mais vegetais às refeições, já geram impacto significativo na sua energia e bem-estar.`,
    },
    en: {
      title: "Anti-inflammatory Nutrition",
      excerpt:
        "How conscious eating reduces inflammation and boosts your vitality.",
      metaDescription:
        "Practical guide to anti-inflammatory nutrition for more energy and chronic disease prevention.",
      content: `Silent chronic inflammation is linked to various health conditions. Anti-inflammatory nutrition is one of the most powerful tools in Functional Health.

Prioritize colorful vegetables, healthy fats like olive oil and avocado, quality proteins, and whole grains. Reduce refined sugars, ultra-processed foods, and excess alcohol.

Each person responds differently — that's why personalization is essential. Observe how your body reacts and adjust gradually.

Small consistent changes, like adding more vegetables to meals, already create significant impact on your energy and well-being.`,
    },
  },
  {
    slug: "exercicios-apos-os-40-anos",
    category: "exercise",
    date: "2026-07-01",
    readTime: 6,
    pt: {
      title: "Exercícios após os 40 anos",
      excerpt:
        "Movimento inteligente e seguro para manter força, mobilidade e independência.",
      metaDescription:
        "Descubra os melhores exercícios após os 40 anos para força funcional, mobilidade e qualidade de vida.",
      content: `Após os 40 anos, o exercício deve ser estratégico — focado em força funcional, mobilidade, equilíbrio e saúde cardiovascular.

Treinos de resistência preservam massa muscular e densidade óssea. Caminhadas, alongamentos e exercícios de estabilidade complementam perfeitamente.

O segredo está na consistência, não na intensidade extrema. Comece onde você está e progrida gradualmente.

Um profissional de Saúde Funcional pode criar um plano adaptado às suas necessidades, respeitando limitações e objetivos pessoais.`,
    },
    en: {
      title: "Exercise after 40",
      excerpt:
        "Smart, safe movement to maintain strength, mobility, and independence.",
      metaDescription:
        "Discover the best exercises after 40 for functional strength, mobility, and quality of life.",
      content: `After 40, exercise should be strategic — focused on functional strength, mobility, balance, and cardiovascular health.

Resistance training preserves muscle mass and bone density. Walking, stretching, and stability exercises complement perfectly.

The secret is consistency, not extreme intensity. Start where you are and progress gradually.

A Functional Health professional can create a plan adapted to your needs, respecting limitations and personal goals.`,
    },
  },
  {
    slug: "envelhecimento-saudavel",
    category: "aging",
    date: "2026-07-05",
    readTime: 5,
    pt: {
      title: "Envelhecimento saudável",
      excerpt:
        "Como viver mais e melhor, com autonomia e propósito em cada fase da vida.",
      metaDescription:
        "Estratégias de envelhecimento saudável baseadas em Saúde Funcional para longevidade com qualidade.",
      content: `Envelhecer com saúde não é apenas viver mais anos — é viver com qualidade, autonomia e propósito.

Os pilares da Saúde Funcional se aplicam em todas as idades: movimento adaptado, nutrição consciente, sono reparador, gestão do estresse e conexões sociais significativas.

Prevenção é o melhor investimento. Hábitos sustentáveis construídos hoje determinam como você se sentirá daqui a 10, 20 ou 30 anos.

No Canadá, onde muitas famílias buscam equilíbrio entre trabalho e bem-estar, essa abordagem integrada faz toda a diferença.`,
    },
    en: {
      title: "Healthy aging",
      excerpt:
        "How to live longer and better, with autonomy and purpose at every life stage.",
      metaDescription:
        "Healthy aging strategies based on Functional Health for longevity with quality.",
      content: `Aging healthily isn't just about living more years — it's about living with quality, autonomy, and purpose.

The pillars of Functional Health apply at every age: adapted movement, conscious nutrition, restorative sleep, stress management, and meaningful social connections.

Prevention is the best investment. Sustainable habits built today determine how you'll feel 10, 20, or 30 years from now.

In Canada, where many families seek balance between work and well-being, this integrated approach makes all the difference.`,
    },
  },
  {
    slug: "saude-da-mulher",
    category: "womensHealth",
    date: "2026-07-08",
    readTime: 6,
    pt: {
      title: "Saúde da mulher",
      excerpt:
        "Cuidados integrados para mulheres 40+ em todas as fases da vida.",
      metaDescription:
        "Saúde da mulher após os 40: equilíbrio hormonal, energia, nutrição e bem-estar com abordagem funcional.",
      content: `A saúde da mulher após os 40 anos passa por transformações importantes — hormonal, metabólica e emocional.

A Saúde Funcional oferece uma abordagem integrada que considera sono, nutrição anti-inflamatória, movimento adaptado, gestão do estresse e suporte emocional.

Cada mulher é única. Sintomas como fadiga, alterações de humor e dificuldade para dormir merecem investigação holística, não apenas soluções pontuais.

Com acompanhamento personalizado, é possível recuperar energia, equilíbrio e qualidade de vida de forma sustentável.`,
    },
    en: {
      title: "Women's health",
      excerpt:
        "Integrated care for women 40+ at every stage of life.",
      metaDescription:
        "Women's health after 40: hormonal balance, energy, nutrition, and well-being with a functional approach.",
      content: `Women's health after 40 goes through important transformations — hormonal, metabolic, and emotional.

Functional Health offers an integrated approach considering sleep, anti-inflammatory nutrition, adapted movement, stress management, and emotional support.

Every woman is unique. Symptoms like fatigue, mood changes, and sleep difficulties deserve holistic investigation, not just quick fixes.

With personalized support, it's possible to regain energy, balance, and quality of life sustainably.`,
    },
  },
  {
    slug: "respiracao-consciente",
    category: "breathing",
    date: "2026-07-10",
    readTime: 4,
    pt: {
      title: "Respiração consciente",
      excerpt:
        "Uma ferramenta simples e poderosa para reduzir estresse e aumentar bem-estar.",
      metaDescription:
        "Aprenda técnicas de respiração consciente para reduzir ansiedade, estresse e melhorar sua saúde funcional.",
      content: `A respiração é a ponte entre corpo e mente. Técnicas de respiração consciente ativam o sistema nervoso parassimpático, responsável pelo relaxamento.

Uma prática simples: inspire pelo nariz contando até 4, segure por 4, expire pela boca contando até 6. Repita por 5 minutos.

Essa técnica pode ser feita em qualquer lugar — ao acordar, antes de dormir ou em momentos de estresse.

Integrada aos outros pilares da Saúde Funcional, a respiração consciente potencializa seus resultados de forma acessível e imediata.`,
    },
    en: {
      title: "Conscious breathing",
      excerpt:
        "A simple, powerful tool to reduce stress and increase well-being.",
      metaDescription:
        "Learn conscious breathing techniques to reduce anxiety, stress, and improve your functional health.",
      content: `Breathing is the bridge between body and mind. Conscious breathing techniques activate the parasympathetic nervous system, responsible for relaxation.

A simple practice: inhale through your nose counting to 4, hold for 4, exhale through your mouth counting to 6. Repeat for 5 minutes.

This technique can be done anywhere — upon waking, before bed, or during stressful moments.

Integrated with other Functional Health pillars, conscious breathing amplifies your results in an accessible, immediate way.`,
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  slug: string,
  category: BlogCategory,
  limit = 3
): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function getAllCategories(): BlogCategory[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
