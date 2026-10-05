const products=[
{id:1,name:"Controller Stand",price:8.90,cat:"Gaming",desc:"Praktický stojan na ovládač, ktorý udrží gamepad pekne odložený a pripravený na hranie.",details:"3D tlač • pevná konštrukcia • vhodné na gaming setup"},
{id:2,name:"Headset Hook",price:5.90,cat:"Gaming",desc:"Jednoduchý držiak na slúchadlá, ktorý udrží kábel aj headset mimo pracovnej plochy.",details:"3D tlač • úspora miesta • montáž pod stôl"},
{id:3,name:"Desk Cable Clip",price:1.90,cat:"Setup",desc:"Malá spona na káble, aby sa ti nabíjacie a USB káble nezamotávali po stole.",details:"3D tlač • organizácia káblov • minimalistický dizajn"},
{id:5,name:"Gamepad Dock",price:12.90,cat:"Gaming",desc:"Stojan pre gamepad s čistým dizajnom, ktorý sa hodí ku každému modernému setupu.",details:"3D tlač • stabilný stojan • gaming doplnok"},
{id:6,name:"Setup Logo",price:10.90,cat:"Setup",desc:"Dekoratívne logo pre tvoj stôl alebo poličku. Malý detail, ktorý spraví setup osobnejším.",details:"3D tlač • dekorácia • minimalistický vzhľad"},
{id:7,name:"Phone Stand",price:4.90,cat:"Setup",desc:"Kompaktný stojan na telefón, aby si mal mobil počas hrania alebo práce vždy na očiach.",details:"3D tlač • kompaktný • prehľadný setup"},
{id:8,name:"Froxy Keychain",price:1.00,cat:"Doplnky",desc:"Jednoduchá 3D tlačená kľúčenka s nápisom froxyyy.",details:"3D tlač • ľahká • vhodná na kľúče alebo batoh"},
{id:9,name:"Mystery Box",price:18.45,cat:"Doplnky",desc:"Prekvapenie z FROXYYY kolekcie. Obsah sa môže líšiť podľa aktuálnej ponuky.",details:"3D tlačené doplnky • mystery produkt"}
];
let cart=JSON.parse(localStorage.getItem("froxy-cart")||"[]"),active="Všetko",customColor="Čierna";
const money=n=>n.toFixed(2).replace(".",",")+" €";
const save=()=>{localStorage.setItem("froxy-cart",JSON.stringify(cart));renderCart()};
const productFor=item=>item.custom?{name:`Kľúčenka: ${item.name}`,price:6.9}:{...products.find(x=>x.id===item.id)};
function cartSummary(){return cart.map(i=>{const p=productFor(i);return `${p.name} × ${i.qty} — ${money(p.price*i.qty)}${i.custom?` (farba: ${i.color})`:""}`;}).join("\n")}
function cartTotal(){return cart.reduce((sum,i)=>{const p=productFor(i);return sum+p.price*i.qty},0)}
const productImages={1:"/froxyyy-3D-shop/assets/products/product-1.svg?v=20261005",2:"/froxyyy-3D-shop/assets/products/product-2.svg?v=20261005",3:"/froxyyy-3D-shop/assets/products/product-3.svg?v=20261005",5:"/froxyyy-3D-shop/assets/products/product-4.svg?v=20261005",6:"/froxyyy-3D-shop/assets/products/product-6.svg?v=20261005",7:"/froxyyy-3D-shop/assets/products/product-7.svg?v=20261005",8:"/froxyyy-3D-shop/assets/products/product-8.svg?v=20261005",9:"/froxyyy-3D-shop/assets/products/product-9.svg?v=20261005"};
function renderProducts(){const el=document.querySelector("#products");el.innerHTML=products.filter(p=>active==="Všetko"||p.cat===active).map(p=>`<article class="product" data-product="${p.id}"><div class="visual"><img src="${productImages[p.id]}" alt="${p.name}" loading="lazy" decoding="async"></div><div class="info"><span class="tag">${p.cat.toUpperCase()}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span><button class="buy" data-add="${p.id}">Pridať do košíka</button></div></article>`).join("")}
function add(id){const x=cart.find(i=>i.id===id&&!i.custom);if(x)x.qty++;else cart.push({id,qty:1});save()}
function renderCart(){const box=document.querySelector("#cartItems");let total=0,count=0;box.innerHTML=cart.map((i,index)=>{const p=productFor(i);total+=p.price*i.qty;count+=i.qty;return `<div class="cart-row"><div><b>${p.name}</b><small>${i.custom?i.color:"3D tlač na objednávku"}</small><div class="qty"><button data-minus="${index}">−</button><span>${i.qty}</span><button data-plus="${index}">+</button></div></div><strong>${money(p.price*i.qty)}</strong></div>`}).join("")||"<p style='color:#777'>Košík je zatiaľ prázdny.</p>";document.querySelector("#total").textContent=money(total);document.querySelector("#cartCount").textContent=count}
document.querySelector("#filters").onclick=e=>{if(e.target.matches("button")){document.querySelectorAll("#filters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");active=e.target.dataset.cat;renderProducts()}};
const productDialog=document.querySelector("#productDialog");
let detailProduct=null;
function openProduct(id){detailProduct=products.find(p=>p.id===id);if(!detailProduct)return;document.querySelector("#detailImage").src=productImages[id];document.querySelector("#detailImage").alt=detailProduct.name;document.querySelector("#detailCat").textContent=detailProduct.cat.toUpperCase();document.querySelector("#detailName").textContent=detailProduct.name;document.querySelector("#detailDescription").textContent=detailProduct.desc;document.querySelector("#detailPrice").textContent=money(detailProduct.price);productDialog.showModal()}
document.querySelector("#products").onclick=e=>{const addId=e.target.dataset.add;if(addId){e.stopPropagation();add(+addId);return}const card=e.target.closest(".product");if(card)openProduct(+card.dataset.product)};
document.querySelector("#detailAdd").onclick=()=>{if(detailProduct){add(detailProduct.id);productDialog.close();drawer.classList.add("open");overlay.classList.add("show")}};
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