import { useEffect, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Trash2, Lock, Upload } from "lucide-react";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gallery-admin`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const STORAGE_KEY = "ww_gallery_admin_pwd";

const CATEGORIES = ["House Clearance", "Garden Clearance", "Office Clearance", "Commercial"];

interface Item {
  id: string;
  title: string;
  category: string;
  before_url: string;
  after_url: string;
  before_alt: string;
  after_alt: string;
}

async function callFn(action: string, opts: { method?: string; password?: string; body?: BodyInit; json?: any } = {}) {
  const headers: Record<string, string> = { apikey: ANON, Authorization: `Bearer ${ANON}` };
  if (opts.password) headers["x-admin-password"] = opts.password;
  let body = opts.body;
  if (opts.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.json);
  }
  const res = await fetch(`${FN_URL}?action=${action}`, {
    method: opts.method ?? "GET",
    headers,
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}

export default function AdminGalleryPage() {
  const [password, setPassword] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [beforeAlt, setBeforeAlt] = useState("");
  const [afterAlt, setAfterAlt] = useState("");
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      if (!password) { setChecking(false); return; }
      try {
        const r = await callFn("verify", { password });
        if (r.ok) { setAuthed(true); await loadItems(); }
        else sessionStorage.removeItem(STORAGE_KEY);
      } catch {/* ignore */}
      setChecking(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const r = await callFn("list");
      setItems(r.items ?? []);
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const r = await callFn("verify", { password });
      if (r.ok) {
        sessionStorage.setItem(STORAGE_KEY, password);
        setAuthed(true);
        await loadItems();
      } else {
        toast({ title: "Mot de passe incorrect", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!beforeFile || !afterFile || !title) {
      toast({ title: "Champs manquants", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("category", category);
      fd.append("before_alt", beforeAlt);
      fd.append("after_alt", afterAlt);
      fd.append("before", beforeFile);
      fd.append("after", afterFile);
      await callFn("create", { method: "POST", password, body: fd });
      toast({ title: "Image ajoutée avec succès" });
      setTitle(""); setBeforeAlt(""); setAfterAlt("");
      setBeforeFile(null); setAfterFile(null);
      (document.getElementById("before-input") as HTMLInputElement).value = "";
      (document.getElementById("after-input") as HTMLInputElement).value = "";
      await loadItems();
    } catch (e: any) {
      toast({ title: "Erreur lors de l'ajout", description: e.message, variant: "destructive" });
    }
    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette entrée ?")) return;
    try {
      await callFn("delete", { method: "POST", password, json: { id } });
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Supprimé" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  }

  if (checking) {
    return <div className="container py-20 text-center text-muted-foreground">Chargement…</div>;
  }

  if (!authed) {
    return (
      <section className="container py-20 max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold">Accès restreint</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="pwd">Mot de passe</Label>
            <Input
              id="pwd"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="hero" className="w-full">Se connecter</Button>
        </form>
      </section>
    );
  }

  return (
    <section className="container py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-heading font-bold">CRM Galerie</h1>
        <p className="text-muted-foreground mt-1">Ajouter et gérer les transformations avant/après.</p>
      </div>

      <form onSubmit={handleUpload} className="bg-muted/40 p-6 rounded-xl space-y-4 border">
        <h2 className="text-xl font-heading font-bold flex items-center gap-2">
          <Upload className="h-5 w-5" /> Ajouter une transformation
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Titre</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Office Clearance - Greater Manchester" />
          </div>
          <div>
            <Label>Catégorie</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label>Image AVANT</Label>
            <Input id="before-input" type="file" accept="image/*" onChange={(e) => setBeforeFile(e.target.files?.[0] ?? null)} />
          </div>
          <div>
            <Label>Image APRÈS</Label>
            <Input id="after-input" type="file" accept="image/*" onChange={(e) => setAfterFile(e.target.files?.[0] ?? null)} />
          </div>
          <div>
            <Label>Texte alternatif (avant)</Label>
            <Input value={beforeAlt} onChange={(e) => setBeforeAlt(e.target.value)} />
          </div>
          <div>
            <Label>Texte alternatif (après)</Label>
            <Input value={afterAlt} onChange={(e) => setAfterAlt(e.target.value)} />
          </div>
        </div>
        <Button type="submit" variant="hero" disabled={uploading}>
          {uploading ? "Envoi…" : "Ajouter"}
        </Button>
      </form>

      <div>
        <h2 className="text-xl font-heading font-bold mb-4">Entrées existantes ({items.length})</h2>
        {loading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Aucune entrée pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="border rounded-xl overflow-hidden bg-background">
                <div className="grid grid-cols-2">
                  <img src={item.before_url} alt={item.before_alt} className="w-full h-40 object-cover" />
                  <img src={item.after_url} alt={item.after_alt} className="w-full h-40 object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
