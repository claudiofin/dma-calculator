export const fr = {
    // General
    app_title: 'DMA Calculator 2026',
    app_subtitle: 'Simulez les coûts App Store & Play Store en Europe.',
    annual_savings: 'ÉCONOMIES ANNUELLES',
    savings_comparison_external: "Économies vs IAP Standard avec le modèle External sélectionné",
    savings_comparison_iap: "Pas d'économies - vous utilisez déjà IAP Standard",
    monthly_savings: 'Économies: {amount}/mois',

    // Inputs
    business_params: 'Paramètres commerciaux',
    monthly_users: 'Utilisateurs payants mensuels',
    monthly_users_total: 'Utilisateurs payants mensuels (Total)',
    platform_split: 'Répartition: iOS {ios}% / Android {android}%',
    monthly_price: "Prix de l'abonnement (€)",
    conversion_impact: 'Baisse du taux de conversion (%)',
    conversion_desc: "Dû aux écrans d'avertissement obligatoires.",
    user_age: "Âge de l'utilisateur (Mois)",
    user_age_desc: "Pertinent pour l'Initial Acquisition Fee (2-3% les 6 premiers mois).",
    small_business: 'Programme Small Business',
    small_business_warning: '⚠️ Revenus > 1M$. Vous pourriez ne pas qualifier pour Small Business.',
    subscription_after_year: 'Abonnement après la 1ère année',
    subscription_after_year_desc: 'IAP descend à 15% après la première année',
    users: 'utilisateurs',

    // Stores
    apple_store: 'Apple App Store',
    google_store: 'Google Play Store',
    commission_total: 'COMMISSION TOTALE',
    monthly_costs: 'Coûts mensuels:',
    monthly_net: 'Net mensuel:',

    // Models
    iap_standard: 'IAP Standard',
    ext_tier1: 'External (Tier 1)',
    ext_tier2: 'External (Tier 2)',

    // Details
    commission_apple: 'Commission Apple',
    commission_google: 'Commission Google',
    discovery_full: 'Découverte complète',
    conversion_max: 'Conversion max (FaceID)',
    ctc: 'CTC',
    store_services: 'Store Services',
    stripe: 'Stripe',
    iaf: 'Initial Acquisition Fee',
    iaf_sb_exempt: 'IAF: 0% (Exempté Small Business)',
    iaf_desc: '{rate}% (6 premiers mois)',

    // Actions
    implementation_guide: "Guide d'implémentation",
    open_glossary: 'Ouvrir le glossaire',
    close_glossary: 'Fermer le glossaire',

    // Glossary
    glossary_btn_open: 'Ouvrir le glossaire des termes',
    glossary_btn_close: 'Masquer le glossaire',

    // Glossary Terms
    glossary_DMA_title: 'Digital Markets Act',
    glossary_DMA_desc: 'Règlement UE obligeant les "gatekeepers" (Apple/Google) à autoriser des systèmes de paiement alternatifs.',
    glossary_IAP_title: 'In-App Purchase',
    glossary_IAP_desc: "Système de paiement natif. Apple/Google gèrent tout et gardent 15-30% de commission.",
    glossary_ExternalPurchase_title: 'External Purchase / Offers',
    glossary_ExternalPurchase_desc: "Lien emmenant l'utilisateur hors de l'app (vers le web). Frais réduits mais plus de friction (écrans d'avertissement).",
    glossary_IAF_title: 'Initial Acquisition Fee',
    glossary_IAF_desc: "Frais temporaires sur les nouveaux utilisateurs. Apple: 2% (6 premiers mois). Google: 3% (6 premiers mois).",
    glossary_CTC_title: 'Core Technology Commission',
    glossary_CTC_desc: "Nouveau frais Apple (5%) sur les ventes numériques, remplaçant l'ancien Core Technology Fee depuis Jan 2026.",
    glossary_Tier1_title: 'Store Services Tier 1',
    glossary_Tier1_desc: "Services store de base (hébergement, sécurité). Coût réduit, mais pas de découverte ou mises à jour auto.",
    glossary_Tier2_title: 'Store Services Tier 2',
    glossary_Tier2_desc: "Services complets (découverte, mise en avant, mises à jour auto). Coût plus élevé (Apple: 13% / Google: +10%).",
    glossary_WarningScreen_title: 'Warning Screen',
    glossary_WarningScreen_desc: "Écran obligatoire avertissant l'utilisateur qu'il quitte le store. Réduit la conversion (estimé -10/30%).",

    // Disclaimer
    disclaimer: 'Avertissement: Ceci est une simulation basée sur les politiques publiques. Pas de conseil financier.',

    // Guide Page
    guide_title: 'Guide',
    guide_page_title: 'Comment fonctionne le DMA?',
    guide_page_subtitle: 'Un guide étape par étape pour intégrer les paiements externes et économiser sur les commissions.',

    guide_step1_title: '1. Choisissez votre modèle commercial',
    guide_step1_desc: 'Décidez si vous restez avec IAP (In-App Purchase) ou utilisez des liens externes pour les paiements web.',
    guide_step2_title: '2. Implémentez les External Links',
    guide_step2_desc: 'Si vous choisissez le store externe, vous devez implémenter "External Purchase Link Entitlements" (Apple) ou "External Offers" (Google).',
    guide_step3_title: "3. Gérez l'écran d'avertissement",
    guide_step3_desc: "L'utilisateur verra un avertissement qu'il quitte l'app. Cela réduit la conversion (estimé -15/30%). Optimisez le design.",
    guide_step4_title: '4. Paiement Web (Stripe)',
    guide_step4_desc: "L'utilisateur arrive sur votre site. Ici les coûts de transaction sont beaucoup plus bas (ex. Stripe ~2.9% vs Apple 30%).",
    guide_step5_title: '5. Calcul des commissions',
    guide_step5_desc: "En fin de mois, Apple/Google vous enverront une facture pour les commissions dues (CTC + Store Services) sur les ventes numériques trackées.",

    guide_when_title: '🤔 Quand External Purchase est-il intéressant?',
    guide_pros_title: '✅ C\'est intéressant si:',
    guide_pros_1: "Vous n'êtes pas Small Business (30% → ~15%)",
    guide_pros_2: 'Vous avez déjà un système de paiement web consolidé',
    guide_pros_3: 'Votre app a une haute rétention/fidélité',
    guide_cons_title: "❌ Ce N'EST PAS intéressant si:",
    guide_cons_1: 'Vous êtes déjà Small Business (15% vs ~13%)',
    guide_cons_2: 'Votre conversion est très sensible aux avertissements',
    guide_cons_3: "Vous n'avez pas d'infrastructure pour gérer les paiements",

    guide_rules_title: '⚠️ Règles importantes',
    guide_rule_1: 'Vous NE POUVEZ PAS offrir IAP + External ensemble dans la même app',
    guide_rule_2: "Uniquement pour les utilisateurs dans l'Union Européenne (EEE)",
    guide_rule_3: "Vous devez afficher l'écran d'avertissement obligatoire",
    guide_rule_4: 'Vous devez signaler TOUTES les transactions à Apple/Google',

    guide_apple_title: '🍎 Comment adhérer - Apple',
    guide_apple_step1: 'Connectez-vous à App Store Connect',
    guide_apple_step2: 'Allez dans Agreements → "Alternative Terms Addendum for Apps in the EU"',
    guide_apple_step3: "Signez l'addendum (nécessite Account Holder)",
    guide_apple_step4: "Dans Xcode, ajoutez l'entitlement: com.apple.developer.storekit.external-purchase-link",
    guide_apple_step5: 'Implémentez les StoreKit External Purchase APIs',
    guide_apple_step6: "Soumettez l'app pour review",

    guide_google_title: '🤖 Comment adhérer - Google',
    guide_google_step1: 'Connectez-vous à Google Play Console',
    guide_google_step2: 'Allez dans Policy → External Offers Program',
    guide_google_step3: "Complétez l'inscription en tant que Business",
    guide_google_step4: 'Choisissez le Service Tier (1 ou 2)',
    guide_google_step5: 'Intégrez les External Offers APIs',
    guide_google_step6: 'Signalez les transactions dans les 24 heures',

    guide_sources_title: '🔗 Sources officielles',

    // FAQ Section
    faq_title: '❓ Questions fréquentes',
    faq_sources_title: '🔗 Sources officielles',
    faq_updated: '📅 Tarifs mis à jour le:',

    faq_q1: 'Qu\'est-ce qui change avec le DMA à partir du 1er janvier 2026?',
    faq_a1: 'Apple remplace le Core Technology Fee (€0.50/install) par Core Technology Commission (5% sur les ventes). Google garde le modèle External Offers mais ajoute des options Tier.',
    faq_q2: 'Dois-je passer à External Purchase?',
    faq_a2: 'Ça dépend! Si vous êtes Small Business (< $1M de revenus), IAP à 15% pourrait être mieux qu\'External (~13%) en considérant la baisse de conversion.',
    faq_q3: "Comment fonctionne l'écran d'avertissement?",
    faq_a3: "Quand un utilisateur clique sur un lien d'achat externe, Apple/Google affichent un avertissement obligatoire. Cela réduit la conversion de 10-30%.",
    faq_q4: 'Puis-je utiliser IAP et External dans la même app?',
    faq_a4: "Non. Si vous choisissez External Purchase pour un pays EU, vous ne pouvez pas offrir IAP sur le même storefront.",
    faq_q5: 'Les tarifs sont-ils les mêmes dans toute l\'Europe?',
    faq_a5: 'Pour Apple oui. Pour Google les commissions % sont les mêmes, mais les frais fixes pour téléchargements externes varient par pays.',
    faq_q6: 'Comment adhérer au programme External Purchase?',
    faq_a6: "Apple: Signez l'Alternative Terms Addendum dans App Store Connect et implémentez les StoreKit APIs. Google: Inscrivez-vous au External Offers Program.",

    disclaimer_title: '⚠️ Avertissement légal',
    disclaimer_intro: "Cette application fournit des estimations basées sur les politiques publiques d'Apple et Google mises à jour le",
    disclaimer_factors: 'Les commissions réelles peuvent varier selon:',
    disclaimer_factor1: 'Accords spécifiques avec le développeur',
    disclaimer_factor2: "Catégories d'apps spéciales (jeux, médias, etc.)",
    disclaimer_factor3: 'Promotions temporaires',
    disclaimer_vat: "⚠️ TVA exclue: Ce calculateur n'inclut pas la TVA. La TVA est payée séparément et varie par pays UE (19-27%). Cela ne change pas quel modèle (IAP vs External) est le plus avantageux.",
    disclaimer_warning: "Ceci ne constitue pas un conseil fiscal, juridique ou commercial. Consultez un professionnel.",
};
