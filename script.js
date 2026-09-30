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
function cartSummary(){
  return cart.map(i=>{const p=productFor(i);return `${p.name} × ${i.qty} — ${money(p.price*i.qty)}${i.custom?` (farba: ${i.color})`:""}`;}).join("\n");
}
function cartTotal(){return cart.reduce((sum,i)=>{const p=productFor(i);return sum+p.price*i.qty},0)}
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
document.querySelector("#placeOrder").onclick=async()=>{
  if(!cart.length)return alert("Košík je prázdny.");
  const ids=["name","email","phone","street","zip","city"];
  const fields=ids.map(id=>document.querySelector("#"+id));
  if(fields.some(x=>!x.value.trim()))return alert("Vyplň všetky doručovacie údaje.");
  const email=document.querySelector("#email").value.trim();
  if(!/^\S+@\S+\.\S+$/.test(email))return alert("Skontroluj e-mail.");
  const button=document.querySelector("#placeOrder");button.disabled=true;button.textContent="Odosielam objednávku…";
  const payload={
    meno:document.querySelector("#name").value.trim(),
    email,
    telefon:document.querySelector("#phone").value.trim(),
    adresa:`${document.querySelector("#street").value.trim()}, ${document.querySelector("#zip").value.trim()} ${document.querySelector("#city").value.trim()}`,
    platba:"Dobierka",
    produkty:cartSummary(),
    suma:money(cartTotal()),
    objednavka_vytvorena:new Date().toLocaleString("sk-SK")
  };
  try{
    const response=await fetch("https://formsubmit.co/ajax/liptak.michal@icloud.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({...payload,_subject:"Nová objednávka — FROXYYY",_template:"table",_replyto:email})});
    if(!response.ok)throw new Error("send failed");
    alert("Ďakujeme! Objednávka bola odoslaná. Čoskoro ju spracujeme.");
    cart=[];save();checkout.close();drawer.classList.remove("open");overlay.classList.remove("show");
  }catch(error){
    alert("Objednávku sa nepodarilo odoslať. Skús to prosím znova.");
  }finally{button.disabled=false;button.textContent="Odoslať objednávku"}
};
renderProducts();renderCart();