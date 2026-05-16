// ==UserScript==

// @name         Universal Nara Tools - All In One

// @namespace    http://tampermonkey.net/

// @version      15.2.5 beta

// @description  Smart Dark Mode, Video Speed, Auto Scroll, IP Loc, Anti-Double, Aggressive & Reversible Clean View

// @author       Nara

// @copyright    2026, Nara (https://openuserjs.org/users/Nara)

// @license      CC-BY-NC-ND-4.0

// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzU1NSI+PHBhdGggZD0iTTE5LjE0IDEyLjk0Yy4wNC0uMy4wNi0uNjEuMDYtLjk0IDAtLjMyLS4wMi0uNjQtLjA3LS45NGwyLjAzLTEuNThjLjE4LS4xNC4yMy0uNDEuMTItLjYxbC0xLjkyLTMuMzJjLS4xMi0uMjItLjM3LS4yOS0uNTktLjIybC0yLjM5Ljk2Yy0uNS0uMzgtMS4wMy0uNy0xLjYyLS45NEwxNC40IDIuODFjLS4wNC0uMjQtLjI0LS40MS0uNDgtLjQxaC0zLjg0Yy0uMjQgMC0uNDMuMTctLjQ3LjQxTDkuMjUgNS4zNWMtLjU5LjI0LTEuMTMuNTctMS42Mi45NEw1LjI0IDUuMzNjLS4yMi0uMDgtLjQ3IDAtLjU5LjIyTDIuNzQgOC44N2MtLjEyLjIxLS4wOC40Ny4xMi42MWwyLjAzIDEuNThjLS4wNS4zLS4wOS42My0uMDkuOTRzLjAyLjY0LjA3Ljk0bC0yLjAzIDEuNThjLS4xOC4xNC0uMjMuNDEtLjEyLjYxbDEuOTIgMy4zMmMuMTItLjIyLjA3LS40Ny0uMTItLjYxTDE5LjE0IDEyLjk0ek0xMiAxNS42Yy0xLjk4IDAtMy42LTEuNjItMy42LTMuNnMxLjYyLTMuNiAzLjYtMy42IDMuNiAxLjYyIDMuNiAzLjYtMS42MiAzLjYtMy42IDMuNnoiLz48L3N2Zz4=

// @match        *://*/*

// @grant        GM_xmlhttpRequest

// @grant        window.trustedTypes

// @grant        unsafeWindow

// @connect      ipwho.is

// @connect      get.geojs.io

// @connect      translate.googleapis.com

// @connect      google.com

// @run-at       document-start

// @downloadURL https://update.greasyfork.org/scripts/565951/Universal%20Nara%20Tools%20-%20All%20In%20One.user.js
// @updateURL https://update.greasyfork.org/scripts/565951/Universal%20Nara%20Tools%20-%20All%20In%20One.meta.js
// ==/UserScript==

(function() {

    'use strict';

    // --- SETUP & CONSTANTS ---

    const win = window,
        doc = document,
        loc = win.location,
        nav = navigator;

    if (win.top !== win.self) return;

    const polName = 'nara-safe-' + Math.random().toString(36).substring(2);

    const myPolicy = (win.trustedTypes && win.trustedTypes.createPolicy) ?

        win.trustedTypes.createPolicy(polName, {
            createHTML: s => s
        }) : {
            createHTML: s => s
        };

    const HOST = loc.hostname,
        PRE = 'u_';

    const KEY = {

        vis: 'visual_mode',
        cln: 'clean_view',
        byp: 'copy_bypass',
        img: 'img_tools_active',

        con: 'val_con',
        bri: 'val_bri',
        sat: 'val_sat',
        sep: 'val_sep',
        opc: 'menu_opc',
        thm: 'menu_thm',

        vsp: 'vid_speed',
        asc: 'auto_scroll',
        asv: 'scroll_val',
        san: 'sanitizer',
        med: 'media_active',
        bpos: 'btn_pos',
        mpos: 'menu_pos',
        tmr: 'timer_hack'

    };

    const COLORS = {
        yellow: '#ffd600',
        blue: '#2196f3',
        green: '#4caf50',
        red: '#ff5252',
        purple: '#9c27b0'
    };

    const LANGUAGES = {
        'af': 'Afrikaans',
        'sq': 'Albanian',
        'ar': 'Arabic',
        'hy': 'Armenian',
        'az': 'Azerbaijani',
        'eu': 'Basque',
        'be': 'Belarusian',
        'bn': 'Bengali',
        'bs': 'Bosnian',
        'bg': 'Bulgarian',
        'ca': 'Catalan',
        'zh-CN': 'Chinese (Simp)',
        'zh-TW': 'Chinese (Trad)',
        'hr': 'Croatian',
        'cs': 'Czech',
        'da': 'Danish',
        'nl': 'Dutch',
        'en': 'English',
        'et': 'Estonian',
        'tl': 'Filipino',
        'fi': 'Finnish',
        'fr': 'French',
        'gl': 'Galician',
        'ka': 'Georgian',
        'de': 'German',
        'el': 'Greek',
        'gu': 'Gujarati',
        'ht': 'Haitian Creole',
        'iw': 'Hebrew',
        'hi': 'Hindi',
        'hu': 'Hungarian',
        'is': 'Icelandic',
        'id': 'Indonesian',
        'ga': 'Irish',
        'it': 'Italian',
        'ja': 'Japanese',
        'jw': 'Javanese',
        'kn': 'Kannada',
        'kk': 'Kazakh',
        'km': 'Khmer',
        'ko': 'Korean',
        'ku': 'Kurdish',
        'ky': 'Kyrgyz',
        'lo': 'Lao',
        'la': 'Latin',
        'lv': 'Latvian',
        'lt': 'Lithuanian',
        'mk': 'Macedonian',
        'ms': 'Malay',
        'ml': 'Malayalam',
        'mt': 'Maltese',
        'mi': 'Maori',
        'mr': 'Marathi',
        'mn': 'Mongolian',
        'my': 'Myanmar',
        'ne': 'Nepali',
        'no': 'Norwegian',
        'fa': 'Persian',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'pa': 'Punjabi',
        'ro': 'Romanian',
        'ru': 'Russian',
        'sr': 'Serbian',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'es': 'Spanish',
        'su': 'Sundanese',
        'sw': 'Swahili',
        'sv': 'Swedish',
        'ta': 'Tamil',
        'te': 'Telugu',
        'th': 'Thai',
        'tr': 'Turkish',
        'uk': 'Ukrainian',
        'ur': 'Urdu',
        'uz': 'Uzbek',
        'vi': 'Vietnamese',
        'cy': 'Welsh',
        'yi': 'Yiddish',
        'zu': 'Zulu'
    };

    // --- STATE & HELPERS ---

    const store = (k, v) => v === undefined ? localStorage.getItem(HOST + '_' + PRE + k) : localStorage.setItem(HOST + '_' + PRE + k, v);

    const storeGlobal = (k, v) => v === undefined ? localStorage.getItem(PRE + k) : localStorage.setItem(PRE + k, v);

    const getNum = (k, d, f) => (f ? parseFloat : parseInt)(store(k) || d);

    const setCss = (v, val) => doc.documentElement.style.setProperty(`--u-${v}`, val);

    const calcPct = val => (parseInt(val) + 100) + '%';

    const state = {
        vis: store(KEY.vis) === '1',
        cln: store(KEY.cln) === '1',
        byp: store(KEY.byp) === '1',
        img: store(KEY.img) === '1',
        asc: store(KEY.asc) === '1',
        med: store(KEY.med) === '1',
        san: store(KEY.san) === '1',
        tmr: store(KEY.tmr) === '1', // <--- DITAMBAHKAN
        vals: {
            con: getNum(KEY.con, 0),
            bri: getNum(KEY.bri, 0),
            sat: getNum(KEY.sat, 0),
            sep: getNum(KEY.sep, 0),
            vsp: getNum(KEY.vsp, 1.0, 1),
            asv: getNum(KEY.asv, 1)
        },
        ui: {
            opc: parseFloat(storeGlobal(KEY.opc) || 1.0),
            thm: storeGlobal(KEY.thm) || 'yellow'
        }
    };

// --- CONST CSS ---

const css = `
:root {
  --u-con: ${calcPct(state.vals.con)};
  --u-bri: ${calcPct(state.vals.bri)};
  --u-sat: ${calcPct(state.vals.sat)};
  --u-sep: ${state.vals.sep}%;
  --u-accent: ${COLORS[state.ui.thm] || state.ui.thm || COLORS.yellow};
  --u-bg-op: ${state.ui.opc};
  --u-text: #eee;
}

html {
  transition: background-color 0.5s ease;
}

body {
  transition: filter 0.5s ease;
}

html.u-visual-active {
  background-color: #121212 !important;
}

html.u-visual-active body {
  filter: invert(1) hue-rotate(180deg) !important;
  min-height: 100vh;
}

html.u-img-active body :is(img, video, audio, canvas, svg, iframe, embed, object, picture, input[type="image"], [role="img"], .emoji, img[src*="emoji"], [class*="emoji"]):not(#u-fs-menu *):not(#u-fs-btn *) {
  filter: contrast(var(--u-con)) brightness(var(--u-bri)) saturate(var(--u-sat)) sepia(var(--u-sep)) !important;
}

html.u-visual-active body :is(img, video, audio, canvas, svg, iframe, embed, object, picture, input[type="image"], [role="img"], .emoji, img[src*="emoji"], [class*="emoji"]):not(#u-fs-menu *):not(#u-fs-btn *) {
  filter: saturate(1.3) invert(1) hue-rotate(180deg) !important;
}

html.u-visual-active.u-img-active body :is(img, video, audio, canvas, svg, iframe, embed, object, picture, input[type="image"], [role="img"]):not(#u-fs-menu *):not(#u-fs-btn *) {
  filter: contrast(var(--u-con)) brightness(var(--u-bri)) saturate(var(--u-sat)) sepia(var(--u-sep)) saturate(1.3) invert(1) hue-rotate(180deg) !important;
}

html.u-visual-active body #u-fs-menu,
html.u-visual-active body #u-fs-btn,
html.u-visual-active body #u-modal-overlay {
  filter: invert(1) hue-rotate(180deg) !important;
}

.u-clean-active header,
.u-clean-active footer,
.u-clean-active nav,
.u-clean-active aside,
.u-clean-active .ads,
.u-clean-active .ad,
.u-clean-active .advertisement,
.u-clean-active [class*="ads" i],
.u-clean-active [id*="ads" i],
.u-clean-active [class*="banner" i],
.u-clean-active [id*="banner" i],
.u-clean-active [class*="popup" i],
.u-clean-active [id*="popup" i],
.u-clean-active [class*="modal" i],
.u-clean-active [id*="modal" i],
.u-clean-active [class*="overlay" i],
.u-clean-active [id*="overlay" i],
.u-clean-active [class*="cookie" i],
.u-clean-active [id*="cookie" i],
.u-clean-active [class*="newsletter" i],
.u-clean-active [id*="newsletter" i],
.u-clean-active [class*="subscribe" i],
.u-clean-active [id*="subscribe" i],
.u-clean-active [class*="sidebar" i],
.u-clean-active [id*="sidebar" i],
.u-clean-active [class*="share" i],
.u-clean-active [class*="social" i],
.u-clean-active [class*="related" i],
.u-clean-active [class*="recommend" i],
.u-clean-active [class*="sticky" i],
.u-clean-active [id*="sticky" i],
.u-clean-active [class*="bottom" i],
.u-clean-active [class*="flyout" i],
.u-clean-active iframe:not([src*="youtube"]):not([src*="vimeo"]):not([class*="player"]),
.u-clean-active div[style*="z-index: 99"],
.u-clean-active div[style*="z-index: 900"],
.u-clean-active [aria-modal="true"],
.u-clean-active [role="dialog"],
.u-clean-active .tp-modal,
.u-clean-active .tp-backdrop {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
}

.u-clean-active html,
.u-clean-active body {
  overflow: visible !important;
  position: static !important;
  height: auto !important;
  min-height: 100vh !important;
}

#u-fs-menu,
#u-fs-btn,
#u-modal-overlay {
  background-color: rgba(20, 20, 20, var(--u-bg-op)) !important;
  color: #eee !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  backdrop-filter: blur(10px);
  z-index: 2147483647 !important;
  filter: none !important;
}

#u-fs-btn,
#u-fs-menu,
#u-fs-menu *,
#u-modal-overlay,
#u-modal-overlay * {
  outline: 0 !important;
  -webkit-tap-highlight-color: transparent !important;
  box-sizing: border-box;
}

.u-title,
.u-tool-val,
.u-icon-box {
  color: var(--u-accent) !important;
  fill: var(--u-accent) !important;
}

/* --- Floating Button --- */
#u-fs-btn {
  background: #444 !important;
  border: 3px solid #333 !important;
  pointer-events: auto !important;
  position: fixed;
  bottom: 30px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 0;
  margin: 0;
}

#u-fs-btn:hover {
  transform: scale(1.1);
}

#u-fs-btn.u-open {
  background: #444 !important;
  color: #ccc !important;
  border-color: #333 !important;
}

#u-fs-btn svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.3s ease;
  pointer-events: none;
}

#u-fs-btn.u-open svg {
  transform: rotate(90deg);
}

#u-fs-menu {
  position: fixed;
  bottom: 95px;
  right: 25px;
  width: 300px;
  max-width: 85vw;
  color: var(--u-text);
  border: 1px solid #444;
  border-radius: 12px;
  display: none;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  animation: uFadeUp 0.25s ease-out;
  pointer-events: auto !important;
}

.u-menu-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-bottom: 1px solid #333;
  border-radius: 12px 12px 0 0;
}

.u-head-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.u-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.u-ver {
  font-size: 10px;
  background: #333;
  padding: 2px 6px;
  border-radius: 4px;
  color: #aaa;
  margin-left: 6px;
  vertical-align: middle;
}

/* --- Dashboard Grid --- */
.u-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 8px;
  margin-bottom: 12px;
}

.u-dash-item {
  background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
  padding: 8px 4px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 46px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.u-dash-label {
  font-size: 9px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 3px;
}

.u-dash-val {
  font-size: 11px;
  font-weight: 700;
  color: #eee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
  max-width: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  display: block;
  box-sizing: border-box;
}

.u-dash-val.info {
  color: var(--u-accent);
  font-size: 10px;
  letter-spacing: 0.5px;
}

.u-custom-select {
  position: relative;
  margin-top: 8px;
  width: 100%;
  font-size: 11px;
  color: #eee;
}

.u-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.2));
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.u-select-trigger:hover {
  border-color: var(--u-accent);
  background: rgba(255, 255, 255, 0.08);
}

.u-select-icon {
  width: 14px;
  height: 14px;
  fill: var(--u-accent);
  margin-right: 8px;
}

.u-trigger-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.u-trigger-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #777;
  transition: 0.3s;
  margin-left: 8px;
}

.u-custom-select.active .u-trigger-arrow {
  transform: rotate(180deg);
}

.u-trigger-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;
  overflow: hidden;
  margin-right: 5px;
}

.u-trigger-lbl {
  font-weight: 700;
  color: #eee;
  font-size: 11px;
}

.u-trigger-sub {
  font-size: 9px;
  color: var(--u-accent);
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.u-options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 100;
  margin-top: 5px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

.u-custom-select.active .u-options-list {
  max-height: 220px;
  opacity: 1;
  pointer-events: auto;
}

.u-tab-header {
  display: flex;
  border-bottom: 1px solid #333;
  margin-bottom: 0;
  position: relative;
  flex-shrink: 0;
  background: #1a1a1a;
  z-index: 5;
}

.u-tab-btn {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 11px;
  color: #888;
  cursor: pointer;
  background: transparent;
  transition: color 0.3s;
  z-index: 2;
}

.u-tab-btn:hover {
  color: #ccc;
}

.u-tab-btn.active {
  color: var(--u-accent);
  font-weight: 700;
}

#u-tab-marker {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 50%;
  background: var(--u-accent);
  box-shadow: 0 -2px 8px var(--u-accent);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  pointer-events: none;
}

.u-tab-view {
  display: none;
  opacity: 0;
  height: 100%;
  overflow: hidden;
}

.u-tab-view.active {
  display: flex;
  flex-direction: column;
  opacity: 1;
  animation: uSlideDown 0.3s ease forwards;
}

.u-search-box {
  position: relative;
  top: 0;
  background: #1a1a1a;
  padding: 8px;
  border-bottom: 1px solid #333;
  z-index: 2;
  flex-shrink: 0;
}

.u-search-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.u-search-icon {
  position: absolute;
  left: 10px;
  width: 12px;
  height: 12px;
  fill: #777;
  pointer-events: none;
}

.u-search-input {
  width: 100%;
  background: #252525;
  border: 1px solid #444;
  color: #eee;
  padding: 6px 10px 6px 28px;
  border-radius: 16px;
  font-size: 10px;
  outline: none;
  transition: 0.2s;
}

.u-search-input:focus {
  border-color: var(--u-accent);
  background: #2a2a2a;
}

#u-lang-list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
}

#u-lang-list::-webkit-scrollbar { width: 4px; }
#u-lang-list::-webkit-scrollbar-track { background: #111; }
#u-lang-list::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

.u-option {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #252525;
  transition: background 0.1s;
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #ccc;
}

.u-option:last-child {
  border-bottom: none;
}

.u-option:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.u-option.selected {
  color: var(--u-accent);
  font-weight: 700;
  background: rgba(255, 255, 255, 0.02);
}

.u-option.hidden {
  display: none;
}

#u-view-mini {
  overflow: hidden !important;
  padding: 8px !important;
}

.u-mini-trans {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.u-mini-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0;
  position: relative;
  flex-shrink: 0;
}

.u-lang-selector {
  flex: 1;
  background: #252525;
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 10px;
  color: #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
}

.u-lang-selector:hover {
  border-color: var(--u-accent);
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.u-swap-btn {
  color: #666;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s;
  padding: 4px;
}

.u-swap-btn:hover {
  color: var(--u-accent);
  transform: scale(1.1);
}

.u-trans-input,
#u-tr-res {
  width: 100%;
  background: #252525;
  border: 1px solid #444;
  color: #eee;
  border-radius: 6px;
  padding: 8px;
  font-family: inherit;
  font-size: 11px;
  resize: none;
  flex: 1;
  box-sizing: border-box;
  transition: border 0.3s;
  display: block;
  overflow-y: auto;
  min-height: 50px;
}

.u-trans-input:focus {
  border-color: var(--u-accent);
  outline: none;
}

#u-tr-res {
  margin-top: 0;
  background: rgba(0, 0, 0, 0.3);
  border-style: dashed;
  color: #bbb;
}

.u-trans-btn {
  padding: 6px 12px;
  background: var(--u-accent);
  color: #000;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  margin-top: 0;
  flex-shrink: 0;
}

.u-trans-btn:hover {
  opacity: 0.8;
}

.u-mini-list-wrap {
  position: absolute;
  inset: 0;
  background: #1a1a1a;
  z-index: 20;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;
  border-radius: 0 0 12px 12px;
}

.u-mini-list-wrap.active {
  opacity: 1;
  pointer-events: auto;
}

.u-mini-search-bar {
  padding: 8px;
  border-bottom: 1px solid #333;
  display: flex;
  flex-shrink: 0;
}

.u-mini-back-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 16px;
  padding: 0 8px;
  margin-left: 5px;
  line-height: 1;
  transition: 0.2s;
}

.u-mini-back-btn:hover {
  color: #ff5252;
  transform: scale(1.1);
}

.u-mini-list-content {
  flex: 1;
  overflow-y: auto;
}

#u-tooltip-area {
  color: #ccc;
  font-size: 11px;
  text-align: center;
  line-height: 1.4;
  margin-top: 0;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
}

#u-tooltip-area.active {
  margin-top: 10px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #444;
  border-left: 2px solid var(--u-accent);
  max-height: 100px;
  opacity: 1;
}

.u-menu-body {
  padding: 10px 15px;
  max-height: 300px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.u-menu-body::-webkit-scrollbar { width: 4px; }
.u-menu-body::-webkit-scrollbar-track { background: #111; }
.u-menu-body::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

.u-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.u-item:last-child {
  border-bottom: none;
}

.u-label-main {
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.u-icon-box {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-icon-box svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.u-info-icon {
  color: #666;
  font-size: 11px;
  cursor: help;
  border: 1px solid #555;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  margin-left: 5px;
}

.u-info-icon:hover {
  color: var(--u-accent);
  border-color: var(--u-accent);
}

.u-smooth-box {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0, 1, 0, 1);
  border-radius: 6px;
  background: #151515;
}

.u-smooth-box.open {
  max-height: 500px;
  opacity: 1;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #333;
}

.u-smooth-box.open.padded {
  margin-top: 8px;
  margin-bottom: 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
}

.u-cfg-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 11px;
  color: #ccc;
}

.u-color-opts {
  display: flex;
  gap: 5px;
}

.u-c-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #555;
  transition: 0.2s;
  position: relative;
  z-index: 10;
  display: inline-block;
}

.u-c-dot:hover {
  transform: scale(1.2);
  border-color: #fff;
  z-index: 20;
}

.u-c-input {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

/* --- Switch Toggle --- */
.u-switch {
  width: 36px;
  height: 20px;
  position: relative;
  display: inline-block;
}

.u-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.u-slider-switch {
  position: absolute;
  inset: 0;
  background: #333;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #444;
}

.u-slider-switch:before {
  content: "";
  position: absolute;
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background: #888;
  border-radius: 50%;
  transition: 0.3s;
}

.u-switch input:checked + .u-slider-switch {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--u-accent);
}

.u-switch input:checked + .u-slider-switch:before {
  transform: translateX(16px);
  background: var(--u-accent);
}

/* --- Range Slider --- */
.u-tool-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.u-tool-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 11px;
  color: #ccc;
}

.u-tool-row input[type=range] {
  width: 100%;
  cursor: pointer;
  accent-color: var(--u-accent);
  height: 4px;
  background: #444;
  border-radius: 2px;
}

/* --- Buttons --- */
.u-reset-btn {
  text-align: center;
  padding: 6px;
  font-size: 10px;
  color: #666;
  cursor: pointer;
  border: 1px dashed #444;
  border-radius: 4px;
  margin-top: 5px;
  transition: 0.2s;
}

.u-reset-btn:hover {
  color: #fff;
  border-color: #666;
  background: rgba(255, 255, 255, 0.1);
}

.u-btn-danger {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: rgba(255, 82, 82, 0.08);
  border: 1px solid #ff5252;
  color: #ff5252;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.u-btn-danger:hover {
  background: #ff5252;
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 82, 82, 0.3);
}

.u-btn-danger:active {
  transform: scale(0.98);
}

.u-menu-footer {
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-top: 1px solid #333;
  font-size: 9px;
  color: #555;
  text-align: center;
  border-radius: 0 0 12px 12px;
}

#u-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2147483647;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

#u-modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.u-modal-box {
  background: #151515;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 25px;
  width: 320px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  transform: scale(0.95);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#u-modal-overlay.active .u-modal-box {
  transform: scale(1);
}

.u-modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.u-modal-msg {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 20px;
  line-height: 1.5;
}

.u-modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.u-modal-btn {
  padding: 10px 0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: 0.2s;
  background: #2a2a2a;
  color: #ccc;
}

.u-modal-btn:hover {
  background: #333;
  color: #fff;
}

.u-modal-btn.primary {
  background: #ff5252;
  color: #fff;
}

.u-modal-btn.primary:hover {
  background: #ff1744;
}

.u-media-row {
  display: flex;
  gap: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.u-media-btn {
  flex: 1;
  padding: 6px;
  background: #252525;
  border: 1px solid #333;
  border-radius: 4px;
  color: #ccc;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.u-media-btn:hover {
  background: #333;
  color: #fff;
  border-color: var(--u-accent);
}

.u-media-btn svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
}

.u-qr-img {
  width: 150px;
  height: 150px;
  margin: 10px auto;
  border: 5px solid #fff;
  border-radius: 8px;
  display: block;
}

.u-divider {
  height: 1px;
  background: #333;
  margin: 8px 0;
}

.skiptranslate iframe,
.goog-te-banner-frame {
  display: none !important;
}

body {
  top: 0 !important;
}

@keyframes uFadeUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes uSlideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.u-gold-shine {
    background: linear-gradient(to right, #ffe066 20%, #f5af19 40%, #f5af19 60%, #ffe066 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shineSweep 3s linear infinite;
}

@keyframes shineSweep {
    to {
        background-position: 200% center;
    }
}

.u-kofi-btn {
  background-color: #29abe0;
  color: #fff !important;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Quicksand', sans-serif;
  transition: 0.2s;
  border: none;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 0 #1a8fb8;
}

.u-kofi-btn:hover {
  background-color: #3bc2f5;
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #1a8fb8;
}

.u-kofi-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #1a8fb8;
}

.u-kofi-img {
  height: 16px !important;
  width: auto !important;
  filter: none !important;
}

.u-copy-text {
  font-size: 10px;
  color: #666;
  line-height: 1.4;
  display: block;
}
`;

    // --- UI HELPERS & INIT ---

    const SVG = {

        vis: '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>',

        img: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',

        cln: '<svg viewBox="0 0 24 24"><path d="M19.36 2.72l1.42 1.42a1 1 0 0 1 0 1.41l-10.59 10.59a3 3 0 1 1-2.83-2.83L17.95 2.72a1 1 0 0 1 1.41 0zM5.93 16.07a1 1 0 0 0 1.41 1.41l.06-.06a1 1 0 0 0-1.41-1.41l-.06.06z"/></svg>',

        byp: '<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3 3.1-3s3.1 1.29 3.1 3v2z"/></svg>',

        fs: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',

        vid: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',

        scr: '<svg viewBox="0 0 24 24"><path d="M13 1.07V9h7c.49 0 .9.36.98.85l1.95 10.68c.08.43-.04.87-.32 1.22a1.49 1.49 0 0 1-1.17.58H6.53c-.39 0-.76-.15-1.03-.42l-4.08-4.08c-.78-.78-.78-2.05 0-2.83L3 13.43 11.23 2.5c.34-.39.84-.61 1.36-.61.2 0 .39.03.58.09.11.03.22.06.33.09zM15 11h-4v9.9l3.5-3.5c.29-.29.41-.69.32-1.09L15 11z"/></svg>',

        san: '<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',

        rst: '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>',

        pip: '<svg viewBox="0 0 24 24"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>',

        cpy: '<svg viewBox="0 0 24 24" style="width:100%;height:100%;fill:currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',

        chk: '<svg viewBox="0 0 24 24" style="width:100%;height:100%;fill:currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',

        tim: '<svg viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>'

    };

    const createItem = (lbl, ico, tip, id, chk) => `<div class="u-item"><div class="u-label-group"><span class="u-label-main"><div class="u-icon-box">${ico}</div> ${lbl} <i class="u-info-icon" data-msg="${tip}">?</i></span></div><label class="u-switch"><input type="checkbox" id="${id}" ${chk?'checked':''}><span class="u-slider-switch"></span></label></div>`;

    const sliderHTML = (lbl, k, min, max, st = 1) => `<div class="u-tool-row"><div class="u-tool-header"><label>${lbl}</label><span class="u-tool-val">${state.vals[k]}</span></div><input type="range" min="${min}" max="${max}" step="${st}" value="${state.vals[k]}" data-key="${k}"></div>`;

    function init() {

        if (!doc.body) return setTimeout(init, 50);

        const html = doc.documentElement;

        const updateClasses = () => {

            html.classList.toggle('u-visual-active', state.vis);

            html.classList.toggle('u-clean-active', state.cln);

            html.classList.toggle('u-img-active', state.img);

            toggleAggressiveClean(state.cln);

        };

        updateClasses();

        if (state.byp) toggleCopyBypass(true);

        if (state.asc) toggleAutoScroll(true);

        if (state.san) toggleSanitizer(true);

        if (state.tmr) toggleTimerHack(true);

        initVideoController();

        const s = doc.createElement('style');
        s.textContent = css;
        doc.head.appendChild(s);

        const frag = doc.createDocumentFragment();

        const modal = doc.createElement('div');
        modal.id = 'u-modal-overlay';
        modal.className = 'notranslate';

        modal.innerHTML = myPolicy.createHTML(`<div class="u-modal-box"><div class="u-modal-title"></div><div class="u-modal-msg"></div><div class="u-modal-actions"><button class="u-modal-btn" id="u-mod-cancel">Cancel</button><button class="u-modal-btn primary" id="u-mod-ok">OK</button></div></div>`);

        frag.appendChild(modal);

        const btn = doc.createElement('button');
        btn.id = 'u-fs-btn';
        btn.className = 'notranslate';

        btn.innerHTML = myPolicy.createHTML(`<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41L9.25 5.35c-.59.24-1.13.57-1.62.94L5.24 5.33c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61L19.14 12.94zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`);

        const menu = doc.createElement('div');
        menu.id = 'u-fs-menu';
        menu.className = 'notranslate';

        let langHTML = '<div class="u-option" data-val="">Default</div>';

        for (const [k, v] of Object.entries(LANGUAGES)) langHTML += `<div class="u-option" data-val="${k}">${v}</div>`;

        const colorsHTML = Object.keys(COLORS).map(c => `<div class="u-c-dot" style="background:${COLORS[c]}" data-c="${c}"></div>`).join('');

        menu.innerHTML = myPolicy.createHTML(`

            <div class="u-menu-header">
            <div class="u-head-top">

    <div class="u-title">Nara Tools <span class="u-ver">v15.2.5 beta</span></div>

    <div style="display:flex;align-items:center;gap:5px">

        <div style="font-size:15px;cursor:pointer;color:#777;padding:4px;transition:.2s" id="u-about-btn" title="About">ⓘ</div>

        <div style="font-size:15px;cursor:pointer;color:#777;padding:4px" id="u-cfg-toggle">⏣</div>

    </div>

</div>


                <div id="u-config-panel" class="u-smooth-box">

                    <div class="u-cfg-row"><span>Theme Color</span><div class="u-color-opts">${colorsHTML}<div class="u-c-dot" style="background:conic-gradient(red,yellow,lime,aqua,blue,magenta,red);overflow:hidden"><input type="color" id="u-custom-color" class="u-c-input" value="${state.ui.thm.startsWith('#')?state.ui.thm:'#ffffff'}"></div></div></div>

                    <div class="u-cfg-row"><span>Menu Opacity</span><input type="range" min="0" max="100" value="${state.ui.opc*100}" id="u-opc-slider" style="width:60px;height:3px"></div>

                    <div class="u-divider"></div>

                    <div class="u-media-row">

                        <button class="u-media-btn" id="u-dev-color"><svg style="width:10px;height:10px;fill:currentColor" viewBox="0 0 24 24"><path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM5.21 20c-.55 0-1-.45-1-1v-2.79l8.32-8.32 2.79 2.79L5.21 20z"/></svg>Color</button>

                        <button class="u-media-btn" id="u-dev-qr"><svg style="width:10px;height:10px;fill:currentColor" viewBox="0 0 24 24"><path d="M15 21h-2v-2h2v2zm7-7h-2v2h2v-2zm-2-4h2v2h-2v-2zm0 8h2v2h-2v-2zm-8-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-4h2v2h-2v-2zm-4 4h2v2h-2v-2zm2-2h2v2h-2v-2zm2-4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 6h2v2h-2v-2zm-2-2h2v2h-2v-2zm4 4h2v2h-2v-2zm-4 2h2v2h-2v-2zm-2-2h2v2h-2v-2zM3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm15 0h-2v2h2v-2z"/></svg>QR Code</button>

                    </div>

                    <div class="u-divider"></div>

                    <button id="u-factory-reset" class="u-btn-danger"><svg style="width:12px;height:12px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>Factory Reset</button>

                </div>

                <div class="u-dashboard">

                    <div class="u-dash-item"><span class="u-dash-label">Time</span><span id="u-time" class="u-dash-val">00:00</span></div>

                    <div class="u-dash-item"><span class="u-dash-label">Date</span><span id="u-date" class="u-dash-val">Jan 01</span></div>

                    <div class="u-dash-item"><span class="u-dash-label">IP Loc</span><span id="u-ip-loc" class="u-dash-val info">Loading...</span></div>

                </div>

                <div class="u-custom-select" id="u-trans-panel">

                    <div class="u-select-trigger">

                        <svg class="u-select-icon" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>

                        <div class="u-trigger-content"><span class="u-trigger-lbl">Translate Tools</span><span class="u-trigger-sub" id="u-curr-lang">Select Language</span></div>

                        <div class="u-trigger-arrow"></div>

                    </div>

                    <div class="u-options-list" style="padding:0">

                        <div class="u-tab-header">

                            <div class="u-tab-btn active" data-target="u-view-web" data-idx="0">Web Page</div>

                            <div class="u-tab-btn" data-target="u-view-mini" data-idx="1">Mini Text</div>

                            <div id="u-tab-marker"></div>

                        </div>

                        <div class="u-tab-view active" id="u-view-web">

                            <div class="u-search-box">

                                <div class="u-search-wrapper"><svg class="u-search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg><input type="text" class="u-search-input" placeholder="Search web language..."></div>

                            </div>

                            <div id="u-lang-list">${langHTML}</div>

                        </div>
                        <div class="u-tab-view" id="u-view-mini">

                            <div class="u-mini-trans">

                                <div class="u-mini-header">

                                    <div id="u-mini-src" class="u-lang-selector" data-val="auto">Auto Detect <span style="font-size:8px">▼</span></div>

                                    <div class="u-swap-btn" id="u-mini-swap">⇄</div>

                                    <div id="u-mini-tgt" class="u-lang-selector" data-val="id">Indonesian <span style="font-size:8px">▼</span></div>

                                </div>

                                <textarea id="u-tr-src" class="u-trans-input" placeholder="Type text here to translate..."></textarea>

                                <button id="u-tr-go" class="u-trans-btn">TRANSLATE</button>

                                <div style="position:relative">

    <div id="u-tr-res">Result will appear here...</div>

    <button id="u-copy-res" style="position:absolute;bottom:5px;right:5px;background:none;border:none;cursor:pointer;opacity:0.6;transition:0.2s;padding:0;width:16px;height:16px;color:#ccc;display:flex;align-items:center;justify-content:center;z-index:5" title="Copy Result">

        ${SVG.cpy}

    </button>

  </div>
</div>

                            <div id="u-mini-lang-overlay" class="u-mini-list-wrap">

                                <div class="u-mini-search-bar">

                                    <div class="u-search-wrapper"><svg class="u-search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg><input type="text" id="u-mini-search-input" class="u-search-input" placeholder="Search language..."></div>

                                    <button class="u-mini-back-btn" id="u-mini-close-list">✕</button>

                                </div>

                                <div id="u-mini-lang-items" class="u-mini-list-content"></div>

                            </div>

                        </div>

                    </div>

                </div> <div id="u-tooltip-area"></div>

            </div>

            <div class="u-menu-body">

                <div style="margin-bottom:10px;padding:8px;background:#222;border-radius:6px;font-size:10px;color:#aaa;text-align:center;border:1px solid #333">Settings saved for: <span style="color:var(--u-accent);font-weight:bold">${HOST}</span></div>

                ${createItem('Smart Visual Web', SVG.vis, 'Inverts interface colors for a dark mode experience.', 'tg-visual', state.vis)}

                ${createItem('Media Tools', SVG.img, 'Apply custom visual filters.', 'tg-img', state.img)}

                <div id="u-tools-panel" class="u-smooth-box padded ${state.img?'open':''}">

                    ${sliderHTML('Contrast','con',-100,100)}${sliderHTML('Brightness','bri',-100,100)}${sliderHTML('Saturation','sat',-100,100)}${sliderHTML('Sepia','sep',0,100)}

                    <div class="u-reset-btn" id="u-reset-tools">Default</div>

                </div>

                ${createItem('Clean View', SVG.cln, 'Aggressively hides sticky headers and overlays.', 'tg-clean', state.cln)}

                ${createItem('Fullscreen', SVG.fs, 'Switches to full-screen mode.', 'tg-fs', false)}

                ${createItem('Auto Scroll', SVG.scr, 'Automatically scrolls the page.', 'tg-scroll', state.asc)}

                <div id="u-scroll-panel" class="u-smooth-box padded ${state.asc?'open':''}">

                    ${sliderHTML('Scroll Speed', 'asv', 1, 30, 1)}

                </div>

                ${createItem('Video Controller', SVG.vid, 'Playback speed control and PiP.', 'tg-media', state.med)}

                <div id="u-media-panel" class="u-smooth-box padded ${state.med?'open':''}">

    ${sliderHTML('Speed (x)', 'vsp', 0.1, 5.0, 0.1)}

    <div class="u-media-row">

        <button class="u-media-btn" id="u-vid-reset">

            <span style="width:12px;height:12px;display:flex">${SVG.rst}</span> Reset

        </button>

        <button class="u-media-btn" id="u-vid-pip">

            <span style="width:12px;height:12px;display:flex">${SVG.pip}</span> PiP

        </button>

    </div>

</div>



                ${createItem('Copy/Paste Bypass', SVG.byp, 'Re-enables context menu and select.', 'tg-bypass', state.byp)}

                ${createItem('Link Sanitizer', SVG.san, 'Removes tracking parameters from links.', 'tg-sanitizer', state.san)}

                ${createItem('Instant Countdown', SVG.tim, 'Speeds up countdown timers (Safe Mode).', 'tg-timer', state.tmr)}


            </div>

            <div class="u-menu-footer" style="font-size: 11px; color: var(--u-accent); font-style: italic; opacity: 0.8;">"Fidelis usque ad finem"</div>`);

        frag.appendChild(menu);

        frag.appendChild(btn);

        html.appendChild(frag);

        if (!doc.getElementById('google_translate_element')) {

            const gdiv = doc.createElement('div');
            gdiv.id = 'google_translate_element';
            gdiv.style.display = 'none';
            doc.body.appendChild(gdiv);

            const scr = doc.createElement('script');
            scr.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            scr.defer = true;
            doc.head.appendChild(scr);

            const tWin = win.unsafeWindow || win;

            tWin.googleTranslateElementInit = () => new tWin.google.translate.TranslateElement({
                pageLanguage: 'auto',
                autoDisplay: false
            }, 'google_translate_element');

        }

        const els = {

            panel: menu.querySelector('#u-tools-panel'),
            media: menu.querySelector('#u-media-panel'),
            scroll: menu.querySelector('#u-scroll-panel'),

            time: menu.querySelector('#u-time'),
            date: menu.querySelector('#u-date'),
            ip: menu.querySelector('#u-ip-loc'),

            cfg: menu.querySelector('#u-config-panel'),
            tip: menu.querySelector('#u-tooltip-area'),

            dd: {
                box: menu.querySelector('#u-trans-panel'),
                trig: menu.querySelector('.u-select-trigger'),
                list: menu.querySelector('.u-options-list'),
                search: menu.querySelector('.u-search-input')
            }

        };

        const toggleMenu = () => {

            const isClosed = getComputedStyle(menu).display === 'none';

            menu.style.setProperty('display', isClosed ? 'block' : 'none', 'important');

            if (isClosed) {
                btn.classList.add('u-open');
                els.cfg.classList.remove('open');
                els.dd.box.classList.remove('active');
            } else {
                btn.classList.remove('u-open');
            }

        };

        // --- DRAGGABLE LOGIC ---
        const makeDraggable = (el, handleVal, clickCallback) => {
            let isDown = false,
                isDragging = false;
            let startX, startY, initialLeft, initialTop;
            const handle = handleVal || el;

            const styleFix = document.createElement('style');
            styleFix.textContent = `
                #u-lang-list, #u-mini-lang-items, .u-trans-input, #u-tr-res, .u-options-list {
                    touch-action: pan-y !important;
                    cursor: auto !important;
                }
            `;
            document.head.appendChild(styleFix);

            // Mencegah browser scroll saat drag handle, TAPI biarkan kalau di list
            if (handle === el) handle.style.touchAction = 'none'; // Untuk tombol
            else handle.style.touchAction = 'none'; // Untuk header menu

            const onStart = (e) => {
                // --- PENGECEKAN AREA TERLARANG (EXCEPTION) ---
                // Jangan drag jika yang disentuh adalah:
                // 1. Input/Button standar
                // 2. Area List Bahasa (.u-options-list)
                // 3. Area Mini Translate (.u-mini-trans)
                if (e.target.closest('input, textarea, range, button:not(#u-fs-btn)') ||
                    e.target.closest('.u-options-list') ||
                    e.target.closest('.u-mini-trans') ||
                    e.target.closest('.u-color-opts')) {
                    return;
                }

                isDown = true;
                isDragging = false;

                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                startX = clientX;
                startY = clientY;
            };

            const onMove = (e) => {
                if (!isDown) return;

                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                const dx = clientX - startX;
                const dy = clientY - startY;

                // Threshold 6px (Anti-Jitter)
                if (!isDragging && Math.abs(dx) < 6 && Math.abs(dy) < 6) return;

                if (!isDragging) {
                    isDragging = true;
                    const rect = el.getBoundingClientRect();
                    initialLeft = rect.left;
                    initialTop = rect.top;

                    el.style.bottom = 'auto';
                    el.style.right = 'auto';
                    el.style.left = initialLeft + 'px';
                    el.style.top = initialTop + 'px';
                    el.style.margin = 0;
                    el.style.transition = 'none';
                }

                if (e.cancelable) e.preventDefault();

                // Batas Layar (Bounding Box)
                let newLeft = initialLeft + dx;
                let newTop = initialTop + dy;
                const maxLeft = win.innerWidth - el.offsetWidth;
                const maxTop = win.innerHeight - el.offsetHeight;

                newLeft = Math.max(0, Math.min(newLeft, maxLeft));
                newTop = Math.max(0, Math.min(newTop, maxTop));

                el.style.left = newLeft + 'px';
                el.style.top = newTop + 'px';
            };

            const onEnd = (e) => {
                if (!isDown) return;
                isDown = false;
                el.style.removeProperty('transition');

                if (!isDragging && clickCallback) {
                    if (e.cancelable) e.preventDefault();
                    clickCallback();
                } else if (isDragging) {
                    // Simpan posisi saat drag selesai
                    const k = el.id === 'u-fs-btn' ? KEY.bpos : KEY.mpos;
                    store(k, el.style.left + ',' + el.style.top);
                    setTimeout(() => delete el.dataset.isDragging, 50);
                }
            };

            handle.addEventListener('mousedown', onStart);
            handle.addEventListener('touchstart', onStart, {
                passive: false
            });
            win.addEventListener('mousemove', onMove, {
                passive: false
            });
            win.addEventListener('touchmove', onMove, {
                passive: false
            });
            win.addEventListener('mouseup', onEnd);
            win.addEventListener('touchend', onEnd);

            win.addEventListener('resize', () => {
                const rect = el.getBoundingClientRect();
                const maxLeft = win.innerWidth - el.offsetWidth;
                const maxTop = win.innerHeight - el.offsetHeight;
                if (rect.left > maxLeft) el.style.left = maxLeft + 'px';
                if (rect.top > maxTop) el.style.top = maxTop + 'px';
            });
        };

        // --- LOAD SAVED POSITION ---

        const restorePos = (el, key) => {

            const val = store(key);

            if (val) {

                const [l, t] = val.split(',');

                // Pastikan posisi valid (tidak NaN)

                if (l && t) {

                    el.style.bottom = 'auto';

                    el.style.right = 'auto';

                    el.style.left = l;

                    el.style.top = t;

                    el.style.margin = 0;

                }

            }

        };

        // --- PENERAPAN ---

        makeDraggable(btn, null, toggleMenu);

        makeDraggable(menu, menu.querySelector('.u-menu-header'), null);

        // Restore posisi terakhir

        restorePos(btn, KEY.bpos);

        restorePos(menu, KEY.mpos);

        // --- GLOBAL CLICK LISTENER (HANYA UNTUK MENUTUP MENU) ---
        doc.addEventListener('click', e => {
            if (menu.style.display === 'block' &&
                !menu.contains(e.target) &&
                !btn.contains(e.target) &&
                e.target.id !== 'u-modal-overlay') {
                toggleMenu();
            }
        });

        menu.querySelector('#u-cfg-toggle').onclick = () => els.cfg.classList.toggle('open');

        // --- LOGIC ABOUT / INFO  ---

        menu.querySelector('#u-about-btn').onclick = () => {

            const kofiIcon = 'https://storage.ko-fi.com/cdn/cup-border.png';

            const year = new Date().getFullYear();

            const content = `

        <div style="font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center; color: #eee;">



            <div style="padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px;">

                <div style="font-size: 20px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px;">

                    Nara <span class="u-gold-shine">🜲</span>

                </div>

                <div style="font-size: 11px; color: #aaa; letter-spacing: 1px; text-transform: uppercase;">

                    Universal Tools Optimized

                </div>

            </div>

            <div style="padding: 0 10px; margin-bottom: 20px;">

                <p style="font-size: 13px; line-height: 1.6; color: #ccc; margin: 0 0 10px 0;">

                    A lightweight userscript designed to enhance browsing with smart dark mode, speed controls, and cleaner views.


                </div>

            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 15px; margin-bottom: 20px;">

                <div style="font-size: 12px; font-weight: 600; color: #ddd; margin-bottom: 10px;">

                    Support Development

                </div>

                <a href="https://ko-fi.com/nara_archive" target="_blank" class="u-kofi-btn">

                    <img src="${kofiIcon}" class="u-kofi-img"> Buy me a Coffee

                </a>

            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; font-size: 10px; color: #666; line-height: 1.5;">

                <div>Made With Love ᰔᩚ</div>

                <div>&copy; ${year} Nara Archive. All rights reserved.</div>

            </div>

        </div>

    `;

            // Tampilkan Modal

            showModal('About', content, null, {
                hideCancel: true,
                okText: 'Close'
            });

        };

        // Hover Effect Button Info

        const aBtn = menu.querySelector('#u-about-btn');

        aBtn.onmouseover = () => {
            aBtn.style.color = 'var(--u-accent)';
            aBtn.style.transform = 'scale(1.1)';
        };

        aBtn.onmouseout = () => {
            aBtn.style.color = '#777';
            aBtn.style.transform = 'scale(1)';
        };

        // --- TRANSLATE LOGIC ---

        const trPanel = els.dd.box,
            trStatus = menu.querySelector('#u-curr-lang'),
            trMarker = menu.querySelector('#u-tab-marker');

        els.dd.trig.onclick = e => {
            e.stopPropagation();
            trPanel.classList.toggle('active');
        };

        trPanel.querySelectorAll('.u-tab-btn').forEach(b => b.onclick = e => {

            e.stopPropagation();

            trPanel.querySelectorAll('.u-tab-btn').forEach(x => x.classList.remove('active'));

            trPanel.querySelectorAll('.u-tab-view').forEach(x => x.classList.remove('active'));

            b.classList.add('active');
            menu.querySelector('#' + b.dataset.target).classList.add('active');

            trMarker.style.transform = `translateX(${parseInt(b.dataset.idx)*100}%)`;

        });

        // Web Translate

        const webSearch = els.dd.search,
            webList = els.dd.list.querySelector('#u-lang-list');

        webSearch.onclick = e => e.stopPropagation();

        webSearch.oninput = e => {
            const t = e.target.value.toLowerCase();
            webList.querySelectorAll('.u-option').forEach(o => o.classList.toggle('hidden', !o.textContent.toLowerCase().includes(t)));
        };

        webList.onclick = e => {

            const opt = e.target.closest('.u-option');
            if (!opt) return;

            e.stopPropagation();
            const val = opt.dataset.val,
                name = opt.textContent;

            trStatus.textContent = name;
            trStatus.style.color = val === "" ? "#eee" : "var(--u-accent)";

            trPanel.classList.remove('active');

            if (val === "") {

                const d = loc.hostname,
                    p = d.split('.'),
                    ds = [null, d, '.' + d, p.length > 2 ? '.' + p.slice(-2).join('.') : null];

                ds.forEach(x => {
                    if (x !== null) {
                        doc.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${x}`;
                        doc.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
                    }
                });

                location.reload();

            } else {

                let i = 0,
                    tInt = setInterval(() => {

                        const c = doc.querySelector('.goog-te-combo');

                        if (c) {
                            c.value = val;
                            c.dispatchEvent(new Event('change', {
                                bubbles: true
                            }));
                            c.dispatchEvent(new Event('input', {
                                bubbles: true
                            }));
                            clearInterval(tInt);
                        } else if (++i > 50) clearInterval(tInt);

                    }, 100);

            }

        };

        // Mini Translate

        const mSrc = menu.querySelector('#u-mini-src'),
            mTgt = menu.querySelector('#u-mini-tgt'),
            mSwap = menu.querySelector('#u-mini-swap'),

            mOv = menu.querySelector('#u-mini-lang-overlay'),
            mList = menu.querySelector('#u-mini-lang-items'),
            mInp = menu.querySelector('#u-mini-search-input');

        let actSel = null;

        menu.querySelector('#u-view-mini').onclick = e => e.stopPropagation();

        const rendMini = (f) => {

            let h = '';
            if (actSel === 'src' && 'auto detect'.includes(f.toLowerCase())) h += `<div class="u-option" data-code="auto">Auto Detect</div>`;

            for (const [c, n] of Object.entries(LANGUAGES))
                if (n.toLowerCase().includes(f.toLowerCase())) h += `<div class="u-option ${(actSel==='src'?mSrc:mTgt).dataset.val===c?'selected':''}" data-code="${c}">${n}</div>`;

            mList.innerHTML = h;

        };

        const openMini = (t) => {
            actSel = t;
            mInp.value = '';
            rendMini('');
            mOv.classList.add('active');
            mInp.focus();
        };

        mSrc.onclick = () => openMini('src');
        mTgt.onclick = () => openMini('tgt');

        menu.querySelector('#u-mini-close-list').onclick = () => mOv.classList.remove('active');

        mInp.oninput = e => rendMini(e.target.value);

        mList.onclick = e => {

            const o = e.target.closest('.u-option');
            if (!o) return;

            const c = o.dataset.code,
                n = o.textContent,
                el = actSel === 'src' ? mSrc : mTgt;

            el.dataset.val = c;
            el.innerHTML = `${n} <span style="font-size:8px">▼</span>`;

            mOv.classList.remove('active');

        };

        mSwap.onclick = () => {
            if (mSrc.dataset.val === 'auto') return;
            const [sv, st, tv, tt] = [mSrc.dataset.val, mSrc.innerHTML, mTgt.dataset.val, mTgt.innerHTML];
            mSrc.dataset.val = tv;
            mSrc.innerHTML = tt;
            mTgt.dataset.val = sv;
            mTgt.innerHTML = st;
        };

        menu.querySelector('#u-tr-go').onclick = () => {

            const txt = menu.querySelector('#u-tr-src').value.trim(),
                res = menu.querySelector('#u-tr-res');

            if (!txt) return;

            res.innerHTML = 'Translating...';
            res.classList.add('loading');

            GM_xmlhttpRequest({

                method: "GET",
                url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${mSrc.dataset.val}&tl=${mTgt.dataset.val}&dt=t&q=${encodeURIComponent(txt)}`,

                headers: {
                    "User-Agent": "Mozilla/5.0"
                },

                onload: r => {
                    try {
                        res.classList.remove('loading');
                        res.textContent = JSON.parse(r.responseText)[0].map(x => x[0]).join('');
                    } catch (e) {
                        res.textContent = "Error.";
                    }
                },

                onerror: () => {
                    res.classList.remove('loading');
                    res.textContent = "Net Error.";
                }

            });

        };

        menu.querySelector('#u-copy-res').onclick = function() {

            const resBox = menu.querySelector('#u-tr-res');

            const txt = resBox.textContent;

            const btn = this;

            if (!txt || txt.includes('Result will appear') || txt === 'Translating...' || txt === 'Error.' || txt === 'Net Error.') return;

            nav.clipboard.writeText(txt).then(() => {

                btn.innerHTML = SVG.chk;

                btn.style.opacity = '1';

                btn.style.color = 'var(--u-accent)'; // Ubah warna jadi warna tema saat sukses

                setTimeout(() => {

                    btn.innerHTML = SVG.cpy;

                    btn.style.opacity = '0.5';

                    btn.style.color = '#ccc';

                }, 1500);

            }).catch(err => {

                console.error('Copy failed', err);

            });

        };

        doc.addEventListener('click', e => {
            if (!trPanel.contains(e.target)) trPanel.classList.remove('active');
        });

        menu.addEventListener('mouseover', e => {
            const i = e.target.closest('.u-info-icon');
            if (i) {
                els.tip.innerHTML = i.dataset.msg;
                els.tip.classList.add('active')
            }
        });

        menu.addEventListener('mouseout', e => {
            if (e.target.closest('.u-info-icon')) els.tip.classList.remove('active');
        });

        // --- EVENTS & FEATURES ---

        // --- IP LOCATION SYSTEM (PROVIDER: GEOJS) ---
        // GeoJS lebih awet limitnya dibanding ipwho.is
        const fetchIP = (force = false) => {
            els.ip.innerHTML = 'Checking...';
            const ipCache = JSON.parse(storeGlobal('ip_cache') || '{}');
            const now = Date.now();

            // Cek Cache (Berlaku 1 Jam)
            if (!force && ipCache.data && ipCache.time && (now - ipCache.time < 3600000)) {
                els.ip.innerHTML = ipCache.data;
                return;
            }

            // Ambil Data Baru dari GeoJS
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://get.geojs.io/v1/ip/geo.json", // <-- Ganti URL ke GeoJS
                onload: r => {
                    try {
                        const d = JSON.parse(r.responseText);
                        // GeoJS tidak pakai parameter 'success', selama ada IP berarti sukses
                        if (d.ip) {
                            // Format GeoJS: country_code (2 huruf) dan ip
                            const res = `${d.country_code} <span style="color:#777">I</span> ${d.ip}`;
                            els.ip.innerHTML = res;
                            storeGlobal('ip_cache', JSON.stringify({
                                data: res,
                                time: now
                            }));
                        } else {
                            els.ip.textContent = "Err Data";
                        }
                    } catch (e) {
                        els.ip.textContent = "Err Parse";
                    }
                },
                onerror: () => els.ip.textContent = "Net Err"
            });
        };

        // Jalankan saat start
        fetchIP(false);

        // Jalankan saat diklik (Refresh Paksa)
        els.ip.style.cursor = 'pointer';
        els.ip.title = "Click to refresh IP (GeoJS)";
        els.ip.onclick = () => fetchIP(true);

        menu.addEventListener('change', e => {

            const t = e.target;

            if (t.type === 'checkbox' && t.id.startsWith('tg-')) {

                const k = {
                    'tg-visual': 'vis',
                    'tg-clean': 'cln',
                    'tg-bypass': 'byp',
                    'tg-img': 'img',
                    'tg-scroll': 'asc',
                    'tg-sanitizer': 'san',
                    'tg-media': 'med',
                    'tg-timer': 'tmr'
                } [t.id];

                if (k) {

                    state[k] = t.checked;
                    store(KEY[k], t.checked ? '1' : '0');

                    if (k === 'img') els.panel.classList.toggle('open', t.checked);

                    if (k === 'asc') {
                        els.scroll.classList.toggle('open', t.checked);
                        toggleAutoScroll(t.checked);
                    }

                    if (k === 'med') els.media.classList.toggle('open', t.checked);

                    if (k === 'byp') toggleCopyBypass(t.checked);

                    if (k === 'san') toggleSanitizer(t.checked);

                    if (k === 'tmr') toggleTimerHack(t.checked);

                    if (k === 'cln') toggleAggressiveClean(t.checked);

                    updateClasses();

                }

                if (t.id === 'tg-fs') t.checked ? doc.documentElement.requestFullscreen().catch(() => {}) : (doc.exitFullscreen && doc.exitFullscreen().catch(() => {}));

            }

        });

        const handleSlider = (e, chg) => {

            if (e.target.type !== 'range') return;

            const v = parseFloat(e.target.value),
                k = e.target.dataset.key;

            state.vals[k] = v;
            e.target.previousElementSibling.querySelector('.u-tool-val').textContent = v;

            if (['con', 'bri', 'sat', 'sep'].includes(k)) setCss(k, k === 'sep' ? v + '%' : (parseInt(v) + 100) + '%');

            if (k === 'vsp' && state.med) doc.querySelectorAll('video, audio').forEach(el => el.playbackRate = v);

            if (chg) store(KEY[k], v);

        };

        menu.addEventListener('input', e => handleSlider(e, false));

        menu.addEventListener('change', e => handleSlider(e, true));

        menu.querySelector('#u-vid-reset').onclick = () => {
            state.vals.vsp = 1.0;
            store(KEY.vsp, 1.0);
            const i = menu.querySelector('input[data-key="vsp"]');
            i.value = 1.0;
            i.dispatchEvent(new Event('input', {
                bubbles: true
            }));
        };

        menu.querySelector('#u-vid-pip').onclick = () => {
            const v = doc.querySelector('video');
            v ? (v.requestPictureInPicture ? (doc.pictureInPictureElement ? doc.exitPictureInPicture() : v.requestPictureInPicture()) : alert('PiP not supported')) : alert('No video');
        };

        menu.querySelector('#u-dev-color').onclick = async () => {

            if (!win.EyeDropper) return showModal('Not Supported', 'EyeDropper API not found (PC Only).', null, {
                hideCancel: true,
                okText: 'Understood'
            });

            try {
                toggleMenu();
                const h = (await new EyeDropper().open()).sRGBHex;
                showModal('Color Picked', `Hex: <b style="color:${h}">${h}</b>`, () => nav.clipboard.writeText(h), {
                    okText: 'COPY'
                });
            } catch (e) {}

        };

        menu.querySelector('#u-dev-qr').onclick = () => {

            const u = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(loc.href)}`;

            showModal('QR Code', `<img src="${u}" class="u-qr-img"><br>Scan to open on mobile.`, () => {

                const b = doc.querySelector('#u-mod-ok');
                b.textContent = "Downloading...";

                fetch(u).then(r => r.blob()).then(bl => {
                    const a = doc.createElement('a');
                    a.href = URL.createObjectURL(bl);
                    a.download = 'nara-qr.png';
                    a.click();
                    modal.classList.remove('active');
                });

            }, {
                okText: 'DOWNLOAD'
            });

        };

        menu.querySelectorAll('.u-c-dot[data-c]').forEach(d => d.onclick = (e) => {
            e.stopPropagation();
            state.ui.thm = d.dataset.c;
            storeGlobal(KEY.thm, d.dataset.c);
            setCss('accent', COLORS[d.dataset.c]);
        });

        menu.querySelector('#u-custom-color').addEventListener('input', e => {
            state.ui.thm = e.target.value;
            storeGlobal(KEY.thm, e.target.value);
            setCss('accent', e.target.value);
        });

        menu.querySelector('#u-opc-slider').oninput = e => {
            setCss('bg-op', e.target.value / 100);
            storeGlobal(KEY.opc, e.target.value / 100);
        };

        menu.querySelector('#u-reset-tools').onclick = () => ['con', 'bri', 'sat', 'sep'].forEach(k => {
            state.vals[k] = 0;
            store(KEY[k], 0);
            const i = menu.querySelector(`input[data-key="${k}"]`);
            i.value = 0;
            i.dispatchEvent(new Event('input', {
                bubbles: true
            }));
        });

        menu.querySelector('#u-factory-reset').onclick = () => showModal('FACTORY RESET', 'This will delete all configurations (features, colors, menu positions, etc.) and restore them to the default settings. Are you sure?', () => {
            Object.keys(localStorage).forEach(k => {
                if (k.includes(PRE)) localStorage.removeItem(k)
            });
            location.reload();
        });

        setInterval(() => {
            const n = new Date();
            els.time.textContent = n.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            els.date.textContent = n.toLocaleDateString([], {
                day: 'numeric',
                month: 'short'
            });
        }, 1000);

        function showModal(t, m, okFn, cfg = {}) {

            const [tt, mm, bOk, bCn, ac] = ['.u-modal-title', '.u-modal-msg', '#u-mod-ok', '#u-mod-cancel', '.u-modal-actions'].map(s => modal.querySelector(s));

            tt.textContent = t;
            mm.innerHTML = myPolicy.createHTML(m);
            bOk.textContent = cfg.okText || 'OK';

            bCn.style.display = cfg.hideCancel ? 'none' : 'block';
            ac.style.gridTemplateColumns = cfg.hideCancel ? '1fr' : '1fr 1fr';

            menu.style.display = 'none';
            btn.classList.remove('u-open');
            modal.classList.add('active');

            const cls = () => {
                modal.classList.remove('active');
                bOk.onclick = null;
                setTimeout(() => {
                    bCn.style.display = 'block';
                    bOk.textContent = 'OK';
                    ac.style.gridTemplateColumns = '1fr 1fr'
                }, 300);
            };

            bCn.onclick = cls;
            bOk.onclick = () => {
                if (okFn) okFn();
                cls();
            };

        }

    }

    // --- FUNCTIONAL LOOPS ---

    function initVideoController() {

        setInterval(() => {

            if (!state.med || state.vals.vsp === 1.0) return;

            doc.querySelectorAll('video, audio').forEach(e => {
                if (e.playbackRate !== state.vals.vsp && !e.paused) e.playbackRate = state.vals.vsp;
            });

        }, 1000);

    }

    let scrInt, clnInt, bypInt;

    function toggleAutoScroll(en) {

        if (en) {
            const l = () => {
                if (state.asc) {
                    win.scrollBy(0, state.vals.asv);
                    scrInt = requestAnimationFrame(l);
                }
            };
            l();
        } else cancelAnimationFrame(scrInt);

    }

    function toggleAggressiveClean(en) {

        if (en) {

            const l = () => {

                if (!state.cln) return;

                doc.querySelectorAll('div,section,aside,footer,iframe').forEach(e => {

                    if (e.dataset.uH) return;
                    const s = getComputedStyle(e);

                    if ((s.position === 'fixed' || s.position === 'sticky') && parseInt(s.zIndex) > 50 && !['u-fs-btn', 'u-fs-menu', 'u-modal-overlay'].includes(e.id) && e.offsetHeight > 0 && e.offsetHeight < win.innerHeight) {
                        e.dataset.uH = "t";
                        e.style.setProperty('display', 'none', 'important');
                    }

                });

            };
            l();
            clnInt = setInterval(l, 2000);

        } else {

            if (clnInt) clearInterval(clnInt);

            doc.querySelectorAll('[data-u-h="t"]').forEach(e => {
                e.style.removeProperty('display');
                delete e.dataset.uH;
            });

        }

    }

    function toggleSanitizer(en) {

        const h = e => {

            const a = e.target.closest('a');

            if (!a || !a.href || a.dataset.nc === '1') return;

            try {

                const u = new URL(a.href);

                const p = u.searchParams;

                const rgx = /^(utm_|fb|g|tt|ms)?clid|^(__)?(cft|tn|nc)|^(ref|source|si|share|igsh|ohost|olssid)/i;

                let dirty = false;

                Array.from(p.keys()).forEach(x => {

                    if (rgx.test(x)) {
                        p.delete(x);
                        dirty = true;
                    }

                });

                if (dirty) {

                    a.href = u.toString();

                    a.dataset.nc = '1';

                }

            } catch (z) {}

        };

        const evs = ['touchstart', 'contextmenu', 'mousedown'];

        const opts = {
            capture: true,
            passive: true
        };

        evs.forEach(ev => {

            if (en) doc.addEventListener(ev, h, opts);

            else doc.removeEventListener(ev, h, opts);

        });

    }

    function toggleCopyBypass(en) {

        const id = 'u-bypass-css',
            evs = ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'mousedown', 'mouseup', 'dragstart'];

        const stop = e => {

            if (e.composedPath().some(x => ['u-fs-menu', 'u-fs-btn', 'u-modal-overlay'].includes(x.id))) return;

            e.stopPropagation();
            if (e.type === 'keydown' && (e.ctrlKey || e.metaKey)) return true;

        };

        if (en) {

            if (!doc.getElementById(id)) {
                const s = doc.createElement('style');
                s.id = id;
                s.textContent = '*{user-select:text!important;-webkit-user-select:text!important}';
                doc.head.appendChild(s);
            }

            evs.forEach(v => win.addEventListener(v, stop, true));

            bypInt = setInterval(() => {
                doc.oncontextmenu = doc.onselectstart = doc.ondragstart = doc.body.oncontextmenu = null;
            }, 2000);

        } else {

            doc.getElementById(id)?.remove();
            evs.forEach(v => win.removeEventListener(v, stop, true));
            if (bypInt) clearInterval(bypInt);

        }

    }

    function toggleTimerHack(en) {

        const target = window.unsafeWindow || window; // Targetkan window asli page

        // Simpan fungsi asli jika belum disimpan

        if (!target.orgSetInt) target.orgSetInt = target.setInterval;

        if (!target.orgSetTout) target.orgSetTout = target.setTimeout;

        if (en) {

            // Bajak setInterval

            target.setInterval = exportFunction((func, delay, ...args) => {

                // Hajar semua timer di atas 500ms jadi 1ms (Instan)

                // Angka 1ms jauh lebih cepat dari 50ms

                const newDelay = (delay && delay > 500) ? 1 : delay;

                return target.orgSetInt(func, newDelay, ...args);

            }, target);

            // Bajak setTimeout

            target.setTimeout = exportFunction((func, delay, ...args) => {

                const newDelay = (delay && delay > 500) ? 1 : delay;

                return target.orgSetTout(func, newDelay, ...args);

            }, target);

            console.log('Nara Tools: Timer Hacked (Aggressive Mode)');

        } else {

            // Kembalikan ke normal

            target.setInterval = target.orgSetInt;

            target.setTimeout = target.orgSetTout;

        }

    }

    init();

})();