import { useState, useEffect, useRef } from "react";

// ─── PALETTE ────────────────────────────────────────────────────────────────
// Forged steel / oxidised iron / rust / burnt sienna + sharp red highlights
// ────────────────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }

  :root {
    /* Backgrounds — forge-dark steel */
    --void:     #080807;
    --abyss:    #0C0B09;
    --deep:     #111009;
    --pit:      #18160F;
    --shadow:   #201D13;
    --dim:      #2A2618;
    --muted:    #36311F;
    --slate:    #443D27;

    /* Metal tones */
    --iron:     #4A4540;
    --steel:    #6B6358;
    --pewter:   #8A8078;
    --brushed:  #A89E92;

    /* Rust / oxide palette */
    --rust-deep:#5C2010;
    --rust:     #8B3A1A;
    --rust-mid: #A84520;
    --oxide:    #C0521E;
    --burnt:    #B84020;

    /* Red highlights */
    --red-dark: #8C1212;
    --red:      #BB1A1A;
    --red-hot:  #D42020;
    --red-bright:#E63030;

    /* Text */
    --text-dim:   #5A5346;
    --text-mid:   #8A7D6E;
    --text-bright:#C4B8A8;
    --white:      #EDE6D8;

    /* Gradients */
    --grad-rust:  linear-gradient(135deg, var(--rust), var(--oxide));
    --grad-red:   linear-gradient(135deg, var(--red-dark), var(--red-hot));
    --grad-metal: linear-gradient(180deg, var(--iron), var(--muted));
  }

  body {
    background: var(--void);
    color: var(--text-bright);
    font-family: 'Barlow', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* HEAVY GRAIN — industrial texture */
  body::before {
    content:'';
    position:fixed; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E");
    pointer-events:none; z-index:9999; opacity:0.55;
  }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--abyss); }
  ::-webkit-scrollbar-thumb { background:var(--rust); }

  /* ── NAV ─────────────────────────────────────────────────────────── */
  .nav {
    position:fixed; top:0; left:0; right:0; z-index:200;
    background:rgba(8,8,7,0.92);
    backdrop-filter:blur(18px);
    border-bottom:1px solid rgba(139,58,26,0.25);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 2.5rem; height:66px;
    transition: border-color 0.3s;
  }
  .nav.scrolled { border-bottom-color: rgba(192,82,30,0.45); }

  .nav-brand {
    font-family:'Barlow Condensed', sans-serif;
    font-size:1.2rem; font-weight:700;
    color:var(--white); text-decoration:none;
    letter-spacing:0.08em; line-height:1.1; text-transform:uppercase;
  }
  .nav-brand em { font-style:italic; color:var(--oxide); }

  .nav-links { display:flex; gap:0.2rem; align-items:center; list-style:none; }
  .nav-links button {
    background:none; border:none; cursor:pointer;
    font-family:'Barlow Condensed',sans-serif; font-size:0.85rem;
    font-weight:600; letter-spacing:0.12em; text-transform:uppercase;
    color:var(--text-mid); padding:0.5rem 0.9rem;
    border-radius:0; transition:all 0.2s; position:relative;
  }
  .nav-links button:hover, .nav-links button.active { color:var(--white); }
  .nav-links button.active::after {
    content:''; position:absolute; bottom:2px; left:0.9rem; right:0.9rem;
    height:1px; background:var(--rust);
  }

  .has-dropdown { position:relative; }
  .dropdown {
    position:absolute; top:calc(100% + 8px); left:0;
    background:rgba(12,11,9,0.97);
    border:1px solid rgba(139,58,26,0.3);
    min-width:190px; padding:0.4rem 0;
    opacity:0; visibility:hidden;
    transform:translateY(-6px);
    transition:all 0.2s;
    backdrop-filter:blur(12px);
    border-top:2px solid var(--rust);
  }
  .has-dropdown:hover .dropdown {
    opacity:1; visibility:visible; transform:translateY(0);
  }
  .dropdown button {
    display:block; width:100%; text-align:left;
    font-size:0.78rem; padding:0.55rem 1.1rem;
    border-radius:0; letter-spacing:0.1em;
  }
  .dropdown button:hover { background:rgba(139,58,26,0.15); color:var(--oxide); }

  .nav-cta {
    background:var(--red) !important; color:var(--white) !important;
    padding:0.45rem 1.3rem !important; border-radius:0 !important;
    clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px)) !important;
    box-shadow: 0 0 16px rgba(187,26,26,0.3) !important;
  }
  .nav-cta:hover { background:var(--red-hot) !important; box-shadow:0 0 24px rgba(212,32,32,0.5) !important; transform:translateY(-1px) !important; }

  .mobile-menu-btn {
    display:none; background:none; border:none; cursor:pointer;
    color:var(--oxide); font-size:1.4rem;
  }

  /* ── PAGE WRAPPER ────────────────────────────────────────────────── */
  .page { min-height:100vh; padding-top:66px; }

  /* ── HERO ────────────────────────────────────────────────────────── */
  .hero {
    min-height:calc(100vh - 66px);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    padding:4rem 2.5rem;
    background: radial-gradient(ellipse at 70% 40%, rgba(139,58,26,0.12) 0%, transparent 60%),
                radial-gradient(ellipse at 15% 85%, rgba(88,32,16,0.1) 0%, transparent 50%),
                var(--void);
  }

  /* Diagonal slash — brushed steel panel */
  .hero-slash {
    position:absolute; top:0; right:0; bottom:0;
    width:45%; background:var(--deep);
    clip-path:polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    z-index:0;
  }
  .hero-slash::before {
    content:''; position:absolute; inset:0;
    background: repeating-linear-gradient(
      92deg,
      transparent 0px, transparent 3px,
      rgba(106,99,88,0.04) 3px, rgba(106,99,88,0.04) 4px
    );
  }
  .hero-slash::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(180deg, rgba(139,58,26,0.07) 0%, transparent 60%);
  }

  .hero-inner {
    max-width:1200px; width:100%;
    display:grid; grid-template-columns:1fr 1fr;
    gap:4rem; align-items:center; position:relative; z-index:1;
  }

  .hero-tag {
    font-family:'Share Tech Mono', monospace;
    font-size:0.7rem; letter-spacing:0.35em; text-transform:uppercase;
    color:var(--rust); margin-bottom:1.2rem;
    display:flex; align-items:center; gap:0.7rem;
  }
  .hero-tag::before { content:''; display:inline-block; width:20px; height:1px; background:var(--rust); }

  .hero-title {
    font-family:'Barlow Condensed', sans-serif;
    font-size:clamp(3.5rem,7.5vw,7rem);
    font-weight:900; line-height:0.92;
    color:var(--white); margin-bottom:1.5rem;
    letter-spacing:0.02em; text-transform:uppercase;
  }
  .hero-title .stroke {
    -webkit-text-stroke:2px var(--rust-mid);
    color:transparent; display:block;
  }
  .hero-title .fill { color:var(--white); display:block; }
  .hero-title .accent { color:var(--oxide); display:block; }

  .hero-body {
    font-size:1rem; color:var(--text-mid); line-height:1.75;
    max-width:480px; margin-bottom:2.2rem; font-weight:300;
  }

  .hero-badge {
    display:inline-flex; align-items:center; gap:0.5rem;
    background:rgba(139,58,26,0.15); border:1px solid rgba(139,58,26,0.4);
    padding:0.5rem 1rem; margin-bottom:2rem;
    font-family:'Share Tech Mono',monospace; font-size:0.7rem;
    letter-spacing:0.2em; color:var(--oxide); text-transform:uppercase;
  }
  .hero-badge-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--red-hot); animation:pulse-dot 1.5s ease-in-out infinite;
    box-shadow:0 0 6px var(--red-hot);
  }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

  .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; }

  .btn-primary {
    background:var(--grad-rust); color:var(--white);
    padding:0.85rem 2.2rem;
    font-family:'Barlow Condensed',sans-serif; font-weight:700;
    font-size:0.9rem; letter-spacing:0.18em; text-transform:uppercase;
    border:none; cursor:pointer; transition:all 0.25s;
    display:inline-block; text-decoration:none;
    clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
    box-shadow:0 4px 20px rgba(139,58,26,0.4);
  }
  .btn-primary:hover { transform:translateY(-2px); background:var(--grad-red); box-shadow:0 8px 28px rgba(187,26,26,0.45); }

  .btn-outline {
    background:transparent; color:var(--brushed);
    padding:0.85rem 2.2rem;
    font-family:'Barlow Condensed',sans-serif; font-weight:600;
    font-size:0.9rem; letter-spacing:0.18em; text-transform:uppercase;
    border:1px solid rgba(107,99,88,0.5); cursor:pointer; transition:all 0.25s;
    display:inline-block; text-decoration:none;
  }
  .btn-outline:hover {
    background:rgba(107,99,88,0.1); border-color:var(--brushed);
    color:var(--white); transform:translateY(-2px);
  }

  /* Hero visual */
  .hero-visual { display:flex; align-items:center; justify-content:center; }

  .studio-icon-wrap {
    width:340px; height:340px; position:relative;
    display:flex; align-items:center; justify-content:center;
  }
  .studio-icon-bg {
    position:absolute; inset:0; border-radius:50%;
    background:conic-gradient(from 0deg, rgba(139,58,26,0.12), rgba(74,61,39,0.06), rgba(139,58,26,0.12));
    animation:rot 25s linear infinite;
  }
  @keyframes rot { to{transform:rotate(360deg)} }

  .studio-icon-ring {
    position:absolute; border-radius:50%; border:1px solid;
    animation:breathe 5s ease-in-out infinite;
  }
  .studio-icon-ring:nth-child(2) { inset:0; border-color:rgba(139,58,26,0.2); animation-delay:0s; }
  .studio-icon-ring:nth-child(3) { inset:28px; border-color:rgba(192,82,30,0.25); animation-delay:0.8s; }
  .studio-icon-ring:nth-child(4) { inset:56px; border-color:rgba(107,99,88,0.3); animation-delay:1.6s; }
  @keyframes breathe { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.02)} }

  .studio-icon-center {
    position:relative; z-index:2; text-align:center;
    background:radial-gradient(circle, rgba(92,32,16,0.18) 0%, transparent 70%);
    width:180px; height:180px; border-radius:50%;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    border:1px solid rgba(139,58,26,0.3);
    box-shadow:0 0 40px rgba(92,32,16,0.2), inset 0 0 30px rgba(92,32,16,0.1);
  }
  .studio-emoji { font-size:3.5rem; display:block; filter:drop-shadow(0 0 10px rgba(192,82,30,0.6)); }
  .studio-label {
    font-family:'Share Tech Mono',monospace; font-size:0.62rem;
    letter-spacing:0.28em; color:var(--oxide); text-transform:uppercase;
    margin-top:0.5rem;
  }

  /* TICKER */
  .ticker-strip {
    background:var(--rust); padding:0.55rem 0; overflow:hidden; position:relative;
    border-top:1px solid rgba(192,82,30,0.4); border-bottom:1px solid rgba(92,32,16,0.5);
  }
  .ticker-strip::before, .ticker-strip::after {
    content:''; position:absolute; top:0; bottom:0; width:60px; z-index:1;
  }
  .ticker-strip::before { left:0; background:linear-gradient(90deg,var(--rust),transparent); }
  .ticker-strip::after { right:0; background:linear-gradient(-90deg,var(--rust),transparent); }
  .ticker-inner {
    display:flex; white-space:nowrap;
    animation:ticker 30s linear infinite;
    font-family:'Share Tech Mono',monospace; font-size:0.68rem;
    letter-spacing:0.22em; color:var(--white); text-transform:uppercase;
  }
  .ticker-inner span { padding-right:4rem; }
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── STATS ───────────────────────────────────────────────────────── */
  .stats-bar {
    background:var(--abyss);
    border-bottom:1px solid rgba(74,61,39,0.35);
    display:flex; justify-content:center;
    padding:2.5rem 2rem; flex-wrap:wrap; gap:0;
  }
  .stat {
    flex:1; min-width:140px; max-width:200px;
    text-align:center; padding:0 1.5rem; position:relative;
  }
  .stat + .stat::before {
    content:''; position:absolute; left:0; top:15%; bottom:15%;
    width:1px; background:linear-gradient(to bottom, transparent, rgba(107,99,88,0.3), transparent);
  }
  .stat-num {
    font-family:'Barlow Condensed',sans-serif; font-size:2.8rem;
    font-weight:900; color:var(--oxide); line-height:1;
    letter-spacing:0.02em; text-transform:uppercase;
  }
  .stat-lbl {
    font-family:'Share Tech Mono',monospace; font-size:0.6rem;
    letter-spacing:0.22em; color:var(--text-dim);
    text-transform:uppercase; margin-top:0.3rem;
  }

  /* ── SECTION COMMONS ─────────────────────────────────────────────── */
  .section { padding:6rem 2.5rem; }
  .section.alt { background:var(--deep); }
  .section.darker { background:var(--abyss); }
  .container { max-width:1200px; margin:0 auto; }

  .eyebrow {
    font-family:'Share Tech Mono',monospace; font-size:0.68rem;
    letter-spacing:0.3em; color:var(--rust); text-transform:uppercase;
    margin-bottom:0.8rem; display:flex; align-items:center; gap:0.6rem;
  }
  .eyebrow::before { content:'//'; font-size:0.85em; opacity:0.6; }

  .section-title {
    font-family:'Barlow Condensed',sans-serif;
    font-size:clamp(2.4rem,4.5vw,4rem);
    font-weight:900; line-height:0.97; letter-spacing:0.01em;
    color:var(--white); margin-bottom:1.5rem;
  }
  .section-title em { font-style:italic; color:var(--magenta); }
  .section-title .ghost {
    -webkit-text-stroke:1.5px var(--pink); color:transparent; display:block;
  }

  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }
  .two-col.center { align-items:center; }
  .three-col { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
  .four-col { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }

  /* ── CARDS ───────────────────────────────────────────────────────── */
  .card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.12);
    padding:2rem; position:relative; overflow:hidden;
    transition:all 0.3s; cursor:pointer;
  }
  .card::before {
    content:''; position:absolute; top:0; left:0; right:0;
    height:2px; background:var(--grad-main);
    transform:scaleX(0); transform-origin:left; transition:transform 0.35s;
  }
  .card:hover { border-color:rgba(192,20,78,0.35); transform:translateY(-4px); box-shadow:0 12px 40px rgba(192,20,78,0.1); }
  .card:hover::before { transform:scaleX(1); }

  .card-icon { font-size:2rem; margin-bottom:1rem; display:block; }
  .card-label {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.22em; color:var(--crimson); text-transform:uppercase;
    margin-bottom:0.35rem;
  }
  .card-title {
    font-family:'Playfair Display',serif; font-size:1.3rem;
    font-weight:700; color:var(--white); margin-bottom:0.75rem; line-height:1.25;
  }
  .card-body {
    font-size:0.85rem; color:var(--text-dim); line-height:1.7; font-weight:300;
  }

  /* ── QUOTE BOX ───────────────────────────────────────────────────── */
  .quote-box {
    background:var(--pit); border:1px solid rgba(192,20,78,0.18);
    padding:2.5rem; position:relative;
    box-shadow:0 0 40px rgba(192,20,78,0.06), inset 0 0 24px rgba(192,20,78,0.03);
  }
  .quote-box::before {
    content:''; position:absolute; top:0; left:2rem; right:2rem;
    height:1px; background:linear-gradient(90deg,transparent,var(--crimson),transparent);
  }
  .quote-box::after {
    content:'"'; position:absolute; top:-0.8rem; left:1.8rem;
    font-family:'Playfair Display',serif; font-size:5rem; font-weight:900;
    color:var(--crimson); line-height:1; opacity:0.15;
  }
  .quote-text {
    font-family:'Playfair Display',serif; font-style:italic;
    font-size:1.2rem; color:var(--text-bright); line-height:1.6;
    margin-bottom:1rem; position:relative;
  }
  .quote-attr {
    font-family:'Courier Prime',monospace; font-size:0.65rem;
    letter-spacing:0.22em; color:var(--text-dim); text-transform:uppercase;
  }

  /* ── PROGRESS BAR ────────────────────────────────────────────────── */
  .prog-item { margin-bottom:1.2rem; }
  .prog-label {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:0.4rem;
  }
  .prog-name { font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:500; color:var(--text-bright); }
  .prog-pct { font-family:'Courier Prime',monospace; font-size:0.68rem; color:var(--crimson); }
  .prog-track { height:3px; background:rgba(192,20,78,0.12); overflow:hidden; }
  .prog-fill { height:100%; background:var(--grad-main); transition:width 1.2s ease; }

  /* ── PHASE STEPS ─────────────────────────────────────────────────── */
  .phase-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:1.5rem; margin-top:2.5rem;
  }
  .phase-card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.12);
    padding:2rem; position:relative; transition:all 0.3s;
  }
  .phase-card:hover { border-color:rgba(192,20,78,0.3); box-shadow:0 8px 30px rgba(192,20,78,0.08); }
  .phase-num {
    font-family:'Playfair Display',serif; font-size:3.5rem; font-weight:900;
    line-height:1; color:rgba(192,20,78,0.12); margin-bottom:0.5rem; letter-spacing:-0.02em;
  }
  .phase-badge {
    font-family:'Courier Prime',monospace; font-size:0.6rem;
    letter-spacing:0.2em; text-transform:uppercase; color:var(--crimson);
    margin-bottom:0.5rem;
  }
  .phase-title {
    font-family:'Playfair Display',serif; font-weight:700;
    font-size:1.1rem; color:var(--white); margin-bottom:0.7rem;
  }
  .phase-body { font-size:0.82rem; color:var(--text-dim); line-height:1.65; font-weight:300; }
  .phase-status {
    margin-top:1rem; display:inline-flex; align-items:center; gap:0.4rem;
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.15em; text-transform:uppercase;
  }
  .phase-status.pending { color:var(--text-dim); }
  .phase-status.active { color:var(--magenta); }
  .phase-status.done { color:#6DCD8E; }
  .phase-dot { width:5px; height:5px; border-radius:50%; background:currentColor; }
  .phase-dot.active { animation:pulse-dot 1.5s ease-in-out infinite; }

  /* ── TEAM CARD ───────────────────────────────────────────────────── */
  .team-card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.14);
    padding:2.5rem 2rem; text-align:center; position:relative; overflow:hidden;
    transition:all 0.3s;
  }
  .team-card::after {
    content:''; position:absolute; top:0; left:20%; right:20%;
    height:1px; background:linear-gradient(90deg,transparent,var(--crimson),transparent);
  }
  .team-card:hover { border-color:rgba(192,20,78,0.35); transform:translateY(-4px); box-shadow:0 10px 35px rgba(192,20,78,0.1); }

  .team-avatar {
    width:90px; height:90px; border-radius:50%;
    background:var(--shadow); border:2px solid var(--crimson);
    box-shadow:0 0 20px rgba(192,20,78,0.25);
    display:flex; align-items:center; justify-content:center;
    font-size:2.2rem; margin:0 auto 1.2rem;
    position:relative;
  }
  .team-avatar::after {
    content:''; position:absolute; inset:-6px; border-radius:50%;
    border:1px dashed rgba(192,20,78,0.3);
    animation:rot 15s linear infinite;
  }
  .team-name {
    font-family:'Playfair Display',serif; font-weight:700;
    font-size:1.15rem; color:var(--white); margin-bottom:0.25rem;
  }
  .team-role {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.22em; color:var(--crimson); text-transform:uppercase;
    margin-bottom:0.8rem;
  }
  .team-bio { font-size:0.82rem; color:var(--text-dim); line-height:1.65; font-weight:300; }

  /* ── GROUP CARDS ─────────────────────────────────────────────────── */
  .group-card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.1);
    padding:2.5rem 2rem; position:relative; overflow:hidden;
    transition:all 0.3s; text-decoration:none; color:inherit; display:block;
  }
  .group-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
    background:var(--grad-main); transform:scaleY(0); transform-origin:top;
    transition:transform 0.35s;
  }
  .group-card::after {
    content:'→'; position:absolute; top:1.5rem; right:1.5rem;
    font-size:1rem; color:var(--crimson); opacity:0;
    transition:opacity 0.2s, transform 0.2s;
  }
  .group-card:hover { border-color:rgba(192,20,78,0.3); transform:translateY(-4px); box-shadow:0 12px 40px rgba(192,20,78,0.08); }
  .group-card:hover::before { transform:scaleY(1); }
  .group-card:hover::after { opacity:1; transform:translate(3px,-3px); }
  .group-icon { font-size:2.2rem; margin-bottom:1rem; display:block; }
  .group-tag {
    font-family:'Courier Prime',monospace; font-size:0.6rem;
    letter-spacing:0.2em; color:var(--crimson); text-transform:uppercase;
    margin-bottom:0.35rem;
  }
  .group-name {
    font-family:'Playfair Display',serif; font-size:1.5rem;
    font-weight:700; color:var(--white); margin-bottom:0.75rem;
  }
  .group-body { font-size:0.83rem; color:var(--text-dim); line-height:1.65; font-weight:300; }

  /* ── CONTACT ─────────────────────────────────────────────────────── */
  .contact-item { display:flex; align-items:flex-start; gap:1rem; margin-bottom:2rem; }
  .contact-icon-box {
    width:42px; height:42px; flex-shrink:0;
    border:1px solid rgba(192,20,78,0.35);
    display:flex; align-items:center; justify-content:center;
    color:var(--crimson); font-size:1.05rem;
    box-shadow:0 0 10px rgba(192,20,78,0.1);
  }
  .contact-label {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.22em; color:var(--text-dim); text-transform:uppercase;
    margin-bottom:0.25rem;
  }
  .contact-val { font-size:0.95rem; color:var(--text-bright); }
  .contact-val a { color:var(--pink); text-decoration:none; }
  .contact-val a:hover { text-decoration:underline; }

  .form-field { margin-bottom:1.2rem; }
  .form-field label {
    display:block; font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.22em; color:var(--text-dim); text-transform:uppercase;
    margin-bottom:0.5rem;
  }
  .form-field input, .form-field textarea, .form-field select {
    width:100%; background:var(--pit);
    border:1px solid rgba(192,20,78,0.2);
    color:var(--white); padding:0.75rem 1rem;
    font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none;
    transition:border-color 0.2s; resize:none;
  }
  .form-field input:focus, .form-field textarea:focus, .form-field select:focus {
    border-color:var(--crimson); box-shadow:0 0 12px rgba(192,20,78,0.1);
  }
  .form-field textarea { height:120px; }
  .form-field select option { background:var(--pit); }

  /* ── CTA BANNER ──────────────────────────────────────────────────── */
  .cta-banner {
    background:var(--grad-main); padding:5rem 2.5rem;
    text-align:center; position:relative; overflow:hidden;
  }
  .cta-banner::before {
    content:'STUDIOS'; position:absolute; top:50%; left:50%;
    transform:translate(-50%,-50%);
    font-family:'Playfair Display',serif; font-size:16vw; font-weight:900;
    color:rgba(0,0,0,0.1); white-space:nowrap; pointer-events:none; letter-spacing:0.04em;
  }
  .cta-banner h2 {
    font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3.5rem);
    font-weight:900; color:var(--white); margin-bottom:1rem; position:relative;
    letter-spacing:0.02em;
  }
  .cta-banner p { font-size:1rem; color:rgba(255,255,255,0.82); margin-bottom:2.5rem; position:relative; font-weight:300; }
  .btn-dark {
    background:var(--void); color:var(--pink);
    padding:0.85rem 2.2rem;
    font-family:'DM Sans',sans-serif; font-weight:600;
    font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase;
    border:none; cursor:pointer; transition:all 0.25s;
    display:inline-block; text-decoration:none;
    clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
    position:relative; box-shadow:0 0 20px rgba(0,0,0,0.3);
  }
  .btn-dark:hover { background:var(--abyss); transform:translateY(-2px); }

  /* ── MEDIA ───────────────────────────────────────────────────────── */
  .blog-card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.12);
    padding:2rem; transition:all 0.3s;
  }
  .blog-card:hover { border-color:rgba(192,20,78,0.3); transform:translateY(-4px); box-shadow:0 10px 30px rgba(192,20,78,0.08); }
  .blog-date {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.2em; color:var(--crimson); text-transform:uppercase;
    margin-bottom:0.5rem;
  }
  .blog-title {
    font-family:'Playfair Display',serif; font-weight:700;
    font-size:1.15rem; color:var(--white); margin-bottom:0.75rem; line-height:1.3;
  }
  .blog-body { font-size:0.83rem; color:var(--text-dim); line-height:1.65; font-weight:300; margin-bottom:1rem; }
  .blog-link {
    font-family:'Courier Prime',monospace; font-size:0.65rem;
    letter-spacing:0.2em; color:var(--pink); text-transform:uppercase;
    text-decoration:none;
  }
  .blog-link:hover { color:var(--white); }

  .social-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.5rem; margin-top:2rem; }
  .social-card {
    background:var(--pit); border:1px solid rgba(192,20,78,0.12);
    padding:2rem; text-align:center; transition:all 0.3s;
    text-decoration:none; color:inherit; display:block;
  }
  .social-card:hover { border-color:rgba(192,20,78,0.35); transform:translateY(-4px); box-shadow:0 10px 30px rgba(192,20,78,0.1); }
  .social-icon { font-size:2.5rem; display:block; margin-bottom:0.8rem; }
  .social-name {
    font-family:'Playfair Display',serif; font-weight:700;
    font-size:1.05rem; color:var(--white); margin-bottom:0.4rem;
  }
  .social-handle {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.15em; color:var(--crimson); text-transform:uppercase;
    margin-bottom:0.5rem;
  }
  .social-desc { font-size:0.78rem; color:var(--text-dim); font-weight:300; }

  /* ── PAGE HEADER ─────────────────────────────────────────────────── */
  .page-header {
    background:var(--deep); padding:4rem 2.5rem 3rem;
    border-bottom:1px solid rgba(192,20,78,0.1); position:relative; overflow:hidden;
  }
  .page-header::after {
    content:''; position:absolute; top:0; right:0; bottom:0; width:35%;
    background:linear-gradient(135deg, transparent 40%, rgba(192,20,78,0.04) 100%);
    clip-path:polygon(20% 0,100% 0,100% 100%,0% 100%);
  }
  .breadcrumb {
    font-family:'Courier Prime',monospace; font-size:0.65rem;
    letter-spacing:0.2em; color:var(--text-dim); text-transform:uppercase;
    margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;
  }
  .breadcrumb span { color:var(--crimson); cursor:pointer; }
  .breadcrumb span:hover { color:var(--pink); }
  .page-header h1 {
    font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3.5rem);
    font-weight:900; color:var(--white); line-height:1; letter-spacing:0.02em;
    position:relative; z-index:1;
  }
  .page-header h1 em { font-style:italic; color:var(--magenta); }
  .page-header p {
    font-size:1rem; color:var(--text-mid); max-width:560px;
    line-height:1.7; margin-top:0.8rem; font-weight:300; position:relative; z-index:1;
  }

  /* ── FOOTER ──────────────────────────────────────────────────────── */
  footer {
    background:var(--void); border-top:1px solid rgba(192,20,78,0.1);
    padding:4rem 2.5rem 2rem;
  }
  .footer-grid {
    max-width:1200px; margin:0 auto;
    display:grid; grid-template-columns:2fr 1fr 1fr 1fr;
    gap:3rem; margin-bottom:3rem;
  }
  .footer-logo {
    font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700;
    color:var(--white); margin-bottom:0.8rem; display:block; line-height:1.15;
  }
  .footer-logo em { font-style:italic; color:var(--magenta); }
  .footer-brand-body { font-size:0.83rem; color:var(--text-dim); line-height:1.7; margin-bottom:1.5rem; font-weight:300; }
  .footer-socials { display:flex; gap:0.5rem; flex-wrap:wrap; }
  .footer-social-btn {
    width:36px; height:36px; border:1px solid rgba(192,20,78,0.22);
    display:flex; align-items:center; justify-content:center;
    font-size:0.7rem; color:var(--text-dim); text-decoration:none;
    font-family:'Courier Prime',monospace; transition:all 0.2s; cursor:pointer;
    background:none; border-radius:0;
  }
  .footer-social-btn:hover { border-color:var(--crimson); color:var(--pink); box-shadow:0 0 12px rgba(192,20,78,0.2); }
  .footer-col h4 {
    font-family:'Courier Prime',monospace; font-size:0.68rem;
    letter-spacing:0.25em; text-transform:uppercase; color:var(--crimson);
    margin-bottom:1.2rem; padding-bottom:0.5rem;
    border-bottom:1px solid rgba(192,20,78,0.12);
  }
  .footer-col ul { list-style:none; }
  .footer-col li { margin-bottom:0.6rem; }
  .footer-col button {
    background:none; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:0.83rem;
    color:var(--text-dim); font-weight:300; padding:0;
    transition:color 0.2s; text-align:left;
  }
  .footer-col button:hover { color:var(--pink); }
  .footer-bottom {
    max-width:1200px; margin:0 auto;
    display:flex; justify-content:space-between; align-items:center;
    border-top:1px solid rgba(255,255,255,0.04); padding-top:2rem;
    flex-wrap:wrap; gap:1rem;
  }
  .footer-bottom p {
    font-family:'Courier Prime',monospace; font-size:0.62rem;
    letter-spacing:0.1em; color:rgba(122,77,110,0.5); text-transform:uppercase;
  }
  .footer-bottom a { color:var(--text-dim); text-decoration:none; }

  /* ── FADE ANIM ───────────────────────────────────────────────────── */
  .fade-up { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease,transform 0.7s ease; }
  .fade-up.vis { opacity:1; transform:translateY(0); }

  /* ── MOBILE ──────────────────────────────────────────────────────── */
  @media(max-width:900px) {
    .hero-inner, .two-col { grid-template-columns:1fr; gap:2.5rem; }
    .hero-slash { display:none; }
    .studio-icon-wrap { display:none; }
    .three-col, .four-col { grid-template-columns:1fr 1fr; }
    .footer-grid { grid-template-columns:1fr 1fr; }
    .nav-links { display:none; }
    .mobile-menu-btn { display:block; }
  }
  @media(max-width:540px) {
    .three-col, .four-col, .footer-grid { grid-template-columns:1fr; }
    .stats-bar { flex-direction:column; align-items:center; gap:1.5rem; }
    .stat::before { display:none; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home", page: "home" },
  {
    label: "About Us", page: "about",
    children: [
      { label: "Our Purpose", page: "purpose" },
      { label: "Our Team", page: "team" },
    ],
  },
  {
    label: "The Oz Soundz Group", page: "group",
    children: [
      { label: "Music & Audio", page: "group-music" },
      { label: "Oz Soundz Studios", page: "group-studios" },
      { label: "Oz Soundz Records", page: "group-records" },
    ],
  },
  {
    label: "Studio Dev Progress", page: "dev",
    children: [
      { label: "Plan", page: "dev-plan" },
      { label: "Design", page: "dev-design" },
      { label: "Build", page: "dev-build" },
      { label: "Test", page: "dev-test" },
      { label: "Documents", page: "dev-docs" },
      { label: "Photos", page: "dev-photos" },
      { label: "Videos", page: "dev-videos" },
      { label: "Q&A", page: "dev-qa" },
    ],
  },
  {
    label: "Our Media", page: "media",
    children: [
      { label: "Blogs & Articles", page: "media-blogs" },
      { label: "Social Media", page: "media-social" },
    ],
  },
  { label: "Contact", page: "contact", cta: true },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Ticker() {
  return (
    <div className="ticker-strip">
      <div className="ticker-inner">
        <span>◆ Recording Studio · Central Coast NSW · Coming 2027/28 ◆ Audio Recording · Mixing · Mastering ◆ Built For Independent Artists ◆ 100% Australian Owned ◆ Part of The Oz Soundz Group ◆</span>
        <span>◆ Recording Studio · Central Coast NSW · Coming 2027/28 ◆ Audio Recording · Mixing · Mastering ◆ Built For Independent Artists ◆ 100% Australian Owned ◆ Part of The Oz Soundz Group ◆</span>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      {[
        { num: "2027/28", lbl: "Opening Target" },
        { num: "40+", lbl: "Yrs In The Scene" },
        { num: "100%", lbl: "Indie Focused" },
        { num: "3", lbl: "Oz Soundz Entities" },
      ].map((s, i) => (
        <div className="stat fade-up" key={i}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  );
}

function PageHeader({ title, titleEm, sub, page, parent }) {
  return (
    <div className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <span>Home</span>
          {parent && <><span style={{opacity:0.4}}>›</span><span>{parent}</span></>}
          <span style={{opacity:0.4}}>›</span>
          <span style={{color:"var(--text-dim)",cursor:"default"}}>{page}</span>
        </div>
        <h1>{title}{titleEm && <em> {titleEm}</em>}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function GroupEcosystem({ navigate }) {
  const groups = [
    { icon: "🎸", tag: "Operational · Retail & Gear", name: "Oz Soundz Music & Audio", body: "Quality gear for real musicians at real prices. By players, for players. 100% Australian owned and operated.", page: "group-music", href: "https://ozsoundz.com.au" },
    { icon: "🎙️", tag: "Coming 2027/28 · Recording", name: "Oz Soundz Studios", body: "Professional recording, mixing and mastering built for independent artists — affordable, acoustically excellent, no compromises.", page: "group-studios", href: "#" },
    { icon: "💿", tag: "Coming 2030+ · Label", name: "Oz Soundz Records", body: "An indie record label built to champion Australian artists — putting emerging talent on the map.", page: "group-records", href: "https://ozsoundzrecords.com.au" },
  ];
  return (
    <div className="three-col" style={{marginTop:"2.5rem"}}>
      {groups.map((g, i) => (
        <button key={i} className="group-card fade-up" style={{textAlign:"left",cursor:"pointer"}} onClick={() => navigate(g.page)}>
          <span className="group-icon">{g.icon}</span>
          <div className="group-tag">{g.tag}</div>
          <div className="group-name">{g.name}</div>
          <p className="group-body">{g.body}</p>
        </button>
      ))}
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <span className="footer-logo">Oz Soundz<br/><em>Studios</em></span>
          <p className="footer-brand-body">A fully functioning audio recording space designed for independent artists and audio engineers. Located in the Central Coast region of NSW. Coming 2027/28.</p>
          <div className="footer-socials">
            {[["FB","http://facebook.com/ozsoundz"],["IG","http://instagram.com/@ozsoundz"],["TT","http://tiktok.com/@ozsoundz"],["YT","http://youtube.com/@ozsoundz"]].map(([label, href]) => (
              <a key={label} className="footer-social-btn" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <ul>
            {[["About Us","about"],["Our Purpose","purpose"],["Our Team","team"]].map(([l,p])=>(
              <li key={p}><button onClick={()=>navigate(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Dev Progress</h4>
          <ul>
            {[["Overview","dev"],["Plan","dev-plan"],["Design","dev-design"],["Build","dev-build"],["Test","dev-test"],["Q&A","dev-qa"]].map(([l,p])=>(
              <li key={p}><button onClick={()=>navigate(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>The Group</h4>
          <ul>
            {[["Oz Soundz Group","group"],["Music & Audio","group-music"],["Records","group-records"],["Media","media"],["Contact","contact"]].map(([l,p])=>(
              <li key={p}><button onClick={()=>navigate(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Oz Soundz Studios · A subsidiary of <a href="https://vestinex.com.au" target="_blank" rel="noopener noreferrer">Vestinex Pty Ltd</a></p>
        <p>ABN: 45 147 744 858 · Sydney, NSW · <a href="mailto:studios@ozsoundz.com.au">studios@ozsoundz.com.au</a></p>
      </div>
    </footer>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-slash"/>
        <div className="hero-inner">
          <div>
            <div className="hero-tag">Oz Soundz Group · Central Coast NSW</div>
            <div className="hero-badge"><span className="hero-badge-dot"/>In Planning & Development</div>
            <h1 className="hero-title">
              <span className="fill">Oz Soundz</span>
              <span className="accent">Studios</span>
              <span className="stroke">Coming 2027/28</span>
            </h1>
            <p className="hero-body">A fully functioning audio recording space designed for independent artists and audio engineers. Professional recording, mixing, and mastering — built by musicians for musicians.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate("dev")}>Dev Progress</button>
              <button className="btn-outline" onClick={() => navigate("about")}>About The Studio</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="studio-icon-wrap">
              <div className="studio-icon-bg"/>
              <div className="studio-icon-ring"/>
              <div className="studio-icon-ring"/>
              <div className="studio-icon-ring"/>
              <div className="studio-icon-center">
                <span className="studio-emoji">🎛️</span>
                <span className="studio-label">Recording</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker/>
      <StatsBar/>

      {/* ABOUT SNAPSHOT */}
      <section className="section alt">
        <div className="container">
          <div className="two-col center">
            <div>
              <div className="eyebrow">About The Studio</div>
              <h2 className="section-title">Where Music<br/><em>Finds Its Voice</em></h2>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"1.2rem",fontWeight:300}}>Oz Soundz Studios will provide a full range of audio recording, mixing and mastering services with the use of our in-house engineers — and in some cases, with prior arrangement, the use of the facility with your own pre-approved engineers.</p>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"2rem",fontWeight:300}}>We are located in the Central Coast region of NSW and are built with a singular mission: give independent Australian artists a world-class space to create, at prices that don't punish passion.</p>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={() => navigate("about")}>Our Story</button>
                <button className="btn-outline" onClick={() => navigate("purpose")}>Our Purpose</button>
              </div>
            </div>
            <div>
              <div className="quote-box">
                <p className="quote-text">Music is the blood of life and the soul of the planet. The Oz Soundz Group was created by Musicians for Musicians to support their musical endeavours.</p>
                <p className="quote-attr">— Oz Soundz Studios, Our Purpose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">What We'll Offer</div>
          <h2 className="section-title">Studio <em>Services</em></h2>
          <div className="four-col" style={{marginTop:"2.5rem"}}>
            {[
              { icon:"🎤", lbl:"Recording", title:"Live Recording", body:"Full-band or solo tracking in our acoustically treated live room with isolation booths for maximum separation and tone." },
              { icon:"🎚️", lbl:"Post Production", title:"Mixing", body:"Professional mixing from our in-house engineers. Balance, depth, and clarity that translates across every playback system." },
              { icon:"🔊", lbl:"Finalisation", title:"Mastering", body:"The final polish — loudness, tone, and consistency to ensure your music is release-ready for all streaming platforms." },
              { icon:"🎙️", lbl:"Spoken Word", title:"Podcast & Voiceover", body:"Our treated rooms are ideal for podcasters, voice actors, and content creators seeking studio-grade audio quality." },
            ].map((c,i) => (
              <div className="card fade-up" key={i}>
                <span className="card-icon">{c.icon}</span>
                <div className="card-label">{c.lbl}</div>
                <div className="card-title">{c.title}</div>
                <p className="card-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEV PROGRESS TEASER */}
      <section className="section alt">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="eyebrow">Studio Dev Progress</div>
              <h2 className="section-title"><span className="ghost">Building In</span><em>Public</em></h2>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"1.5rem",fontWeight:300}}>We're documenting every step of our planning, design, and build process — sharing it openly with the Oz Soundz community. Wins, challenges, and everything in between.</p>
              <button className="btn-primary" onClick={() => navigate("dev")}>Follow Our Progress</button>
            </div>
            <div>
              {[
                { label:"Planning & Feasibility", pct:60 },
                { label:"Site Selection", pct:20 },
                { label:"Acoustic Design", pct:10 },
                { label:"Equipment Procurement", pct:5 },
                { label:"Construction", pct:0 },
              ].map((p, i) => (
                <div className="prog-item fade-up" key={i}>
                  <div className="prog-label">
                    <span className="prog-name">{p.label}</span>
                    <span className="prog-pct">{p.pct}%</span>
                  </div>
                  <div className="prog-track">
                    <div className="prog-fill" style={{width:`${p.pct}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROUP ECOSYSTEM */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">The Oz Soundz Group</div>
          <h2 className="section-title">One Ecosystem.<br/><em>Three Arms.</em></h2>
          <p style={{fontSize:"0.97rem",color:"var(--text-mid)",maxWidth:"560px",lineHeight:"1.8",fontWeight:300}}>Oz Soundz Studios is one part of a bigger vision — a connected group of businesses dedicated to supporting every stage of a musician's journey.</p>
          <GroupEcosystem navigate={navigate}/>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button className="btn-outline" onClick={() => navigate("group")}>Explore The Group</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2>Stay In The Loop</h2>
        <p>Follow our build journey and be first to know when bookings open.</p>
        <button className="btn-dark" onClick={() => navigate("contact")}>Register Your Interest</button>
      </div>

      <Footer navigate={navigate}/>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div>
      <PageHeader title="About" titleEm="Us" sub="A family-rooted, musician-first recording studio built for the Australian independent music scene." page="About Us"/>
      <section className="section alt">
        <div className="container">
          <div className="two-col center">
            <div>
              <div className="eyebrow">Our Overview</div>
              <h2 className="section-title">Who We<br/><em>Are</em></h2>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"1.2rem",fontWeight:300}}>Oz Soundz Studios was established on 1 July 2025, headquartered in Sydney NSW Australia, as part of The Oz Soundz Group — a combination of three business entities: Oz Soundz Music & Audio, Oz Soundz Studios, and Oz Soundz Records.</p>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"1.2rem",fontWeight:300}}>The Oz Soundz Group of businesses are sub-entities of Vestinex Pty Ltd (ABN: 45 147 744 858), a wholly owned Australian privately held company which has been in existence since 2010.</p>
              <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.8",marginBottom:"2rem",fontWeight:300}}>Founded by Jason "Plummo" Plumridge along with his family, The Oz Soundz Group provides services to the independent music industry via each of its business arms — working independently but in combination to support the music, audio, recording and performance industry in Australia and beyond.</p>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={() => navigate("purpose")}>Our Purpose</button>
                <button className="btn-outline" onClick={() => navigate("team")}>Meet The Team</button>
              </div>
            </div>
            <div>
              <div className="quote-box" style={{marginBottom:"1.5rem"}}>
                <p className="quote-text">Whilst new in the market, The Oz Soundz Group has connection to the Music & Audio Industry at the "grass roots local level" for more than 4 decades.</p>
                <p className="quote-attr">— Jason "Plummo" Plumridge, Founder</p>
              </div>
              <div className="card">
                <div className="card-label">Our Heritage</div>
                <p className="card-body" style={{fontSize:"0.88rem",lineHeight:"1.75"}}>Our founder was a student of music at Newcastle Conservatorium. His wife, a lover of all music styles. His eldest son an accomplished keyboardist in the Sydney music scene whose band launched an EP in 2024. His daughter an accomplished singer. His youngest son a trombonist and drummer. "Music is the lifeblood of our family."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="eyebrow">Our Reach</div>
          <h2 className="section-title">Starting Local.<br/><em>Thinking Global.</em></h2>
          <div className="four-col" style={{marginTop:"2.5rem"}}>
            {[
              { icon:"📍", title:"Hunter Region", body:"Our heartland — where we began and where our deepest music community roots live." },
              { icon:"🌊", title:"Central Coast", body:"Our planned studio home — accessible, creative, and perfectly positioned." },
              { icon:"🏙️", title:"Sydney & Wollongong", body:"Expanding our footprint into the biggest markets on the NSW east coast." },
              { icon:"🌏", title:"Beyond Australia", body:"Our ultimate ambition — a globally recognised Australian music brand." },
            ].map((c,i) => (
              <div className="card fade-up" key={i}>
                <span className="card-icon">{c.icon}</span>
                <div className="card-title">{c.title}</div>
                <p className="card-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function PurposePage({ navigate }) {
  return (
    <div>
      <PageHeader title="Our" titleEm="Purpose" sub="Why do we exist? The soul behind everything we build." page="Our Purpose" parent="About Us"/>
      <section className="section alt">
        <div className="container">
          <div className="two-col center">
            <div>
              <div className="eyebrow">Our Vision</div>
              <h2 className="section-title">A Studio That<br/><em>Believes In You</em></h2>
              <p style={{fontSize:"1rem",color:"var(--text-mid)",lineHeight:"1.85",marginBottom:"1.5rem",fontWeight:300}}>Our vision is to see Oz Soundz Studios become a recognised and trusted brand in the music, audio, film and recording industry in Australia — with a focus on supporting "grass roots" indie musicians on their career paths, striving to bring new music to the community.</p>
              <p style={{fontSize:"1rem",color:"var(--text-mid)",lineHeight:"1.85",fontWeight:300}}>Music is the blood of life and the soul of the planet. The Oz Soundz Group was created by Musicians for Musicians — to support their musical endeavours, support all of our humanity, and to bring peace, tranquillity and life to all through the medium of music.</p>
            </div>
            <div>
              <div className="quote-box">
                <p className="quote-text">Music is the blood of life and the soul of the planet.</p>
                <p className="quote-attr">— Oz Soundz Group Mission</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="eyebrow">What Drives Us</div>
          <h2 className="section-title">Our Core<br/><em>Values</em></h2>
          <div className="three-col" style={{marginTop:"2.5rem"}}>
            {[
              { icon:"🎵", title:"Community First", body:"We build everything around community. The Oz Soundz community is our reason for being — every product, service, and decision serves that community first." },
              { icon:"🤝", title:"Supporting Artists", body:"We want to build programs to give back to the artist — through funding programs, events, and recording sessions to get small artists into the industry." },
              { icon:"🌱", title:"Grassroots Roots", body:"We don't pretend to be what we're not. We're connected to the grassroots music scene — and that shapes everything we do at every level." },
              { icon:"💰", title:"Accessible Pricing", body:"Professional quality shouldn't be reserved for those with major label budgets. We're committed to services that real independent artists can actually afford." },
              { icon:"🔊", title:"Uncompromising Sound", body:"Affordable doesn't mean cheap. Our acoustic design, equipment, and engineering standards will meet the needs of any professional artist." },
              { icon:"🇦🇺", title:"Australian Owned", body:"Proudly 100% Australian owned and operated. We believe in investing in Australian artists and keeping the money in our own creative economy." },
            ].map((c,i) => (
              <div className="card fade-up" key={i}>
                <span className="card-icon">{c.icon}</span>
                <div className="card-title">{c.title}</div>
                <p className="card-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="cta-banner">
        <h2>Stand With Us</h2>
        <p>Support the Oz Soundz community and help us build something that lasts.</p>
        <button className="btn-dark" onClick={() => navigate("contact")}>Get In Touch</button>
      </div>
      <Footer navigate={navigate}/>
    </div>
  );
}

function TeamPage({ navigate }) {
  return (
    <div>
      <PageHeader title="Our" titleEm="Team" sub="The family and collaborators behind Oz Soundz Studios." page="Our Team" parent="About Us"/>
      <section className="section alt">
        <div className="container">
          <div className="eyebrow">The Team</div>
          <h2 className="section-title">Meet The<br/><em>People</em></h2>
          <p style={{fontSize:"0.97rem",color:"var(--text-mid)",maxWidth:"560px",lineHeight:"1.8",marginBottom:"3rem",fontWeight:300}}>We're a family-run business with deep roots in the Australian music scene. Our team is currently small — but every person in it has lived and breathed music their whole life.</p>
          <div className="three-col">
            {[
              { emoji:"👨‍🎸", name:'Jason "Plummo" Plumridge', role:"Founder & Director", bio:"Former student of Newcastle Conservatorium. 40+ years in the grass roots music scene. Founder of The Oz Soundz Group and the driving force behind the Studios vision." },
              { emoji:"🎹", name:"The Plumridge Family", role:"Music & Operations", bio:"A family where music is literally in the blood. From accomplished keyboardists to singers and drummers — every family member contributes to the Oz Soundz mission." },
              { emoji:"🎛️", name:"Engineering Team", role:"Coming Soon", bio:"We are in the process of building our in-house engineering team. If you're a passionate, skilled audio engineer interested in joining the Oz Soundz Studios family, reach out." },
            ].map((t,i) => (
              <div className="team-card fade-up" key={i}>
                <div className="team-avatar">{t.emoji}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
                <p className="team-bio">{t.bio}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{marginTop:"2.5rem",textAlign:"center",padding:"3rem"}}>
            <span className="card-icon" style={{fontSize:"2.5rem"}}>📣</span>
            <div className="card-title" style={{fontSize:"1.5rem",marginBottom:"0.8rem"}}>Want To Join Us?</div>
            <p className="card-body" style={{maxWidth:"480px",margin:"0 auto 1.5rem"}}>We're always looking to connect with passionate audio engineers, producers, and creatives who share our vision for supporting independent Australian music.</p>
            <button className="btn-primary" onClick={() => navigate("contact")}>Make Contact</button>
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function GroupPage({ navigate }) {
  return (
    <div>
      <PageHeader title="The Oz Soundz" titleEm="Group" sub="One ecosystem. Three arms. A singular mission to support Australian music." page="The Oz Soundz Group"/>
      <section className="section alt">
        <div className="container">
          <div className="eyebrow">Brand Journey</div>
          <h2 className="section-title">Building A<br/><em>Legacy</em></h2>
          <div className="two-col center" style={{marginBottom:"4rem"}}>
            <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.85",fontWeight:300}}>At The Oz Soundz Group our goal is to build a recognisable brand in the Australian Music, Audio, Recording and Live Performance industry. We want to be recognised by grassroots and professional musicians alike — initially in Australia, but ultimately to become a globally recognised brand with a primary focus of supporting the music industry at reasonable prices.</p>
            <p style={{fontSize:"0.97rem",color:"var(--text-mid)",lineHeight:"1.85",fontWeight:300}}>What makes us different is that we are focused on building our brand on the basis of "Community Support" — to ensure that you, our Oz Soundz Community, have every level of support possible as you build your own careers in industry. If you need support, The Oz Soundz Group is your first port of call.</p>
          </div>
          <GroupEcosystem navigate={navigate}/>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function GroupSubPage({ entity, navigate }) {
  const data = {
    "group-music": { icon:"🎸", tag:"Operational Now", name:"Oz Soundz Music & Audio", url:"https://ozsoundz.com.au", desc:"Oz Soundz Music & Audio is the retail and gear arm of the group. Quality instruments and audio equipment for real musicians at real prices — by players, for players. 100% Australian owned and operated.", features:["Quality gear at honest prices","Every product tested by musicians","Free advice from real players","Fast Australian shipping","100% Australian owned"] },
    "group-studios": { icon:"🎙️", tag:"Coming 2027/28", name:"Oz Soundz Studios", url:"#", desc:"Oz Soundz Studios will provide a full range of audio recording, mixing and mastering services for independent artists and audio engineers in the Central Coast region of NSW.", features:["Full recording, mixing & mastering","In-house professional engineers","Acoustically treated live rooms","Isolation booths","Affordable indie artist pricing"] },
    "group-records": { icon:"💿", tag:"Coming 2030+", name:"Oz Soundz Records", url:"https://ozsoundzrecords.com.au", desc:"Oz Soundz Records will be an independent record label that champions Australian artists — putting emerging and established talent on the map without the typical major label compromises.", features:["Artist-first label model","Distribution & marketing support","Funding programs for indie artists","Transparent royalty splits","Community-backed releases"] },
  };
  const d = data[entity] || data["group-studios"];
  return (
    <div>
      <PageHeader title={d.name} sub={d.desc} page={d.name} parent="The Oz Soundz Group"/>
      <section className="section alt">
        <div className="container">
          <div className="two-col center">
            <div>
              <div className="eyebrow">{d.tag}</div>
              <h2 className="section-title">What We<br/><em>Offer</em></h2>
              <ul style={{listStyle:"none",marginTop:"1.5rem"}}>
                {d.features.map((f,i) => (
                  <li key={i} style={{display:"flex",alignItems:"center",gap:"0.8rem",padding:"0.8rem 0",borderBottom:"1px solid rgba(192,20,78,0.08)",fontSize:"0.93rem",color:"var(--text-mid)",fontWeight:300}}>
                    <span style={{color:"var(--crimson)",fontSize:"0.8rem"}}>◆</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{marginTop:"2rem",display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                {d.url !== "#" && <a className="btn-primary" href={d.url} target="_blank" rel="noopener noreferrer">Visit Site</a>}
                <button className="btn-outline" onClick={() => navigate("contact")}>Get In Touch</button>
              </div>
            </div>
            <div>
              <div style={{background:"var(--pit)",border:"1px solid rgba(192,20,78,0.15)",padding:"3rem",textAlign:"center"}}>
                <span style={{fontSize:"5rem",display:"block",marginBottom:"1rem",filter:"drop-shadow(0 0 14px rgba(232,37,110,0.5))"}}>{d.icon}</span>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,color:"var(--white)",marginBottom:"0.4rem"}}>{d.name}</div>
                <div style={{fontFamily:"'Courier Prime',monospace",fontSize:"0.65rem",letterSpacing:"0.22em",color:"var(--crimson)",textTransform:"uppercase"}}>{d.tag}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function DevOverviewPage({ navigate }) {
  const phases = [
    { num:"01", badge:"Phase 1", title:"Initial Planning & Feasibility", body:"Define vision and goals, conduct market research, financial planning, site selection criteria.", status:"active" },
    { num:"02", badge:"Phase 2", title:"Design & Pre-Construction", body:"Hire key professionals, studio layout, acoustic design, electrical/HVAC planning, permits.", status:"pending" },
    { num:"03", badge:"Phase 3", title:"Construction", body:"Build the shell, acoustic isolation (floating rooms), interior finishing and cable conduits.", status:"pending" },
    { num:"04", badge:"Phase 4", title:"Equipment & Integration", body:"Studio gear procurement, furniture and ergonomics, software and licensing.", status:"pending" },
    { num:"05", badge:"Phase 5", title:"Testing, Calibration & Launch", body:"Acoustic calibration, system testing, dry runs with artists, commercial launch.", status:"pending" },
    { num:"06", badge:"Phase 6", title:"Business Launch & Operations", body:"Branding, marketing, booking systems, studio policies, client management.", status:"pending" },
    { num:"07", badge:"Phase 7", title:"Long-Term Maintenance & Scaling", body:"Ongoing maintenance, upgrade planning, additional rooms, financial sustainability.", status:"pending" },
  ];
  return (
    <div>
      <PageHeader title="Studio Dev" titleEm="Progress" sub="We're documenting every phase of our studio build journey — openly sharing our planning, design, and construction process." page="Studio Dev Progress"/>
      <section className="section alt">
        <div className="container">
          <div className="eyebrow">The Process</div>
          <h2 className="section-title">How We're<br/><em>Building This</em></h2>
          <p style={{fontSize:"0.97rem",color:"var(--text-mid)",maxWidth:"600px",lineHeight:"1.8",marginBottom:"0.5rem",fontWeight:300}}>It is our intention to document our planning, design and progress on the building of Oz Soundz Studios when construction commences in 2027 — sharing our processes, successes, and failures from inception through to completion.</p>
          <div className="phase-grid">
            {phases.map((p,i) => (
              <div className="phase-card fade-up" key={i}>
                <div className="phase-num">{p.num}</div>
                <div className="phase-badge">{p.badge}</div>
                <div className="phase-title">{p.title}</div>
                <p className="phase-body">{p.body}</p>
                <div className={`phase-status ${p.status}`}>
                  <span className={`phase-dot ${p.status === "active" ? "active" : ""}`}/>
                  {p.status === "active" ? "In Progress" : p.status === "done" ? "Complete" : "Pending"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="eyebrow">Explore More</div>
          <h2 className="section-title">Deep<br/><em>Dives</em></h2>
          <div className="four-col" style={{marginTop:"2.5rem"}}>
            {[
              { icon:"📋", label:"Plan", page:"dev-plan", desc:"Our strategic planning documents, goals, business model, and market research." },
              { icon:"📐", label:"Design", page:"dev-design", desc:"Acoustic design, floor plans, room layouts, and technical drawings." },
              { icon:"🔨", label:"Build", page:"dev-build", desc:"Construction progress, materials decisions, contractor notes, and site photos." },
              { icon:"🧪", label:"Test", page:"dev-test", desc:"Acoustic calibration results, equipment testing, and dry-run recordings." },
              { icon:"📄", label:"Documents", page:"dev-docs", desc:"Planning documents, permits, contracts, and compliance records." },
              { icon:"📸", label:"Photos", page:"dev-photos", desc:"Visual documentation of every stage of the studio development." },
              { icon:"🎬", label:"Videos", page:"dev-videos", desc:"Video walkthroughs, update vlogs, and behind-the-scenes content." },
              { icon:"❓", label:"Q&A", page:"dev-qa", desc:"Your questions answered. Ask us anything about building a recording studio." },
            ].map((c,i) => (
              <div className="card fade-up" key={i} onClick={() => navigate(c.page)} style={{cursor:"pointer"}}>
                <span className="card-icon">{c.icon}</span>
                <div className="card-label">{c.label}</div>
                <p className="card-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function DevSubPage({ sub, navigate }) {
  const content = {
    "dev-plan": { title:"Plan", em:"ning", icon:"📋", desc:"Our strategic planning process — defining vision, goals, market research, and financial planning.", sections:[
      { heading:"1. Define Vision & Goals", body:"Purpose: Music production, podcasting, post-production, voiceover. Target users: Independent artists, commercial rentals, in-house engineers. Business model: owner-operated hybrid with approved external engineers." },
      { heading:"2. Market Research", body:"Identifying competition and optimal location. Determining demand, pricing, and trends in audio production across the Central Coast, Hunter, and Sydney regions. Full SWOT analysis in progress." },
      { heading:"3. Budget & Financial Planning", body:"Estimating costs: land/lease, construction, gear, labour, permits, legal, and insurance. Exploring funding: self-funded, investors, business loans, grants. Creating ROI projections, operational expense forecasts, and monetisation strategy." },
      { heading:"4. Site Selection", body:"Criteria: zoning laws (commercial), sound restrictions, client accessibility, size requirements (live room, control room, iso booths, lounge). Buy vs lease decision still under evaluation." },
    ]},
    "dev-design": { title:"Design", em:"", icon:"📐", desc:"The acoustic and architectural design phase — floor plans, room specifications, and technical drawings.", sections:[
      { heading:"5. Hire Key Professionals", body:"Architect with studio design experience, acoustic engineer, general contractor, and optional studio design consultant. Procurement process to begin 2026/27." },
      { heading:"6. Studio Layout & Floor Plan", body:"Planned rooms: Control Room, Live Room, 2× Isolation Booths, Machine Room, Lounge/Reception/Office/Storage. Sound path planning: isolation and control of all sound transmission paths." },
      { heading:"7. Acoustic Design", body:"Room dimensions based on acoustic 'golden ratios'. Soundproofing via mass, decoupling, damping, and sealing. Acoustic treatment: bass traps, diffusers, absorbers. RT60 reverberation time targets for each room." },
      { heading:"8. Electrical, HVAC & Lighting", body:"Clean isolated power lines, quiet HVAC ductwork with vibration isolation, dimmable non-fluorescent lighting installed to not impact acoustic surfaces." },
    ]},
    "dev-build": { title:"Build", em:"", icon:"🔨", desc:"The construction phase — from shell to acoustic fit-out.", sections:[
      { heading:"10. Build the Shell", body:"Double walls and floating floors, ceiling and floor isolation, installation of HVAC, plumbing, and wiring to spec." },
      { heading:"11. Acoustic Isolation", body:"Floating rooms using the room-within-room method. Sealed solid-core doors with double entry. Double/triple-glazed studio windows throughout." },
      { heading:"12. Interior Finishing", body:"Acoustic panels and treatments installed, cable conduits and access points laid in, non-parallel walls where possible, all soundproof doors and windows fitted to spec." },
    ]},
    "dev-test": { title:"Test", em:"ing", icon:"🧪", desc:"Calibration, system testing, and dry runs before commercial opening.", sections:[
      { heading:"16. Acoustic Calibration", body:"Room measurement using REW software, speaker positioning and tuning, bass response correction, acoustic treatment adjustments based on measurement data." },
      { heading:"17. System Testing", body:"Full signal flow verification, latency testing, ground loop troubleshooting, redundancy and backup system setup." },
      { heading:"18. Dry Runs", body:"Trial recordings with invited artists, full workflow testing and room optimisation across all services prior to commercial launch." },
    ]},
    "dev-docs": { title:"Documents", em:"", icon:"📄", desc:"Planning documents, permits, contracts, and legal compliance records.", sections:[
      { heading:"Document Repository", body:"This section will host all planning documents, acoustic design briefs, building permits, compliance records, and contractor agreements as they are generated throughout the build process." },
      { heading:"Currently Available", body:"At this stage the studio is in early planning. Documents will be published here as they are produced, redacted appropriately for public view, to maintain our commitment to transparency with the Oz Soundz community." },
    ]},
    "dev-photos": { title:"Photos", em:"", icon:"📸", desc:"Visual documentation of every stage of the studio development.", sections:[
      { heading:"Photo Gallery", body:"Construction commences 2027. This gallery will document every stage — site preparation, framing, acoustic treatment, equipment installation, and the finished studio." },
      { heading:"Stay Tuned", body:"Follow us on social media for early behind-the-scenes content as planning progresses. We'll be sharing mood boards, site visits, and design inspiration in the lead up to construction." },
    ]},
    "dev-videos": { title:"Videos", em:"", icon:"🎬", desc:"Video walkthroughs, build vlogs, and behind-the-scenes studio content.", sections:[
      { heading:"Video Updates", body:"We'll be documenting the entire build journey on video — from our first site visit to our first recording session. Subscribe to our YouTube channel to follow along." },
      { heading:"YouTube Channel", body:"Find all our video content at youtube.com/@ozsoundz. We'll be posting studio planning vlogs, Q&A sessions, gear reviews, and artist spotlights throughout the build process." },
    ]},
    "dev-qa": { title:"Q&A", em:"", icon:"❓", desc:"Your questions answered. Ask us anything about building a recording studio.", sections:[
      { heading:"When will the studio open?", body:"Our target is 2027/28. Construction is planned to commence in 2027. We'll update this timeline as planning progresses and our site selection is finalised." },
      { heading:"Where will it be located?", body:"The studio will be located in the Central Coast region of NSW. Exact location to be confirmed once our site selection process is complete." },
      { heading:"Can I book time now?", body:"Not yet — we're still in the planning phase. Register your interest via our contact page and we'll notify you when bookings open. Priority access will go to those who register early." },
      { heading:"Will you use house engineers only?", body:"Our in-house engineers will be available for all sessions. In some cases, with prior arrangement, clients may use their own pre-approved engineers." },
      { heading:"How can I support the project?", body:"The best way to support us is to spread the word in your music community, follow us on social media, and if you're a business interested in sponsorship or partnership — get in touch." },
    ]},
  };
  const c = content[sub] || content["dev-plan"];
  return (
    <div>
      <PageHeader title={c.title} titleEm={c.em} sub={c.desc} page={c.title} parent="Studio Dev Progress"/>
      <section className="section alt">
        <div className="container">
          <div style={{display:"flex",justifyContent:"center",marginBottom:"3rem"}}>
            <div style={{background:"var(--pit)",border:"1px solid rgba(192,20,78,0.18)",padding:"2.5rem 3rem",textAlign:"center",display:"inline-block"}}>
              <span style={{fontSize:"4rem",display:"block",filter:"drop-shadow(0 0 12px rgba(232,37,110,0.6))"}}>{c.icon}</span>
              <div style={{fontFamily:"'Courier Prime',monospace",fontSize:"0.65rem",letterSpacing:"0.25em",color:"var(--crimson)",textTransform:"uppercase",marginTop:"0.8rem"}}>Studio Dev · {c.title}</div>
            </div>
          </div>
          {c.sections.map((s,i) => (
            <div key={i} className="card fade-up" style={{marginBottom:"1.2rem"}}>
              <div className="card-title">{s.heading}</div>
              <p className="card-body" style={{fontSize:"0.9rem"}}>{s.body}</p>
            </div>
          ))}
          <div style={{textAlign:"center",marginTop:"3rem"}}>
            <button className="btn-outline" onClick={() => navigate("dev")}>← Back to Dev Progress</button>
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function MediaBlogsPage({ navigate }) {
  const posts = [
    { date:"June 2026", title:"Why We're Building a Studio in 2027 (And Why You Should Care)", body:"The independent music scene in Australia deserves better infrastructure. Here's the thinking behind why we're investing in physical recording space when everyone else is going digital-only." },
    { date:"May 2026", title:"Acoustic Design 101: What We've Learned So Far", body:"Building a recording studio from scratch means learning a lot very quickly. We share our early discoveries in acoustic design — the golden ratios, the floating floor problem, and more." },
    { date:"April 2026", title:"Choosing the Right DAW for Your Studio — Our Thinking", body:"Pro Tools, Logic, Ableton, Cubase — the DAW wars are real. Here's how we're approaching the decision for the Oz Soundz Studios main control room." },
    { date:"March 2026", title:"The Cost of Building a Professional Recording Studio in 2026", body:"We break down the real numbers — construction, acoustic treatment, gear, and ongoing costs — so you know exactly what you're getting into before you start." },
    { date:"February 2026", title:"Supporting Indie Artists: What 'Community First' Really Means", body:"It's easy to say you support independent artists. We explain exactly what that means at Oz Soundz Studios — in terms of pricing, access, and the programs we're building." },
    { date:"January 2026", title:"Site Selection: What We're Looking For in Central Coast NSW", body:"Zoning, acoustics, accessibility, size — our site selection criteria explained. Why Central Coast is our target and what we need to find before we can commit." },
  ];
  return (
    <div>
      <PageHeader title="Blogs &" titleEm="Articles" sub="Insights, updates, and deep dives from the Oz Soundz Studios team." page="Blogs & Articles" parent="Our Media"/>
      <section className="section alt">
        <div className="container">
          <div className="eyebrow">Latest Posts</div>
          <h2 className="section-title">From The<br/><em>Studio Desk</em></h2>
          <div className="three-col" style={{marginTop:"2.5rem"}}>
            {posts.map((p,i) => (
              <div className="blog-card fade-up" key={i}>
                <div className="blog-date">{p.date}</div>
                <div className="blog-title">{p.title}</div>
                <p className="blog-body">{p.body}</p>
                <span className="blog-link">Read More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function MediaSocialPage({ navigate }) {
  const socials = [
    { icon:"📘", name:"Facebook", handle:"facebook.com/ozsoundz", desc:"Studio updates, community news, and behind-the-scenes from the build. Our main hub for the Oz Soundz community.", href:"http://facebook.com/ozsoundz" },
    { icon:"📷", name:"Instagram", handle:"@ozsoundz", desc:"Visual updates, mood boards, gear shots, and artist features. Follow along as the studio comes to life.", href:"http://instagram.com/@ozsoundz" },
    { icon:"🎵", name:"TikTok", handle:"@ozsoundz", desc:"Short-form build videos, studio tips, gear tests, and quick behind-the-scenes from the Oz Soundz team.", href:"http://tiktok.com/@ozsoundz" },
    { icon:"▶️", name:"YouTube", handle:"@ozsoundz", desc:"Long-form build vlogs, artist sessions, Q&A streams, and studio tour videos. Subscribe for the full journey.", href:"http://youtube.com/@ozsoundz" },
  ];
  return (
    <div>
      <PageHeader title="Social" titleEm="Media" sub="Follow the Oz Soundz Studios journey across all our platforms." page="Social Media" parent="Our Media"/>
      <section className="section alt">
        <div className="container">
          <div className="eyebrow">Follow Along</div>
          <h2 className="section-title">Find Us<br/><em>Everywhere</em></h2>
          <div className="social-grid">
            {socials.map((s,i) => (
              <a className="social-card fade-up" key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="social-icon">{s.icon}</span>
                <div className="social-name">{s.name}</div>
                <div className="social-handle">{s.handle}</div>
                <p className="social-desc">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

function ContactPage({ navigate }) {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader title="Contact" titleEm="Us" sub="Have a question, want to register interest, or keen to collaborate? We'd love to hear from you." page="Contact"/>
      <section className="section alt">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="eyebrow">Get In Touch</div>
              <h2 className="section-title">We'd Love<br/><em>To Hear You</em></h2>
              <div className="contact-item">
                <div className="contact-icon-box">✉</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-val"><a href="mailto:studios@ozsoundz.com.au">studios@ozsoundz.com.au</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">📍</div>
                <div>
                  <div className="contact-label">Headquarters</div>
                  <div className="contact-val">Sydney, NSW, Australia</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">🎯</div>
                <div>
                  <div className="contact-label">Planned Studio Location</div>
                  <div className="contact-val">Central Coast, NSW, Australia</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-box">📡</div>
                <div>
                  <div className="contact-label">Social</div>
                  <div className="contact-val" style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginTop:"0.25rem"}}>
                    {[["FB","http://facebook.com/ozsoundz"],["IG","http://instagram.com/@ozsoundz"],["TT","http://tiktok.com/@ozsoundz"],["YT","http://youtube.com/@ozsoundz"]].map(([l,h]) => (
                      <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{background:"rgba(192,20,78,0.1)",border:"1px solid rgba(192,20,78,0.25)",padding:"0.3rem 0.75rem",fontFamily:"'Courier Prime',monospace",fontSize:"0.62rem",letterSpacing:"0.15em",color:"var(--pink)",textDecoration:"none"}}>{l}</a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="quote-box" style={{marginTop:"2rem"}}>
                <p className="quote-text">The studio is in planning. This is the best time to register your interest — early enquiries help us understand demand and shape what we build.</p>
                <p className="quote-attr">— Oz Soundz Studios Team</p>
              </div>
            </div>
            <div>
              {sent ? (
                <div className="card" style={{textAlign:"center",padding:"3rem"}}>
                  <span style={{fontSize:"3rem",display:"block",marginBottom:"1rem"}}>✅</span>
                  <div className="card-title" style={{fontSize:"1.5rem"}}>Message Sent!</div>
                  <p className="card-body" style={{maxWidth:"320px",margin:"0.8rem auto 1.5rem"}}>Thanks for getting in touch. We'll respond to your message as soon as possible.</p>
                  <button className="btn-outline" onClick={()=>setSent(false)}>Send Another</button>
                </div>
              ) : (
                <div>
                  <div className="form-field"><label>Your Name</label><input type="text" placeholder="Full name"/></div>
                  <div className="form-field"><label>Email Address</label><input type="email" placeholder="your@email.com"/></div>
                  <div className="form-field">
                    <label>Enquiry Type</label>
                    <select>
                      <option>Register Interest in Studio Time</option>
                      <option>Partnership / Sponsorship</option>
                      <option>Engineering Role Enquiry</option>
                      <option>General Question</option>
                      <option>Media / Press</option>
                    </select>
                  </div>
                  <div className="form-field"><label>Your Message</label><textarea placeholder="Tell us what's on your mind..."/></div>
                  <button className="btn-primary" onClick={()=>setSent(true)}>Send Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer navigate={navigate}/>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // Scroll animation
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [page]);

  const navigate = (p) => setPage(p);

  const renderPage = () => {
    if (page === "home") return <HomePage navigate={navigate}/>;
    if (page === "about") return <AboutPage navigate={navigate}/>;
    if (page === "purpose") return <PurposePage navigate={navigate}/>;
    if (page === "team") return <TeamPage navigate={navigate}/>;
    if (page === "group") return <GroupPage navigate={navigate}/>;
    if (["group-music","group-studios","group-records"].includes(page)) return <GroupSubPage entity={page} navigate={navigate}/>;
    if (page === "dev") return <DevOverviewPage navigate={navigate}/>;
    if (["dev-plan","dev-design","dev-build","dev-test","dev-docs","dev-photos","dev-videos","dev-qa"].includes(page)) return <DevSubPage sub={page} navigate={navigate}/>;
    if (page === "media") return <MediaBlogsPage navigate={navigate}/>;
    if (page === "media-blogs") return <MediaBlogsPage navigate={navigate}/>;
    if (page === "media-social") return <MediaSocialPage navigate={navigate}/>;
    if (page === "contact") return <ContactPage navigate={navigate}/>;
    return <HomePage navigate={navigate}/>;
  };

  const isActive = (item) => {
    if (item.page === page) return true;
    if (item.children) return item.children.some(c => c.page === page);
    return false;
  };

  return (
    <>
      <style>{styles}</style>
      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <button onClick={() => navigate("home")} className="nav-brand" style={{background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
          Oz Soundz<br/><em>Studios</em>
        </button>
        <ul className="nav-links">
          {NAV.map(item => (
            <li key={item.page} className={item.children ? "has-dropdown" : ""}>
              <button
                className={`${isActive(item) ? "active" : ""} ${item.cta ? "nav-cta" : ""}`}
                onClick={() => navigate(item.page)}
              >
                {item.label}
              </button>
              {item.children && (
                <div className="dropdown">
                  {item.children.map(child => (
                    <button key={child.page} className={page === child.page ? "active" : ""} onClick={() => navigate(child.page)}>
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="page">{renderPage()}</div>
    </>
  );
}
