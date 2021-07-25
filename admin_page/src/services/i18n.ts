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
            "Log out" : "Log out",
            "Log in" : "Log in",
            "Add Telegram Token" : "Add Telegram Token",
            "Account" : "Account",
            "No conversations in history" : "No conversations in history",
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
            "Log in" : "Se connecter",
            "Log out" : "Se déconnecter",
            "Add Telegram Token" : "Ajoute Telegram Token",
            "Account" : "Compte",
            "No conversations in history" : "Pas de conversation dans l'histoire",
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
            "Log in" : "Zaloguj",
            "Log out" : "Wyloguj",
            "Add Telegram Token" : "Dodaj Telegram Token",
            "Account" : "Konto",
            "No conversations in history" : "Brak rozmow w historii",
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