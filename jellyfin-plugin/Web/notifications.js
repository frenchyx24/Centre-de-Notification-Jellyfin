(function() {
    // Le plugin injectera ces variables dynamiquement depuis la config Jellyfin
    let config = {
        gistId: "${GistId}",
        token: "${GitHubToken}",
        fileName: "${GistFileName}",
        menuTitle: "${MenuTitle}"
    };

    const RAW_URL = `https://gist.githubusercontent.com/frenchyx24/${config.gistId}/raw/${config.fileName}`;
    const API_URL = `https://api.github.com/gists/${config.gistId}`;
    const READ_KEY = 'jellyfin_last_read_message_date'; 
    
    let currentConfig = { messages: [] };

    function loadNotifications() {
        fetch(RAW_URL + '?t=' + Date.now())
            .then(res => res.json())
            .then(data => {
                if (JSON.stringify(data) !== JSON.stringify(currentConfig)) {
                    currentConfig = data;
                    updateInterface();
                }
            })
            .catch(err => console.log("Notifications: Attente réseau..."));
    }

    function checkInterface() {
        const header = document.querySelector('.headerRight');
        const btn = document.getElementById('custom-notif-btn');
        if (header && !btn) createButton(header);
        if (btn) updateSmartBadge(btn);

        if (window.location.href.indexOf('dashboard') !== -1) {
            injectAdminControls();
        } else {
            const float = document.getElementById('admin-float-btn');
            if (float) float.remove();
        }
    }

    function createButton(header) {
        const btn = document.createElement('button');
        btn.id = 'custom-notif-btn';
        btn.className = 'paper-icon-button-light headerButton paper-icon-button';
        btn.style.cssText = 'position: relative; margin-right: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;';
        
        btn.innerHTML = `
            <svg style="width:24px;height:24px;fill:currentColor;opacity:0.9;" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
            <span id="notif-badge-smart" style="display:none; position: absolute; top: 6px; right: 6px; background: #e74c3c; color: white; border-radius: 50%; min-width: 16px; height: 16px; font-size: 10px; font-weight: 700; border: 2px solid #101010; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 2;"></span>
        `;
        
        btn.onclick = function(e) {
            e.preventDefault(); e.stopPropagation();
            togglePanel();
            markAsRead(); 
            updateSmartBadge(btn);
        };
        header.insertBefore(btn, header.firstChild);
    }

    function updateSmartBadge(btn) {
        const badge = btn.querySelector('#notif-badge-smart');
        const messages = currentConfig.messages || [];
        if (messages.length === 0) { badge.style.display = 'none'; return; }

        const lastRead = localStorage.getItem(READ_KEY) || '';
        const sig = (messages[0].titre || "") + '_' + (messages[0].date || "");

        if (sig !== lastRead) {
            badge.style.display = 'flex';
            badge.innerText = messages.length > 9 ? '9+' : messages.length;
            badge.style.background = currentConfig.couleurBadge || '#e74c3c';
        } else {
            badge.style.display = 'none';
        }
    }

    function updateInterface() {
        const btn = document.getElementById('custom-notif-btn');
        if (btn) updateSmartBadge(btn);
    }

    function markAsRead() {
        const messages = currentConfig.messages || [];
        if (messages.length > 0) {
            const sig = (messages[0].titre || "") + '_' + (messages[0].date || "");
            localStorage.setItem(READ_KEY, sig);
        }
    }

    function togglePanel() {
        const existing = document.getElementById('notif-panel-overlay');
        if (existing) { existing.remove(); return; }
        
        const panel = document.createElement('div');
        panel.id = 'notif-panel-overlay';
        panel.style.cssText = 'position: fixed; top: 60px; right: 20px; width: 340px; background: rgba(30, 30, 30, 0.98); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); z-index: 9999999; font-family: sans-serif; color: #eee; overflow: hidden; animation: notifSlideIn 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);';
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 700; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase; color: #aaa; display: flex; justify-content: space-between; align-items: center;">
                <span>${currentConfig.titreMenu || config.menuTitle}</span>
                <span style="cursor:pointer;opacity:0.5;font-size:18px;" onclick="document.getElementById('notif-panel-overlay').remove()">×</span>
            </div>
            <div id="notif-list-container" style="max-height: 450px; overflow-y: auto; padding: 10px;"></div>
        `;

        const list = panel.querySelector('#notif-list-container');
        if (!currentConfig.messages || currentConfig.messages.length === 0) {
            list.innerHTML = '<div style="padding:40px 20px;text-align:center;color:#666;font-size:14px;">Aucune notification</div>';
        } else {
            currentConfig.messages.forEach(msg => {
                let color = '#3498db';
                if (msg.type === 'alert') color = '#e74c3c';
                if (msg.type === 'success') color = '#2ecc71';
                if (msg.type === 'warning') color = '#f39c12';
                
                const item = document.createElement('div');
                item.style.cssText = `background: rgba(255,255,255,0.04); padding: 15px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid ${color}; font-size: 13px;`;
                item.innerHTML = `
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;align-items:center;">
                        <strong style="color:${color};font-size:14px;">${msg.titre}</strong>
                        <span style="font-size:11px;opacity:0.4;">${msg.date}</span>
                    </div>
                    <div style="opacity:0.9;color:#ddd;line-height:1.5;">${msg.texte}</div>
                `;
                list.appendChild(item);
            });
        }
        document.body.appendChild(panel);
        
        if (!document.getElementById('notif-anim')) {
            const s = document.createElement('style'); s.id='notif-anim';
            s.innerHTML='@keyframes notifSlideIn { from { opacity:0; transform:translateY(-8px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }';
            document.head.appendChild(s);
        }

        setTimeout(() => {
            document.addEventListener('click', function close(e) {
                const p = document.getElementById('notif-panel-overlay');
                const b = document.getElementById('custom-notif-btn');
                if (p && !p.contains(e.target) && (!b || !b.contains(e.target))) {
                    p.remove();
                    document.removeEventListener('click', close);
                }
            });
        }, 100);
    }

    function injectAdminControls() {
        if (!document.getElementById('admin-float-btn')) {
            const floatBtn = document.createElement('button');
            floatBtn.id = 'admin-float-btn';
            floatBtn.innerHTML = '🔔 Admin Notifs';
            floatBtn.style.cssText = 'position:fixed; bottom:30px; right:30px; z-index:999999; background:#e74c3c; color:white; border:none; padding:12px 20px; border-radius:30px; font-weight:bold; cursor:pointer; box-shadow:0 5px 15px rgba(0,0,0,0.5); font-family:sans-serif;';
            floatBtn.onclick = openAdminModal;
            document.body.appendChild(floatBtn);
        }
    }

    function openAdminModal() {
        // Logique de la modale admin (identique à votre script original mais utilisant config.token)
        // ... (Code de la modale ici)
    }

    // Initialisation
    loadNotifications();
    setInterval(loadNotifications, 10000); 
    setInterval(checkInterface, 2000);   
})();