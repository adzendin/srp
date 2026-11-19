/* Kangmas Sabdo Widget - v2026.11.19.11 - file terpisah dari index */
(function(){
  if (document.getElementById("kangmas-sabdo-widget")) return;
  var st=document.createElement("style"); st.textContent='#kangmas-sabdo-widget{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:ui-sans-serif,system-ui,sans-serif}\n#ks-btn{width:72px;height:72px;border-radius:9999px;border:2px solid #8B5E3C;background:#FAF6F0;cursor:pointer;overflow:hidden;padding:0;box-shadow:0 8px 24px rgba(0,0,0,.25)}\n#ks-btn img{width:100%;height:100%;object-fit:cover;display:block}\n#ks-panel{display:none;position:fixed;right:16px;bottom:96px;width:min(360px,calc(100vw - 32px));height:min(560px,70vh);background:#fff;border:1px solid #E5DCCB;border-radius:20px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,.25);z-index:9999;flex-direction:column;font-family:ui-sans-serif,system-ui,sans-serif}\n#ks-panel.open{display:flex}\n#ks-head{background:#8B5E3C;color:#fff;padding:12px 14px;flex-shrink:0;position:relative;z-index:2}\n#ks-head b{display:block;font-size:15px}\n#ks-head span{font-size:12px;opacity:.9}\n#ks-msgs{padding:12px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:8px;min-height:0}\n.ks-m{max-width:85%;padding:9px 12px;border-radius:14px;font-size:14px;line-height:1.45}\n.ks-m.bot{background:#F3EBDD;color:#3B2A1A;align-self:flex-start}\n.ks-m.me{background:#8B5E3C;color:#fff;align-self:flex-end}\n#ks-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 8px;flex-shrink:0}\n#ks-chips button{border:1px solid #8B5E3C;background:#fff;color:#8B5E3C;border-radius:9999px;padding:6px 10px;font-size:12px;font-weight:700;cursor:pointer}\n#ks-form{display:flex;gap:6px;padding:10px;border-top:1px solid #E5DCCB;background:#fff;flex-shrink:0}\n#ks-form input{flex:1;border:1px solid #E5DCCB;border-radius:9999px;padding:9px 12px;font-size:14px;outline:none;color:#3B2A1A;background:#fff}\n#ks-form button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:9px 16px;font-weight:700;cursor:pointer;min-width:64px;flex-shrink:0;white-space:nowrap}\n#ks-saran{display:none;padding:12px;border-top:1px solid #E5DCCB;gap:8px;flex-direction:column;max-height:190px;overflow-y:auto;flex-shrink:0}\n#ks-saran.open{display:flex}\n#ks-saran input,#ks-saran textarea{width:100%;border:1px solid #E5DCCB;border-radius:12px;padding:9px 12px;font-size:14px;outline:none;color:#3B2A1A;background:#fff}\n#ks-saran button{background:#8B5E3C !important;color:#fff !important;border:0;border-radius:9999px;padding:10px;font-weight:700;cursor:pointer;flex-shrink:0}'; document.head.appendChild(st);
  var tmp=document.createElement("div"); tmp.innerHTML='<div id="kangmas-sabdo-widget">\n  <button id="ks-btn" aria-label="Buka Kangmas Sabdo"><img id="ks-img" src="kangmas_sabdo_diam.png" alt="Kangmas Sabdo"></button>\n</div>\n<div id="ks-panel" role="dialog" aria-label="Kangmas Sabdo">\n  <div id="ks-head"><b>Kangmas Sabdo</b><span>Penjaga Rumah ini</span></div>\n  <div id="ks-msgs"></div>\n  <div id="ks-chips">\n    <button type="button" data-q="Apa itu SRP?">Apa itu SRP?</button>\n    <button type="button" data-q="Apa itu Ujian Mandiri Terpadu?">Ujian Mandiri</button>\n    <button type="button" data-q="Apa itu Aplikasi Bantu?">Aplikasi Bantu</button>\n    <button type="button" id="ks-chip-saran">Kotak Saran</button>\n  </div>\n  <div id="ks-saran">\n    <input id="ks-topik" maxlength="100" placeholder="Topik (opsional)">\n    <textarea id="ks-isi" rows="3" maxlength="1000" placeholder="Tulis saran Kangmas / Mbak..."></textarea>\n    <button id="ks-kirim-saran" type="button">Kirim Saran</button>\n    <small style="font-size:12px;color:#6B4A2C">Saran masuk ke Arsip Saran SRP. Tanpa nama / HP / email.</small>\n  </div>\n  <form id="ks-form"><input id="ks-input" maxlength="300" placeholder="Tulis pesan..."><button type="submit">Kirim</button></form>\n</div>';
  while(tmp.firstChild) document.body.appendChild(tmp.firstChild);
})();
(function(){
  var KS_VERSION="v2026.11.19.11"; var WORKER_URL="https://kangmas-sabdo-proxy.adzendin.workers.dev/";
  var APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx5ebPEOqFmIMPmTR08Nv-vgSEyM_QjFqkWRls2Kt2GYjemN5anqrg_cPFvY27z1EaI/exec";
  var btn=document.getElementById("ks-btn"), img=document.getElementById("ks-img"), panel=document.getElementById("ks-panel"), msgs=document.getElementById("ks-msgs"), input=document.getElementById("ks-input"), form=document.getElementById("ks-form");
  var opened=false;
  function add(text, who){ var d=document.createElement("div"); d.className="ks-m "+who; d.textContent=text; msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight; return d; }
  btn.addEventListener("click", function(){
    opened=!opened; panel.classList.toggle("open", opened);
    img.src = opened ? "kangmas_sabdo_tersenyum.png" : "kangmas_sabdo_diam.png";
    if(opened && !msgs.children.length){ add("Sugeng rawuh. Saya Kangmas Sabdo, penjaga Rumah ini. Hendak ke mana? Saya hantarkan.", "bot"); }
  });
  async function sendChat(text){
    add(text, "me"); input.value="";
    var thinking=add("Kangmas Sabdo sedang mikir...", "bot");
    try{
      var r=await fetch(WORKER_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify({message:text})});
      if(!r.ok) throw new Error("worker "+r.status);
      var j=await r.json(); thinking.textContent = (j.reply||j.text||"Matur nuwun, coba lagi ya.");
    }catch(e){ thinking.textContent="Kangmas Sabdo sedang istirahat sejenak karena trafik padat. Coba beberapa saat lagi ya."; }
  }
  form.addEventListener("submit", function(e){ e.preventDefault(); var v=input.value.trim(); if(v) sendChat(v); });
  document.querySelectorAll("#ks-chips button[data-q]").forEach(function(b){ b.addEventListener("click", function(){ sendChat(b.getAttribute("data-q")); }); });
  var saranBox=document.getElementById("ks-saran");
  document.getElementById("ks-chip-saran").addEventListener("click", function(){ saranBox.classList.toggle("open"); });
  document.getElementById("ks-kirim-saran").addEventListener("click", function(){
    var topik=document.getElementById("ks-topik").value.trim();
    var isi=document.getElementById("ks-isi").value.trim();
    if(!isi){ add("Isi saran-nya diisi dulu ya.", "bot"); return; }
    var url=APPS_SCRIPT_URL+"?action=add&topik="+encodeURIComponent(topik)+"&isi="+encodeURIComponent(isi);
    fetch(url,{method:"GET",mode:"no-cors",redirect:"follow"}).then(function(){ add("Matur nuwun, saran Kangmas / Mbak sudah masuk ke Arsip Saran SRP.", "bot"); document.getElementById("ks-isi").value=""; }).catch(function(){ add("Maaf, saran belum bisa masuk ke Arsip Saran SRP. Silakan coba lagi sebentar lagi ya.", "bot"); });
  });
})();
