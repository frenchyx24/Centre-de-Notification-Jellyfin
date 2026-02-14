using MediaBrowser.Model.Plugins;

namespace Jellyfin.Plugin.Notifications.Configuration
{
    public class PluginConfiguration : BasePluginConfiguration
    {
        public string GistId { get; set; } = string.Empty;
        public string GitHubToken { get; set; } = string.Empty;
        public string GistFileName { get; set; } = "jellyfin-notifs.json";
        public string MenuTitle { get; set; } = "Notifications";
    }
}