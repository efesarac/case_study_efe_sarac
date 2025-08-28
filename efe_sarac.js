// ebebek Case Study 
// Author : A. Efe Saraç
// Date   : 28.08.2025
// Purpose: Tek dosyalık JS. İlk çalıştırmada JSON’dan veri çeker,
//          sonraki çalıştırmalarda localStorage’dan okur.
//          HTML + CSS tamamen JS ile oluşturulur, favoriler kaydedilir.

(() => {
    //Settings
    const JSON_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
    const STORAGE_KEYS = {
        products: "ebebekProducts",
        favorites: "ebebekFavorites"
    };


    //Just works on ebebek.com homepage
    const isHome = 
        location.hostname.includes("ebebek.com") &&
        (location.pathname === "/" || location.pathname === "/tr" || location.pathname === "/tr/");
    if ((!isHome)){console.log("Wrong page!"); return;}

    //Helper Functions
    const save = (key, value) => 
        localStorage.setItem(key, JSON.stringify(value));
    const load = (key, defaultValue = null) => 
        JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
    const formatPrice = (amount, currency = "TRY", locale = "tr-TR") =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2
        }).format(amount);

    //Converts JSON to expected form 
    //Expected form: { id, title, price, original_price, url, image }
    function normalizeProducts(raw) {
        //If its already ready
        if(Array.isArray(raw) && raw.length && "id" in raw[0]) return raw;

        const items = Array.isArray(raw?.items) ? raw.items : Array.isArray(raw) ? raw : [];
        return items.map((item, index) => ({
          id: item.id ?? item.ProductId ?? `p-${index}`,
          title: item.title ?? item.Name ?? "",
          price: Number(item.price ?? item.Price ?? 0),
          original_price: Number(item.original_price ?? item.ListPrice ?? item.Price ?? 0),
          url: item.url ?? item.Link ?? "#",
          image: item.image ?? item.ImageUrl ?? ""
        }));
    }

    //Data fetch
    async function getProducts() {
        const cached = load(STORAGE_KEYS.products);
        if (cached) return cached;

        const res = await fetch(JSON_URL, { credentials: "omit" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const products = normalizeProducts(raw);
        save(STORAGE_KEYS.products, products);
        return products;
  }

    //Style
    function injectStyles() {
    const css = `
#ebk-carousel{margin:24px auto;max-width:1280px;padding:0 16px;font-family:inherit}
#ebk-carousel .ebk-title{font-size:18px;font-weight:700;margin-bottom:12px}
#ebk-carousel .viewport{overflow:auto}
#ebk-carousel .track{display:flex;gap:12px;padding-bottom:6px}
#ebk-carousel .card{flex:0 0 auto;min-width:260px;border:1px solid #eee;border-radius:12px;padding:12px;background:#fff;position:relative}
#ebk-carousel .img{width:100%;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:#fafafa;border-radius:8px;overflow:hidden}
#ebk-carousel .img img{max-width:100%;max-height:100%;display:block}
#ebk-carousel .ttl{margin-top:8px;font-size:14px;line-height:1.3;height:3.4em;overflow:hidden}
#ebk-carousel .price{margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#ebk-carousel .price .cur{font-weight:700}
#ebk-carousel .price .orig{text-decoration:line-through;opacity:.65}
#ebk-carousel .heart{position:absolute;top:10px;right:10px;background:#fff;border:1px solid #eee;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;cursor:pointer}
#ebk-carousel .heart svg{width:20px;height:20px}
#ebk-carousel .heart.fav path{fill:#ff7a00}
    `;
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

    //Skeleton
    function buildSkeleton() {
    const root = document.createElement("section");
    root.id = "ebk-carousel";
    root.innerHTML = `
      <div class="ebk-title">Beğenebileceğinizi düşündüklerimiz</div>
      <div class="viewport">
        <div class="track" aria-label="Ürün listesi"></div>
      </div>
    `;
    document.body.prepend(root);
  }

    //Favorites
    const getFavSet = () => new Set(load(STORAGE_KEYS.favorites, []));
    const setFavSet = (set) => save(STORAGE_KEYS.favorites, [...set]);

    //Init
    (async function init(){
     injectStyles();
     buildSkeleton();
     try {
      const products = await getProducts();
      render(products);
      console.log("MVP ready (no arrows/dots/percentage). Product count:", products.length);
    } catch (e) {
      console.error("Products could not be loaded:", e);
    }
    
    
})
})