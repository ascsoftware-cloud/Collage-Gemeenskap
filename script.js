(function(){
  var btn=document.querySelector('.menu-btn');
  var nav=document.getElementById('mainnav');
  var head=document.querySelector('.masthead');
  var mobile=window.matchMedia('(max-width: 1040px)');

  if(btn&&nav){
    var openLabel=btn.getAttribute('data-open')||btn.textContent;
    var closeLabel=btn.getAttribute('data-close')||'Maak toe';
    function syncInert(){
      nav.inert=mobile.matches&&btn.getAttribute('aria-expanded')!=='true';
    }
    function set(open){
      btn.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('is-open',open);
      btn.textContent=open?closeLabel:openLabel;
      document.body.classList.toggle('nav-open',open&&mobile.matches);
      syncInert();
    }
    btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
    nav.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus();}
    });
    mobile.addEventListener('change',function(){if(!mobile.matches)set(false);else syncInert();});
    syncInert();
  }

  if(head){
    function onScroll(){head.classList.toggle('is-scrolled',window.scrollY>8);}
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
  }

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes=document.querySelectorAll('.reveal');
  if(!reduce&&'IntersectionObserver' in window&&nodes.length){
    var vh=window.innerHeight||800;
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    nodes.forEach(function(el){
      if(el.getBoundingClientRect().top<vh*0.92){
        el.classList.add('is-in');
      }else{
        el.classList.add('wait');
        io.observe(el);
      }
    });
  }else{
    nodes.forEach(function(el){el.classList.add('is-in');});
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
      if(num)num.textContent=String(d.getDate()).padStart(2,'0');
      col.title=new Intl.DateTimeFormat('af-ZA',{weekday:'long',day:'numeric',month:'long'}).format(d);
      if(i===idx){
        col.classList.add('is-today');
        col.setAttribute('aria-current','date');
      }
    });
    var line=document.getElementById('today-line');
    if(line){
      line.textContent='Vandag is '+new Intl.DateTimeFormat('af-ZA',{weekday:'long',day:'numeric',month:'long'}).format(now);
    }
    var next=document.querySelector('.next b');
    if(next){
      var mins=now.getHours()*60+now.getMinutes();
      var label='Sondag 09:00';
      if(idx===0){
        if(mins<9*60)label='vandag 09:00';
        else if(mins<11*60)label='vandag 11:00';
        else if(mins<17*60)label='vandag 17:00';
        else label='volgende Sondag 09:00';
      }
      next.textContent=label;
    }
  }catch(e){}

  var form=document.getElementById('enquiry');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var data=new FormData(form);
      var name=String(data.get('naam')||'').trim();
      var email=String(data.get('epos')||'').trim();
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
      var body='Naam: '+name+'\nE-pos: '+email+'\n\n'+msg;
      if(status)status.textContent='Jou e-posprogram behoort nou oop te maak. Indien nie, skryf direk aan info@collage.org.za.';
      window.location.href='mailto:info@collage.org.za?subject='+encodeURIComponent('Navraag: '+topic)+'&body='+encodeURIComponent(body);
    });
  }
})();
