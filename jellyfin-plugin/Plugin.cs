using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Jellyfin.Plugin.Notifications.Configuration;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Controller.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using Microsoft.Extensions.Logging;

namespace Jellyfin.Plugin.Notifications
{
    public class Plugin : BasePlugin<PluginConfiguration>, IHasWebPages, IServerEntryPoint
    {
        private readonly IPluginManager _pluginManager;
        private readonly ILogger<Plugin> _logger;

        public override string Name => "Centre de notification Jellyfin";
        public override Guid Id => Guid.Parse("84fc7778-9479-e57b-f25b-6013b89770c3");

        public Plugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer, IPluginManager pluginManager, ILogger<Plugin> logger)
            : base(applicationPaths, xmlSerializer)
        {
            Instance = this;
            _pluginManager = pluginManager;
            _logger = logger;
        }

        public static Plugin? Instance { get; private set; }

        public IEnumerable<PluginPageInfo> GetPages()
        {
            return new[]
            {
                new PluginPageInfo
                {
                    Name = "NotificationsConfig",
                    EmbeddedResourcePath = "Jellyfin.Plugin.Notifications.Web.config.html"
                },
                new PluginPageInfo
                {
                    Name = "notificationsjs",
                    EmbeddedResourcePath = "Jellyfin.Plugin.Notifications.Web.notifications.js"
                }
            };
        }

        public Task RunAsync()
        {
            try 
            {
                AutoInjectIntoJsInjector();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'auto-injection dans JS Injector");
            }
            return Task.CompletedTask;
        }

        private void AutoInjectIntoJsInjector()
        {
            // On cherche le plugin JavaScript Injector par son nom ou ID connu
            var injectorPlugin = _pluginManager.Plugins.FirstOrDefault(p => p.Name.Contains("JavaScript Injector", StringComparison.OrdinalIgnoreCase));
            
            if (injectorPlugin == null)
            {
                _logger.LogInformation("JavaScript Injector non trouvé, l'auto-injection est ignorée.");
                return;
            }

            _logger.LogInformation("JavaScript Injector trouvé ! Tentative d'injection du script de notification...");

            // On utilise la réflexion pour accéder à la config du plugin tiers sans avoir besoin de la dépendance à la compilation
            var configProperty = injectorPlugin.GetType().GetProperty("Configuration");
            if (configProperty == null) return;

            var config = configProperty.GetValue(injectorPlugin);
            if (config == null) return;

            // Le plugin Injector stocke ses scripts dans une propriété nommée "Scripts" (List<string> ou tableau)
            var scriptsProperty = config.GetType().GetProperty("Scripts");
            if (scriptsProperty == null) return;

            var scripts = scriptsProperty.GetValue(config) as IEnumerable<string>;
            var scriptUrl = "/InstalledPlugins/Notifications/notificationsjs";

            if (scripts != null && !scripts.Contains(scriptUrl))
            {
                // On crée une nouvelle liste avec notre script en plus
                var updatedScripts = scripts.ToList();
                updatedScripts.Add(scriptUrl);

                // On met à jour la propriété
                scriptsProperty.SetValue(config, updatedScripts.ToArray());

                // On force la sauvegarde de la configuration du plugin Injector
                var updateMethod = injectorPlugin.GetType().GetMethod("UpdateConfiguration");
                if (updateMethod != null)
                {
                    updateMethod.Invoke(injectorPlugin, new[] { config });
                    _logger.LogInformation("Script de notification injecté avec succès dans JavaScript Injector.");
                }
            }
            else
            {
                _logger.LogInformation("Le script est déjà présent dans JavaScript Injector.");
            }
        }

        public void Dispose()
        {
            // Rien à libérer
        }
    }
}