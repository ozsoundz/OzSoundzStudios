/* ==========================================================================
   OZ SOUNDZ STUDIOS — SITE CONTENT & SETTINGS
   Edit this file to update the site. No build step needed.
   ========================================================================== */

window.OZS = {

  /* ---------- CORE SETTINGS ---------- */
  site: {
    name: 'Oz Soundz Studios',
    email: 'studios@ozsoundz.com.au',
    hq: 'Sydney, NSW, Australia',
    studioLocation: 'Central Coast, NSW, Australia',
    opening: '2027/28',
    abn: '45 147 744 858',
    parent: { name: 'Vestinex Pty Ltd', url: 'https://vestinex.com.au' },

    /* FORMS: left blank, every form (register, enquiry, crew, Q&A, gear, newsletter)
       is delivered by FormSubmit to the email above. The very first submission sends
       a one-off "Activate form" email to that address: click it once and forms go live.
       To use another service instead (e.g. Formspree), paste its endpoint URL here. */
    formEndpoint: '',

    socials: [
      { k: 'facebook',  label: 'Facebook',  handle: 'facebook.com/ozsoundz', url: 'https://facebook.com/ozsoundz' },
      { k: 'instagram', label: 'Instagram', handle: '@ozsoundz',             url: 'https://instagram.com/ozsoundz' },
      { k: 'tiktok',    label: 'TikTok',    handle: '@ozsoundz',             url: 'https://tiktok.com/@ozsoundz' },
      { k: 'youtube',   label: 'YouTube',   handle: '@ozsoundz',             url: 'https://youtube.com/@ozsoundz' }
    ],

    group: [
      { name: 'The Oz Soundz Group',     url: 'https://ozsoundzgroup.com.au' },
      { name: 'Oz Soundz Music & Audio', url: 'https://ozsoundz.com.au' },
      { name: 'Oz Soundz Records',       url: 'https://ozsoundzrecords.com.au' }
    ]
  },

  /* ---------- SESSION PLANNER ----------
     Hours are rough planning guides. Set hourly rates (AUD) once pricing is
     final and the planner will show cost too. While null, it shows "Rates TBA". */
  planner: {
    rates: { tracking: null, mixing: null, mastering: null },
    dayLength: 10,
    setupPerDay: 1,
    projectTypes: {
      solo:    { label: 'Solo / Acoustic',  note: 'Voice + 1–2 instruments', trackPerSong: 1.5 },
      live:    { label: 'Band — Live',      note: 'Tracked together in the room', trackPerSong: 2.5 },
      layered: { label: 'Band — Layered',   note: 'Drums first, then overdubs', trackPerSong: 5 },
      prod:    { label: 'Producer / Hybrid', note: 'Programmed + live overdubs', trackPerSong: 2 },
      voice:   { label: 'Podcast / VO',     note: 'Spoken word, per episode', trackPerSong: 1.25 }
    },
    extras: {
      vocals:  { label: 'Lead + backing vocals', perSong: 1.5 },
      strings: { label: 'Extra instruments / guests', perSong: 1 },
      edit:    { label: 'Editing & comping', perSong: 0.75 }
    },
    mixPerSong: 4,
    masterPerSong: 0.75,
    voiceMixPerEp: 1.5
  },

  /* ---------- DEV PROGRESS ----------
     pct = 0–100. Update these as the project moves along. */
  progress: [
    { label: 'Planning & Feasibility', pct: 60 },
    { label: 'Site Selection',         pct: 20 },
    { label: 'Acoustic Design',        pct: 10 },
    { label: 'Equipment Procurement',  pct: 5 },
    { label: 'Construction',           pct: 0 }
  ],
  lastUpdated: 'September 2026',

  /* status: 'done' | 'active' | 'pending'. Task state: 'ok' | 'wip' | '' */
  phases: [
    { n: '01', title: 'Initial Planning & Feasibility', status: 'active', page: 'plan.html',
      body: 'Define vision and goals, market research, financial planning and site selection criteria.',
      tasks: [['Vision & goals defined', 'ok'], ['Market research & SWOT', 'wip'], ['Budget & financial model', 'wip'], ['Funding pathways', 'wip'], ['Site selection criteria', 'wip'], ['Buy vs lease decision', '']] },
    { n: '02', title: 'Design & Pre-Construction', status: 'pending', page: 'design.html',
      body: 'Hire key professionals, studio layout, acoustic design, electrical/HVAC planning, permits.',
      tasks: [['Architect & acoustic engineer', ''], ['Floor plan & sound paths', 'wip'], ['Acoustic design & RT60 targets', ''], ['Power, HVAC & lighting', ''], ['Council approvals & permits', '']] },
    { n: '03', title: 'Construction', status: 'pending', page: 'build.html',
      body: 'Build the shell, acoustic isolation (floating rooms), interior finishing and cable conduits.',
      tasks: [['Shell, double walls, floating floors', ''], ['Room-within-room isolation', ''], ['Doors & glazing', ''], ['Interior finish & conduits', '']] },
    { n: '04', title: 'Equipment & Integration', status: 'pending', page: 'build.html#fitout',
      body: 'Studio gear procurement, furniture and ergonomics, software and licensing.',
      tasks: [['Gear procurement', 'wip'], ['Furniture & ergonomics', ''], ['Software & licensing', ''], ['Patchbay & wiring', '']] },
    { n: '05', title: 'Testing, Calibration & Launch', status: 'pending', page: 'test.html',
      body: 'Acoustic calibration, system testing, dry runs with artists, commercial launch.',
      tasks: [['Room measurement & tuning', ''], ['Signal flow & latency tests', ''], ['Dry runs with invited artists', '']] },
    { n: '06', title: 'Business Launch & Operations', status: 'pending', page: 'plan.html#ops',
      body: 'Branding, marketing, booking systems, studio policies, client management.',
      tasks: [['Brand & website', 'wip'], ['Booking system', ''], ['Studio policies', ''], ['Client management', '']] },
    { n: '07', title: 'Long-Term Maintenance & Scaling', status: 'pending', page: 'plan.html#scale',
      body: 'Ongoing maintenance, upgrade planning, additional rooms, financial sustainability.',
      tasks: [['Maintenance schedule', ''], ['Upgrade roadmap', ''], ['Additional rooms', ''], ['Artist funding programs', '']] }
  ],

  /* ---------- ROOMS (floor plan) ---------- */
  rooms: {
    control: { name: 'Control Room', tag: 'The brain', purpose: 'Mixing, mastering and tracking control. Main monitoring position with clear sightlines into the live room and both booths.',
      treat: 'Symmetrical layout, bass trapping in corners, diffusion at the rear wall, reflection-free listening zone.', size: 'TBC — set by acoustic design', status: 'Concept' },
    live:    { name: 'Live Room', tag: 'Where it happens', purpose: 'Full-band tracking, drums, ensembles. Big enough to play together, controlled enough to separate.',
      treat: 'Variable acoustics — absorptive and reflective zones, non-parallel surfaces where possible, target RT60 set per use.', size: 'TBC — golden-ratio proportions', status: 'Concept' },
    isoA:    { name: 'Iso Booth A', tag: 'Vocal booth', purpose: 'Lead vocals, voiceover and podcasting with full isolation from the live room.',
      treat: 'Dead, tight and quiet. Double-glazed window to control room.', size: 'TBC', status: 'Concept' },
    isoB:    { name: 'Iso Booth B', tag: 'Amp / instrument booth', purpose: 'Guitar and bass amps, loud sources, or a second vocalist tracking live with the band.',
      treat: 'High isolation, bass trapping for amp low end, tie lines to the live room.', size: 'TBC', status: 'Concept' },
    machine: { name: 'Machine Room', tag: 'Noise out', purpose: 'Computers, drives, power conditioning and anything with a fan — kept out of the listening spaces.',
      treat: 'Ventilated and isolated. Clean, isolated power feeds.', size: 'TBC', status: 'Concept' },
    lounge:  { name: 'Lounge & Reception', tag: 'Breathe', purpose: 'Where artists wait, write, eat and decompress between takes. Front door of the studio.',
      treat: 'Comfortable, sound-separated from the working rooms by door seals and mass.', size: 'TBC', status: 'Concept' },
    office:  { name: 'Office & Storage', tag: 'Back of house', purpose: 'Admin, bookings, and secure storage for instruments, cases and spare gear.',
      treat: 'Standard construction, secure access.', size: 'TBC', status: 'Concept' }
  },

  /* ---------- GEAR (target spec — brand-agnostic until finalised) ----------
     status: 'Spec’d' | 'Researching' | 'To decide' | 'Owned' */
  gear: [
    { cat: 'Monitoring', name: 'Main monitors (nearfield)', note: 'Accurate, full-range pair for the mix position.', status: 'Researching' },
    { cat: 'Monitoring', name: 'Secondary "real world" monitors', note: 'Small speakers to check translation to consumer systems.', status: 'To decide' },
    { cat: 'Monitoring', name: 'Headphone cue system', note: 'Individual mixes for up to 6 performers.', status: 'Researching' },
    { cat: 'Monitoring', name: 'Room correction & measurement', note: 'Measurement mic + REW workflow for calibration.', status: 'Spec’d' },
    { cat: 'Microphones', name: 'Large-diaphragm condensers', note: 'Vocals, acoustic instruments, room.', status: 'Researching' },
    { cat: 'Microphones', name: 'Dynamic mic locker', note: 'Workhorse dynamics for drums, amps and loud vocals.', status: 'Researching' },
    { cat: 'Microphones', name: 'Small-diaphragm pairs', note: 'Overheads, stereo acoustic, ensembles.', status: 'To decide' },
    { cat: 'Microphones', name: 'Ribbon mics', note: 'Smooth top end for guitar cabs and brass.', status: 'To decide' },
    { cat: 'Microphones', name: 'Broadcast / podcast mics', note: 'For spoken word and voiceover sessions.', status: 'Researching' },
    { cat: 'Outboard', name: 'Mic preamps', note: 'Clean and coloured flavours for tracking.', status: 'Researching' },
    { cat: 'Outboard', name: 'Compressors', note: 'Tracking and mix bus compression.', status: 'To decide' },
    { cat: 'Outboard', name: 'EQ', note: 'Analogue tone shaping on the way in and on the mix bus.', status: 'To decide' },
    { cat: 'Outboard', name: 'Patchbay & tie lines', note: 'Every room wired back to the control room.', status: 'Spec’d' },
    { cat: 'Recording', name: 'Audio interface / converters', note: 'High channel count for full-band tracking.', status: 'Researching' },
    { cat: 'Recording', name: 'Main DAW', note: 'Decision in progress — see our DAW article.', status: 'Researching' },
    { cat: 'Recording', name: 'Control surface', note: 'Hands-on faders for mixing and tracking.', status: 'To decide' },
    { cat: 'Recording', name: 'Backup & archive system', note: 'Redundant storage for every session.', status: 'Spec’d' },
    { cat: 'Backline', name: 'House drum kit', note: 'Versatile kit with cymbal options.', status: 'To decide' },
    { cat: 'Backline', name: 'Guitar & bass amps', note: 'A small range of tones on hand.', status: 'To decide' },
    { cat: 'Backline', name: 'Keys & piano', note: 'Stage piano / keyboard for the live room.', status: 'To decide' },
    { cat: 'Backline', name: 'DI boxes', note: 'Active and passive for bass, keys and acoustics.', status: 'Spec’d' },
    { cat: 'Infrastructure', name: 'Isolated clean power', note: 'Dedicated circuits and conditioning.', status: 'Spec’d' },
    { cat: 'Infrastructure', name: 'Quiet HVAC', note: 'Low-velocity ducting with vibration isolation.', status: 'Spec’d' },
    { cat: 'Infrastructure', name: 'Dimmable lighting', note: 'Non-fluorescent, no buzz.', status: 'Spec’d' },
    { cat: 'Infrastructure', name: 'Video capture', note: 'Cameras for live sessions and build vlogs.', status: 'To decide' }
  ],

  /* ---------- BLOG / ARTICLES ---------- */
  posts: [
    { date: 'June 2026', cat: 'Business', title: 'Why We’re Building a Studio in 2027 (And Why You Should Care)', body: 'The independent music scene in Australia deserves better infrastructure. Here’s the thinking behind investing in physical recording space when everyone else is going digital-only.', url: '' },
    { date: 'May 2026', cat: 'Acoustics', title: 'Acoustic Design 101: What We’ve Learned So Far', body: 'Building a studio from scratch means learning fast. Early discoveries in acoustic design — golden ratios, the floating floor problem, and more.', url: '' },
    { date: 'April 2026', cat: 'Gear', title: 'Choosing the Right DAW for Your Studio — Our Thinking', body: 'Pro Tools, Logic, Ableton, Cubase — the DAW wars are real. How we’re approaching the decision for the main control room.', url: '' },
    { date: 'March 2026', cat: 'Build', title: 'The Cost of Building a Professional Recording Studio in 2026', body: 'Construction, acoustic treatment, gear, and ongoing costs — the real numbers so you know what you’re getting into.', url: '' },
    { date: 'February 2026', cat: 'Community', title: 'Supporting Indie Artists: What “Community First” Really Means', body: 'It’s easy to say you support independent artists. What it means at Oz Soundz Studios — pricing, access, and the programs we’re building.', url: '' },
    { date: 'January 2026', cat: 'Location', title: 'Site Selection: What We’re Looking For in Central Coast NSW', body: 'Zoning, acoustics, accessibility, size — our site selection criteria explained, and why the Central Coast.', url: '' }
  ],

  /* ---------- Q&A ---------- */
  faq: [
    { cat: 'Timing', q: 'When will the studio open?', a: 'Our target is 2027/28. Construction is planned to commence in 2027. We’ll update this timeline as planning progresses and site selection is finalised.' },
    { cat: 'Location', q: 'Where will it be located?', a: 'The Central Coast region of NSW. The exact location will be confirmed once our site selection process is complete.' },
    { cat: 'Bookings', q: 'Can I book time now?', a: 'Not yet — we’re still in planning. Register your interest and we’ll notify you when bookings open. Priority access goes to those who register early.' },
    { cat: 'Bookings', q: 'Will you use house engineers only?', a: 'Our in-house engineers will be available for all sessions. In some cases, with prior arrangement, clients may use their own pre-approved engineers.' },
    { cat: 'Services', q: 'What services will you offer?', a: 'Recording (full band or solo), mixing, mastering, and podcast / voiceover recording. Facility hire with pre-approved external engineers will also be available by arrangement.' },
    { cat: 'Services', q: 'Who is the studio for?', a: 'Independent artists and audio engineers first — grassroots musicians who need professional results without major-label budgets. Podcasters, voice artists and content creators are welcome too.' },
    { cat: 'Pricing', q: 'How much will it cost?', a: 'Rates will be announced before launch. Our commitment is pricing that real independent artists can afford. Use the Session Planner to estimate how much studio time your project needs.' },
    { cat: 'Community', q: 'Will there be funding or support programs for artists?', a: 'That’s one of our core goals — funding programs, events and recording sessions to help emerging artists into the industry. Details will be shared as they take shape.' },
    { cat: 'Community', q: 'How can I support the project?', a: 'Spread the word in your music community, follow us on social media, and if you’re a business interested in sponsorship or partnership — get in touch.' },
    { cat: 'Careers', q: 'Are you hiring engineers?', a: 'We’re building our in-house engineering team. If you’re a skilled, passionate audio engineer who shares our vision, reach out via the Contact page.' },
    { cat: 'The Group', q: 'How does the studio relate to Oz Soundz Records and Music & Audio?', a: 'All three are arms of The Oz Soundz Group — gear, recording and label — working independently but together to support musicians at every stage of their journey.' }
  ]
};
