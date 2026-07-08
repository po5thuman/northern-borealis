document.addEventListener('DOMContentLoaded',function(){
  var menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',function(){navLinks.classList.toggle('open');menuBtn.classList.toggle('open');});
    navLinks.addEventListener('click',function(e){if(e.target.tagName==='A'){navLinks.classList.remove('open');menuBtn.classList.remove('open');}});
  }
  var header=document.getElementById('header');
  if(header){window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>40);});}
});
