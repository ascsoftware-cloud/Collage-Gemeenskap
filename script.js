(function(){
  var btn=document.querySelector('.menu-btn');
  var nav=document.getElementById('mainnav');
  var mobile=window.matchMedia('(max-width: 1080px)');

  if(btn&&nav){
    var label=btn.querySelector('.lbl');
    function syncInert(){
      nav.inert=mobile.matches&&btn.getAttribute('aria-expanded')!=='true';
    }
    function set(open){
      btn.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('is-open',open);
      if(label)label.textContent=open?'Maak toe':'Kieslys';
      btn.setAttribute('aria-label',open?'Maak kieslys toe':'Maak kieslys oop');
      document.body.classList.toggle('nav-open',open&&mobile.matches);
      syncInert();
    }
    btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
    nav.addEventListener('click',function(e){
      if(e.target.closest('a')&&mobile.matches)set(false);
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus();}
    });
    mobile.addEventListener('change',function(){if(!mobile.matches)set(false);else syncInert();});
    syncInert();
  }

  var calendarToggle=document.querySelector('.calendar-toggle');
  var calendarRail=document.getElementById('week-rail');
  if(calendarToggle&&calendarRail){
    calendarToggle.addEventListener('click',function(){
      var expanded=document.body.classList.toggle('calendar-expanded');
      calendarToggle.setAttribute('aria-expanded',String(expanded));
      calendarToggle.textContent=expanded?'Wys net vandag':'Wys die week';
    });
  }

  try{
    var now=new Date();
    var idx=now.getDay();
    var sunday=new Date(now.getFullYear(),now.getMonth(),now.getDate()-idx);
    document.querySelectorAll('.day').forEach(function(col){
      var i=Number(col.getAttribute('data-day'));
      if(Number.isNaN(i))return;
      var d=new Date(sunday.getFullYear(),sunday.getMonth(),sunday.getDate()+i);
      var num=col.querySelector('.d-num');
      if(num)num.textContent=String(d.getDate());
      if(i===idx){
        col.classList.add('is-today');
        col.setAttribute('aria-current','date');
      }
    });
    document.body.classList.add('calendar-ready');
  }catch(e){}

  var form=document.getElementById('enquiry');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var data=new FormData(form);
      var name=String(data.get('naam')||'').trim();
      var email=String(data.get('epos')||'').trim();
      var phone=String(data.get('foon')||'').trim();
      var topic=String(data.get('onderwerp')||'').trim();
      var msg=String(data.get('boodskap')||'').trim();
      var status=document.getElementById('form-status');
      form.querySelectorAll('.field').forEach(function(field){
        var input=field.querySelector('input,select,textarea');
        var bad=input&&input.hasAttribute('required')&&!String(input.value||'').trim();
        if(input&&input.type==='email'&&input.value&&!input.checkValidity())bad=true;
        if(input&&input.name==='boodskap'&&msg.length<8)bad=true;
        field.classList.toggle('is-invalid',!!bad);
        if(input)input.setAttribute('aria-invalid',bad?'true':'false');
      });
      if(!name||!email||!topic||msg.length<8||!form.checkValidity()){
        if(status)status.textContent='Vul asseblief jou naam, ’n geldige e-pos, ’n onderwerp en ’n kort boodskap in.';
        var first=form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
        if(first)first.focus();
        return;
      }
      var body='Naam: '+name+'\nE-pos: '+email+(phone?'\nSelfoon: '+phone:'')+'\n\n'+msg;
      if(status)status.textContent='Jou e-posprogram behoort nou oop te maak. Indien nie, skryf direk aan info@collage.org.za.';
      window.location.href='mailto:info@collage.org.za?subject='+encodeURIComponent(topic+' — '+name)+'&body='+encodeURIComponent(body);
    });
  }

  var loadCal=document.getElementById('load-calendar');
  if(loadCal){
    loadCal.addEventListener('click',function(){
      var start=document.getElementById('event-start');
      if(start)start.remove();
      var s=document.createElement('script');
      s.async=true;
      s.src='https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js';
      s.onload=function(){
        if(window.subsplashEmbed){
          subsplashEmbed('+y9cz/lb/ca/+8w2mgvg?embed&branding','https://subsplash.com/','subsplash-embed-8w2mgvg');
        }
      };
      document.body.appendChild(s);
    });
  }

  var catalog=document.getElementById('catalog');
  var lines=document.getElementById('cart-lines');
  var totalEl=document.getElementById('cart-total');
  var countEl=document.querySelector('.cart-count');
  if(catalog&&lines&&totalEl){
    var cart={};
    function money(n){return 'R'+n.toLocaleString('en-ZA');}
    function render(){
      var items=Object.keys(cart).map(function(k){return cart[k];});
      var count=items.reduce(function(s,i){return s+i.qty;},0);
      var total=items.reduce(function(s,i){return s+i.qty*i.price;},0);
      if(countEl)countEl.textContent=String(count);
      totalEl.textContent=money(total);
      if(!items.length){lines.innerHTML='<p class="cart-empty">Jou mandjie is nog leeg.</p>';return;}
      lines.innerHTML=items.map(function(i){
        return '<div class="cart-line"><span>'+i.qty+' × '+i.name+'</span><button type="button" data-remove="'+i.name+'">Verwyder</button></div>';
      }).join('');
    }
    catalog.addEventListener('click',function(e){
      var button=e.target.closest('.add-to-cart');
      if(!button)return;
      var card=button.closest('.product');
      var name=card.getAttribute('data-name');
      var price=Number(card.getAttribute('data-price'));
      if(!cart[name])cart[name]={name:name,price:price,qty:0};
      cart[name].qty+=1;
      render();
    });
    lines.addEventListener('click',function(e){
      var button=e.target.closest('[data-remove]');
      if(!button)return;
      delete cart[button.getAttribute('data-remove')];
      render();
    });
    document.querySelectorAll('.filters button').forEach(function(button){
      button.addEventListener('click',function(){
        document.querySelectorAll('.filters button').forEach(function(b){b.classList.remove('is-on');});
        button.classList.add('is-on');
        var cat=button.getAttribute('data-filter');
        catalog.querySelectorAll('.product').forEach(function(card){
          card.hidden=cat!=='alles'&&card.getAttribute('data-cat')!==cat;
        });
      });
    });
  }
})();
