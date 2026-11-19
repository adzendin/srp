/* Kangmas Sabdo Widget - v2026.11.19.17 - Suggestion Box Auto-Close & Chat Greeting Success Flow */
(function(){
  if (document.getElementById("kangmas-sabdo-widget")) return;
  var st=document.createElement("style"); 
  st.textContent=`
    #kangmas-sabdo-widget{position:fixed;right:20px;bottom:20px;z-index:99999;font-family:ui-sans-serif,system-ui,sans-serif;}
    #ks-btn{width:68px;height:68px;border-radius:9999px;border:3px solid #8B5E3C;background:#FAF6F0;cursor:pointer;overflow:hidden;padding:0;box-shadow:0 10px 25px rgba(139,94,60,0.3);transition:transform 0.2s ease, box-shadow 0.2s ease;}
    #ks-btn:hover{transform:scale(1.05);box-shadow:0 14px 30px rgba(139,94,60,0.4);}
    #ks-btn img{width:100%;height:100%;object-fit:cover;display:block;}
    #ks-panel{display:none;position:fixed;right:20px;bottom:100px;width:min(380px,calc(100vw - 32px));height:min(540px,75vh);background:#fff;border:1px solid #E5DCCB;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.2);z-index:99999;flex-direction:column;font-family:ui-sans-serif,system-ui,sans-serif;transform:translateY(10px);opacity:0;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;}
    #ks-panel.open{display:flex;transform:translateY(0);opacity:1;}
    #ks-head{background:#8B5E3C;color:#fff;padding:14px 16px;flex-shrink:0;position:relative;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
    #ks-head-info b{display:block;font-size:16px;font-weight:700;}
    #ks-head-info span{font-size:12px;opacity:0.9;display:flex;align-items:center;gap:6px;}
    #ks-head-info span::before{content:"";width:8px;height:8px;background:#4ADE80;border-radius:50%;display:inline-block;}
    #ks-close{background:rgba(255,255,255,0.2);color:#fff;border:0;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;}
    #ks-close:hover{background:rgba(255,255,255,0.35);}
    #ks-msgs{padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:10px;min-height:0;background:#FAF6F0;}
    .ks-m{max-width:85%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;box-shadow:0 1px 2px rgba(0,0,0,0.05);}
    .ks-m.bot{background:#fff;color:#2B2118;align-self:flex-start;border-bottom-left-radius:4px;border:1px solid #EAE0D0;}
    .ks-m.me{background:#8B5E3C;color:#fff;align-self:flex-end;border-bottom-right-radius:4px;}
    #ks-chips{display:flex;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#FAF6F0;border-top:1px solid #EEDFCF;flex-shrink:0;}
    #ks-chips button{border:1px solid #8B5E3C;background:#fff;color:#8B5E3C;border-radius:9999px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;}
    #ks-chips button:hover{background:#8B5E3C;color:#fff;}
    #ks-form{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #E5DCCB;background:#fff;flex-shrink:0;}
    #ks-form input{flex:1;border:1px solid #D9C8B4;border-radius:9999px;padding:10px 16px;font-size:14px;outline:none;color:#2B2118;background:#FAF6F0;transition:border-color 0.2s;}
    #ks-form input:focus{border-color:#8B5E3C;background:#fff;}
    #ks-form button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:10px 20px;font-weight:700;cursor:pointer;flex-shrink:0;transition:opacity 0.2s;}
    #ks-form button:hover{opacity:0.9;}
    #ks-saran{display:none;padding:14px 16px;border-top:1px solid #E5DCCB;gap:10px;flex-direction:column;max-height:240px;overflow-y:auto;flex-shrink:0;background:#fff;}
    #ks-saran.open{display:flex;}
    #ks-saran input,#ks-saran textarea{width:100%;border:1px solid #D9C8B4;border-radius:12px;padding:10px 12px;font-size:14px;outline:none;color:#2B2118;background:#FAF6F0;}
    #ks-saran input:focus,#ks-saran textarea:focus{border-color:#8B5E3C;background:#fff;}
    #ks-saran button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:10px;font-weight:700;cursor:pointer;flex-shrink:0;}
    #ks-saran button:disabled{background:#C8B9AA !important;cursor:not-allowed;opacity:0.7;}
  `;
  document.head.appendChild(st);

  var tmp=document.createElement("div"); 
  tmp.innerHTML=`
    <div id="kangmas-sabdo-widget">
      <button id="ks-btn" aria-label="Buka Kangmas Sabdo"><img id="ks-img" src="/kangmas_sabdo_diam.png" alt="Kangmas Sabdo"></button>
    </div>
    <div id="ks-panel" role="dialog" aria-label="Kangmas Sabdo">
      <div id="ks-head">
        <div id="ks-head-info">
          <b>Kangmas Sabdo</b>
          <span>Penjaga Rumah Ini</span>
        </div>
        <button id="ks-close" aria-label="Tutup">✕</button>
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
    </div>
  `;
  while(tmp.firstChild) document.body.appendChild(tmp.firstChild);
})();

(function(){
  var WORKER_URL="https://kangmas-sabdo-proxy.adzendin.workers.dev/";
  var APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx5ebPEOqFmIMPmTR08Nv-vgSEyM_QjFqkWRls2Kt2GYjemN5anqrg_cPFvY27z1EaI/exec";
  var btn=document.getElementById("ks-btn"), img=document.getElementById("ks-img"), panel=document.getElementById("ks-panel"), msgs=document.getElementById("ks-msgs"), input=document.getElementById("ks-input"), form=document.getElementById("ks-form"), closeBtn=document.getElementById("ks-close");
  var opened=false;

  // Local Zero-Token Knowledge Base (Instant & Free!)
  var localKnowledge = [
    {
      keys: ["apa itu srp", "surabaya rumah pahlawan", "srp", "tentang srp", "kepanjangan srp"],
      reply: "Surabaya Rumah Pahlawan (SRP) adalah rumah karya dan aplikasi bantu. Ada Sastra, Ujian Mandiri Terpadu untuk Pejuang, dan alat digital untuk memudahkan pekerjaan sehari-hari. Slogan: 'Mudah didapat, untuk meMUDAhkan bersama.'"
    },
    {
      keys: ["ujian mandiri", "ujian", "soal", "reguler", "transisi", "transenden", "cermin nalar", "pns", "twk", "tiu", "tkp"],
      reply: "Ujian Mandiri Terpadu SRP menyediakan soal dari Kelas 5 SD, Kelas 6 SD, SMP, SMA, hingga Kuliah dan Pejuang PNS (TWK, TIU, TKP). Terdiri dari 3 tipe: Reguler, Transisi, dan Transenden dilengkapi Cermin Nalar."
    },
    {
      keys: ["rt terpadu", "sekretariat rt", "panduan rt", "rt"],
      reply: "Panduan Sekretariat RT Terpadu dirancang untuk memudahkan pengurus RT mengelola administrasi warga. Baca selengkapnya di menu Panduan RT Terpadu (/panduan/rt-terpadu.html)."
    },
    {
      keys: ["bendahara", "keuangan rt", "panduan bendahara", "iuran kas"],
      reply: "Panduan Bendahara membantu pencatatan keuangan warga, iuran, dan kas RT dengan rapi dan transparan (/panduan/bendahara.html)."
    },
    {
      keys: ["raka", "apk raka", "aplikasi raka"],
      reply: "RAKA adalah aplikasi bantu digital dalam ekosistem SRP untuk memudahkan pekerjaan administratif. APK dapat diunduh di /apk/RAKA.apk."
    },
    {
      keys: ["raiki", "apk raiki", "aplikasi raiki"],
      reply: "RAIKI adalah aplikasi bantu digital pendamping dalam ekosistem SRP. APK dapat diunduh di /apk/raiki.apk."
    },
    {
      keys: ["kotak saran", "saran", "masukan", "arsip saran", "asaran"],
      reply: "Kotak Saran SRP menampung masukan dari para pejuang dan warga secara anonim. Arsip saran dapat dilihat di asaran.html."
    },
    {
      keys: ["slogan", "motto", "tujuan", "visi"],
      reply: "Slogan utama Surabaya Rumah Pahlawan adalah: 'Mudah didapat, untuk meMUDAhkan bersama.'"
    }
  ];

  function getLocalAnswer(text) {
    var lower = text.toLowerCase();
    for (var i = 0; i < localKnowledge.length; i++) {
      var item = localKnowledge[i];
      for (var j = 0; j < item.keys.length; j++) {
        if (lower.indexOf(item.keys[j]) !== -1) {
          return item.reply;
        }
      }
    }
    return null;
  }

  function togglePanel(open){
    opened=open;
    panel.classList.toggle("open", opened);
    img.src = opened ? "/kangmas_sabdo_tersenyum.png" : "/kangmas_sabdo_diam.png";
    if(opened && !msgs.children.length){
      add("Sugeng rawuh. Saya Kangmas Sabdo, penjaga Rumah ini. Hendak ke mana? Saya hantarkan.", "bot");
    }
    if(opened) {
      setTimeout(function(){ input.focus(); }, 150);
    }
  }

  btn.addEventListener("click", function(){ togglePanel(!opened); });
  if(closeBtn) closeBtn.addEventListener("click", function(){ togglePanel(false); });

  function add(text, who){
    var d=document.createElement("div");
    d.className="ks-m "+who;
    d.textContent=text;
    msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight;
    return d;
  }

  async function sendChat(text){
    add(text, "me");
    input.value="";

    // 1. Check local knowledge base FIRST (Zero token, 0ms instant reply!)
    var localAns = getLocalAnswer(text);
    if (localAns) {
      setTimeout(function(){
        add(localAns, "bot");
      }, 250);
      return;
    }

    // 2. Fallback to Cloudflare Worker (Gemini AI) for general/complex questions
    var thinking=add("Kangmas Sabdo sedang mikir...", "bot");
    try{
      var r=await fetch(WORKER_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify({message:text})});
      if(!r.ok) throw new Error("worker "+r.status);
      var j=await r.json();
      thinking.textContent = (j.reply||j.text||"Matur nuwun, coba lagi ya.");
    }catch(e){
      thinking.textContent="Kangmas Sabdo sedang istirahat sejenak karena trafik padat. Coba beberapa saat lagi ya.";
    }
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var v=input.value.trim();
    if(v) sendChat(v);
  });

  document.querySelectorAll("#ks-chips button[data-q]").forEach(function(b){
    b.addEventListener("click", function(){
      sendChat(b.getAttribute("data-q"));
    });
  });

  var saranBox=document.getElementById("ks-saran");
  document.getElementById("ks-chip-saran").addEventListener("click", function(){
    saranBox.classList.toggle("open");
    if(saranBox.classList.contains("open")){
      saranBox.scrollTop=0;
      document.getElementById("ks-topik").focus();
    }
  });

  document.getElementById("ks-kirim-saran").addEventListener("click", function(){
    var topik=document.getElementById("ks-topik").value.trim();
    var isi=document.getElementById("ks-isi").value.trim();
    if(!isi){
      add("Isi saran-nya diisi dulu ya.", "bot");
      return;
    }
    var btnSaran = document.getElementById("ks-kirim-saran");
    btnSaran.disabled = true;
    btnSaran.textContent = "Mengirim Saran...";

    var url=APPS_SCRIPT_URL+"?action=add&topik="+encodeURIComponent(topik)+"&isi="+encodeURIComponent(isi);
    fetch(url,{method:"GET",mode:"no-cors",redirect:"follow"}).then(function(){
      // Close suggestion box and greet visitor with success message in chat feed
      saranBox.classList.remove("open");
      document.getElementById("ks-isi").value="";
      document.getElementById("ks-topik").value="";
      btnSaran.disabled = false;
      btnSaran.textContent = "Kirim Saran";

      add("Matur nuwun, saran Kangmas / Mbak sudah masuk ke Arsip Saran SRP.", "bot");
    }).catch(function(){
      saranBox.classList.remove("open");
      btnSaran.disabled = false;
      btnSaran.textContent = "Kirim Saran";
      add("Maaf, saran belum bisa masuk ke Arsip Saran SRP. Silakan coba lagi sebentar lagi ya.", "bot");
    });
  });
})();
