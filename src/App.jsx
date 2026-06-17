import React, { useState } from 'react';

export default function App() {
  // Form and layout states
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  // Tracks which industry block is currently expanded to show its TLD scroll-list
  const [expandedBlock, setExpandedBlock] = useState(null);

  // YOUR VERIFIED LIVE DATA ROUTING GATEWAY
  const GETFORM_ENDPOINT = 'https://getform.io/f/bjjvpyob';

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadEmail) return;

    // Direct Getform routing straight to your dashboard and Gmail
    await fetch(GETFORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: leadEmail, 
        formType: 'Hero Lead Briefing',
        destination: 'ciphorcorp@gmail.com'
      })
    });

    setLeadSubmitted(true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    // Direct Getform routing straight to your dashboard and Gmail
    await fetch(GETFORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        message: contactMessage,
        formType: 'Full Communications Terminal Brief',
        destination: 'ciphorcorp@gmail.com'
      })
    });

    setContactSubmitted(true);
  };

  // Structured Industry Database with 10 TLD Blueprints each
  const industrySectors = [
    {
      id: 'hospitality',
      name: '1. Pubs, Restaurants & Catering',
      description: 'Explicit commercial extensions that define single-serving operations, character-rich social venues, and desk-side dining layouts before a client clicks.',
      tlds: [
        { ext: '.CATERING', blueprint: 'summit.catering', note: 'Corporate platters & desk-side dining structures' },
        { ext: '.PUB', blueprint: 'thelocal.pub', note: 'Memorable hospitality & character social venues' },
        { ext: '.RESTAURANT', blueprint: 'indigomanor.restaurant', note: 'Full-scale enterprise menu rendering assets' },
        { ext: '.BAR', blueprint: 'metaltwist.bar', note: 'Nightlife, cocktail bar, & urban lounge setups' },
        { ext: '.CAFE', blueprint: 'urbanroast.cafe', note: 'Boutique coffee hubs & breakfast layout modules' },
        { ext: '.KITCHEN', blueprint: 'darkcloud.kitchen', note: 'Optimized decentralized ghost kitchen systems' },
        { ext: '.MENU', blueprint: 'suburban.menu', note: 'Fast routing single-screen digital menu catalogs' },
        { ext: '.DELIVERY', blueprint: 'expressfeast.delivery', note: 'Real-time localized delivery fleet maps' },
        { ext: '.WINE', blueprint: 'vintagereserve.wine', note: 'Luxury cellars, tasting clubs, & estate labels' },
        { ext: '.BEER', blueprint: 'districtcraft.beer', note: 'Micro-brewery profiles & local taproom grids' }
      ]
    },
    {
      id: 'community',
      name: '2. Community Focus',
      description: 'Fosters systemic, structural belonging, regional neighborhood networks, and secure digital entry points for local corporate assemblies.',
      tlds: [
        { ext: '.COMMUNITY', blueprint: 'randburg.community', note: 'Localized urban business directory hubs' },
        { ext: '.CLUB', blueprint: 'phoenixrugby.club', note: 'Membership rosters & regional structural assets' },
        { ext: '.FORUM', blueprint: 'techgroup.forum', note: 'Secure internal corporate exchange environments' },
        { ext: '.NETWORK', blueprint: 'alumniconnect.network', note: 'Peer-to-peer structural mentorship directories' },
        { ext: '.TOWN', blueprint: 'creative.town', note: 'Regional creator coalitions & micro-economies' },
        { ext: '.CENTER', blueprint: 'lifestyle.center', note: 'Boutique resource vaults & training systems' },
        { ext: '.HUB', blueprint: 'sanctuary.hub', note: 'Central processing points for ecosystem services' },
        { ext: '.GROUP', blueprint: 'douman.group', note: 'Multi-sector entity organizational holding schemas' },
        { ext: '.CHURCH', blueprint: 'gracefellowship.church', note: 'Faith-based media portals & live stream panels' },
        { ext: '.WORLD', blueprint: 'innovators.world', note: 'Global decentralized community platform maps' }
      ]
    },
    {
      id: 'healthcare',
      name: '3. Healthcare & Welfare',
      description: 'Commands immense ethical authority, regulatory POPIA compliance weight, institutional donor trust, and transparent non-profit frameworks.',
      tlds: [
        { ext: '.FOUNDATION', blueprint: 'furballs.foundation', note: 'Transparent non-profit animal welfare models' },
        { ext: '.HEALTHCARE', blueprint: 'apex.healthcare', note: 'Clinical workflow software & private practice assets' },
        { ext: '.CLINIC', blueprint: 'randburg.clinic', note: 'Patient check-in panels & session booking queues' },
        { ext: '.CARE', blueprint: 'furball.care', note: 'Pet sanctuary management & rescue intake sheets' },
        { ext: '.BOTANICALS', blueprint: 'curated.botanicals', note: 'Luxury premium organic extracts & wellness oils' },
        { ext: '.SURGERY', blueprint: 'advancedortho.surgery', note: 'Specialist medical consultant profile pipelines' },
        { ext: '.DOCTOR', blueprint: 'familywellness.doctor', note: 'Secure telemedicine routing portals' },
        { ext: '.ORGANIZATION', blueprint: 'rescueall.organization', note: 'POPIA compliant international donor engines' },
        { ext: '.THERAPY', blueprint: 'mindspace.therapy', note: 'Private mental wellness & guidance booking systems' },
        { ext: '.PHARMACY', blueprint: 'scriptdirect.pharmacy', note: 'Optimized local script order & prescription fulfillment' }
      ]
    },
    {
      id: 'adult',
      name: '4. Adult Entertainment',
      description: 'High-margin, hyper-secure lifestyle branding, gated digital subscription lockers, and clean interactive paywall processing interfaces.',
      tlds: [
        { ext: '.ADULT', blueprint: 'kinkfever.adult', note: 'Gated membership hubs & secure identity vaults' },
        { ext: '.VIP', blueprint: 'indigomanor.vip', note: 'Luxury invitation-only private retreat access maps' },
        { ext: '.FETISH', blueprint: 'kinkfever.fetish', note: 'Niche lifestyle branding & product portfolios' },
        { ext: '.SEXY', blueprint: 'lunasalon.sexy', note: 'Premium glamorous model showcase lookbooks' },
        { ext: '.XXX', blueprint: 'midnightX.xxx', note: 'Strict age-verified high-speed content networks' },
        { ext: '.CLUB', blueprint: 'nightpulse.club', note: 'Premium visual asset lockers & live stream triggers' },
        { ext: '.STUDIO', blueprint: 'productionX.studio', note: 'High-end visual content production portfolio cards' },
        { ext: '.ENTERTAINMENT', blueprint: 'afterhours.entertainment', note: 'Late-night regional lifestyle event spaces' },
        { ext: '.CHAT', blueprint: 'encryptedpulse.chat', note: 'Bespoke custom peer-to-peer real-time secure rooms' },
        { ext: '.DIRECT', blueprint: 'creators.direct', note: 'Disintermediated creator subscription checkout flows' }
      ]
    },
    {
      id: 'sports',
      name: '5. Sports, Arts & Culture',
      description: 'Dynamic, high-impact experiential portals optimized for sensory live showcase planning, regional tournament structures, and creative talent arrays.',
      tlds: [
        { ext: '.RUGBY', blueprint: 'phoenix.rugby', note: 'BokSmart safety integrated player development logs' },
        { ext: '.EVENTS', blueprint: 'alteredevents.events', note: 'Sensory interactive room ticket layout sheets' },
        { ext: '.STUDIO', blueprint: 'indigomanor.studio', note: 'Professional grooming & premium brand alignment' },
        { ext: '.ACADEMY', blueprint: 'phoenixsports.academy', note: 'Junior development training program blueprints' },
        { ext: '.TEAM', blueprint: 'lionscombined.team', note: 'Live squad roster selection matrices & metrics' },
        { ext: '.GALLERY', blueprint: 'sensations.gallery', note: 'Bespoke artist profile grids & visual showcases' },
        { ext: '.PRODUCTION', blueprint: 'altmedia.production', note: 'Live sound, stage rigging, & video capture logs' },
        { ext: '.BAND', blueprint: 'sonicpulse.band', note: 'Live performance tour schedules & media players' },
        { ext: '.SHOW', blueprint: 'alteredsensations.show', note: 'July 18th lifestyle interactive event panels' },
        { ext: '.FASHION', blueprint: 'indigoluxe.fashion', note: 'Luxury metallic texture apparel launch portfolios' }
      ]
    },
    {
      id: 'corporate',
      name: '6. Corporate & Financial',
      description: 'Heavyweight enterprise engineering. Hardened offline-first databases, structural investor disbursement plans, and secure administrative command platforms.',
      tlds: [
        { ext: '.TECH', blueprint: 'ciphercorp.tech', note: 'High-performance custom web framework systems' },
        { ext: '.CORPORATE', blueprint: 'summitventures.corporate', note: 'B2B multi-sector legal enterprise portfolios' },
        { ext: '.VENTURES', blueprint: 'indigomanor.ventures', note: 'Monthly R2,500 investment structural drip models' },
        { ext: '.FINANCIAL', blueprint: 'douman.financial', note: 'Manual invoice generation & payment gateways' },
        { ext: '.HOLDINGS', blueprint: 'ciphergroup.holdings', note: 'Multi-brand operational infrastructure trees' },
        { ext: '.CAPITAL', blueprint: 'summit.capital', note: 'Investor proposal ledger calculations' },
        { ext: '.CONSULTING', blueprint: 'systemsanalyst.consulting', note: 'Premium software engineering consultation briefs' },
        { ext: '.PARTNERS', blueprint: 'neilandcandy.partners', note: 'Executive structural board documentation spaces' },
        { ext: '.ENTERPRISE', blueprint: 'cipherdb.enterprise', note: 'Offline-first database system syncing patterns' },
        { ext: '.AGENCY', blueprint: 'cipherdesign.agency', note: 'Digital brand identity & luxury layout development' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono selection:bg-emerald-500 selection:text-neutral-950 relative overflow-hidden">
      
      {/* Ambient Cyber Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/15 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* Corporate Spacious Header */}
      <header className="relative z-10 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-5">
            <img 
              src="/logo.png" 
              alt="CipherCorp Logo" 
              className="h-24 w-auto max-w-[240px] object-contain transition-all duration-300 hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <div className="flex flex-col text-left border-l border-neutral-800 pl-4 py-1">
              <span className="text-2xl sm:text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-orbitron">
                CipherCorp
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400 uppercase mt-0.5">
                // Tech Group
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2 rounded-xl font-mono text-xs text-neutral-400 tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
            <span>ZA // ESTD 2025</span>
          </div>
        </div>
      </header>

      {/* Main Core Viewport */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-16">
        
        {/* Flagship Hero Banner */}
        <section className="max-w-4xl mx-auto text-center flex flex-col items-center mb-24">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase mb-6 leading-tight font-orbitron">
            We Script The Future Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">
              Enterprise Systems
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 font-light leading-relaxed">
            CipherCorp Tech Group is a premium software engineering agency and digital product studio. From offline-first database systems to highly optimized custom web architectures, we engineer high-performance operational assets.
          </p>
          <button 
            onClick={() => setActiveModal('about')}
            className="text-xs text-emerald-400 font-mono tracking-widest uppercase mb-12 hover:text-emerald-300 transition-colors border-b border-emerald-500/30 pb-1"
          >
            Read Our Company Profile ➜
          </button>

          {/* Core Lead Capture Module */}
          <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-900 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <h3 className="text-xs font-semibold tracking-wider text-emerald-400 uppercase text-left">// Initiate A Technical Briefing</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-neutral-100"
                  />
                  <button type="submit" className="bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wider whitespace-nowrap font-orbitron">Connect</button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">✓</div>
                <h4 className="text-base font-bold text-neutral-100 font-orbitron">Handshake Initialized</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">Transmission logged. Our deployment unit will reach out shortly.</p>
              </div>
            )}
          </div>
        </section>

        {/* CORE SERVICES PLATFORM MATRIX */}
        <section className="mb-28 border-t border-neutral-900/80 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 mb-3">// Commercial Engagements</h2>
            <p className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-100 font-orbitron">Deployment Pipelines</p>
            <p className="text-neutral-400 text-xs mt-3 font-light">
              We deliver digital value through two strategic operational channels: tailormade engineering or instant asset licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-neutral-900/20 border border-neutral-900/80 hover:border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Pipeline // 01</span>
                <span className="text-xs font-mono text-neutral-600 uppercase">Custom Build</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-neutral-100 font-orbitron mb-3 tracking-wide">Bespoke Engineering</h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                We design, code, and deploy custom web solutions and application systems built precisely around your operational needs and unique industry specifications. From localized member directories to corporate workflow panels, your script is uniquely hand-engineered.
              </p>
              <ul className="space-y-2 text-xs text-neutral-500 font-mono mb-4 border-t border-neutral-900 pt-4">
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Deep Specification Scoping</li>
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Zero-Template Hand-Coded Architecture</li>
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Tailored Functional UI Layouts</li>
              </ul>
            </div>

            <div className="bg-neutral-900/20 border border-neutral-900/80 hover:border-emerald-400 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.03)] hover:shadow-[0_0_35px_rgba(52,211,153,0.15)] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-neutral-950 uppercase bg-emerald-400 border border-emerald-400 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(52,211,153,0.3)]">Pipeline // 02</span>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider animate-pulse">Turnkey License</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-neutral-100 font-orbitron mb-3 tracking-wide">Ready-Built Application Licensing</h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Bypass long development cycles. Acquire our completely developed, fully operational system templates—such as a specialized food delivery app infrastructure—and launch instantly. We handle full deployment, server management, and technical hosting for a flat, predictable monthly fee.
              </p>
              <ul className="space-y-2 text-xs text-neutral-500 font-mono mb-4 border-t border-neutral-900 pt-4">
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Instant System Instantiation</li>
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Full Server Hosting & Backups Included</li>
                <li className="flex items-center text-neutral-400"><span className="text-emerald-400 mr-2">✓</span> Zero Tech Overhead Management Fees</li>
              </ul>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_10px_#34d399]" />
            </div>
          </div>
        </section>

        {/* Feature Focus: Expanded Target Sector Incubator */}
        <section className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 mb-3">// Core Registry System Mapping</h2>
            <p className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-100 font-orbitron">Categorized TLD Brand Incubator</p>
            <p className="text-neutral-400 text-xs mt-3 font-light">
              Select an operational industry block below to expand its registry database drawer and inspect highly strategic top-level domain extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySectors.map((sector) => {
              const isExpanded = expandedBlock === sector.id;
              return (
                <div 
                  key={sector.id} 
                  className={`border rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between backdrop-blur-sm lg:col-span-1 ${
                    isExpanded 
                      ? 'bg-neutral-900 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.2)] col-span-1 md:col-span-2 lg:col-span-3' 
                      : 'bg-neutral-900/10 border-neutral-900/80 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]'
                  }`}
                >
                  <div className="p-6 text-left">
                    <h3 className="text-base sm:text-lg font-bold uppercase text-neutral-100 font-orbitron tracking-wide mb-2">
                      {sector.name}
                    </h3>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
                      {sector.description}
                    </p>

                    <button
                      onClick={() => setExpandedBlock(isExpanded ? null : sector.id)}
                      className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between border ${
                        isExpanded
                          ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'bg-neutral-950 hover:bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.05)]'
                      }`}
                    >
                      <span>{isExpanded ? '// Collapse Registry Drawer' : '➔ Inspect Curated TLD List'}</span>
                      <span className="text-sm font-sans">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-neutral-800 bg-neutral-950/70 p-6 animate-slideDown">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-4 flex items-center justify-between">
                        <span>// Registry Target Map (10 Verified Node Objects Loaded)</span>
                        <span className="text-emerald-500/60 hidden sm:inline">System Registry Active // Static Simulation</span>
                      </div>
                      
                      <div className="max-h-72 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent text-left">
                        {sector.tlds.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="bg-neutral-900/60 border border-neutral-900 hover:border-emerald-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors group"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-xs font-mono font-bold bg-neutral-950 text-emerald-400 border border-neutral-800 px-3 py-1.5 rounded-lg font-orbitron min-w-[110px] text-center group-hover:border-emerald-500/40 transition-colors group-hover:shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                                {item.ext}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-neutral-200">{item.blueprint}</span>
                                <span className="text-[11px] text-neutral-500 font-light mt-0.5">{item.note}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-600 bg-neutral-950/40 px-2.5 py-1 rounded border border-neutral-900 tracking-wider uppercase sm:self-center self-start">
                              Node active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {isExpanded && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_15px_#34d399]" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Studio Core Capabilities Grid */}
        <section className="py-16 border-t border-neutral-900/80 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-left">
              <div className="text-xs text-emerald-400 mb-2">01 // ARCHITECTURE</div>
              <h3 className="text-base font-bold uppercase text-neutral-200 mb-3 font-orbitron">Custom Web Frameworks</h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">Blazing fast single-page architectures engineered by hand. We maximize SEO ranks and conversion rates by removing bloated templates.</p>
            </div>
            <div className="text-left">
              <div className="text-xs text-emerald-400 mb-2">02 // DATA ENGINE</div>
              <h3 className="text-base font-bold uppercase text-neutral-200 mb-3 font-orbitron">Data-Optimized Interfaces</h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">Progressive, offline-first engineering patterns built to sync smoothly without consuming expensive local carrier data or airtime.</p>
            </div>
            <div className="text-left">
              <div className="text-xs text-emerald-400 mb-2">03 // INCUBATION</div>
              <h3 className="text-base font-bold uppercase text-neutral-200 mb-3 font-orbitron">Digital Product Alignment</h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">End-to-end launching mechanics. We link premier domain extensions with highly optimized code outlines to test project structures rapidly.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-2xl mx-auto border-t border-neutral-900/80 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 mb-3">// Communications Terminal</h2>
            <p className="text-2xl sm:text-3xl font-extrabold uppercase text-neutral-100 font-orbitron">Let's Construct Something Significant</p>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-900 p-8 rounded-2xl backdrop-blur-sm shadow-xl text-left">
            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">Your Name / Organization</label>
                  <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="e.g. John Doe" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-neutral-100" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">Direct Contact Email Address</label>
                  <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="e.g. name@company.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-neutral-100" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">Project Scope Description</label>
                  <textarea required rows="4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Describe your design specifications, target TLD extension, and engineering goals..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-neutral-100 leading-relaxed" />
                </div>
                <button type="submit" className="w-full bg-neutral-100 hover:bg-white text-neutral-950 font-bold py-3 rounded-xl transition-all uppercase tracking-wider text-xs shadow-md font-orbitron">Transmit Secure Message</button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">✓</div>
                <h4 className="text-lg font-bold text-neutral-100 uppercase tracking-wide font-orbitron">Secure Transmission Dispatched</h4>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you, <span className="text-neutral-200 font-semibold">{contactName}</span>. Your message packets have been safely routed to our core administration registry. A senior systems analyst will establish contact shortly.
                </p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Corporate Legal Footer */}
      <footer className="relative z-10 border-t border-neutral-900/60 bg-neutral-950/80 py-8 text-center text-xs text-neutral-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} CIPHERCORP TECH GROUP. ALL RIGHTS RESERVED.</div>
          <div className="flex space-x-6">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-neutral-400 transition-colors uppercase tracking-wider">Privacy Notice</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-neutral-400 transition-colors uppercase tracking-wider">Terms of Engagement</button>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODAL OVERLAY PORTAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-lg">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-8 text-left shadow-2xl relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white text-sm uppercase tracking-widest font-mono border border-neutral-800 hover:border-neutral-700 rounded-lg px-2.5 py-1 transition-all"
            >
              Esc ✕
            </button>

            {activeModal === 'about' && (
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">// Corporate Profile</span>
                <h2 className="text-2xl font-black uppercase text-neutral-100 font-orbitron">About CipherCorp</h2>
                <div className="h-px bg-neutral-800 my-2" />
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  Founded in 2025 in South Africa, CipherCorp Tech Group operates at the intersection of mathematical precision and cutting-edge software development. We exist to build secure, ultra-optimized, and resilient digital architectures for enterprises that refuse to settle for generic templates.
                </p>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  Our philosophy is rooted in the word <em>Cipher</em> itself—decoding complex commercial problems and translating them into elegant, functional source code. Whether we are launching data-optimized mobile ecosystems that run seamlessly offline in low-connectivity zones, or scripting bespoke high-converting web applications, CipherCorp engineers assets built to scale. We don't just deploy websites; we script the underlying systems that drive modern industry.
                </p>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">// Regulatory Notice</span>
                <h2 className="text-2xl font-black uppercase text-neutral-100 font-orbitron">Privacy Statement (POPIA)</h2>
                <div className="h-px bg-neutral-800 my-2" />
                <div className="space-y-4 text-xs sm:text-sm font-light text-neutral-300 leading-relaxed">
                  <p><strong>1. Information Collection:</strong> When you initiate a project inquiry via our connection portal, CipherCorp Tech Group collects your submitted email address solely to establish professional business correspondence.</p>
                  <p><strong>2. Purpose of Processing:</strong> In strict compliance with the Protection of Personal Information Act (POPIA) of South Africa, your data is processed exclusively to coordinate technical project briefings. We maintain a strict zero-spam policy and do not share, lease, sell, or distribute your email records to third-party brokers or marketing networks.</p>
                  <p><strong>3. Data Security & Rights:</strong> Your information is secured utilizing encrypted local storage states to prevent unauthorized access, loss, or manipulation. Users maintain the absolute right to request the immediate erasure of their data from our active deployment registers at any stage by contacting a CipherCorp administrator.</p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">// Framework Guidelines</span>
                <h2 className="text-2xl font-black uppercase text-neutral-100 font-orbitron">Terms of Engagement</h2>
                <div className="h-px bg-neutral-800 my-2" />
                <div className="space-y-4 text-xs sm:text-sm font-light text-neutral-300 leading-relaxed">
                  <p><strong>1. Acceptance of Terms:</strong> By navigating <code>ciphercorp.tech</code> or submitting a technical project brief via our interfaces, you agree to be bound by these foundational operating guidelines and legal terms.</p>
                  <p><strong>2. Intellectual Property:</strong> All custom codebase components, interface designs, layout parameters, visual mockups, and graphic asset iterations displayed on or compiled by this platform are the sole intellectual property of CipherCorp Tech Group. Unauthorized replication, distribution, or reverse-engineering of our source architectures or design frameworks is legally prohibited.</p>
                  <p><strong>3. Scope of Consultation:</strong> A submission via our web form constitutes an official request for a business consultation. It does not establish a binding software engineering service contract, delivery guarantee, or formal technical partnership until an explicit Statement of Work (SOW) has been digitally authorized by executive representatives of both parties.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}