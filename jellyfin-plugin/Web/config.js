(function () {
    const pluginId = "84fc7778-9479-e57b-f25b-6013b89770c3";

    function loadConfig(page) {
        ApiClient.getPluginConfiguration(pluginId).then(function (config) {
            page.querySelector('#GistId').value = config.GistId || '';
            page.querySelector('#GitHubToken').value = config.GitHubToken || '';
            page.querySelector('#GistFileName').value = config.GistFileName || 'jellyfin-notifs.json';
            page.querySelector('#MenuTitle').value = config.MenuTitle || 'Notifications';
            Dashboard.hideLoadingMsg();
        });
    }

    $('.pluginConfigurationPage').on('pageshow', function () {
        Dashboard.showLoadingMsg();
        loadConfig(this);
    });

    $('.customNotificationsConfigForm').on('submit', function () {
        Dashboard.showLoadingMsg();
        const page = $(this).parents('.page')[0];

        ApiClient.getPluginConfiguration(pluginId).then(function (config) {
            config.GistId = page.querySelector('#GistId').value;
            config.GitHubToken = page.querySelector('#GitHubToken').value;
            config.GistFileName = page.querySelector('#GistFileName').value;
            config.MenuTitle = page.querySelector('#MenuTitle').value;

            ApiClient.updatePluginConfiguration(pluginId, config).then(function (result) {
                Dashboard.processPluginConfigurationUpdateResult(result);
            });
        });

        return false;
    });
})();