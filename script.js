const products=[
{id:1,name:"Controller Stand",price:8.90,cat:"Gaming",icon:"🎮"},
{id:2,name:"Headset Hook",price:5.90,cat:"Gaming",icon:"🎧"},
{id:3,name:"Desk Cable Clip",price:1.90,cat:"Setup",icon:"🔌"},
{id:4,name:"Froxy Mini",price:3.90,cat:"Doplnky",icon:"👾"},
{id:5,name:"Gamepad Dock",price:12.90,cat:"Gaming",icon:"🕹️"},
{id:6,name:"Setup Logo",price:10.90,cat:"Setup",icon:"⚡"},
{id:7,name:"Phone Stand",price:4.90,cat:"Setup",icon:"📱"},
{id:8,name:"Froxy Keychain",price:1.00,cat:"Doplnky",icon:"🔑"},
{id:9,name:"Mystery Box",price:18.45,cat:"Doplnky",icon:"📦"}
];
let cart=JSON.parse(localStorage.getItem("froxy-cart")||"[]"),active="Všetko",customColor="Čierna";
const money=n=>n.toFixed(2).replace(".",",")+" €";
const save=()=>{localStorage.setItem("froxy-cart",JSON.stringify(cart));renderCart()};
const productFor=item=>item.custom?{name:`Kľúčenka: ${item.name}`,price:6.9}:{...products.find(x=>x.id===item.id)};
function cartSummary(){return cart.map(i=>{const p=productFor(i);return `${p.name} × ${i.qty} — ${money(p.price*i.qty)}${i.custom?` (farba: ${i.color})`:""}`;}).join("\n")}
function cartTotal(){return cart.reduce((sum,i)=>{const p=productFor(i);return sum+p.price*i.qty},0)}
const svg=(body)=>\`<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><pattern id="layers" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 7H8" stroke="#777" stroke-width=".65" opacity=".22"/></pattern></defs>
<rect width="420" height="300" fill="#f1f1ef"/>
<ellipse cx="210" cy="246" rx="125" ry="18" fill="#000" opacity=".08"/>
\${body}
<rect x="0" y="0" width="420" height="300" fill="url(#layers)" opacity=".22"/>
</svg>\`;

function productVisual(p){
  const base=\`fill="#171717" stroke="#080808" stroke-width="4" stroke-linejoin="round"\`;
  const light=\`fill="#292929" stroke="#080808" stroke-width="4" stroke-linejoin="round"\`;
  switch(p.id){
    case 1:return svg(\`<path \${base} d="M112 225V145l42-32h112l42 32v80z"/><path \${light} d="M152 166h116v60H152z"/><path d="M176 118h64v45h-64z" fill="#0b0b0b"/><circle cx="177" cy="194" r="12" fill="#555"/><circle cx="243" cy="194" r="12" fill="#555"/>\`);
    case 2:return svg(\`<path \${base} d="M150 198v-86c0-31 24-54 60-54s60 23 60 54v86h-26v-85c0-18-13-30-34-30s-34 12-34 30v85z"/><rect \${light} x="110" y="185" width="52" height="55" rx="20"/><rect \${light} x="258" y="185" width="52" height="55" rx="20"/>\`);
    case 3:return svg(\`<rect \${base} x="132" y="128" width="156" height="92" rx="20"/><path d="M164 145v58M190 145v58M216 145v58M242 145v58" stroke="#555" stroke-width="5"/><path d="M160 172h100" stroke="#080808" stroke-width="10" stroke-linecap="round"/>\`);
    case 4:return svg(\`<ellipse \${light} cx="210" cy="174" rx="73" ry="61"/><circle \${base} cx="170" cy="125" r="28"/><circle \${base} cx="250" cy="125" r="28"/><circle cx="170" cy="125" r="9" fill="#aaa"/><circle cx="250" cy="125" r="9" fill="#aaa"/><path d="M174 178q36 28 72 0" fill="none" stroke="#aaa" stroke-width="7" stroke-linecap="round"/><ellipse \${base} cx="151" cy="220" rx="24" ry="18"/><ellipse \${base} cx="269" cy="220" rx="24" ry="18"/>\`);
    case 5:return svg(\`<rect \${base} x="105" y="160" width="210" height="78" rx="16"/><path \${light} d="M128 160l28-50h108l28 50z"/><circle cx="164" cy="149" r="11" fill="#777"/><circle cx="256" cy="149" r="11" fill="#777"/><path d="M188 138h44M210 126v24" stroke="#999" stroke-width="7" stroke-linecap="round"/>\`);
    case 6:return svg(\`<path \${base} d="M210 58l28 42h50l-40 31 15 50-53-30-53 30 15-50-40-31h50z"/><rect \${light} x="160" y="206" width="100" height="18" rx="7"/>\`);
    case 7:return svg(\`<path \${base} d="M145 226V96q0-12 12-12h78q12 0 12 12v130h-28V115h-46v111z"/><path \${light} d="M135 226h150l-18 22H153z"/><rect x="181" y="102" width="38" height="5" rx="2" fill="#777"/>\`);
    case 8:return svg(\`<circle \${base} cx="105" cy="92" r="34" fill="none"/><path \${base} d="M136 105h176v82H136z"/><path d="M153 126h140v40H153z" fill="#090909"/><text x="223" y="153" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" font-weight="900" letter-spacing="1" fill="#fff">FROXYYY</text>\`);
    case 9:return svg(\`<rect \${base} x="112" y="112" width="196" height="112" rx="8"/><path \${light} d="M103 105h214v35H103z"/><path d="M145 140v84M275 140v84" stroke="#555" stroke-width="5"/><path d="M174 122h72" stroke="#777" stroke-width="5" stroke-linecap="round"/>\`);
  }
  return "";
}
function renderProducts(){const el=document.querySelector("#products");el.innerHTML=products.filter(p=>active==="Všetko"||p.cat===active).map(p=>`<article class="product"><div class="visual">${p.icon}</div><div class="info"><span class="tag">${p.cat.toUpperCase()}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span><button class="buy" data-add="${p.id}">Pridať do košíka</button></div></article>`).join("")}
function add(id){const x=cart.find(i=>i.id===id&&!i.custom);if(x)x.qty++;else cart.push({id,qty:1});save()}
function renderCart(){const box=document.querySelector("#cartItems");let total=0,count=0;box.innerHTML=cart.map((i,index)=>{const p=productFor(i);total+=p.price*i.qty;count+=i.qty;return `<div class="cart-row"><div><b>${p.name}</b><small>${i.custom?i.color:"3D tlač na objednávku"}</small><div class="qty"><button data-minus="${index}">−</button><span>${i.qty}</span><button data-plus="${index}">+</button></div></div><strong>${money(p.price*i.qty)}</strong></div>`}).join("")||"<p style='color:#777'>Košík je zatiaľ prázdny.</p>";document.querySelector("#total").textContent=money(total);document.querySelector("#cartCount").textContent=count}
document.querySelector("#filters").onclick=e=>{if(e.target.matches("button")){document.querySelectorAll("#filters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");active=e.target.dataset.cat;renderProducts()}};
document.querySelector("#products").onclick=e=>{const id=e.target.dataset.add;if(id)add(+id)};
document.querySelector("#cartItems").onclick=e=>{const i=e.target.dataset.plus??e.target.dataset.minus;if(i!==undefined){if(e.target.dataset.plus!==undefined)cart[i].qty++;else cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1);save()}};
const drawer=document.querySelector("#drawer"),overlay=document.querySelector("#overlay");document.querySelector("#cartBtn").onclick=()=>{drawer.classList.add("open");overlay.classList.add("show")};document.querySelector("#closeCart").onclick=()=>{drawer.classList.remove("open");overlay.classList.remove("show")};overlay.onclick=()=>document.querySelector("#closeCart").click();
const custom=document.querySelector("#customDialog");document.querySelector("#customBtn").onclick=()=>custom.showModal();document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest("dialog").close());document.querySelector(".colors").onclick=e=>{if(e.target.matches("button")){customColor=e.target.dataset.color;document.querySelectorAll(".colors button").forEach(b=>b.classList.remove("selected"));e.target.classList.add("selected")}};
document.querySelector("#addCustom").onclick=()=>{const name=document.querySelector("#customName").value.trim();if(!name)return alert("Napíš meno alebo prezývku.");cart.push({custom:true,name,color:customColor,qty:1});save();custom.close();drawer.classList.add("open");overlay.classList.add("show")};
const checkout=document.querySelector("#checkoutDialog");
document.querySelector("#checkout").onclick=()=>{if(!cart.length)return alert("Košík je prázdny.");checkout.showModal()};
document.querySelector("#placeOrder").onclick=()=>{
  if(!cart.length)return alert("Košík je prázdny.");
  const ids=["name","email","phone","street","zip","city"];
  const fields=ids.map(id=>document.querySelector("#"+id));
  if(fields.some(x=>!x.value.trim()))return alert("Vyplň všetky doručovacie údaje.");
  const email=document.querySelector("#email").value.trim();
  if(!/^\S+@\S+\.\S+$/.test(email))return alert("Skontroluj e-mail.");
  const button=document.querySelector("#placeOrder");button.disabled=true;button.textContent="Odosielam objednávku…";
  const orderText=cartSummary();
  const total=money(cartTotal());
  const customerName=document.querySelector("#name").value.trim();
  const form=document.createElement("form");
  form.method="POST";
  form.action="https://formsubmit.co/liptak.michal@icloud.com";
  form.style.display="none";
  const data={
    meno:customerName,
    email,
    telefon:document.querySelector("#phone").value.trim(),
    adresa:`${document.querySelector("#street").value.trim()}, ${document.querySelector("#zip").value.trim()} ${document.querySelector("#city").value.trim()}`,
    platba:"Dobierka",
    produkty:orderText,
    suma:total,
    objednavka_vytvorena:new Date().toLocaleString("sk-SK"),
    _subject:"Nová objednávka — FROXYYY",
    _replyto:email,
    _template:"table",
    _next:"https://debilkoo.github.io/froxyyy-3D-shop/thanks.html",
    _autoresponse:`Ahoj ${customerName}!\n\nĎakujeme za tvoju objednávku vo FROXYYY.\n\nObjednané produkty:\n${orderText}\n\nCelková suma: ${total}\nPlatba: Dobierka\n\nObjednávku sme prijali a pripravíme ju na odoslanie. Zaplatíš pri doručení.\n\nFROXYYY — 3D doplnky pre tvoj setup.`
  };
  Object.entries(data).forEach(([name,value])=>{const input=document.createElement("input");input.type="hidden";input.name=name;input.value=value;form.appendChild(input)});
  document.body.appendChild(form);
  cart=[];save();
  form.submit();
};
renderProducts();renderCart();