using MediaBrowser.Model.Plugins;

namespace Jellyfin.Plugin.Notifications.Configuration
{
    public class PluginConfiguration : BasePluginConfiguration
    {
        public string GistId { get; set; } = "84fc77789479e57bf25b6013b89770c3";
        public string GitHubToken { get; set; } = "";
        public string GistFileName { get; set; } = "jellyfin-notifs.json";
        public string MenuTitle { get; set; } = "Notifications";
    }
}