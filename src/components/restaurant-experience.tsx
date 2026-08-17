"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X
} from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  category: "sandwiches" | "tenders" | "sides";
  description: string;
  price: number;
  heat: number;
  tag?: string;
  art: string;
};

const heatLevels = [
  { name: "Southern", sub: "All flavor. No fear.", color: "#f5c518" },
  { name: "Carolina Kick", sub: "A clean little warning.", color: "#ff9f1c" },
  { name: "Fireline", sub: "Now we are talking.", color: "#ff5b22" },
  { name: "Reckless", sub: "Poor choices. Great chicken.", color: "#ef2d20" },
  { name: "Call Mama", sub: "You were warned.", color: "#d10d00" }
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "The Carolina OG",
    category: "sandwiches",
    description: "Crispy breast, comeback slaw, house pickles, Carolina sauce, toasted brioche.",
    price: 12.95,
    heat: 3,
    tag: "House favorite",
    art: "OG"
  },
  {
    id: 2,
    name: "The Dirty Bird",
    category: "sandwiches",
    description: "Hot chicken, pimento cheese, bacon jam, pickles and reckless sauce.",
    price: 14.5,
    heat: 4,
    tag: "Built different",
    art: "DB"
  },
  {
    id: 3,
    name: "Three & Free",
    category: "tenders",
    description: "Three jumbo tenders, Texas toast, pickles and your choice of dip.",
    price: 13.95,
    heat: 2,
    tag: "Fan favorite",
    art: "3X"
  },
  {
    id: 4,
    name: "Loaded Heat Fries",
    category: "sides",
    description: "Seasoned fries, chopped hot chicken, comeback sauce, scallions and pickles.",
    price: 10.95,
    heat: 3,
    art: "LF"
  },
  {
    id: 5,
    name: "Cracklin' Mac",
    category: "sides",
    description: "Creamy baked mac, crunchy chicken skin crumble and hot honey.",
    price: 5.95,
    heat: 1,
    art: "MC"
  },
  {
    id: 6,
    name: "Six Alarm",
    category: "tenders",
    description: "Six hand-breaded tenders for the table—or the overconfident.",
    price: 21.95,
    heat: 5,
    tag: "Challenge accepted",
    art: "6A"
  }
];

const categories = ["all", "sandwiches", "tenders", "sides"] as const;

export function RestaurantExperience() {
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [heat, setHeat] = useState(2);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleItems = useMemo(
    () => menuItems.filter((item) => category === "all" || item.category === category),
    [category]
  );

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = menuItems.find((menuItem) => menuItem.id === Number(id));
    return sum + (item?.price ?? 0) * count;
  }, 0);

  const addToCart = (item: MenuItem) => {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
    setToast(`${item.name} joined the damage.`);
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + amount);
      const updated = { ...current, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Carolina Hot Chicken home">
          <span className="brand-mark"><Flame size={24} fill="currentColor" /></span>
          <span><b>CAROLINA</b><em>HOT CHICKEN</em></span>
        </a>
        <nav className={navOpen ? "nav nav-open" : "nav"} aria-label="Primary navigation">
          <a href="#menu" onClick={() => setNavOpen(false)}>Menu</a>
          <a href="#heat" onClick={() => setNavOpen(false)}>Pick your heat</a>
          <a href="#story" onClick={() => setNavOpen(false)}>Our story</a>
          <a href="#visit" onClick={() => setNavOpen(false)}>Visit</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
            <ShoppingBag size={19} /> Bag <span>{cartCount}</span>
          </button>
          <button className="menu-button" onClick={() => setNavOpen((open) => !open)} aria-label="Toggle menu">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <Image className="hero-image" src="https://raw.githubusercontent.com/0Jsnipes/carolina-hot-chicken-demo/main/public/hero-hot-chicken.png" alt="Crispy hot chicken sandwich and tenders" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="eyebrow"><span>North Myrtle Beach</span><span>2800 Hwy 17 S</span></div>
          <h1>NOT JUST HOT.<br /><i>CAROLINA</i> HOT.</h1>
          <p>Hand-breaded. Pressure-fried. Seasoned like we mean it. Pick your heat and accept your fate.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">Start an order <ArrowRight size={19} /></a>
            <a className="text-link" href="#heat">Meet the heat <ArrowDown size={17} /></a>
          </div>
        </div>
        <div className="heat-stamp" aria-hidden="true"><span>EST.</span><b>2026</b><span>NMB, SC</span></div>
        <div className="open-ribbon"><span className="live-dot" /> NOW OPEN <span>•</span> UNTIL 10PM</div>
      </section>

      <div className="marquee" aria-label="Brand messages">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, set) => (
            <div className="marquee-content" key={set}>
              <span>CRISPY BY DESIGN</span><Flame /><span>NO SHORTCUTS</span><Flame /><span>CAROLINA HEAT</span><Flame /><span>STAY SAUCY</span><Flame />
            </div>
          ))}
        </div>
      </div>

      <section className="heat-section" id="heat" style={{ "--heat-color": heatLevels[heat].color } as React.CSSProperties}>
        <div className="section-number">01 / PICK YOUR POISON</div>
        <div className="heat-grid">
          <div>
            <p className="kicker">HOW BRAVE ARE YOU?</p>
            <h2>FIVE LEVELS.<br /><span>ZERO JUDGMENT.</span></h2>
          </div>
          <div className="heat-control">
            <div className="heat-readout">
              <span>LEVEL 0{heat + 1}</span>
              <strong>{heatLevels[heat].name}</strong>
              <p>{heatLevels[heat].sub}</p>
            </div>
            <input aria-label="Select heat level" type="range" min="0" max="4" value={heat} onChange={(event) => setHeat(Number(event.target.value))} />
            <div className="heat-labels">{heatLevels.map((level, index) => <button className={heat === index ? "active" : ""} onClick={() => setHeat(index)} key={level.name}>{index + 1}</button>)}</div>
          </div>
        </div>
        <div className="warning-strip"><Flame fill="currentColor" /> HEAT LEVELS 4–5 REQUIRE CONFIDENCE, HYDRATION &amp; A SOLID EXIT STRATEGY <Flame fill="currentColor" /></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="menu-heading">
          <div><div className="section-number dark">02 / THE GOODS</div><h2>CHOOSE YOUR<br /><span>WEAPON.</span></h2></div>
          <p>Every bird is hand-breaded, fried to order, and hit with the heat level you choose.</p>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Menu categories">
          {categories.map((item) => <button role="tab" aria-selected={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="menu-grid">
          {visibleItems.map((item, index) => (
            <article className="menu-card" key={item.id}>
              <div className={`food-art art-${(index % 4) + 1}`}><span>{item.art}</span><div className="art-ring" /></div>
              <div className="menu-card-copy">
                <div>{item.tag && <span className="tag">{item.tag}</span>}<span className="heat-pips" aria-label={`${item.heat} out of 5 heat`}>
                  {Array.from({ length: 5 }).map((_, pip) => <Flame key={pip} size={13} fill={pip < item.heat ? "currentColor" : "none"} className={pip < item.heat ? "lit" : ""} />)}
                </span></div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-bottom"><strong>${item.price.toFixed(2)}</strong><button onClick={() => addToCart(item)} aria-label={`Add ${item.name} to cart`}><Plus /> Add</button></div>
              </div>
            </article>
          ))}
        </div>
        <button className="button menu-cta">See full menu <ChevronRight /></button>
      </section>

      <section className="story-section" id="story">
        <div className="story-poster"><span>NO</span><span>WIMPY</span><span>CHICKEN</span><Flame fill="currentColor" /></div>
        <div className="story-copy">
          <div className="section-number">03 / OUR STORY</div>
          <p className="kicker">BORN IN THE CAROLINAS</p>
          <h2>LOUD FLAVOR.<br />LOCAL SOUL.</h2>
          <p className="story-lead">We did not come here to make polite chicken.</p>
          <p>We came to build the kind of meal you think about tomorrow: hand-breaded crunch, Carolina-inspired spice, cold pickles, scratch-made sauces, and absolutely no boring bites.</p>
          <a href="#visit" className="button button-outline">Come get some <ArrowRight /></a>
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-score"><strong>4.9</strong><div><div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" />)}</div><span>HOT TAKES FROM REAL PEOPLE</span></div></div>
        <blockquote>“THE CRUNCH SHOULD BE ILLEGAL. I SAID I’D SAVE HALF. I LIED.”<cite>— @BEACHBITES, LOCAL GUIDE</cite></blockquote>
        <a href="https://www.instagram.com/carolinahotchicken/" target="_blank" rel="noreferrer"><Instagram /> Follow the fire <ArrowRight /></a>
      </section>

      <section className="visit-section" id="visit">
        <div className="map-art"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-pin"><Flame fill="currentColor" /></div><span>NORTH MYRTLE BEACH</span></div>
        <div className="visit-copy">
          <div className="section-number dark">04 / FIND THE HEAT</div>
          <h2>COME<br /><span>HUNGRY.</span></h2>
          <div className="visit-detail"><MapPin /><div><b>2800 Highway 17 S</b><span>North Myrtle Beach, SC 29582</span></div></div>
          <div className="visit-detail"><Clock3 /><div><b>Open daily</b><span>11AM — 10PM</span></div></div>
          <a className="button button-dark" href="https://maps.google.com/?q=2800+Highway+17+S+North+Myrtle+Beach+SC+29582" target="_blank" rel="noreferrer">Get directions <ArrowRight /></a>
        </div>
      </section>

      <section className="rewards-section">
        <div><span className="mini-label">THE HEAT CLUB</span><h2>GET REWARDED<br />FOR BAD <i>DECISIONS.</i></h2><p>Early drops. Free food. Birthday heat. Join the list and get a side on us.</p></div>
        <form onSubmit={(event) => { event.preventDefault(); setToast("You're officially in the Heat Club."); }}>
          <label htmlFor="email">Email address</label><div><input required id="email" type="email" placeholder="you@email.com" /><button aria-label="Join rewards"><ArrowRight /></button></div><small><Check size={13} /> No spam. Just chicken.</small>
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Flame fill="currentColor" /></span><span><b>CAROLINA</b><em>HOT CHICKEN</em></span></a>
        <div className="footer-links"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Location</a><a href="mailto:hello@carolinahotchicken.com">Contact</a></div>
        <div className="footer-meta"><span>© 2026 Carolina Hot Chicken</span><span>Demo concept • Menu details subject to confirmation</span></div>
      </footer>

      <button className="mobile-order" onClick={() => setCartOpen(true)}><ShoppingBag /> View order <span>{cartCount}</span></button>

      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen}>
        <div className="cart-head"><div><span>YOUR DAMAGE</span><h2>THE BAG</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
        <div className="cart-items">
          {cartCount === 0 ? <div className="empty-cart"><Flame size={48} /><h3>Nothing cooking yet.</h3><p>Add something loud.</p><button onClick={() => setCartOpen(false)}>Browse the menu</button></div> : Object.entries(cart).map(([id, count]) => {
            const item = menuItems.find((menuItem) => menuItem.id === Number(id))!;
            return <div className="cart-item" key={id}><div className="cart-thumb">{item.art}</div><div><b>{item.name}</b><span>${item.price.toFixed(2)}</span><div className="qty"><button onClick={() => changeQuantity(item.id, -1)}><Minus /></button><span>{count}</span><button onClick={() => changeQuantity(item.id, 1)}><Plus /></button></div></div></div>;
          })}
        </div>
        <div className="cart-total"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><p>Taxes calculated at checkout.</p><button disabled={cartCount === 0} onClick={() => setToast("Demo checkout reached—no payment was processed.")}>Demo checkout <ArrowRight /></button></div>
      </aside>
      {cartOpen && <button className="drawer-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
      {toast && <div className="toast"><Check /> {toast}</div>}
    </main>
  );
}
