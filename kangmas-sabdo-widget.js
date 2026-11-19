/* Kangmas Sabdo Widget - v2026.11.20b - Auto Link Path, Knowledge JSON Sync, Corner Badge Blink & Mobile UX */
(function(){
  if (document.getElementById("kangmas-sabdo-widget")) return;

  var KNOWLEDGE_URL = "/srp-knowledge.json?v=2026.11.20c";
  var WORKER_URL = "https://kangmas-sabdo-proxy.adzendin.workers.dev/";
  var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5ebPEOqFmIMPmTR08Nv-vgSEyM_QjFqkWRls2Kt2GYjemN5anqrg_cPFvY27z1EaI/exec";

  var st = document.createElement("style");
  st.textContent = `
    #kangmas-sabdo-widget, #kangmas-sabdo-widget *, #ks-panel, #ks-panel * { box-sizing: border-box; }
    #kangmas-sabdo-widget{position:fixed;right:20px;bottom:20px;z-index:99999;font-family:ui-sans-serif,system-ui,sans-serif;}
    #ks-btn{width:68px;height:68px;border-radius:9999px;border:3px solid #8B5E3C;background:#FAF6F0;cursor:pointer;overflow:hidden;padding:0;box-shadow:0 10px 25px rgba(139,94,60,0.3);transition:transform 0.2s ease, box-shadow 0.2s ease;}
    #ks-btn:hover{transform:scale(1.05);box-shadow:0 14px 30px rgba(139,94,60,0.4);}
    #ks-btn img{width:100%;height:100%;object-fit:cover;display:block;}
    #ks-badge{position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;padding:0 5px;border-radius:9999px;background:#DC2626;color:#fff;border:2px solid #FAF6F0;font-size:10px;font-weight:700;line-height:14px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.25);pointer-events:none;z-index:2;}
    @keyframes ksBadgeBlink{
      0%,70%,100%{opacity:1;transform:scale(1);}
      85%{opacity:0.25;transform:scale(0.86);}
    }
    #ks-badge.blink{animation:ksBadgeBlink 1.8s ease-in-out infinite;}
    #ks-badge.hidden{display:none;}
    #ks-panel{display:none;position:fixed;right:20px;bottom:100px;width:min(380px,calc(100vw - 32px));height:min(540px,75vh);background:#fff;border:1px solid #E5DCCB;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.2);z-index:99999;flex-direction:column;font-family:ui-sans-serif,system-ui,sans-serif;transform:translateY(10px);opacity:0;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;}
    #ks-panel.open{display:flex;transform:translateY(0);opacity:1;}
    #ks-head{background:#8B5E3C;color:#fff;padding:14px 16px;flex-shrink:0;position:relative;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
    #ks-head-info b{display:block;font-size:16px;font-weight:700;}
    #ks-head-info span{font-size:12px;opacity:0.9;display:flex;align-items:center;gap:6px;}
    #ks-head-info span::before{content:"";width:8px;height:8px;background:#4ADE80;border-radius:50%;display:inline-block;}
    #ks-close{background:rgba(255,255,255,0.2);color:#fff;border:0;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;}
    #ks-close:hover{background:rgba(255,255,255,0.35);}
    #ks-msgs{padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:10px;min-height:0;background:#FAF6F0;}
    .ks-m{max-width:85%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;box-shadow:0 1px 2px rgba(0,0,0,0.05);word-wrap:break-word;}
    .ks-m.bot{background:#fff;color:#2B2118;align-self:flex-start;border-bottom-left-radius:4px;border:1px solid #EAE0D0;}
    .ks-m.me{background:#8B5E3C;color:#fff;align-self:flex-end;border-bottom-right-radius:4px;}
    .ks-m.bot a{color:#8B5E3C;font-weight:700;text-decoration:underline;word-break:break-word;}
    #ks-chips{display:flex;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#FAF6F0;border-top:1px solid #EEDFCF;flex-shrink:0;}
    #ks-chips button{border:1px solid #8B5E3C;background:#fff;color:#8B5E3C;border-radius:9999px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;}
    #ks-chips button:hover{background:#8B5E3C;color:#fff;}
    #ks-form{display:flex;gap:8px;padding:10px 16px 8px;border-top:1px solid #E5DCCB;background:#fff;flex-shrink:0;}
    #ks-form input{flex:1;min-width:0;border:1px solid #D9C8B4;border-radius:9999px;padding:10px 16px;font-size:14px;outline:none;color:#2B2118;background:#FAF6F0;transition:border-color 0.2s;}
    #ks-form input:focus{border-color:#8B5E3C;background:#fff;}
    #ks-form button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:10px 18px;font-weight:700;cursor:pointer;flex-shrink:0;transition:opacity 0.2s;}
    #ks-form button:hover{opacity:0.9;}
    #ks-saran{display:none;padding:14px 16px;border-top:1px solid #E5DCCB;gap:10px;flex-direction:column;max-height:240px;overflow-y:auto;flex-shrink:0;background:#fff;}
    #ks-saran.open{display:flex;}
    #ks-saran input,#ks-saran textarea{width:100%;border:1px solid #D9C8B4;border-radius:12px;padding:10px 12px;font-size:14px;outline:none;color:#2B2118;background:#FAF6F0;font-family:inherit;}
    #ks-saran input:focus,#ks-saran textarea:focus{border-color:#8B5E3C;background:#fff;}
    #ks-saran button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:10px;font-weight:700;cursor:pointer;flex-shrink:0;}
    #ks-saran button:disabled{background:#C8B9AA !important;cursor:not-allowed;opacity:0.7;}
    #ks-foot{padding:4px 16px 10px;background:#fff;text-align:center;font-size:10px;color:#8A7968;letter-spacing:0.3px;flex-shrink:0;}
  `;
  document.head.appendChild(st);

  var tmp = document.createElement("div");
  tmp.innerHTML = `
    <div id="kangmas-sabdo-widget">
      <button id="ks-btn" type="button" aria-label="Buka Kangmas Sabdo"><img id="ks-img" src="/kangmas_sabdo_diam.png" alt="Kangmas Sabdo"></button>
      <span id="ks-badge" class="blink" aria-hidden="true">?</span>
    </div>
    <div id="ks-panel" role="dialog" aria-label="Kangmas Sabdo">
      <div id="ks-head">
        <div id="ks-head-info">
          <b>Kangmas Sabdo</b>
          <span>Penjaga Rumah Ini</span>
        </div>
        <button id="ks-close" type="button" aria-label="Tutup">✕</button>
      </div>
      <div id="ks-msgs"></div>
      <div id="ks-chips">
        <button type="button" data-q="Apa itu SRP?">Apa itu SRP?</button>
        <button type="button" data-q="Apa itu Ujian Mandiri Terpadu?">Ujian Mandiri</button>
        <button type="button" data-q="Panduan RT Terpadu">RT Terpadu</button>
        <button type="button" id="ks-chip-saran">Kotak Saran</button>
      </div>
      <div id="ks-saran">
        <input id="ks-topik" maxlength="100" placeholder="Topik (opsional)">
        <textarea id="ks-isi" rows="3" maxlength="1000" placeholder="Tulis saran Kangmas / Mbak..."></textarea>
        <button id="ks-kirim-saran" type="button">Kirim Saran</button>
        <small style="font-size:11px;color:#6F6153">Saran masuk ke Arsip Saran SRP. Tanpa nama / HP / email.</small>
      </div>
      <form id="ks-form">
        <input id="ks-input" maxlength="300" placeholder="Tulis pesan ke Kangmas...">
        <button type="submit">Kirim</button>
      </form>
      <div id="ks-foot">SURABAYA RUMAH PAHLAWAN @adzendin</div>
    </div>
  `;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  var btn = document.getElementById("ks-btn");
  var img = document.getElementById("ks-img");
  var badge = document.getElementById("ks-badge");
  var panel = document.getElementById("ks-panel");
  var msgs = document.getElementById("ks-msgs");
  var input = document.getElementById("ks-input");
  var form = document.getElementById("ks-form");
  var closeBtn = document.getElementById("ks-close");
  var saranBox = document.getElementById("ks-saran");
  var opened = false;

  var chatHistory = [];

  function pushHistory(role, content) {
    if (!content) return;
    chatHistory.push({
      role: role,
      content: String(content).slice(0, 400)
    });
    if (chatHistory.length > 6) {
      chatHistory = chatHistory.slice(chatHistory.length - 6);
    }
  }

  // Fallback Knowledge Base (Zero-Token Instant)
  var activeFaqs = [
    {
      keywords: ["apa itu srp", "surabaya rumah pahlawan", "tentang srp", "kepanjangan srp", "srp"],
      answer: "Surabaya Rumah Pahlawan (SRP) adalah rumah karya dan aplikasi bantu. Ada Sastra, Ujian Mandiri Terpadu untuk Pejuang, dan alat digital untuk memudahkan pekerjaan sehari-hari. Slogan: 'Mudah didapat, untuk meMUDAhkan bersama.'"
    },
    {
      keywords: ["ujian mandiri", "ujian", "soal", "reguler", "transisi", "transenden", "cermin nalar", "cpns", "pns", "twk", "tiu", "tkp"],
      answer: "Ujian Mandiri Terpadu SRP menyediakan soal dari Kelas 5 SD, Kelas 6 SD, SMP, SMA, hingga Kuliah dan Pejuang CPNS (TWK, TIU, TKP). Terdiri dari 3 tipe: Reguler, Transisi (naik kelas), dan Transenden (nalar murni & studi kasus) dilengkapi Cermin Nalar."
    },
    {
      keywords: ["rt terpadu", "sekretariat rt", "sekretariat rt terpadu", "panduan rt", "administrasi warga"],
      answer: "Panduan Sekretariat RT Terpadu dirancang untuk memudahkan pengurus RT mengelola administrasi warga secara digital dan terpadu. Panduan lengkap dapat dibaca di /panduan/rt-terpadu.html."
    },
    {
      keywords: ["bendahara", "keuangan rt", "panduan bendahara", "iuran kas", "kas rt"],
      answer: "Panduan Bendahara membantu pencatatan keuangan warga, iuran, dan kas RT dengan rapi dan transparan. Panduan lengkap ada di /panduan/bendahara.html."
    },
    {
      keywords: ["raka", "apk raka", "aplikasi raka"],
      answer: "RAKA adalah aplikasi bantu digital dalam ekosistem SRP untuk memudahkan pekerjaan administratif dan keseharian. File APK tersedia di /apk/RAKA.apk."
    },
    {
      keywords: ["raiki", "apk raiki", "aplikasi raiki"],
      answer: "RAIKI adalah aplikasi bantu digital pendamping dalam ekosistem SRP. File APK tersedia di /apk/raiki.apk."
    },
    {
      keywords: ["kotak saran", "saran", "masukan", "arsip saran", "asaran"],
      answer: "Kotak Saran SRP menampung masukan dari para pejuang dan warga secara anonim tanpa perlu nama atau email. Arsip saran transparan dapat dilihat di /asaran.html."
    },
    {
      keywords: ["slogan", "motto", "tujuan", "visi"],
      answer: "Slogan utama Surabaya Rumah Pahlawan adalah: 'Mudah didapat, untuk meMUDAhkan bersama.'"
    }
  ];

  // Muat srp-knowledge.json jika tersedia
  if (typeof fetch === "function") {
    fetch(KNOWLEDGE_URL, { cache: "no-store" })
      .then(function(res) {
        if (!res.ok) throw new Error("json " + res.status);
        return res.json();
      })
      .then(function(data) {
        if (data && Array.isArray(data.faqs) && data.faqs.length > 0) {
          activeFaqs = data.faqs;
        }
      })
      .catch(function() {
        // Tetap gunakan activeFaqs bawaan bila JSON tidak terjangkau
      });
  }

  function getLocalAnswer(text) {
    var lower = String(text || "").toLowerCase().trim();
    if (!lower) return null;

    // Jika pertanyaan bernuansa kemampuan, kreasi, atau diskusi, biarkan masuk ke AI Worker
    var creativeOrOpenPattern = /\b(bisa|coba|buatkan|bikinkan|puisi|pantun|cerita|kenapa|mengapa|bagaimana|gimana|menurutmu|pendapatmu)\b/;
    var explicitSrpLookup = /\b(apk|download|unduh|panduan|link|url|slogan|motto|visi|misi|kotak saran|asaran|ujian mandiri|raka|raiki|rt terpadu|bendahara)\b/;

    if (creativeOrOpenPattern.test(lower) && !explicitSrpLookup.test(lower)) {
      return null;
    }

    var bestAnswer = null;
    var bestScore = 0;

    for (var i = 0; i < activeFaqs.length; i++) {
      var item = activeFaqs[i];
      var keys = item.keywords || item.keys || [];
      var score = 0;

      for (var j = 0; j < keys.length; j++) {
        var kw = String(keys[j] || "").toLowerCase().trim();
        if (!kw) continue;

        if (lower === kw) {
          score += 20;
        } else if (lower.indexOf(kw) !== -1) {
          var wordCount = kw.split(/\s+/).length;
          score += wordCount > 1 ? 8 + wordCount * 2 : 3;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestAnswer = item.answer || item.reply || "";
      }
    }

    return bestScore >= 6 ? bestAnswer : null;
  }

  function closeSaranBox() {
    if (saranBox) saranBox.classList.remove("open");
  }

  function togglePanel(open) {
    opened = !!open;
    panel.classList.toggle("open", opened);
    if (badge) {
      badge.classList.toggle("hidden", opened);
      badge.classList.toggle("blink", !opened);
    }
    img.src = opened ? "/kangmas_sabdo_tersenyum.png" : "/kangmas_sabdo_diam.png";
    if (opened && !msgs.children.length) {
      add("Sugeng rawuh. Saya Kangmas Sabdo, penjaga Rumah ini. Hendak ke mana? Saya hantarkan.", "bot");
    }
    if (opened) {
      setTimeout(function() { input.focus(); }, 150);
    }
  }

  function renderBotMessage(container, text) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    var parts = String(text || "").split(/(\/[a-zA-Z0-9._/-]+)/g);
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (!part) continue;
      if (/^\/[a-zA-Z0-9._/-]+$/.test(part)) {
        var match = part.match(/^(.*?)([.,;:!?)\]]+)$/);
        var cleanPath = match ? match[1] : part;
        var trailing = match ? match[2] : "";

        if (cleanPath && cleanPath.length > 1) {
          var link = document.createElement("a");
          link.href = cleanPath;
          link.textContent = cleanPath;
          container.appendChild(link);
        } else {
          container.appendChild(document.createTextNode(part));
        }

        if (trailing) {
          container.appendChild(document.createTextNode(trailing));
        }
      } else {
        container.appendChild(document.createTextNode(part));
      }
    }
  }

  btn.addEventListener("click", function() { togglePanel(!opened); });
  if (closeBtn) closeBtn.addEventListener("click", function() { togglePanel(false); });

  function add(text, who) {
    var d = document.createElement("div");
    d.className = "ks-m " + who;
    if (who === "bot") {
      renderBotMessage(d, text);
    } else {
      d.textContent = text;
    }
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  function sendChat(text) {
    closeSaranBox();
    add(text, "me");
    input.value = "";

    var localAns = getLocalAnswer(text);
    if (localAns) {
      setTimeout(function() {
        add(localAns, "bot");
      }, 250);
      return;
    }

    var thinking = add("Kangmas Sabdo sedang mikir...", "bot");
    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        message: text,
        history: chatHistory
      })
    })
      .then(function(r) {
        if (!r.ok) throw new Error("worker " + r.status);
        return r.json();
      })
      .then(function(j) {
        var botReply = (j && (j.reply || j.text)) || "Matur nuwun, coba lagi ya.";
        renderBotMessage(thinking, botReply);
        pushHistory("user", text);
        pushHistory("assistant", botReply);
        msgs.scrollTop = msgs.scrollHeight;
      })
      .catch(function() {
        renderBotMessage(thinking, "Kangmas Sabdo sedang istirahat sejenak karena trafik padat. Coba beberapa saat lagi ya.");
        msgs.scrollTop = msgs.scrollHeight;
      });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var v = input.value.trim();
    if (v) sendChat(v);
  });

  document.querySelectorAll("#ks-chips button[data-q]").forEach(function(b) {
    b.addEventListener("click", function() {
      sendChat(b.getAttribute("data-q"));
    });
  });

  document.getElementById("ks-chip-saran").addEventListener("click", function() {
    saranBox.classList.toggle("open");
    if (saranBox.classList.contains("open")) {
      saranBox.scrollTop = 0;
      document.getElementById("ks-topik").focus();
    }
  });

  document.getElementById("ks-kirim-saran").addEventListener("click", function() {
    var topik = document.getElementById("ks-topik").value.trim();
    var isi = document.getElementById("ks-isi").value.trim();
    if (!isi) {
      add("Isi saran-nya diisi dulu ya.", "bot");
      return;
    }
    var btnSaran = document.getElementById("ks-kirim-saran");
    btnSaran.disabled = true;
    btnSaran.textContent = "Mengirim Saran...";

    var url = APPS_SCRIPT_URL + "?action=add&topik=" + encodeURIComponent(topik) + "&isi=" + encodeURIComponent(isi);
    fetch(url, { method: "GET", mode: "no-cors", redirect: "follow" })
      .then(function() {
        closeSaranBox();
        document.getElementById("ks-isi").value = "";
        document.getElementById("ks-topik").value = "";
        btnSaran.disabled = false;
        btnSaran.textContent = "Kirim Saran";
        add("Matur nuwun, saran Kangmas / Mbak sudah masuk ke Arsip Saran SRP.", "bot");
      })
      .catch(function() {
        closeSaranBox();
        btnSaran.disabled = false;
        btnSaran.textContent = "Kirim Saran";
        add("Maaf, saran belum bisa masuk ke Arsip Saran SRP. Silakan coba lagi sebentar lagi ya.", "bot");
      });
  });
})();
