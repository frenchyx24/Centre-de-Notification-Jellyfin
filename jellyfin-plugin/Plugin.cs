using System;
using System.Collections.Generic;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using Jellyfin.Plugin.Notifications.Configuration;

namespace Jellyfin.Plugin.Notifications
{
    public class Plugin : BasePlugin<PluginConfiguration>, IHasWebPages
    {
        public override string Name => "Custom Notifications";
        public override Guid Id => Guid.Parse("84fc7778-9479-e57b-f25b-6013b89770c3");

        public Plugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer)
            : base(applicationPaths, xmlSerializer)
        {
            Instance = this;
        }

        public static Plugin Instance { get; private set; }

        public IEnumerable<PluginPageInfo> GetPages()
        {
            return new[]
            {
                new PluginPageInfo
                {
                    Name = "CustomNotifications",
                    EmbeddedResourcePath = GetType().Namespace + ".Web.config.html"
                }
            };
        }
    }
}