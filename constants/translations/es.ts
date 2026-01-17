export const es = {
    // General
    app_title: 'DMA Calculator 2026',
    app_subtitle: 'Simula los costes de App Store y Play Store en Europa.',
    annual_savings: 'AHORRO ANUAL',
    savings_comparison_external: 'Ahorro vs IAP Standard usando el modelo External seleccionado',
    savings_comparison_iap: 'Sin ahorro - ya estás usando IAP Standard',
    monthly_savings: 'Ahorro: {amount}/mes',

    // Inputs
    business_params: 'Parámetros de negocio',
    monthly_users: 'Usuarios de pago mensuales',
    monthly_users_total: 'Usuarios de pago mensuales (Total)',
    platform_split: 'División de plataformas: iOS {ios}% / Android {android}%',
    monthly_price: 'Precio de suscripción (€)',
    conversion_impact: 'Caída de tasa de conversión (%)',
    conversion_desc: 'Debido a las pantallas de advertencia obligatorias.',
    user_age: 'Antigüedad del usuario (Meses)',
    user_age_desc: 'Relevante para Initial Acquisition Fee (2-3% primeros 6 meses).',
    small_business: 'Programa Small Business',
    small_business_warning: '⚠️ Ingresos > 1M$. Podrías no calificar para Small Business.',
    subscription_after_year: 'Suscripción después del 1er año',
    subscription_after_year_desc: 'IAP baja al 15% después del primer año',
    users: 'usuarios',

    // Stores
    apple_store: 'Apple App Store',
    google_store: 'Google Play Store',
    commission_total: 'COMISIÓN TOTAL',
    monthly_costs: 'Costes mensuales:',
    monthly_net: 'Neto mensual:',

    // Models
    iap_standard: 'IAP Standard',
    ext_tier1: 'External (Tier 1)',
    ext_tier2: 'External (Tier 2)',

    // Details
    commission_apple: 'Comisión Apple',
    commission_google: 'Comisión Google',
    discovery_full: 'Descubrimiento completo',
    conversion_max: 'Conversión máxima (FaceID)',
    ctc: 'CTC',
    store_services: 'Store Services',
    stripe: 'Stripe',
    iaf: 'Initial Acquisition Fee',
    iaf_sb_exempt: 'IAF: 0% (Exento Small Business)',
    iaf_desc: '{rate}% (primeros 6 meses)',

    // Actions
    implementation_guide: 'Guía de implementación',
    open_glossary: 'Abrir glosario',
    close_glossary: 'Cerrar glosario',

    // Glossary
    glossary_btn_open: 'Abrir glosario de términos',
    glossary_btn_close: 'Ocultar glosario',

    // Glossary Terms
    glossary_DMA_title: 'Digital Markets Act',
    glossary_DMA_desc: 'Regulación UE que obliga a los "gatekeepers" (Apple/Google) a permitir sistemas de pago alternativos.',
    glossary_IAP_title: 'In-App Purchase',
    glossary_IAP_desc: "Sistema de pago nativo. Apple/Google gestionan todo y retienen 15-30% de comisión.",
    glossary_ExternalPurchase_title: 'External Purchase / Offers',
    glossary_ExternalPurchase_desc: 'Enlace que lleva al usuario fuera de la app (a la web). Tarifas más bajas pero más fricción (pantallas de advertencia).',
    glossary_IAF_title: 'Initial Acquisition Fee',
    glossary_IAF_desc: "Tarifa temporal en nuevos usuarios. Apple: 2% (primeros 6 meses). Google: 3% (primeros 6 meses).",
    glossary_CTC_title: 'Core Technology Commission',
    glossary_CTC_desc: "Nueva tarifa Apple (5%) en ventas digitales, reemplazando el antiguo Core Technology Fee desde Ene 2026.",
    glossary_Tier1_title: 'Store Services Tier 1',
    glossary_Tier1_desc: "Servicios básicos del store (hosting, seguridad). Menor coste, pero sin descubrimiento o actualizaciones auto.",
    glossary_Tier2_title: 'Store Services Tier 2',
    glossary_Tier2_desc: "Servicios completos (descubrimiento, destacados, actualizaciones auto). Mayor coste (Apple: 13% / Google: +10%).",
    glossary_WarningScreen_title: 'Warning Screen',
    glossary_WarningScreen_desc: "Pantalla obligatoria advirtiendo al usuario que abandona el store. Reduce conversión (estimado -10/30%).",

    // Disclaimer
    disclaimer: 'Aviso: Esta es una simulación basada en políticas públicas. No es asesoramiento financiero.',

    // Guide Page
    guide_title: 'Guía',
    guide_page_title: '¿Cómo funciona el DMA?',
    guide_page_subtitle: 'Una guía paso a paso para integrar pagos externos y ahorrar en comisiones.',

    guide_step1_title: '1. Elige tu modelo de negocio',
    guide_step1_desc: 'Decide si quedarte con IAP (In-App Purchase) o usar enlaces externos para pagos web.',
    guide_step2_title: '2. Implementa los External Links',
    guide_step2_desc: 'Si eliges store externo, debes implementar "External Purchase Link Entitlements" (Apple) o "External Offers" (Google).',
    guide_step3_title: '3. Gestiona la pantalla de advertencia',
    guide_step3_desc: 'El usuario verá una advertencia de que abandona la app. Esto reduce la conversión (estimado -15/30%). Optimiza el diseño.',
    guide_step4_title: '4. Pago Web (Stripe)',
    guide_step4_desc: 'El usuario llega a tu sitio web. Aquí los costes de transacción son mucho más bajos (ej. Stripe ~2.9% vs Apple 30%).',
    guide_step5_title: '5. Cálculo de comisiones',
    guide_step5_desc: 'A final de mes, Apple/Google te enviarán una factura por las comisiones debidas (CTC + Store Services) en ventas digitales rastreadas.',

    guide_when_title: '🤔 ¿Cuándo tiene sentido External Purchase?',
    guide_pros_title: '✅ Tiene sentido si:',
    guide_pros_1: 'No eres Small Business (30% → ~15%)',
    guide_pros_2: 'Ya tienes un sistema de pago web consolidado',
    guide_pros_3: 'Tu app tiene alta retención/fidelidad',
    guide_cons_title: '❌ NO tiene sentido si:',
    guide_cons_1: 'Ya eres Small Business (15% vs ~13%)',
    guide_cons_2: 'Tu conversión es muy sensible a las advertencias',
    guide_cons_3: 'No tienes infraestructura para gestionar pagos',

    guide_rules_title: '⚠️ Reglas importantes',
    guide_rule_1: 'NO puedes ofrecer IAP + External juntos en la misma app',
    guide_rule_2: 'Solo para usuarios en la Unión Europea (EEE)',
    guide_rule_3: 'Debes mostrar la pantalla de advertencia obligatoria',
    guide_rule_4: 'Debes reportar TODAS las transacciones a Apple/Google',

    guide_apple_title: '🍎 Cómo unirse - Apple',
    guide_apple_step1: 'Inicia sesión en App Store Connect',
    guide_apple_step2: 'Ve a Agreements → "Alternative Terms Addendum for Apps in the EU"',
    guide_apple_step3: 'Firma el addendum (requiere Account Holder)',
    guide_apple_step4: 'En Xcode, añade el entitlement: com.apple.developer.storekit.external-purchase-link',
    guide_apple_step5: 'Implementa las StoreKit External Purchase APIs',
    guide_apple_step6: 'Envía la app para revisión',

    guide_google_title: '🤖 Cómo unirse - Google',
    guide_google_step1: 'Inicia sesión en Google Play Console',
    guide_google_step2: 'Ve a Policy → External Offers Program',
    guide_google_step3: 'Completa el registro como Business',
    guide_google_step4: 'Elige el Service Tier (1 o 2)',
    guide_google_step5: 'Integra las External Offers APIs',
    guide_google_step6: 'Reporta las transacciones en 24 horas',

    guide_sources_title: '🔗 Fuentes oficiales',

    // FAQ Section
    faq_title: '❓ Preguntas frecuentes',
    faq_sources_title: '🔗 Fuentes oficiales',
    faq_updated: '📅 Tarifas actualizadas el:',

    faq_q1: '¿Qué cambia con el DMA a partir del 1 de enero de 2026?',
    faq_a1: 'Apple reemplaza el Core Technology Fee (€0.50/install) por Core Technology Commission (5% en ventas). Google mantiene el modelo External Offers pero añade opciones de Tier.',
    faq_q2: '¿Debería cambiar a External Purchase?',
    faq_a2: '¡Depende! Si eres Small Business (< $1M de ingresos), IAP al 15% podría ser mejor que External (~13%) considerando la caída de conversión.',
    faq_q3: '¿Cómo funciona la pantalla de advertencia?',
    faq_a3: 'Cuando un usuario hace clic en un enlace de compra externa, Apple/Google muestran una advertencia obligatoria. Esto reduce la conversión un 10-30%.',
    faq_q4: '¿Puedo usar tanto IAP como External en la misma app?',
    faq_a4: 'No. Si eliges External Purchase para un país EU, no puedes ofrecer también IAP en el mismo storefront.',
    faq_q5: '¿Son las tarifas iguales en toda Europa?',
    faq_a5: 'Para Apple sí. Para Google las comisiones % son iguales, pero las tarifas fijas para descargas externas varían por país.',
    faq_q6: '¿Cómo me uno al programa External Purchase?',
    faq_a6: 'Apple: Firma el Alternative Terms Addendum en App Store Connect e implementa las StoreKit APIs. Google: Regístrate en el External Offers Program.',

    disclaimer_title: '⚠️ Aviso legal',
    disclaimer_intro: 'Esta aplicación proporciona estimaciones basadas en políticas públicas de Apple y Google actualizadas el',
    disclaimer_factors: 'Las comisiones reales pueden variar según:',
    disclaimer_factor1: 'Acuerdos específicos con el desarrollador',
    disclaimer_factor2: 'Categorías especiales de apps (juegos, medios, etc.)',
    disclaimer_factor3: 'Promociones temporales',
    disclaimer_warning: 'Esto no constituye asesoramiento fiscal, legal o comercial. Consulta a un profesional.',
};
