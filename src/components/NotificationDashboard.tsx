import React, { useState, useEffect } from 'react';
import { fetchGist, updateGist, NotificationMessage, GistConfig } from '@/services/gistService';
import NotificationCard from './NotificationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Settings, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const NotificationDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<GistConfig>({ messages: [] });
  const [gistId, setGistId] = useState(localStorage.getItem('gist_id') || '');
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [fileName, setFileName] = useState(localStorage.getItem('gist_filename') || 'notifications.json');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentMsg, setCurrentMsg] = useState<Partial<NotificationMessage>>({
    type: 'info',
    date: new Date().toLocaleDateString('fr-FR')
  });

  useEffect(() => {
    if (gistId) loadData();
  }, []);

  const loadData = async () => {
    if (!gistId) return;
    setLoading(true);
    try {
      const data = await fetchGist(gistId);
      setConfig(data);
      toast({ title: "Données chargées", description: "Les notifications ont été récupérées." });
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de charger le Gist.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('gist_id', gistId);
    localStorage.setItem('github_token', token);
    localStorage.setItem('gist_filename', fileName);
    toast({ title: "Paramètres enregistrés", description: "Configuration sauvegardée localement." });
    loadData();
  };

  const handleAddOrUpdate = () => {
    if (!currentMsg.titre || !currentMsg.texte) {
      toast({ title: "Champs requis", description: "Le titre et le texte sont obligatoires.", variant: "destructive" });
      return;
    }

    const newMessages = [...config.messages];
    if (currentMsg.id) {
      const index = newMessages.findIndex(m => m.id === currentMsg.id);
      newMessages[index] = currentMsg as NotificationMessage;
    } else {
      newMessages.unshift({
        ...currentMsg,
        id: Math.random().toString(36).substr(2, 9),
      } as NotificationMessage);
    }
    setConfig({ ...config, messages: newMessages });
    setIsEditing(false);
    setCurrentMsg({ type: 'info', date: new Date().toLocaleDateString('fr-FR') });
  };

  const handleDelete = (id: string) => {
    setConfig({ ...config, messages: config.messages.filter(m => m.id !== id) });
  };

  const handlePushUpdate = async () => {
    if (!gistId || !token) {
      toast({ title: "Erreur", description: "Gist ID et Token requis.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await updateGist(gistId, token, fileName, config);
      toast({ title: "Succès", description: "Le Gist a été mis à jour sur GitHub !" });
    } catch (error) {
      toast({ title: "Erreur", description: "Échec de la mise à jour.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bell className="text-blue-500" /> Jellyfin Notif Manager
          </h1>
          <p className="text-gray-400">Gérez vos notifications Gist pour Jellyfin {fileName}</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Settings className="mr-2 h-4 w-4" /> Config
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A0A1A] border-white/10 text-white">
              <DialogHeader><DialogTitle>Paramètres GitHub</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Gist ID</Label>
                  <Input value={gistId} onChange={e => setGistId(e.target.value)} className="bg-white/5 border-white/10" placeholder="ID de votre Gist" />
                </div>
                <div className="space-y-2">
                  <Label>GitHub Token (PAT)</Label>
                  <Input type="password" value={token} onChange={e => setToken(e.target.value)} className="bg-white/5 border-white/10" placeholder="ghp_..." />
                </div>
                <div className="space-y-2">
                  <Label>Nom du fichier JSON</Label>
                  <Input value={fileName} onChange={e => setFileName(e.target.value)} className="bg-white/5 border-white/10" />
                </div>
                <Button onClick={handleSaveSettings} className="w-full bg-blue-600 hover:bg-blue-700">Enregistrer</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handlePushUpdate} disabled={loading} className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" /> Publier sur GitHub
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Notifications ({config.messages.length})</h2>
            <Button onClick={() => { setIsEditing(true); setCurrentMsg({ type: 'info', date: new Date().toLocaleDateString('fr-FR') }); }} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.messages.map(msg => (
              <NotificationCard 
                key={msg.id} 
                notification={msg} 
                onDelete={handleDelete}
                onEdit={(n) => { setCurrentMsg(n); setIsEditing(true); }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white mb-4">Aperçu Jellyfin</h3>
            <div className="bg-[#101010] rounded-lg p-4 border border-white/5 shadow-2xl min-h-[200px]">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Notifications</span>
                <span className="text-gray-600 text-lg">×</span>
              </div>
              <div className="space-y-2">
                {config.messages.slice(0, 3).map(msg => (
                  <div key={msg.id} className={`p-3 rounded bg-white/5 border-l-2 ${msg.type === 'alert' ? 'border-red-500' : 'border-blue-500'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-white">{msg.titre}</span>
                      <span className="text-[9px] text-gray-500">{msg.date}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{msg.texte}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-[#0A0A1A] border-white/10 text-white">
          <DialogHeader><DialogTitle>{currentMsg.id ? 'Modifier' : 'Nouvelle'} Notification</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={currentMsg.titre || ''} onChange={e => setCurrentMsg({...currentMsg, titre: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={currentMsg.type} onValueChange={(v: any) => setCurrentMsg({...currentMsg, type: v})}>
                  <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#1A1A2E] border-white/10 text-white">
                    <SelectItem value="info">Info (Bleu)</SelectItem>
                    <SelectItem value="alert">Alerte (Rouge)</SelectItem>
                    <SelectItem value="success">Succès (Vert)</SelectItem>
                    <SelectItem value="warning">Attention (Orange)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={currentMsg.texte || ''} onChange={e => setCurrentMsg({...currentMsg, texte: e.target.value})} className="bg-white/5 border-white/10 h-24" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input value={currentMsg.date || ''} onChange={e => setCurrentMsg({...currentMsg, date: e.target.value})} className="bg-white/5 border-white/10" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddOrUpdate} className="bg-blue-600 hover:bg-blue-700">Valider</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationDashboard;