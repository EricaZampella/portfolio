import { createContext, useContext, useState } from 'react'

/* ─── Translations ───────────────────────────────────────────── */
export const translations = {
  en: {
    nav: {
      about:    'About',
      skills:   'Skills',
      projects: 'Projects',
      contact:  'Contact',
    },
    hero: {
      eyebrow:  'Data Analyst',
      subtitle: 'Turning raw data into actionable insights : from SQL pipelines to Python-driven analytics and customer segmentation.',
      cta1:     'View Projects',
      cta2:     'Contact Me',
      scroll:   'Scroll',
    },
    about: {
      tag:   '01. about',
      title: 'About Me',
      p1: 'Passionate Data Analyst with hands-on experience transforming complex, multi-source datasets into clear, actionable business strategies.',
      p2: 'I combine SQL and Python to handle every stage of the data pipeline : from raw data ingestion and cleaning to exploratory analysis, statistical modelling, and storytelling through visualization. My projects cover the full spectrum: building a structured data warehouse by integrating CRM and ERP sources, and performing deep e-commerce analytics on 1.5 million+ transaction records using diverse segmentation algorithms (RFM + K-Means).',
      p3: 'I enjoy finding the hidden patterns in data and translating them into decisions that matter, whether that\'s spotting seasonal revenue trends, profiling high-value customer clusters, or optimising logistics accuracy.',
      stat1: 'Records Analyzed',
      stat2: 'Projects Completed',
      stat3: 'Core Technologies',
    },
    skills: {
      tag:   '02. skills',
      title: 'Tech Stack',
      sql:         { desc: 'Advanced querying, stored procedures, window functions, CTEs, data warehouse design and ETL pipelines.' },
      python:      { desc: 'Data wrangling, statistical analysis, machine learning pipelines and interactive visualizations.' },
      excel:       { desc: 'PivotTables, dynamic dashboards, data modelling and advanced formula engineering.' },
      pandas:      { desc: 'DataFrame manipulation, group-by aggregations, merge/join strategies and time-series indexing.' },
      matplotlib:  { desc: 'Custom publication-quality charts: line, bar, scatter, histograms with full style control.' },
      seaborn:     { desc: 'Statistical visualization: heatmaps, pair plots, distribution plots and categorical analysis.' },
    },
    projects: {
      tag:   '03. projects',
      title: 'Featured Projects',
      p1: {
        title:  'E-commerce Analytics & Customer Segmentation',
        type:   'E-commerce · Python + SQL',
        desc:   'End-to-end analysis of the Brazilian Olist marketplace. Integrated SQL and Python to extract insights from over 1.5 million records — covering sales performance, logistics accuracy and advanced customer segmentation.',
        h1: 'Monthly revenue trend analysis with seasonality detection',
        h2: 'Logistics KPI: delivery delta vs. estimated date (histogram + KDE)',
        h3: 'RFM feature engineering + K-Means clustering for customer profiling',
        h4: 'Sentiment analysis on product reviews via TextBlob',
      },
      p2: {
        title:  'SQL Data Warehouse & Business Intelligence',
        type:   'Data Engineering · SQL',
        desc:   'Designed and built a fully normalised data warehouse from scratch, integrating CRM and ERP source systems. Delivered a complete suite of business intelligence queries, stored procedures and analytical reports.',
        h1: 'Data profiling & multi-layer cleaning pipeline (CRM + ERP)',
        h2: 'Sales performance over time — yearly, monthly, cumulative',
        h3: 'Customer & product reports with behavioural segmentation',
        h4: 'Stored procedures for automated table creation and data load',
      },
    },
    contact: {
      tag:   '04. contact',
      title: 'Get in Touch',
      intro: "I'm open to new opportunities — whether it's a full-time role, freelance project, or just a chat about data. Feel free to reach out through any of the channels below.",
      footerBuilt:    'Built with React + GSAP',
      footerDeployed: 'Deployed on Vercel',
    },
  },

  /* ─── Italian ─────────────────────────────────────────────── */
  it: {
    nav: {
      about:    'Chi sono',
      skills:   'Competenze',
      projects: 'Progetti',
      contact:  'Contatti',
    },
    hero: {
      eyebrow:  'Data Analyst',
      subtitle: 'Trasformo dati grezzi in insight concreti : da pipeline SQL ad analisi Python e segmentazione clienti.',
      cta1:     'Vedi Progetti',
      cta2:     'Contattami',
      scroll:   'Scorri',
    },
    about: {
      tag:   '01. chi sono',
      title: 'Chi sono',
      p1: 'Appassionata Data Analyst, con esperienza concreta nella trasformazione di dataset complessi e multi-sorgente in insights startegici di  business chiari e azionabili.',
      p2: 'Integro SQL e Python per gestire ogni fase della pipeline dati : ingestione e pulizia dati, analisi esplorativa, modellazione statistica e narrazione attraverso la visualizzazione. I miei progetti spaziano dalla costruzione di un data warehouse strutturato, integrando fonti CRM ed ERP, all\'analisi approfondita di un e-commerce con oltre 1,5 milioni di record transazionali mediante algoritmi di segmentazione (RFM + K-Means).',
      p3: 'Mi piace trovare i pattern nascosti nei dati e tradurli in decisioni concrete : che si tratti di individuare trend stagionali nei ricavi, profilare cluster di clienti ad alto valore o migliorare l\'accuratezza delle previsioni logistiche.',
      stat1: 'Record Analizzati',
      stat2: 'Progetti Completati',
      stat3: 'Tecnologie Core',
    },
    skills: {
      tag:   '02. competenze',
      title: 'Stack Tecnologico',
      sql:         { desc: 'Query avanzate, stored procedure, window function, CTE, progettazione data warehouse e pipeline ETL.' },
      python:      { desc: 'Manipolazione dati, analisi statistica, pipeline di machine learning e visualizzazioni interattive.' },
      excel:       { desc: 'PivotTable, dashboard dinamiche, modellazione dati e ingegneria di formule avanzate.' },
      pandas:      { desc: 'Manipolazione DataFrame, aggregazioni group-by, strategie merge/join e indicizzazione time-series.' },
      matplotlib:  { desc: 'Grafici personalizzati di qualità professionale: line, bar, scatter, istogrammi con pieno controllo stile.' },
      seaborn:     { desc: 'Visualizzazione statistica: heatmap, pair plot, distribuzioni e analisi di variabili categoriali.' },
    },
    projects: {
      tag:   '03. progetti',
      title: 'Progetti',
      p1: {
        title:  'Analytics E-commerce & Segmentazione Clienti',
        type:   'E-commerce · Python + SQL',
        desc:   'Analisi end-to-end del marketplace brasiliano Olist. Integrazione di SQL e Python per estrarre insight da oltre 1,5 milioni di record — trend di vendita, accuratezza logistica e segmentazione clienti avanzata.',
        h1: 'Analisi del trend mensile del fatturato con rilevamento stagionalità',
        h2: 'KPI logistici: delta consegna vs. data stimata (istogramma + KDE)',
        h3: 'Feature engineering RFM + clustering K-Means per la profilazione clienti',
        h4: 'Analisi del sentiment sulle recensioni prodotto tramite TextBlob',
      },
      p2: {
        title:  'Data Warehouse SQL & Business Intelligence',
        type:   'Data Engineering · SQL',
        desc:   'Progettazione e costruzione da zero di un data warehouse normalizzato, integrando sistemi CRM ed ERP. Suite completa di query BI, stored procedure e report analitici.',
        h1: 'Profiling dati e pipeline di pulizia multi-livello (CRM + ERP)',
        h2: 'Performance di vendita nel tempo — annuale, mensile, cumulativa',
        h3: 'Report clienti e prodotti con segmentazione comportamentale',
        h4: 'Stored procedure per creazione automatizzata tabelle e caricamento dati',
      },
    },
    contact: {
      tag:   '04. contatti',
      title: 'Contattami',
      intro: 'Sono aperta a nuove opportunità — che si tratti di un ruolo full-time, un progetto freelance o semplicemente una chiacchierata sui dati. Contattami tramite uno dei canali qui sotto.',
      footerBuilt:    'Realizzato con React + GSAP',
      footerDeployed: 'Deploy su Vercel',
    },
  },
}

/* ─── Context ────────────────────────────────────────────────── */
export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
