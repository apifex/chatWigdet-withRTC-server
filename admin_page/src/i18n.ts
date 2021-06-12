import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

const resources = {
    en: {
        translation: {
            "Welcome" : "Welcome",
            "Login" : "Login",
            "Password" : "Password",
            "Settings" : "Settings",
            "Save" : "Save",
            "Telegram's username" : "Telegram's username",
            "Phone number assotiated with Whatsapp" : "Phone number assotiated with Whatsapp",
            "Save and Activate" : "Save and Activate",
            "Cancel" : "Cancel",
            "History" : "History",
            "Contact" : "Contact",
            "Log out" : "Log out"
        }
    },
    fr: {
        translation: {
            "Welcome" : "Bienvenue",
            "Login" : "Nom d'utilisateur",
            "Password" : "Mot de pass",
            "Settings" : "Réglage",
            "Save" : "Sauvegarder",
            "Telegram's username" : "Le nom d'utilisateur de Telegram",
            "Phone number assotiated with Whatsapp" : "Le numéro de portable associé à Whatsapp",
            "Save and Activate" : "Sauvegarder et activer",
            "Cancel" : "Abandonner",
            "History" : "Histoire",
            "Contact" : "Contact",
            "Log out" : "Se déconnecter"
        },
    },
    pl: {
        translation: {
            "Welcome" : "Witaj",
            "Login" : "Nazwa użytkownika",
            "Password" : "Hasło",
            "Settings" : "Ustawienia",
            "Save" : "Zapisz",
            "Telegram's username" : "Nazwa użytkownika Telegramu",
            "Phone number assotiated with Whatsapp" : "Numer przypisany do Whatsappa",
            "Save and Activate" : "Zpisz i aktywuj",
            "Cancel" : "Wyjdź",
            "History" : "Historia",
            "Contact" : "Kontakt",
            "Log out" : "Wyloguj"
        }
    
    }
    
}

i18n.use(initReactI18next)
.init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
})

export default i18n;