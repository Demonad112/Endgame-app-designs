/* Design lab: restyles /character/ via data-* attributes on <body>. Vanilla, same-origin only.
   GROUPS is the single source of truth (panel, hash, randomize, gallery, docs). */
(function () {
  'use strict';
  var Q = new URLSearchParams(location.search), MODE = Q.get('lab');
  if (MODE === '0') return;
  var SOLO = MODE === 'solo', AUDIT = MODE === 'audit';
  document.documentElement.setAttribute('data-lab-on', '');
  var KEY = 'lab:v1', PKEY = 'lab:presets';

  function G(key, label, theme, solo, spec) {
    var opts = [{ id: 'base', name: 'Original', title: 'The unmodified design' }];
    spec.split(';').forEach(function (s) { var p = s.split('|'); opts.push({ id: p[0], name: p[1], title: p[2] }); });
    return { key: key, label: label, theme: theme, solo: solo, options: opts };
  }
  var S1 = 'Surfaces & structure', S2 = 'Verdict & numbers', S3 = 'Reading flow', S4 = 'Type, colour & finish';
  var GROUPS = [
    G('card', 'Card elevation', S1, '[data-top-fixes]', 'flat|Flat|No shadow, hairline only;raised|Raised|Soft lifted shadow;stepped|Stepped|Hard offset shadow;stack|Stack|Two ghost cards behind;pressed|Pressed|Inset, pushed-in panel;underglow|Underglow|Ambient gold glow beneath;toplit|Top-lit|Highlight on top edge, shade below;engraved|Engraved|Double engraved inner border;bare|Bare|Content on the page, no panel;cutout|Cutout|Gold hairline set inside the edge;shelf|Shelf|Thick bottom ledge'),
    G('fill', 'Panel fill', S1, '[data-top-fixes]', 'clear|Clear glass|Very light tint;frost|Frosted|Blurred frosted tint;ink|Solid ink|Opaque near-black;vgrad|Vertical gradient|Light to dark top-down;sheen|Diagonal sheen|Soft diagonal highlight;grain|Noise grain|Fine film grain;parchment|Dark parchment|Warm paper texture;duotone|Gold wash|Duotone gold wash;scanline|Scanline|1px horizontal lines;smoke|Smoke|Off-centre radial haze'),
    G('frame', 'Borders & frames', S1, '[data-top-fixes]', 'double|Double rule|Second rule outside;brackets|Brackets|Gold corner brackets;notch|Notched|Cut corners, straight edges;barL|Left bar|Left accent bar;barT|Top bar|Top accent bar;dashed|Dashed|Technical dashed edge;spaced|Spaced|No border, spacing only;rivets|Rivets|Square corner studs;tickframe|Ruler ticks|Ruler ticks on the top edge'),
    G('head', 'Card header', S1, '[data-top-fixes]', 'tab|Tab|Label sits in a tab on the border;rule|Rule|Rule extends right of label;overline|Overline|Gold rule above the label;strip|Strip|Filled small-caps bar;side|Side|Rotated side label (strip on narrow screens);minimal|Minimal|Small quiet label;marker|Marker|Square gold marker before the label;hanging|Hanging|Label hung in the left gutter (hairline label on narrower screens)'),
    G('divider', 'Section dividers', S1, '#findings', 'rule|Rule|Thin rule;diamond|Diamond|Gold diamond mid-rule;ornament|Ornament|Three-diamond ornament in a gap;ticks|Ticks|Ruler tick marks;fade|Fade|Gradient fade line;chapter|Chapter|Large outlined section number;ledger|Ledger|Double hairline'),
    G('density', 'Density', S1, '#findings', 'compact|Compact|Tight padding;snug|Snug|Slightly tight;comfy|Comfortable|Roomy padding;spacious|Spacious|Generous padding and gaps;luxe|Luxe|Maximum breathing room'),
    G('grid', 'Layout grid', S1, '#findings', '1col|Single column|One column everywhere;2col|Two column|Cards in two columns;3col|Three column|Three columns on wide screens;masonry|Masonry|Flowing columns;bento|Bento|First tile spans 2x2;rail|Rail|Narrow centred measure;gutter|Title gutter|Section title in a left gutter'),
    G('grade', 'Grade display', S2, '[data-showcase]', 'letter|Letter|Large bare letter;slab|Slab|Solid gold block, dark letter;segbar|Segment bar|Ladder as contiguous bar;ticks|Tick gauge|Ladder as ruler gauge;band|Range band|Lit range shaded;ladder|Stair ladder|Rising rungs;badge|Badge|Compact badge;underbar|Underbar|Bare letter on a heavy gold bar;margin|Margin|Grade in the margin;seal|Seal|Double inset square seal;stencil|Stencil|Outlined letters'),
    G('rows', 'Stat rows', S2, '#defences .card:has(.pools)', 'table|Table|One row per stat;leaders|Leaders|Dotted leaders;centered|Centred|Centred stacks;valuefirst|Value first|Big value above label;chips|Chips|Inline chips;plinth|Plinth|Heavy underline per tile;zebra|Zebra|Alternating rows;pairs|Pairs|Two-up pairs;ruled|Ruled|Hairlines, values right;tabbed|Tabbed|Label strip on top'),
    G('nums', 'Numerals', S2, '#defences .card:has(.pools)', 'oldstyle|Old-style|Garamond old-style figures;lining|Lining|Garamond lining figures;sans|Sans|Inter tabular figures;keygold|Key gold|Gold on key values;mono|Mono|Geist Mono tabular figures;bigvalue|Big value|Larger key numerals;condensed|Condensed|Tight tracking;boxed|Boxed|Key values in gold-tinted cells'),
    G('meter', 'Resist meters', S2, '#defences .card:has([data-io])', 'plain|Plain numbers|No bar;segments|Segments|Segmented fill;underline|Underline|Thin underlined meter;capmark|Cap mark|Bold cap marker;heat|Heat strip|Gradient scale with pointer;spark|Column spark|Rising columns;dial|Square dial|Square tick ring from the cap ratio;delta|Delta chip|Delta boxed, bar removed;ruler|Ruler|Measuring-ruler track;notched|Notched|Ten notched cells'),
    G('sev', 'Severity & status', S2, '#defence-checklist-disclosure', 'square|Square dot|Square marker;badge|Badge|Filled badge;stripe|Stripe|Left stripe;tag|Tag|Outlined text tag;glyph|Glyph|Shape glyph per status;rowtint|Row tint|Tinted row;underscore|Underscore|Underlined status text;filled|Filled|Solid chips;traffic|Traffic strip|Three-segment strip;margin|Margin mark|Glyph hung in the gutter'),
    G('dmg', 'Damage colour', S2, '#defences .card:has([data-io])', 'tint|Text tint|Label tinted by element;patterned|Patterned|Hatch per element (colour-blind safe);mono|Mono gold|One gold for all;legend|Legend chips|Labels as colour-keyed chips;swatch|Swatch|Square swatch beside label'),
    G('findings', 'Findings list', S3, '#findings ul', 'timeline|Timeline|Thread connectors;accordion|Accordion|Compact rows, detail on hover;split|Split|Problem and fix side by side;bands|Bands|Full-width alternating bands, no cards;rail|Rail|Severity-ordered rail;oneliners|One-liners|Single-line rows;columns|Columns|Columns by severity;index|Index|Numbered index first;cards|Cards|Single-column cards'),
    G('recs', 'Recommendations', S3, '[data-top-fixes]', 'stepcards|Step cards|Heavy numbered steps;stepper|Stepper|Vertical stepper line;beforeafter|Before / after|Two-pane pairs;grid|Grid|Three-up bordered tiles, big number;lanes|Lanes|Full-width rows, lane header on the left;sticky|Next action|Sticky next-action strip;receipt|Receipt|Narrow ledger slip'),
    G('gear', 'Gear layout', S3, '#gear', 'ladder|Priority ladder|Worst gap first, with gap meter and band stripe;slots|Slot grid|Paperdoll-style slot layout;compact|Compact rows|One aligned row per slot;bars|Gap bars|One full-width gap bar per slot, worst first;tiers|Tier groups|Far / Mid / Near groups with headings'),
    G('gdelta', 'Skill gear changes', S3, '[data-lab=gdelta]', 'delta|Tier range|Pips show the tier jump;tags|Slot tags|Slot tag; hover or focus lights the gear card;compact|One-liners|Single-line rows;grouped|Grouped by slot|Rows of one slot sit together under a slot heading'),
    G('nav', 'Section navigation', S3, '#findings', 'tabs|Sticky tabs|Strong sticky tab bar;rail|Left rail|Left rail with scroll-spy (scroll rail on narrow screens);chips|Chips|Anchor chips;jump|Jump menu|Select menu;progress|Progress rule|Scroll progress line;none|None|Hide navigation'),
    G('disclose', 'Disclosure', S3, '#findings', 'tabs|Tabs|Card disclosures become a tab set;open|All open|Open everything;accordion|Accordion|One open at a time;pro|Pro detail|Detail text on hover or focus;hover|Hover reveal|Reveal on hover / tap'),
    G('hero', 'Page hero', S3, '[data-showcase]', 'compact|Compact line|Tight title;plate|Plate|Class plate;banner|Banner|Wide banner;split|Split|Meta to the right;crumb|Crumb|Breadcrumb style;minimal|Minimal|Bare;ledgerhead|Ledger head|Rule and meta columns'),
    G('htype', 'Headings', S4, '#overview-title', 'tracked|Tracked|Wide tracking;underline|Gold underline|Large with underline;numbered|Numbered|Number prefix;outlined|Outlined|Outline letters;split|Split weight|Light and bold;centred|Centred rules|Rules either side;smallcaps|Small caps|Plain small caps;foil|Foil|Static foil gradient'),
    G('scale', 'Type scale', S4, '#findings', 'tight|Tight|Compact type;airy|Airy|Looser leading;fluid|Fluid|Viewport scaled;editorial|Editorial|Wide measure, large leading;standard|Standard|Slightly larger body'),
    G('accent', 'Accent palette', S4, '[data-top-fixes]', 'champagne|Champagne|Pale gold;amber|Amber|Warm amber;brass|Brass|Olive brass;rose|Rose gold|Pink gold;bronze|Bronze|Deep bronze;antique|Antique|Muted antique gold'),
    G('bg', 'Background', S4, '#findings', 'flat|Flat ink|Plain;vignette|Vignette|Top vignette;corners|Corner glows|Corner glows;grain|Grain|Fine grain;hatch|Hatch|Diagonal hatch;grid|Grid|Faint grid;heroband|Hero band|Band behind hero;fog|Fog|Layered fog;hidefx|No ornament|Remove ring and scrim'),
    G('motion', 'Motion', S4, '[data-top-fixes]', 'lift|Card lift|Lift on hover;drawin|Draw-in|Border draws in;stagger|Stagger|Fade-up stagger;sweep|Underline sweep|Link underline sweep;focuspulse|Focus pulse|Pulse on focus'),
    G('states', 'Interaction states', S4, '[data-top-fixes]', 'underline|Underline|Underline on hover;glow|Glow edge|Glow edge;offset|Offset shift|Shift on press;fillsweep|Fill sweep|Fill sweeps in;bracket|Bracket|Brackets expand'),
    G('footer', 'Footer', S4, 'footer', 'minimal|Minimal|Quiet line;plate|Plate|Sourced-from plate;badges|Badges|Badge row;none|None|Hide'),
    G('chip', 'Chips', S4, '#findings ul > li:first-child', 'outline|Outline|Outline only;filled|Filled|Solid;bracketed|Bracketed|[TAG];underlined|Underlined|Underlined;monocaps|Mono caps|Mono caps'),
    G('focus', 'Reading aid', S4, '#findings ul', 'dim|Dim others|Dim siblings on hover;spot|Spotlight|Spotlight section')
  ];
  var BY = {}; GROUPS.forEach(function (g) { BY[g.key] = g; });
  function valid(k, v) { var g = BY[k]; return g && g.options.some(function (o) { return o.id === v; }); }

  var PRESETS = {
    'Archive': { card: 'engraved', fill: 'parchment', frame: 'double', head: 'rule', divider: 'ornament', grade: 'seal', rows: 'leaders', nums: 'oldstyle', meter: 'underline', sev: 'glyph', accent: 'antique', bg: 'vignette', htype: 'smallcaps', chip: 'bracketed', gear: 'ladder', gdelta: 'delta' },
    'Ledger': { card: 'flat', fill: 'ink', frame: 'tickframe', head: 'overline', divider: 'ledger', grade: 'margin', rows: 'ruled', nums: 'boxed', meter: 'ruler', sev: 'margin', findings: 'bands', htype: 'tracked', chip: 'monocaps', bg: 'grid', gear: 'bars', gdelta: 'compact' },
    'Plate': { card: 'raised', fill: 'vgrad', frame: 'rivets', head: 'strip', divider: 'diamond', grade: 'slab', rows: 'tabbed', nums: 'keygold', meter: 'segments', sev: 'badge', hero: 'plate', accent: 'brass', htype: 'underline', gear: 'slots', gdelta: 'tags' },
    'Quiet': { card: 'bare', fill: 'clear', frame: 'spaced', head: 'minimal', divider: 'fade', density: 'spacious', grade: 'letter', rows: 'centered', nums: 'mono', meter: 'plain', sev: 'square', htype: 'smallcaps', scale: 'airy', grid: 'rail', accent: 'champagne', footer: 'minimal', chip: 'underlined', gear: 'ladder', gdelta: 'compact' },
    'Dense Ops': { card: 'flat', fill: 'ink', frame: 'barL', head: 'marker', divider: 'rule', density: 'compact', grid: '3col', grade: 'ticks', rows: 'table', nums: 'condensed', meter: 'notched', sev: 'tag', findings: 'oneliners', scale: 'tight', accent: 'amber', chip: 'monocaps', nav: 'tabs', gear: 'compact', gdelta: 'compact' },
    'Editorial': { card: 'bare', fill: 'clear', frame: 'spaced', head: 'hanging', divider: 'chapter', density: 'luxe', grid: 'gutter', grade: 'letter', rows: 'valuefirst', nums: 'oldstyle', meter: 'underline', htype: 'split', scale: 'editorial', hero: 'ledgerhead', accent: 'champagne', findings: 'timeline', chip: 'underlined', gear: 'ladder', gdelta: 'delta' },
    'Relic': { card: 'toplit', fill: 'smoke', frame: 'notch', head: 'tab', divider: 'ornament', grade: 'underbar', rows: 'plinth', nums: 'keygold', meter: 'capmark', sev: 'stripe', bg: 'corners', accent: 'bronze', htype: 'foil', motion: 'drawin', gear: 'slots', gdelta: 'delta' },
    'Blueprint': { card: 'cutout', fill: 'scanline', frame: 'dashed', head: 'overline', divider: 'ticks', grade: 'band', rows: 'pairs', nums: 'sans', meter: 'ruler', sev: 'underscore', bg: 'grid', htype: 'tracked', chip: 'bracketed', nav: 'chips', gear: 'compact', gdelta: 'delta' },
    'Field Report': { card: 'shelf', fill: 'grain', frame: 'barT', head: 'rule', divider: 'ledger', grade: 'badge', rows: 'zebra', nums: 'lining', meter: 'heat', sev: 'rowtint', recs: 'stepper', findings: 'split', accent: 'brass', bg: 'hatch', gear: 'tiers', gdelta: 'tags' },
    'Vault': { card: 'underglow', fill: 'duotone', frame: 'brackets', head: 'strip', divider: 'diamond', grade: 'stencil', rows: 'chips', nums: 'keygold', meter: 'spark', sev: 'filled', dmg: 'patterned', bg: 'fog', accent: 'rose', htype: 'outlined', motion: 'lift', states: 'glow', gear: 'slots', gdelta: 'tags' },
    'Telegraph': { card: 'stepped', fill: 'ink', frame: 'double', head: 'side', divider: 'rule', grade: 'segbar', rows: 'leaders', nums: 'condensed', meter: 'delta', sev: 'traffic', recs: 'receipt', hero: 'banner', htype: 'tracked', chip: 'monocaps', footer: 'plate', gear: 'compact', gdelta: 'delta' },
    'Codex': { card: 'stack', fill: 'parchment', frame: 'barL', head: 'marker', divider: 'chapter', grade: 'ladder', rows: 'ruled', nums: 'oldstyle', meter: 'segments', sev: 'glyph', findings: 'index', hero: 'crumb', htype: 'numbered', accent: 'antique', bg: 'vignette', scale: 'editorial', gear: 'ladder', gdelta: 'grouped' }
  };
  var PRESET_META = {
    'Archive': 'Dark parchment, engraved double frames, old-style figures, antique gold.',
    'Ledger': 'Flat ink ledger: tick frames, overline heads, boxed numerals, bands.',
    'Plate': 'Raised riveted plates with strip headers and slab grades.',
    'Quiet': 'Bare, airy and muted: minimal heads, mono figures, narrow measure.',
    'Dense Ops': 'Compact operations view: three columns, notched meters, one-liners.',
    'Editorial': 'Magazine layout: hanging labels, luxe spacing, large leading.',
    'Relic': 'Top-lit notched cards, foil headings, bronze accent.',
    'Blueprint': 'Dashed cutouts on a faint grid, scanlines, bracketed chips.',
    'Field Report': 'Shelf cards, grain fill, zebra rows, stepper recommendations.',
    'Vault': 'Underglow cards, gold wash, brackets, patterned damage colours.',
    'Telegraph': 'Hard stepped shadows, side labels, receipt recommendations.',
    'Codex': 'Stacked parchment cards, chapter numerals, indexed findings.'
  };
  Object.keys(PRESETS).forEach(function (n) { Object.freeze(PRESETS[n]); }); Object.freeze(PRESETS);
  window.__labPresets = PRESETS; window.__labPresetMeta = PRESET_META;
  var BAD = [['card:bare', 'frame:spaced'], ['card:bare', 'frame:brackets'], ['card:bare', 'frame:rivets'], ['frame:notch', 'card:stepped'], ['frame:notch', 'card:underglow'], ['head:side', 'head:side'], ['grid:rail', 'grid:masonry'], ['nav:rail', 'grid:gutter'], ['grid:bento', 'findings:columns'], ['meter:dial', 'dmg:patterned'], ['gear:slots', 'grid:2col'], ['gear:slots', 'grid:3col'], ['gear:compact', 'card:stack'], ['gear:bars', 'grid:2col'], ['gear:bars', 'grid:3col'], ['gear:bars', 'card:stack'], ['gear:tiers', 'grid:2col'], ['gear:tiers', 'grid:3col']];

  /* ---------- state ---------- */
  var body = document.body, state = {};
  function parse(str) { var o = {}; new URLSearchParams(str).forEach(function (v, k) { if (valid(k, v) && v !== 'base') o[k] = v; }); return o; }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function load() {
    var h = parse(location.hash.slice(1));
    if (Object.keys(h).length || SOLO) return h;
    try { return parse(new URLSearchParams(JSON.parse(lsGet(KEY) || '{}')).toString()); } catch (e) { return {}; }
  }
  function apply() {
    GROUPS.forEach(function (g) { if (state[g.key]) body.setAttribute('data-' + g.key, state[g.key]); else body.removeAttribute('data-' + g.key); });
    behaviours();
  }
  function persist() {
    var qs = new URLSearchParams(state).toString();
    if (!SOLO) { lsSet(KEY, JSON.stringify(state)); try { history.replaceState(null, '', location.pathname + location.search + (qs ? '#' + qs : '')); } catch (e) { } }
  }
  function set(k, v) { if (v === 'base' || !v) delete state[k]; else state[k] = v; apply(); persist(); sync(); }
  function setAll(o) { state = {}; Object.keys(o).forEach(function (k) { if (valid(k, o[k]) && o[k] !== 'base') state[k] = o[k]; }); apply(); persist(); sync(); }

  /* ---------- JS behaviours ---------- */
  var spy, jump, nextBar, tabSets = [];
  function tabsOff() {
    tabSets.forEach(function (t) {
      t.list.remove();
      t.panels.forEach(function (p) {
        p.el.removeAttribute('data-lab-off'); p.el.removeAttribute('role'); p.el.removeAttribute('aria-labelledby'); if (p.el.hasAttribute('data-lab-id')) { p.el.removeAttribute('id'); p.el.removeAttribute('data-lab-id'); }
        p.el.open = p.open;
      });
    });
    tabSets = [];
  }
  function tabsOn() {
    if (tabSets.length) return;
    var seen = [];
    document.querySelectorAll('main details.card').forEach(function (d) {
      if (seen.indexOf(d) > -1) return;
      var grp = [d], n = d.nextElementSibling;
      while (n && n.matches('details.card')) { grp.push(n); n = n.nextElementSibling; }
      grp.forEach(function (x) { seen.push(x); });
      if (grp.length < 2) return;
      var list = h('div', { role: 'tablist', 'aria-label': 'Sections', class: 'lab-tabs', 'data-lab-ui': '' }), set = { list: list, panels: [], tabs: [] };
      grp.forEach(function (el, i) {
        var sum = el.querySelector('summary'), id = 'lab-tab-' + tabSets.length + '-' + i;
        var tab = h('button', { type: 'button', role: 'tab', id: id, 'aria-selected': 'false', tabindex: '-1', text: (sum ? sum.textContent : 'Section ' + (i + 1)).trim() });
        el.setAttribute('role', 'tabpanel'); el.setAttribute('aria-labelledby', id);
        tab.setAttribute('aria-controls', el.id || (id + '-p'));
        if (!el.id) el.id = id + '-p', el.setAttribute('data-lab-id', '');
        set.panels.push({ el: el, open: el.open }); set.tabs.push(tab); list.appendChild(tab);
        tab.onclick = function () { pick(i, false); };
        tab.onkeydown = function (e) {
          var k = e.key, j = k === 'ArrowRight' || k === 'ArrowDown' ? (i + 1) % grp.length : k === 'ArrowLeft' || k === 'ArrowUp' ? (i + grp.length - 1) % grp.length : k === 'Home' ? 0 : k === 'End' ? grp.length - 1 : -1;
          if (j < 0) return; e.preventDefault(); pick(j, true);
        };
      });
      function pick(i, focus) {
        set.tabs.forEach(function (t, j) {
          var on = i === j; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
          if (on) { set.panels[j].el.removeAttribute('data-lab-off'); set.panels[j].el.open = true; } else set.panels[j].el.setAttribute('data-lab-off', '');
        });
        if (focus) set.tabs[i].focus();
      }
      grp[0].parentNode.insertBefore(list, grp[0]); tabSets.push(set); pick(0, false);
    });
  }
  var gtags = null;
  function gtagsOff() {
    if (!gtags) return;
    gtags.forEach(function (x) { x.el.removeAttribute('tabindex'); x.ev.forEach(function (e) { x.el.removeEventListener(e[0], e[1]); }); });
    document.querySelectorAll('[data-lab-hot]').forEach(function (c) { c.removeAttribute('data-lab-hot'); });
    gtags = null;
  }
  function gtagsOn() {
    if (gtags) return;
    gtags = [];
    document.querySelectorAll('[data-lab=gdelta]>li[data-slot]').forEach(function (r) {
      var s = r.getAttribute('data-slot');
      function lit(on) { document.querySelectorAll('#gear [data-slot]').forEach(function (c) { if (on && c.getAttribute('data-slot') === s) c.setAttribute('data-lab-hot', ''); else c.removeAttribute('data-lab-hot'); }); }
      function go(e) { if (e.type === 'keydown' && e.key !== 'Enter') return; var c = document.querySelector('#gear [data-slot="' + s + '"]'); if (c) c.scrollIntoView(); }
      var ev = [['mouseenter', function () { lit(true); }], ['mouseleave', function () { lit(false); }], ['focusin', function () { lit(true); }], ['focusout', function () { lit(false); }], ['click', go], ['keydown', go]];
      r.tabIndex = 0; ev.forEach(function (e) { r.addEventListener(e[0], e[1]); }); gtags.push({ el: r, ev: ev });
    });
  }
  function behaviours() {
    var d = state.disclose;
    if (state.gdelta === 'tags') gtagsOn(); else gtagsOff();
    if (d !== 'tabs') tabsOff(); else tabsOn();
    if (d === 'open') document.querySelectorAll('main details').forEach(function (e) { e.open = true; });
    if (state.nav === 'rail' && !spy && 'IntersectionObserver' in window) {
      spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) document.querySelectorAll('.tabbar a').forEach(function (a) { if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('data-spy', ''); else a.removeAttribute('data-spy'); }); });
      }, { rootMargin: '-30% 0px -60% 0px' });
      document.querySelectorAll('.page-section').forEach(function (s) { spy.observe(s); });
    }
    if (state.nav === 'jump' && !jump) {
      var bar = document.querySelector('.tabbar');
      if (bar) {
        jump = document.createElement('select'); jump.className = 'lab-jump'; jump.setAttribute('aria-label', 'Jump to section');
        bar.querySelectorAll('a').forEach(function (a) { var o = document.createElement('option'); o.value = a.getAttribute('href'); o.textContent = a.firstChild.textContent; jump.appendChild(o); });
        jump.onchange = function () { location.hash = ''; var t = document.querySelector(jump.value); if (t) t.scrollIntoView(); };
        bar.parentNode.insertBefore(jump, bar);
      }
    }
    if (state.recs === 'sticky' && !nextBar) {
      var p = document.querySelector('[data-top-fixes] li p');
      if (p) {
        nextBar = document.createElement('a'); nextBar.className = 'lab-next'; nextBar.href = '#overview';
        nextBar.textContent = p.textContent; nextBar.setAttribute('data-lab-ui', '');
        nextBar.insertAdjacentHTML('afterbegin', '<b>Next</b> ');
        document.body.appendChild(nextBar);
      }
    }
  }
  document.addEventListener('toggle', function (e) {
    if (state.disclose !== 'accordion' || !e.target.open || !e.target.matches('main details.card')) return;
    document.querySelectorAll('main details.card[open]').forEach(function (o) { if (o !== e.target) o.open = false; });
  }, true);

  /* ---------- solo (gallery tiles) ---------- */
  function solo() {
    var t = document.querySelector(decodeURIComponent(Q.get('t') || '[data-top-fixes]')); if (!t) return;
    body.setAttribute('data-lab-solo', '');
    t.querySelectorAll('details').forEach(function (d) { d.open = true; });
    if (t.matches('details')) t.open = true;
    for (var n = t; n && n !== body; n = n.parentNode) {
      if (n.matches && n.matches('details')) n.open = true;
      Array.prototype.forEach.call(n.parentNode.children, function (c) { if (c !== n && c.tagName !== 'SCRIPT' && c.tagName !== 'LINK') c.setAttribute('data-lab-hide', ''); });
    }
  }

  /* ---------- audit ---------- */
  function rgb(s) { var m = s.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; }
  function lum(c) { var a = c.slice(0, 3).map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2]; }
  function audit() {
    var bad = 0;
    document.querySelectorAll('main *').forEach(function (el) {
      if (!el.childNodes.length || !Array.prototype.some.call(el.childNodes, function (c) { return c.nodeType === 3 && c.textContent.trim(); })) return;
      var cs = getComputedStyle(el), fg = rgb(cs.color); if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') return;
      var bg = [8, 8, 10, 1];
      for (var p = el; p; p = p.parentElement) { var b = rgb(getComputedStyle(p).backgroundColor); if (b[3] === undefined || b[3] > .6) { bg = b; break; } }
      var l1 = lum(fg), l2 = lum(bg), r = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
      if (r < 4.5) { el.style.outline = '1px solid #f0f'; bad++; }
    });
    window.__labAudit = bad;
  }

  /* ---------- UI ---------- */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else if (k.slice(0, 2) === 'on') e[k] = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(c); }); return e;
  }
  var selects = {}, panel, toggle, presetSel, statusEl, searchEl, opener, galOpener;
  function sync() {
    if (!panel) return;
    GROUPS.forEach(function (g) {
      selects[g.key].value = state[g.key] || 'base';
      var row = selects[g.key].parentNode.parentNode; row.setAttribute('data-on', state[g.key] ? '1' : '');
      row.lastChild.style.visibility = state[g.key] ? 'visible' : 'hidden';
    });
    var cp = currentPreset(), n = Object.keys(state).length;
    presetSel.value = cp || '';
    statusEl.textContent = !n ? 'Original design' : cp ? 'Preset: ' + cp : 'Custom - ' + n + ' changed';
  }
  function allPresets() { var o = {}, u = {}; try { u = JSON.parse(lsGet(PKEY) || '{}'); } catch (e) { } Object.keys(PRESETS).forEach(function (k) { o[k] = PRESETS[k]; }); Object.keys(u).forEach(function (k) { o[k] = u[k]; }); return o; }
  function userPresets() { try { return JSON.parse(lsGet(PKEY) || '{}'); } catch (e) { return {}; } }
  function currentPreset() { var a = allPresets(), s = JSON.stringify(Object.keys(state).sort().map(function (k) { return [k, state[k]]; })); for (var n in a) { var o = {}; Object.keys(a[n]).forEach(function (k) { if (valid(k, a[n][k]) && a[n][k] !== 'base') o[k] = a[n][k]; }); if (JSON.stringify(Object.keys(o).sort().map(function (k) { return [k, o[k]]; })) === s) return n; } return ''; }
  function fillPresets() {
    var u = userPresets(); presetSel.textContent = '';
    presetSel.appendChild(h('option', { value: '', text: 'Presets...' }));
    var og = h('optgroup', { label: 'Built-in' }); Object.keys(PRESETS).forEach(function (n) { og.appendChild(h('option', { value: n, text: n, title: PRESET_META[n] || n })); }); presetSel.appendChild(og);
    var ks = Object.keys(u); if (ks.length) { var og2 = h('optgroup', { label: 'Yours' }); ks.forEach(function (n) { og2.appendChild(h('option', { value: n, text: n, title: 'Saved preset' })); }); presetSel.appendChild(og2); }
  }
  function bad(o) { return BAD.some(function (p) { return p[0] !== p[1] && p.every(function (x) { var a = x.split(':'); return o[a[0]] === a[1]; }); }); }
  function randomize() {
    var o, n = 0;
    do { o = {}; GROUPS.forEach(function (g) { var op = g.options[Math.floor(Math.random() * g.options.length)]; if (op.id !== 'base') o[g.key] = op.id; }); } while (bad(o) && ++n < 30);
    setAll(o);
  }
  function build() {
    toggle = h('button', { type: 'button', id: 'lab-toggle', 'aria-expanded': 'false', 'aria-controls': 'lab-panel', text: 'Design' });
    panel = h('aside', { id: 'lab-panel', role: 'dialog', 'aria-label': 'Design lab', hidden: '' });
    var head = h('div', { class: 'lab-head' }, [h('strong', { text: 'Design lab' }), h('button', { type: 'button', class: 'lab-x', 'aria-label': 'Close design lab', text: '×', onclick: close })]);
    var tools = h('div', { class: 'lab-tools' });
    function btn(t, fn, title) { var b = h('button', { type: 'button', text: t, title: title || t }); b.onclick = fn; tools.appendChild(b); return b; }
    btn('Reset', function () { setAll({}); }, 'Restore the original design');
    btn('Randomize', randomize, 'One random option per group');
    var cmp = btn('Compare', function () { }, 'Hold to see the original');
    var strip = function () { GROUPS.forEach(function (g) { body.removeAttribute('data-' + g.key); }); }, back = function () { apply(); };
    ['pointerdown'].forEach(function (ev) { cmp.addEventListener(ev, strip); });
    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(function (ev) { cmp.addEventListener(ev, back); });
    cmp.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); strip(); } });
    cmp.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') back(); });
    btn('Gallery', function () { openGallery(); }, 'Compare every option of one group');
    btn('Expand all', function () { document.querySelectorAll('main details').forEach(function (d) { d.open = true; }); });
    btn('Collapse all', function () { document.querySelectorAll('main details').forEach(function (d) { d.open = false; }); });
    presetSel = h('select', { 'aria-label': 'Presets' }); fillPresets();
    presetSel.onchange = function () { var a = allPresets(); if (a[presetSel.value]) setAll(a[presetSel.value]); };
    var pr = h('div', { class: 'lab-presets' }, [presetSel]);
    function pbtn(t, fn) { var b = h('button', { type: 'button', text: t }); b.onclick = fn; pr.appendChild(b); }
    pbtn('Save', function () { var n = (prompt('Preset name') || '').trim(); if (!n || PRESETS[n]) return; var u = userPresets(); u[n] = JSON.parse(JSON.stringify(state)); lsSet(PKEY, JSON.stringify(u)); fillPresets(); presetSel.value = n; });
    pbtn('Rename', function () { var u = userPresets(), o = presetSel.value; if (!u[o]) return; var n = (prompt('New name', o) || '').trim(); if (!n || PRESETS[n] || u[n]) return; u[n] = u[o]; delete u[o]; lsSet(PKEY, JSON.stringify(u)); fillPresets(); presetSel.value = n; });
    pbtn('Delete', function () { var u = userPresets(); if (!u[presetSel.value]) return; delete u[presetSel.value]; lsSet(PKEY, JSON.stringify(u)); fillPresets(); });
    statusEl = h('div', { class: 'lab-status', 'aria-live': 'polite' });
    searchEl = h('input', { type: 'search', class: 'lab-search', placeholder: 'Filter options...', 'aria-label': 'Filter design options' });
    searchEl.oninput = function () {
      var q = searchEl.value.trim().toLowerCase();
      GROUPS.forEach(function (g) {
        var hit = !q || (g.label + ' ' + g.theme).toLowerCase().indexOf(q) > -1 || g.options.some(function (o) { return (o.name + ' ' + o.title).toLowerCase().indexOf(q) > -1; });
        selects[g.key].parentNode.parentNode.hidden = !hit;
      });
      panel.querySelectorAll('fieldset').forEach(function (f) { f.hidden = !f.querySelector('.lab-row:not([hidden])'); });
    };
    panel.appendChild(head); panel.appendChild(statusEl); panel.appendChild(searchEl); panel.appendChild(tools); panel.appendChild(pr);
    var themes = {};
    GROUPS.forEach(function (g) {
      if (!themes[g.theme]) { themes[g.theme] = h('fieldset', {}, [h('legend', { text: g.theme })]); panel.appendChild(themes[g.theme]); }
      var sel = h('select', { id: 'lab-s-' + g.key });
      g.options.forEach(function (o) { sel.appendChild(h('option', { value: o.id, text: o.name, title: o.title })); });
      sel.onchange = function () { set(g.key, sel.value); };
      selects[g.key] = sel;
      var rb = h('button', { type: 'button', class: 'lab-rs', 'aria-label': 'Reset ' + g.label, title: 'Reset ' + g.label, text: '↺' });
      rb.onclick = function () { set(g.key, 'base'); };
      themes[g.theme].appendChild(h('div', { class: 'lab-row' }, [h('label', { for: 'lab-s-' + g.key }, [h('span', { text: g.label }), sel]), rb]));
    });
    document.body.appendChild(toggle); document.body.appendChild(panel);
    toggle.onclick = function () { panel.hidden ? open() : close(); };
    trap(panel);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (gal && !gal.hidden) closeGal(); else if (!panel.hidden) close(); } });
  }
  function trap(el) {
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(el.querySelectorAll('button,select,input,a[href],[tabindex]:not([tabindex="-1"])'), function (x) { return !x.disabled && x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden'; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    });
  }
  function open() { opener = document.activeElement; panel.hidden = false; toggle.setAttribute('aria-expanded', 'true'); searchEl.focus(); }
  function close() { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); var t = opener && document.contains(opener) && opener !== document.body ? opener : toggle; t.focus(); }
  function closeGal() { gal.hidden = true; var t = galOpener && document.contains(galOpener) ? galOpener : toggle; t.focus(); }

  /* ---------- gallery ---------- */
  var gal;
  function openGallery() {
    if (!gal) {
      gal = h('div', { id: 'lab-gallery', role: 'dialog', 'aria-label': 'Option gallery', hidden: '' });
      document.body.appendChild(gal); trap(gal);
    }
    galOpener = document.activeElement; gal.hidden = false; gal.textContent = '';
    var gs = h('select', { 'aria-label': 'Group' });
    GROUPS.forEach(function (g) { gs.appendChild(h('option', { value: g.key, text: g.label })); });
    var cur = Object.keys(state)[0] || 'card'; gs.value = cur;
    var grid = h('div', { class: 'lab-grid' });
    function draw() {
      var g = BY[gs.value]; grid.textContent = '';
      g.options.forEach(function (o) {
        var qs = new URLSearchParams(state); qs.set(g.key, o.id); if (o.id === 'base') qs.delete(g.key);
        var f = h('iframe', { loading: 'lazy', title: g.label + ': ' + o.name, tabindex: '-1', src: location.pathname + '?lab=solo&t=' + encodeURIComponent(g.solo) + '#' + qs.toString() });
        var on = (state[g.key] || 'base') === o.id;
        var b = h('button', { type: 'button', class: 'lab-tile', title: o.title, 'aria-pressed': on ? 'true' : 'false' }, [f, h('span', { class: 'lab-tn', text: o.name }), h('span', { class: 'lab-td', text: o.title || '' })]);
        b.onclick = function () { set(g.key, o.id); closeGal(); };
        grid.appendChild(b);
      });
    }
    gs.onchange = draw;
    gal.appendChild(h('div', { class: 'lab-ghead' }, [h('strong', { text: 'Gallery' }), gs, h('button', { type: 'button', text: 'Close', onclick: closeGal })]));
    gal.appendChild(grid); draw(); gs.focus();
  }

  /* ---------- boot ---------- */
  state = load();
  if (SOLO) { apply(); solo(); return; }
  apply();
  build(); sync();
  if (AUDIT) audit();
  window.addEventListener('hashchange', function () { var h2 = parse(location.hash.slice(1)); if (JSON.stringify(h2) !== JSON.stringify(state)) { state = h2; apply(); sync(); } });
  window.__labGroups = GROUPS;
})();
