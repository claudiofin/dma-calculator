export const en = {
    // General
    app_title: 'DMA Calculator 2026',
    app_subtitle: 'Simulate App Store & Play Store costs in Europe.',
    annual_savings: 'ANNUAL SAVINGS',
    savings_comparison: 'Savings from switching from IAP Standard to your selected External model',
    monthly_savings: 'Savings: {amount}/mo',

    // Inputs
    business_params: 'Business Parameters',
    monthly_users: 'Monthly Paying Users',
    monthly_users_total: 'Monthly Paying Users (Total)',
    platform_split: 'Platform Split: iOS {ios}% / Android {android}%',
    monthly_price: 'Subscription Price (€)',
    conversion_impact: 'Conversion Rate Drop (%)',
    conversion_desc: 'Due to mandatory warning screens.',
    user_age: 'User Age (Months)',
    user_age_desc: 'Relevant for Initial Acquisition Fee (2-3% first 6 months).',
    small_business: 'Small Business Program',
    small_business_warning: '⚠️ Revenue > 1M$. You might not qualify for Small Business.',
    subscription_after_year: 'Subscription after 1st year',
    subscription_after_year_desc: 'IAP drops to 15% after the first year',
    users: 'users',

    // Stores
    apple_store: 'Apple App Store',
    google_store: 'Google Play Store',
    commission_total: 'TOTAL COMMISSION',
    monthly_costs: 'Monthly Costs:',
    monthly_net: 'Monthly Net:',

    // Models
    iap_standard: 'IAP Standard',
    ext_tier1: 'External (Tier 1)',
    ext_tier2: 'External (Tier 2)',

    // Details
    commission_apple: 'Apple Commission',
    commission_google: 'Google Commission',
    discovery_full: 'Full Discovery',
    conversion_max: 'Max Conversion (FaceID)',
    ctc: 'CTC',
    store_services: 'Store Services',
    stripe: 'Stripe',
    iaf: 'Initial Acquisition Fee',
    iaf_sb_exempt: 'IAF: 0% (Small Business Exempt)',
    iaf_desc: '{rate}% (first 6 months)',

    // Actions
    implementation_guide: 'Implementation Guide',
    open_glossary: 'Open Glossary',
    close_glossary: 'Close Glossary',

    // Glossary
    glossary_btn_open: 'Open Term Glossary',
    glossary_btn_close: 'Hide Glossary',

    // Glossary Terms
    glossary_DMA_title: 'Digital Markets Act',
    glossary_DMA_desc: 'EU regulation mandating "gatekeepers" (Apple/Google) to allow alternative payment systems.',
    glossary_IAP_title: 'In-App Purchase',
    glossary_IAP_desc: "Native payment system. Apple/Google handle everything and keep 15-30% commission.",
    glossary_ExternalPurchase_title: 'External Purchase / Offers',
    glossary_ExternalPurchase_desc: 'Link taking user out of app (to web) to complete purchase. Lower fees but higher friction (warning screens).',
    glossary_IAF_title: 'Initial Acquisition Fee',
    glossary_IAF_desc: "Temporary fee on new users. Apple: 2% (first 6 months). Google: 3% (first 6 months).",
    glossary_CTC_title: 'Core Technology Commission',
    glossary_CTC_desc: "New Apple fee (5%) on digital sales, replacing the old Core Technology Fee from Jan 2026.",
    glossary_Tier1_title: 'Store Services Tier 1',
    glossary_Tier1_desc: "Basic store services (hosting, security). Lower cost, but no discovery or auto-updates.",
    glossary_Tier2_title: 'Store Services Tier 2',
    glossary_Tier2_desc: "Full services (discovery, featuring, auto-updates). Higher cost (Apple: 13% / Google: +10%).",
    glossary_WarningScreen_title: 'Warning Screen',
    glossary_WarningScreen_desc: "Mandatory screen warning user they are leaving the store. Reduces conversion (estimated -10/30%).",

    // Disclaimer
    disclaimer: 'Disclaimer: This is a simulation based on public policies. Not financial advice.',

    // Guide Page
    guide_title: 'Guide',
    guide_page_title: 'How Does DMA Work?',
    guide_page_subtitle: 'A step-by-step guide to integrate external payments and save on commissions.',

    guide_step1_title: '1. Choose Your Business Model',
    guide_step1_desc: 'Decide whether to stay with IAP (In-App Purchase) or use external links for web payments.',
    guide_step2_title: '2. Implement External Links',
    guide_step2_desc: 'If you choose external store, you must implement "External Purchase Link Entitlements" (Apple) or "External Offers" (Google). This requires showing a warning screen to the user.',
    guide_step3_title: '3. Handle the Warning Screen',
    guide_step3_desc: 'The user will see a warning that they are leaving the app. This reduces conversion (estimated -15/30%). Optimize the design to reassure them.',
    guide_step4_title: '4. Web Payment (Stripe)',
    guide_step4_desc: 'The user lands on your website. Here transaction costs are much lower (e.g. Stripe ~2.9% vs Apple 30%).',
    guide_step5_title: '5. Commission Calculation',
    guide_step5_desc: 'At the end of the month, Apple/Google will send you an invoice for the commissions due (CTC + Store Services) on tracked digital sales.',

    guide_when_title: '🤔 When Does External Purchase Make Sense?',
    guide_pros_title: '✅ It makes sense if:',
    guide_pros_1: "You're not Small Business (30% → ~15%)",
    guide_pros_2: 'You already have a consolidated web payment system',
    guide_pros_3: 'Your app has high retention/loyalty',
    guide_cons_title: "❌ It does NOT make sense if:",
    guide_cons_1: "You're already Small Business (15% vs ~13%)",
    guide_cons_2: 'Your conversion is very sensitive to warnings',
    guide_cons_3: "You don't have infrastructure to handle payments",

    guide_rules_title: '⚠️ Important Rules',
    guide_rule_1: 'You CANNOT offer IAP + External together in the same app',
    guide_rule_2: 'Only for users in the European Union (EEA)',
    guide_rule_3: 'You must show the mandatory warning screen',
    guide_rule_4: 'You must report ALL transactions to Apple/Google',

    guide_apple_title: '🍎 How to Enroll - Apple',
    guide_apple_step1: 'Log in to App Store Connect',
    guide_apple_step2: 'Go to Agreements → "Alternative Terms Addendum for Apps in the EU"',
    guide_apple_step3: 'Sign the addendum (requires Account Holder)',
    guide_apple_step4: 'In Xcode, add the entitlement: com.apple.developer.storekit.external-purchase-link',
    guide_apple_step5: 'Implement the StoreKit External Purchase APIs',
    guide_apple_step6: 'Submit the app for review',

    guide_google_title: '🤖 How to Enroll - Google',
    guide_google_step1: 'Log in to Google Play Console',
    guide_google_step2: 'Go to Policy → External Offers Program',
    guide_google_step3: 'Complete registration as a Business',
    guide_google_step4: 'Choose the Service Tier (1 or 2)',
    guide_google_step5: 'Integrate the External Offers APIs',
    guide_google_step6: 'Report transactions within 24 hours',

    guide_sources_title: '🔗 Official Sources',

    // FAQ Section
    faq_title: '❓ Frequently Asked Questions',
    faq_sources_title: '🔗 Official Sources',
    faq_updated: '📅 Rates updated on:',

    faq_q1: 'What changes with DMA from January 1, 2026?',
    faq_a1: 'Apple replaces the Core Technology Fee (€0.50/install) with Core Technology Commission (5% on sales). Google keeps the External Offers model but adds Tier options.',
    faq_q2: 'Should I switch to External Purchase?',
    faq_a2: "It depends! If you're Small Business (< $1M revenue), IAP at 15% might be better than External (~13%) considering the conversion drop due to warning screens. Use the calculator to simulate your case.",
    faq_q3: 'How does the warning screen work?',
    faq_a3: "When a user clicks an external purchase link, Apple/Google show a mandatory warning explaining they're leaving the app. This reduces conversion by 10-30% according to estimates.",
    faq_q4: 'Can I use both IAP and External in the same app?',
    faq_a4: "No. If you choose External Purchase for an EU country, you can't also offer IAP on the same storefront. You must choose one model for the entire region.",
    faq_q5: 'Are the rates the same across all of Europe?',
    faq_a5: 'For Apple yes. For Google the % commissions are the same, but fixed fees for external downloads vary by country (e.g. €0.10 in Romania vs €1.90 in Germany).',
    faq_q6: 'How do I join the External Purchase program?',
    faq_a6: "Apple: Sign the Alternative Terms Addendum in App Store Connect and implement StoreKit APIs. Google: Sign up for the External Offers Program in Play Console and integrate the APIs.",

    disclaimer_title: '⚠️ Legal Disclaimer',
    disclaimer_intro: 'This application provides estimates based on public policies from Apple and Google updated on',
    disclaimer_factors: 'Actual commissions may vary based on:',
    disclaimer_factor1: 'Specific agreements with the developer',
    disclaimer_factor2: 'Special app categories (games, media, etc.)',
    disclaimer_factor3: 'Temporary promotions',
    disclaimer_warning: 'This does not constitute tax, legal, or commercial advice. Consult a professional before making decisions based on these estimates.',
};
