(function(){
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('mainnav');
  if(btn&&nav){
    function set(o){btn.setAttribute('aria-expanded',String(o));nav.classList.toggle('is-open',o);}
    btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
    nav.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus();}
    });
  }
  // Mark today in the homepage week rail and write the date into the status line.
  // Without JS the page still reads correctly, it just has no "vandag" marker.
  try{
    var now=new Date(), idx=now.getDay(); // 0 = Sondag
    var col=document.querySelector('.day[data-day="'+idx+'"]');
    if(col){
      col.classList.add('is-today');
      col.setAttribute('aria-current','date');
    }
    var line=document.getElementById('today-line');
    if(line){
      line.textContent='Vandag is '+new Intl.DateTimeFormat('af-ZA',
        {weekday:'long',day:'numeric',month:'long'}).format(now);
    }
    // Next service: Sunday 09:00, or today's remaining slots if it is Sunday.
    var next=document.querySelector('.next b');
    if(next&&idx===0){ next.textContent='vandag 09:00'; }
  }catch(e){}
})();
