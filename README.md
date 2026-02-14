# 🔔 Centre de notification Jellyfin / Jellyfin Notification Center

[Français](#français) | [English](#english)

---

## Français

Ce plugin permet d'ajouter un système de notifications personnalisées directement dans l'interface de votre serveur Jellyfin. Les messages sont stockés sur un **GitHub Gist**, ce qui permet de les mettre à jour à distance sans toucher au serveur.

### ✨ Fonctionnalités
- **Injection d'interface** : Ajoute une icône de cloche dans la barre de navigation Jellyfin.
- **Gestion à distance** : Les notifications sont lues depuis un fichier JSON hébergé sur GitHub Gist.
- **Administration intégrée** : Ajoutez, modifiez ou supprimez des messages directement depuis le tableau de bord Jellyfin (nécessite un Token GitHub).
- **Personnalisation** : Changez le titre du menu et la couleur du badge de notification.
- **Types de messages** : Supporte différents styles (Info, Alerte, Succès, Attention).

### 🚀 Installation
1. Allez dans le **Tableau de bord** de votre Jellyfin.
2. Allez dans **Plugins** > **Dépôts**.
3. Ajoutez un nouveau dépôt avec l'URL de votre fichier `manifest.json` brut (ex: `https://raw.githubusercontent.com/votre-nom/votre-repo/main/manifest.json`).
4. Allez dans l'onglet **Catalogue**, cherchez "Centre de notification Jellyfin" et installez-le.
5. Redémarrez Jellyfin.

### ⚙️ Configuration
Dans les paramètres du plugin :
- **Gist ID** : L'identifiant de votre Gist GitHub.
- **GitHub Token** : Votre Personal Access Token (requis pour sauvegarder les messages depuis Jellyfin).
- **Nom du fichier** : Le nom du fichier JSON dans votre Gist (ex: `notifications.json`).

---

## English

This plugin adds a custom notification system directly into your Jellyfin server's interface. Messages are stored on a **GitHub Gist**, allowing you to update them remotely without accessing your server files.

### ✨ Features
- **UI Injection**: Adds a notification bell icon to the Jellyfin navigation bar.
- **Remote Management**: Notifications are fetched from a JSON file hosted on GitHub Gist.
- **Built-in Admin**: Add, edit, or delete messages directly from the Jellyfin dashboard (requires a GitHub Token).
- **Customization**: Change the menu title and notification badge color.
- **Message Types**: Supports multiple styles (Info, Alert, Success, Warning).

### 🚀 Installation
1. Go to your Jellyfin **Dashboard**.
2. Navigate to **Plugins** > **Repositories**.
3. Add a new repository using the raw URL of your `manifest.json` (e.g., `https://raw.githubusercontent.com/your-name/your-repo/main/manifest.json`).
4. Go to the **Catalog** tab, find "Jellyfin Notification Center" and install it.
5. Restart Jellyfin.

### ⚙️ Configuration
In the plugin settings:
- **Gist ID**: Your GitHub Gist ID.
- **GitHub Token**: Your Personal Access Token (required to save messages from within Jellyfin).
- **File Name**: The name of the JSON file in your Gist (e.g., `notifications.json`).