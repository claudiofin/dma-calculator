export const it = {
    // General
    app_title: 'DMA Calculator 2026',
    app_subtitle: 'Simula i costi App Store & Play Store in Europa.',
    annual_savings: 'RISPARMIO ANNUALE',
    savings_comparison_external: 'Risparmio vs IAP Standard usando il modello External selezionato',
    savings_comparison_iap: 'Nessun risparmio - stai già usando IAP Standard',
    monthly_savings: 'Risparmio: {amount}/mese',

    // Inputs
    business_params: 'Parametri Business',
    monthly_users: 'Utenti Paganti Mensili',
    monthly_users_total: 'Utenti Paganti Mensili (Totali)',
    platform_split: 'Split Piattaforme: iOS {ios}% / Android {android}%',
    monthly_price: 'Prezzo Abbonamento (€)',
    conversion_impact: 'Calo Conversion Rate (%)',
    conversion_desc: 'Dovuto agli warning screens obbligatori.',
    user_age: 'Età Utente (Mesi)',
    user_age_desc: "Importante per l'Initial Acquisition Fee (2-3% primi 6 mesi).",
    small_business: 'Small Business Program',
    small_business_warning: '⚠️ Fatturato > 1M$. Non dovresti essere Small Business.',
    subscription_after_year: 'Abbonamento dopo 1° anno',
    subscription_after_year_desc: 'IAP scende al 15% dopo il primo anno',
    users: 'utenti',

    // Stores
    apple_store: 'Apple App Store',
    google_store: 'Google Play Store',
    commission_total: 'COMMISSIONE TOTALE',
    monthly_costs: 'Costi Mensili:',
    monthly_net: 'Netto Mensile:',

    // Models
    iap_standard: 'IAP Standard',
    ext_tier1: 'External (Tier 1)',
    ext_tier2: 'External (Tier 2)',

    // Details
    commission_apple: 'Commissione Apple',
    commission_google: 'Commissione Google',
    discovery_full: 'Discovery completa',
    conversion_max: 'Conversione massima (FaceID)',
    ctc: 'CTC',
    store_services: 'Store Services',
    stripe: 'Stripe',
    iaf: 'Initial Acquisition Fee',
    iaf_sb_exempt: 'IAF: 0% (Esenzione Small Business)',
    iaf_desc: '{rate}% (primi 6 mesi)',

    // Actions
    implementation_guide: "Guida all'Implementazione",
    open_glossary: 'Apri Glossario',
    close_glossary: 'Chiudi Glossario',

    // Glossary
    glossary_btn_open: 'Apri Glossario Termini',
    glossary_btn_close: 'Nascondi Glossario',

    // Glossary Terms
    glossary_DMA_title: 'Digital Markets Act',
    glossary_DMA_desc: 'Regolamento UE che obbliga i "gatekeeper" (Apple/Google) a permettere sistemi di pagamento alternativi.',
    glossary_IAP_title: 'In-App Purchase',
    glossary_IAP_desc: "Sistema nativo di pagamento. Apple/Google gestiscono tutto e trattengono il 15-30% di commissione.",
    glossary_ExternalPurchase_title: 'External Purchase / Offers',
    glossary_ExternalPurchase_desc: "Link che porta l'utente fuori dall'app (sul web) per completare l'acquisto. Commissioni ridotte ma frizione maggiore (warning screens).",
    glossary_IAF_title: 'Initial Acquisition Fee',
    glossary_IAF_desc: "Commissione temporanea sui nuovi utenti. Apple: 2% (primi 6 mesi). Google: 3% (primi 6 mesi).",
    glossary_CTC_title: 'Core Technology Commission',
    glossary_CTC_desc: "Nuova fee Apple (5%) sulle vendite digitali, sostituisce il vecchio Core Technology Fee da Gennaio 2026.",
    glossary_Tier1_title: 'Store Services Tier 1',
    glossary_Tier1_desc: "Servizi base dello store (hosting, sicurezza). Costo ridotto, ma niente discovery o aggiornamenti automatici.",
    glossary_Tier2_title: 'Store Services Tier 2',
    glossary_Tier2_desc: "Servizi completi (discovery, featuring, aggiornamenti auto). Costa di più (Apple: 13% / Google: +10%).",
    glossary_WarningScreen_title: 'Warning Screen',
    glossary_WarningScreen_desc: "Schermata obbligatoria che avvisa l'utente che sta lasciando lo store. Riduce la conversione (stimata -10/30%).",

    // Disclaimer
    disclaimer: 'Disclaimer: Questa è una simulazione basata sulle policy pubbliche. Non costituisce consulenza fiscale.',

    // Guide Page
    guide_title: 'Guida',
    guide_page_title: 'Come Funziona il DMA?',
    guide_page_subtitle: 'Una guida passo-passo per integrare i pagamenti esterni e risparmiare sulle commissioni.',

    guide_step1_title: '1. Scegli il Modello di Business',
    guide_step1_desc: 'Decidi se rimanere nel sistema IAP (In-App Purchase) o utilizzare link esterni per i pagamenti sul web.',
    guide_step2_title: '2. Implementa gli External Link',
    guide_step2_desc: "Se scegli lo store esterno, devi implementare gli \"External Purchase Link Entitlements\" (Apple) o \"External Offers\" (Google). Questo richiede di mostrare uno schermo di avviso all'utente.",
    guide_step3_title: '3. Gestisci lo Warning Screen',
    guide_step3_desc: "L'utente vedrà un avviso che sta lasciando l'app. Questo riduce la conversione (stimata -15/30%). Ottimizza il design per rassicurarlo.",
    guide_step4_title: '4. Pagamento Web (Stripe)',
    guide_step4_desc: "L'utente atterra sul tuo sito. Qui i costi di transazione sono molto più bassi (es. Stripe ~2.9% vs Apple 30%).",
    guide_step5_title: '5. Calcolo della Commissione',
    guide_step5_desc: 'A fine mese, Apple/Google ti invieranno una fattura per le commissioni dovute (CTC + Store Services) sulle vendite digitali tracciate.',

    guide_when_title: '🤔 Quando Conviene External Purchase?',
    guide_pros_title: '✅ Conviene se:',
    guide_pros_1: 'Non sei Small Business (30% → ~15%)',
    guide_pros_2: 'Hai già un sistema di pagamento web consolidato',
    guide_pros_3: 'La tua app ha alta retention/fidelizzazione',
    guide_cons_title: '❌ NON conviene se:',
    guide_cons_1: 'Sei già Small Business (15% vs ~13%)',
    guide_cons_2: 'La tua conversione è molto sensibile ai warning',
    guide_cons_3: 'Non hai infrastruttura per gestire pagamenti',

    guide_rules_title: '⚠️ Regole Importanti',
    guide_rule_1: 'NON puoi offrire IAP + External insieme nella stessa app',
    guide_rule_2: "Solo per utenti nell'Unione Europea (EEA)",
    guide_rule_3: 'Devi mostrare il warning screen obbligatorio',
    guide_rule_4: 'Devi reportare TUTTE le transazioni a Apple/Google',

    guide_apple_title: '🍎 Come Aderire - Apple',
    guide_apple_step1: 'Accedi a App Store Connect',
    guide_apple_step2: 'Vai su Agreements → "Alternative Terms Addendum for Apps in the EU"',
    guide_apple_step3: "Firma l'addendum (richiede Account Holder)",
    guide_apple_step4: "In Xcode, aggiungi l'entitlement: com.apple.developer.storekit.external-purchase-link",
    guide_apple_step5: 'Implementa le StoreKit External Purchase APIs',
    guide_apple_step6: "Invia l'app per review",

    guide_google_title: '🤖 Come Aderire - Google',
    guide_google_step1: 'Accedi a Google Play Console',
    guide_google_step2: 'Vai su Policy → External Offers Program',
    guide_google_step3: 'Completa la registrazione come Business',
    guide_google_step4: 'Scegli il Service Tier (1 o 2)',
    guide_google_step5: 'Integra le External Offers APIs',
    guide_google_step6: 'Reporta le transazioni entro 24 ore',

    guide_sources_title: '🔗 Fonti Ufficiali',

    // FAQ Section
    faq_title: '❓ Domande Frequenti',
    faq_sources_title: '🔗 Fonti Ufficiali',
    faq_updated: '📅 Tariffe aggiornate al:',

    faq_q1: 'Cosa cambia con il DMA dal 1 Gennaio 2026?',
    faq_a1: 'Apple sostituisce il Core Technology Fee (€0.50/install) con il Core Technology Commission (5% sulle vendite). Google mantiene il modello External Offers ma aggiunge opzioni di Tier.',
    faq_q2: 'Conviene passare a External Purchase?',
    faq_a2: 'Dipende! Se sei Small Business (< 1M$ fatturato), IAP al 15% potrebbe convenire rispetto a External (~13%) considerando il calo di conversione dovuto ai warning screens. Usa il calcolatore per simulare il tuo caso.',
    faq_q3: 'Come funziona il warning screen?',
    faq_a3: "Quando un utente clicca su un link di acquisto esterno, Apple/Google mostrano un avviso obbligatorio che spiega che sta lasciando l'app. Questo riduce la conversione del 10-30% secondo le stime.",
    faq_q4: 'Posso usare sia IAP che External nella stessa app?',
    faq_a4: 'No. Se scegli External Purchase per un paese EU, non puoi offrire anche IAP sullo stesso storefront. Devi scegliere un modello per tutta la regione.',
    faq_q5: 'Le tariffe sono uguali in tutta Europa?',
    faq_a5: 'Per Apple sì. Per Google le commissioni % sono uguali, ma le fee fisse per download esterno variano per paese (es. €0.10 in Romania vs €1.90 in Germania).',
    faq_q6: 'Come aderisco al programma External Purchase?',
    faq_a6: "Apple: Firma l'Alternative Terms Addendum in App Store Connect e implementa le StoreKit APIs. Google: Iscriviti all'External Offers Program nella Play Console e integra le APIs.",

    disclaimer_title: '⚠️ Disclaimer Legale',
    disclaimer_intro: 'Questa applicazione fornisce stime basate sulle policy pubbliche di Apple e Google aggiornate al',
    disclaimer_factors: 'Le commissioni effettive potrebbero variare in base a:',
    disclaimer_factor1: 'Accordi specifici con il developer',
    disclaimer_factor2: 'Categorie speciali di app (giochi, media, ecc.)',
    disclaimer_factor3: 'Promozioni temporanee',
    disclaimer_vat: '⚠️ IVA: I calcoli sono basati su prezzi al netto dell\'IVA. L\'IVA (VAT) varia per paese UE (19-27%) ed è gestita separatamente dagli store. Non influisce sul confronto tra modelli.',
    disclaimer_warning: 'Non costituisce consulenza fiscale, legale o commerciale. Consulta un professionista prima di prendere decisioni basate su queste stime.',
};
