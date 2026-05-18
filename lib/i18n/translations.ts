export const translations = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_dashboard: 'Dashboard',
    nav_crops: 'Crops',
    nav_disease: 'Disease Detection',
    nav_mandi: 'Mandi Prices',
    
    // Sidebar
    menu: 'Menu',
    account: 'Account',
    crop_recommendation: 'Crop Recommendation',
    settings: 'Settings',
    logout: 'Logout',

    // Hero Section
    smart_farming: '🌱 Smart Farming Technology',
    hero_title: 'AI-Powered Agricultural Advisory',
    hero_subtitle: 'Get real-time crop recommendations, disease detection, mandi price insights, and personalized farming advice powered by advanced AI technology.',
    start_farming: 'Start Farming Smarter',
    learn_more: 'Learn More',

    // Stats
    active_farmers: 'Active Farmers',
    crops_monitored: 'Crops Monitored',
    predictions_daily: 'Predictions Daily',
    avg_yield_increase: 'Avg Yield Increase'
  },
  hi: {
    // Navigation
    nav_home: 'होम',
    nav_dashboard: 'डैशबोर्ड',
    nav_crops: 'फसलें',
    nav_disease: 'रोग पहचान',
    nav_mandi: 'मंडी भाव',

    // Sidebar
    menu: 'मेन्यू',
    account: 'खाता',
    crop_recommendation: 'फसल की सलाह',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',

    // Hero Section
    smart_farming: '🌱 स्मार्ट कृषि तकनीक',
    hero_title: 'AI-संचालित कृषि सलाहकार',
    hero_subtitle: 'उन्नत AI तकनीक द्वारा वास्तविक समय में फसल की सिफारिशें, रोग का पता लगाने, मंडी की कीमत की जानकारी और व्यक्तिगत खेती की सलाह प्राप्त करें।',
    start_farming: 'स्मार्ट खेती शुरू करें',
    learn_more: 'और जानें',

    // Stats
    active_farmers: 'सक्रिय किसान',
    crops_monitored: 'फसलों की निगरानी',
    predictions_daily: 'दैनिक भविष्यवाणियां',
    avg_yield_increase: 'औसत उपज वृद्धि'
  },
  kn: {
    // Navigation
    nav_home: 'ಮುಖಪುಟ',
    nav_dashboard: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    nav_crops: 'ಬೆಳೆಗಳು',
    nav_disease: 'ರೋಗ ಪತ್ತೆ',
    nav_mandi: 'ಮಂಡಿ ಬೆಲೆಗಳು',

    // Sidebar
    menu: 'ಮೆನು',
    account: 'ಖಾತೆ',
    crop_recommendation: 'ಬೆಳೆ ಶಿಫಾರಸು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್ ಔಟ್',

    // Hero Section
    smart_farming: '🌱 ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ',
    hero_title: 'AI-ಚಾಲಿತ ಕೃಷಿ ಸಲಹೆ',
    hero_subtitle: 'ಸುಧಾರಿತ AI ತಂತ್ರಜ್ಞಾನದಿಂದ ನಡೆಸಲ್ಪಡುವ ನೈಜ-ಸಮಯದ ಬೆಳೆ ಶಿಫಾರಸುಗಳು, ರೋಗ ಪತ್ತೆ, ಮಂಡಿ ಬೆಲೆ ಒಳನೋಟಗಳು ಮತ್ತು ವೈಯಕ್ತೀಕರಿಸಿದ ಕೃಷಿ ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ.',
    start_farming: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪ್ರಾರಂಭಿಸಿ',
    learn_more: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',

    // Stats
    active_farmers: 'ಸಕ್ರಿಯ ರೈತರು',
    crops_monitored: 'ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿದ ಬೆಳೆಗಳು',
    predictions_daily: 'ದೈನಂದಿನ ಮುನ್ಸೂಚನೆಗಳು',
    avg_yield_increase: 'ಸರಾಸರಿ ಇಳುವರಿ ಹೆಚ್ಚಳ'
  }
};

export type LanguageCode = 'en' | 'hi' | 'kn';
export type TranslationKey = keyof typeof translations.en;
