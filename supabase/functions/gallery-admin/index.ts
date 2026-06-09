import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_PASSWORD = Deno.env.get("GALLERY_ADMIN_PASSWORD") ?? "";
const BUCKET = "gallery-images";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function checkPassword(req: Request): boolean {
  const pwd = req.headers.get("x-admin-password") ?? "";
  return ADMIN_PASSWORD.length > 0 && pwd === ADMIN_PASSWORD;
}

async function signItems(items: any[]) {
  const paths = items.flatMap((i) => [i.before_path, i.after_path]);
  if (paths.length === 0) return [];
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, 60 * 60 * 24 * 7); // 7 days
  if (error) throw error;
  const map = new Map<string, string>();
  for (const s of data ?? []) {
    if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
  }
  return items.map((i) => ({
    ...i,
    before_url: map.get(i.before_path) ?? "",
    after_url: map.get(i.after_path) ?? "",
  }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "list";

  try {
    if (action === "list") {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      const signed = await signItems(data ?? []);
      return json({ items: signed });
    }

    if (action === "verify") {
      return json({ ok: checkPassword(req) });
    }

    if (!checkPassword(req)) {
      return json({ error: "Unauthorized" }, 401);
    }

    if (action === "create" && req.method === "POST") {
      const form = await req.formData();
      const title = String(form.get("title") ?? "").trim();
      const category = String(form.get("category") ?? "").trim();
      const beforeAlt = String(form.get("before_alt") ?? "");
      const afterAlt = String(form.get("after_alt") ?? "");
      const before = form.get("before") as File | null;
      const after = form.get("after") as File | null;

      if (!title || !category || !before || !after) {
        return json({ error: "Missing fields" }, 400);
      }

      const ts = Date.now();
      const beforeExt = (before.name.split(".").pop() || "jpg").toLowerCase();
      const afterExt = (after.name.split(".").pop() || "jpg").toLowerCase();
      const beforePath = `items/${ts}-${crypto.randomUUID()}-before.${beforeExt}`;
      const afterPath = `items/${ts}-${crypto.randomUUID()}-after.${afterExt}`;

      const upB = await supabase.storage.from(BUCKET).upload(
        beforePath,
        new Uint8Array(await before.arrayBuffer()),
        { contentType: before.type || "image/jpeg", upsert: false },
      );
      if (upB.error) throw upB.error;
      const upA = await supabase.storage.from(BUCKET).upload(
        afterPath,
        new Uint8Array(await after.arrayBuffer()),
        { contentType: after.type || "image/jpeg", upsert: false },
      );
      if (upA.error) throw upA.error;

      const { data, error } = await supabase
        .from("gallery_items")
        .insert({
          title,
          category,
          before_path: beforePath,
          after_path: afterPath,
          before_alt: beforeAlt,
          after_alt: afterAlt,
        })
        .select()
        .single();
      if (error) throw error;
      return json({ item: data });
    }

    if (action === "delete" && req.method === "POST") {
      const { id } = await req.json();
      if (!id) return json({ error: "Missing id" }, 400);
      const { data: row, error: e1 } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("id", id)
        .single();
      if (e1) throw e1;
      await supabase.storage.from(BUCKET).remove([row.before_path, row.after_path]);
      const { error: e2 } = await supabase.from("gallery_items").delete().eq("id", id);
      if (e2) throw e2;
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("gallery-admin error", e);
    return json({ error: (e as Error).message ?? "Server error" }, 500);
  }
});
