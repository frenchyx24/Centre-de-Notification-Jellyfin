# 🔔 Centre de Notification Jellyfin (Gist-Based)

[Français](#français) | [English](#english)

---

## Français

Ce plugin transforme votre serveur Jellyfin en un canal de communication direct avec vos utilisateurs. Grâce à une intégration fluide, vous pouvez diffuser des messages, des alertes de maintenance ou des nouveautés sans jamais toucher aux fichiers de votre serveur, simplement en mettant à jour un **GitHub Gist**.

### ✨ Fonctionnalités Clés
- **Injection UI Intelligente** : Ajoute une cloche de notification élégante dans la barre de navigation.
- **Gestion à Distance** : Modifiez vos messages depuis n'importe où via GitHub Gist. Le serveur récupère les changements automatiquement.
- **Auto-Configuration** : S'intègre automatiquement avec le plugin `JavaScript Injector` s'il est présent.
- **Tableau de Bord Intégré** : Gérez, créez et publiez vos notifications directement depuis l'administration Jellyfin.
- **Styles de Messages** : Supporte 4 types (Info, Alerte, Succès, Attention) avec des codes couleurs distincts.
- **Badge de Notification** : Un badge dynamique indique le nombre de messages non lus.
- **Support Mobile** : L'interface s'affiche parfaitement sur les applications Android et iOS (via la vue web intégrée).

### 🚀 Installation Rapide
1. **Ajouter le Dépôt** : Dans Jellyfin, allez dans `Tableau de bord` > `Plugins` > `Dépôts` et ajoutez l'URL de votre `manifest.json`.
2. **Installer** : Cherchez "Centre de notification Jellyfin" dans le catalogue et installez-le.
3. **Redémarrer** : Redémarrez votre serveur Jellyfin.
4. **Injection** : 
   - Si vous avez `JavaScript Injector`, le plugin s'ajoutera tout seul.
   - Sinon, ajoutez `<script src="/InstalledPlugins/Notifications/notificationsjs"></script>` dans votre code HTML personnalisé (Paramètres > Général).

### ⚙️ Configuration
Dans les paramètres du plugin :
- **Gist ID** : L'identifiant unique de votre Gist GitHub.
- **GitHub Token** : Votre Personal Access Token (requis pour sauvegarder depuis Jellyfin).
- **Nom du fichier** : Par défaut `notifications.json`.

---

## English

This plugin turns your Jellyfin server into a direct communication channel with your users. Using a seamless integration, you can broadcast messages, maintenance alerts, or news without ever touching your server files, simply by updating a **GitHub Gist**.

### ✨ Key Features
- **Smart UI Injection**: Adds a stylish notification bell to the top navigation bar.
- **Remote Management**: Update your messages from anywhere via GitHub Gist. The server fetches changes automatically.
- **Auto-Configuration**: Automatically integrates with the `JavaScript Injector` plugin if installed.
- **Built-in Dashboard**: Manage, create, and publish notifications directly from the Jellyfin admin panel.
- **Message Styles**: Supports 4 types (Info, Alert, Success, Warning) with distinct color coding.
- **Notification Badge**: A dynamic badge shows the number of unread messages.
- **Mobile Support**: The UI displays perfectly on Android and iOS apps (via the integrated web view).

### 🚀 Quick Installation
1. **Add Repository**: In Jellyfin, go to `Dashboard` > `Plugins` > `Repositories` and add your `manifest.json` URL.
2. **Install**: Find "Jellyfin Notification Center" in the catalog and install it.
3. **Restart**: Restart your Jellyfin server.
4. **Injection**: 
   - If you have `JavaScript Injector`, the plugin will auto-inject itself.
   - Otherwise, add `<script src="/InstalledPlugins/Notifications/notificationsjs"></script>` to your Custom HTML code (Settings > General).

### 📱 Mobile Note
Since Jellyfin mobile apps (Android/iOS) load the web interface, the notification bell will be visible and functional within the app. Note that these are **in-app notifications**, not native system push notifications.