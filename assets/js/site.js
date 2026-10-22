(function(){
 var b=document.querySelector('.burger'),n=document.querySelector('.nav');
 if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 // auto-size same-origin embeds
 function fit(f){try{var d=f.contentDocument;if(!d||!d.body)return;var h=0;[].forEach.call(d.body.children,function(c){var r=c.getBoundingClientRect();h=Math.max(h,r.bottom+(d.defaultView.scrollY||0))});if(h>0)f.style.height=Math.ceil(h)+'px'}catch(e){}}
 [].forEach.call(document.querySelectorAll('iframe.embed'),function(f){
  var go=function(){fit(f);try{new ResizeObserver(function(){fit(f)}).observe(f.contentDocument.body);[].forEach.call(f.contentDocument.body.children,function(c){new ResizeObserver(function(){fit(f)}).observe(c)})}catch(e){}};
  if(f.contentDocument&&f.contentDocument.readyState=='complete')go();f.addEventListener('load',go)});
 addEventListener('resize',function(){[].forEach.call(document.querySelectorAll('iframe.embed'),fit)});
 // carousels: loop, swipe, arrows, dots
 [].forEach.call(document.querySelectorAll('[data-carousel]'),function(c){
  var t=c.querySelector('.car-track'),vp=c.querySelector('.car-vp'),real=[].slice.call(t.children),N=real.length,i=1,busy=false;
  var f=real[0].cloneNode(true),l=real[N-1].cloneNode(true);f.setAttribute('aria-hidden','true');l.setAttribute('aria-hidden','true');t.appendChild(f);t.insertBefore(l,real[0]);
  var dots=c.querySelector('.car-dots');
  real.forEach(function(_,k){var d=document.createElement('button');d.setAttribute('aria-label','Go to slide '+(k+1));d.onclick=function(){go(k+1)};dots.appendChild(d)});
  function set(anim,dx){t.classList.toggle('drag',!anim);t.style.transform='translateX(calc('+(-i*100)+'% + '+(dx||0)+'px))';[].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k==((i-1+N)%N))})}
  function go(k){if(busy)return;busy=true;i=k;set(true)}
  t.addEventListener('transitionend',function(e){if(e.target!==t)return;busy=false;if(i==0){i=N;set(false)}else if(i==N+1){i=1;set(false)}});
  c.querySelector('.prev').onclick=function(){go(i-1)};c.querySelector('.next').onclick=function(){go(i+1)};
  c.addEventListener('keydown',function(e){if(e.key=='ArrowLeft')go(i-1);if(e.key=='ArrowRight')go(i+1)});
  var x0=null,y0=0,dx=0,lock=null;
  vp.addEventListener('pointerdown',function(e){if(busy)return;x0=e.clientX;y0=e.clientY;dx=0;lock=null});
  vp.addEventListener('pointermove',function(e){if(x0===null)return;var ddx=e.clientX-x0,ddy=e.clientY-y0;if(lock===null&&(Math.abs(ddx)>6||Math.abs(ddy)>6))lock=Math.abs(ddx)>Math.abs(ddy);if(lock){dx=ddx;set(false,dx);try{vp.setPointerCapture(e.pointerId)}catch(_){}}});
  function end(){if(x0===null)return;x0=null;if(lock&&Math.abs(dx)>50){go(dx<0?i+1:i-1)}else set(true);dx=0;lock=null}
  vp.addEventListener('pointerup',end);vp.addEventListener('pointercancel',end);vp.addEventListener('pointerleave',end);
  vp.addEventListener('dragstart',function(e){e.preventDefault()});
  set(false);
  var auto=c.getAttribute('data-autoplay');if(auto){var tm=setInterval(function(){if(!c.matches(':hover'))go(i+1)},+auto)}
 });
 // TODO(form): referral modal is layout-only; wire to a real backend (Formspree/Netlify/Apps Script) before launch
 var m=document.getElementById('refer');
 [].forEach.call(document.querySelectorAll('[data-open-refer]'),function(a){a.addEventListener('click',function(e){e.preventDefault();m.classList.add('open')})});
 if(m){m.addEventListener('click',function(e){if(e.target===m||e.target.classList.contains('x'))m.classList.remove('open')});
  m.querySelector('form').addEventListener('submit',function(e){e.preventDefault();alert('Form not connected yet (TODO).')})}
})();
