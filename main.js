const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

const beginBtn=$('#beginBtn');
const journeyLoader=$('#journeyLoader');

if(beginBtn&&journeyLoader){
  beginBtn.addEventListener('click',()=>{
    journeyLoader.classList.add('active');

    setTimeout(()=>{
      journeyLoader.classList.remove('active');
      $('#birthday')?.scrollIntoView({behavior:'smooth'});
    },1400);
  });
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.01,rootMargin:'0px 0px -5% 0px'});

$$('.reveal').forEach(el=>observer.observe(el));

requestAnimationFrame(()=>{
  $$('.reveal').forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight&&rect.bottom>0){
      el.classList.add('visible');
    }
  });
});

const stars=$('#stars');

if(stars){
  for(let i=0;i<100;i++){
    const s=document.createElement('i');
    s.className='star';
    s.style.left=Math.random()*100+'%';
    s.style.top=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*3+'s';
    stars.appendChild(s);
  }
}

const hearts=$('#hearts');

if(hearts){
  setInterval(()=>{
    if(Math.random()>.45){
      const h=document.createElement('span');
      h.className='heart';
      h.textContent='♥';
      h.style.left=Math.random()*100+'%';
      h.style.setProperty('--drift',(Math.random()*120-60)+'px');
      h.style.animationDuration=(5+Math.random()*4)+'s';
      hearts.appendChild(h);
      setTimeout(()=>h.remove(),9000);
    }
  },1200);
}

const modal=$('#modal');
const modalClose=$('#modalClose');

function closeModal(){
  if(!modal)return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}

if(modalClose){
  modalClose.addEventListener('click',closeModal);
}

if(modal){
  modal.addEventListener('click',e=>{
    if(e.target===modal)closeModal();
  });
}

const secretInput=$('#secretInput');
const secretBtn=$('#secretBtn');
const secretError=$('#secretError');

function unlockSecret(){
  if(!secretInput)return;

  const password=secretInput.value.trim().toLowerCase();

  if(password==='sreelekha'){
    $('#secretLock')?.classList.add('hidden');
    $('#secretUnlocked')?.classList.add('active');

    if(secretError)secretError.textContent='';
  }else{
    if(secretError)secretError.textContent="Hmm... that isn't it. Try again. ♡";
    secretInput.value='';
  }
}

if(secretBtn){
  secretBtn.addEventListener('click',unlockSecret);
}

if(secretInput){
  secretInput.addEventListener('keydown',event=>{
    if(event.key==='Enter')unlockSecret();
  });
}

const secretContinue=$('#secretContinue');

if(secretContinue){
  secretContinue.addEventListener('click',()=>{
    $('#letter')?.scrollIntoView({
      behavior:'smooth'
    });
  });
}

const finalRevealBtn=$('#finalRevealBtn');
const finalRevealBox=$('#finalReveal');
const finalReplayBtn=$('#finalReplayBtn');

if(finalRevealBtn&&finalRevealBox){
  finalRevealBtn.addEventListener('click',()=>{
    finalRevealBtn.style.display='none';
    finalRevealBox.classList.add('active');

    if(typeof launchConfetti==='function'){
      launchConfetti();
    }

    if(typeof createFinalHearts==='function'){
      createFinalHearts();
    }
  });
}

if(finalReplayBtn){
  finalReplayBtn.addEventListener('click',()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  });
}

function createFinalHearts(){
  for(let i=0;i<25;i++){
    setTimeout(()=>{
      const heart=document.createElement('div');

      heart.textContent=['♡','♥','✦','✧'][Math.floor(Math.random()*4)];

      heart.style.position='fixed';
      heart.style.left=`${Math.random()*100}%`;
      heart.style.bottom='-20px';
      heart.style.zIndex='300';
      heart.style.pointerEvents='none';
      heart.style.color='rgba(242,168,207,.75)';
      heart.style.fontSize=`${12+Math.random()*18}px`;
      heart.style.transition='transform 3s ease,opacity 3s ease';

      document.body.appendChild(heart);

      requestAnimationFrame(()=>{
        heart.style.transform=`translateY(-${window.innerHeight+100}px) rotate(${Math.random()*180-90}deg)`;
        heart.style.opacity='0';
      });

      setTimeout(()=>heart.remove(),3200);
    },i*90);
  }
}

function launchConfetti(){
  for(let i=0;i<45;i++){
    const c=document.createElement('span');
    c.className='heart';
    c.textContent=['♥','✦','✧','❤'][i%4];
    c.style.left=Math.random()*100+'%';
    c.style.bottom='20%';
    c.style.setProperty('--drift',(Math.random()*300-150)+'px');
    c.style.animationDuration=(3+Math.random()*3)+'s';

    document.body.appendChild(c);

    setTimeout(()=>c.remove(),6500);
  }
}

const birthdayText="This is more than just another date on the calendar. Today is a reminder that the world became a little brighter because you are in it.";

const birthdayTarget=$('#birthdayTypewriter');
let birthdayIndex=0;

function typeBirthdayMessage(){
  if(!birthdayTarget)return;

  if(birthdayIndex<birthdayText.length){
    birthdayTarget.textContent+=birthdayText.charAt(birthdayIndex);
    birthdayIndex++;
    setTimeout(typeBirthdayMessage,35);
  }
}

const birthdaySection=$('#birthday');

if(birthdaySection&&birthdayTarget){
  const birthdayObserver=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      if(birthdayIndex===0){
        setTimeout(typeBirthdayMessage,500);
      }

      birthdayObserver.disconnect();
    }
  },{threshold:.15});

  birthdayObserver.observe(birthdaySection);
}

const astroMessages=[
  "There is something about you that cannot really be explained by stars. ✦",
  "Maybe the universe knew exactly what it was doing when it brought you into my life. ❤️",
  "Some people are written in the stars. Some people become the stars. ✨",
  "Your best qualities aren't something astrology can fully describe."
];

let astroIndex=0;

const astroBtn=$('#astroBtn');

if(astroBtn){
  astroBtn.addEventListener('click',()=>{
    $('#astroMessage').textContent=astroMessages[astroIndex%astroMessages.length];
    astroIndex++;
  });
}

const specialMessages=[
  "I don't think you realize how naturally you make people feel comfortable around you. ♡",
  "Your smile has a habit of making everything feel a little better. ✦",
  "One of my favorite things about you is how you can turn the smallest moment into a memory.",
  "You have this very rare way of being completely yourself, and that's what makes you unforgettable.",
  "Even your random little habits have somehow become things I wouldn't want to change. ♡"
];

let specialIndex=0;

const specialBtn=$('#specialBtn');

if(specialBtn){
  specialBtn.addEventListener('click',()=>{
    $('#specialResponse').textContent=specialMessages[specialIndex%specialMessages.length];
    specialIndex++;
  });
}

const memoryMessages=[
  "Some pictures remind me of a place. Yours remind me of a feeling. ♡",
  "I could look at this moment a hundred times and still smile.",
  "This is the kind of memory I hope we talk about years from now.",
  "One picture, a thousand little memories behind it. ✦"
];

let memoryMessageIndex=0;

const memoryRevealBtn=$('#memoryRevealBtn');

if(memoryRevealBtn){
  memoryRevealBtn.addEventListener('click',()=>{
    $('#memoryFeatureMessage').textContent=memoryMessages[memoryMessageIndex%memoryMessages.length];
    memoryMessageIndex++;
  });
}

const littleThings=[
  "The way you can make me laugh without even trying. ♡",
  "The way one small message from you can instantly make my day better.",
  "How your name showing up on my phone somehow never gets old.",
  "The little moments when you don't realize how cute you are. ✦",
  "The way you turn completely normal days into memories.",
  "How comfortable silence can feel when it's with you.",
  "The fact that somehow I can never stay annoyed with you for too long. 😂"
];

let littleIndex=0;

const littleRevealBtn=$('#littleRevealBtn');

if(littleRevealBtn){
  littleRevealBtn.addEventListener('click',()=>{
    $('#littleRevealText').textContent=littleThings[littleIndex%littleThings.length];
    littleIndex++;
  });
}

const surpriseMessages=[
  "If I could put one thing inside this box, it would be a reminder that you are loved more than you realize. ♡",
  "Plot twist: you are probably the surprise. 😂",
  "One tiny reminder: never underestimate how much your presence means to the people who love having you around.",
  "Your birthday deserves more than one surprise, so technically we're not done yet. ✦"
];

let surprisesOpened=0;

$$('.surprise-box').forEach(box=>{
  box.addEventListener('click',()=>{
    const index=Number(box.dataset.surprise);

    if(box.classList.contains('opened'))return;

    box.classList.add('opened');
    surprisesOpened++;

    const surpriseCount=$('#surpriseCount');

    if(surpriseCount){
      surpriseCount.textContent=surprisesOpened;
    }

    if(typeof openSurpriseModal==='function'){
      openSurpriseModal(surpriseMessages[index]);
    }else if(modal){
      const modalContent=$('#modalContent');

      if(modalContent){
        modalContent.innerHTML=`<div class="glass" style="padding:45px"><div style="font-size:3rem">💌</div><p>${surpriseMessages[index]}</p></div>`;
      }

      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    }
  });
});

const letterLines=[
  "If I had to choose one thing to wish for you, it would be a life that gives you as much happiness as you give to the people around you. ♡",
  "And if life ever gets difficult, I hope you remember that you never have to face everything alone.",
  "No matter how many birthdays pass, I hope there will always be another memory waiting for us.",
  "Happy Birthday, Sree Lekha. I'm genuinely grateful that you exist. ✦"
];

let letterIndex=0;

const letterRevealBtn=$('#letterRevealBtn');

if(letterRevealBtn){
  letterRevealBtn.addEventListener('click',()=>{
    $('#letterFinalLine').textContent=letterLines[letterIndex%letterLines.length];
    letterIndex++;
  });
}

function startSurpriseCountdown(url){
  if(document.querySelector(".surprise-countdown"))return;

  const overlay=document.createElement("div");
  overlay.className="surprise-countdown";

  const number=document.createElement("div");
  number.className="countdown-number";
  number.textContent="3";

  const message=document.createElement("div");
  message.className="countdown-message";
  message.textContent="Something special is waiting for you...";

  overlay.appendChild(number);
  overlay.appendChild(message);
  document.body.appendChild(overlay);

  const symbols=["♥","♡","★","✦","✧","✿","✨"];

  function createParticle(){
    const particle=document.createElement("span");
    particle.className="surprise-particle";
    particle.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    particle.style.left=Math.random()*100+"vw";
    particle.style.animationDuration=2+Math.random()*3+"s";
    particle.style.fontSize=12+Math.random()*24+"px";
    particle.style.animationDelay=Math.random()*0.5+"s";
    document.body.appendChild(particle);

    setTimeout(()=>{
      particle.remove();
    },5000);
  }

  function burst(){
    for(let i=0;i<35;i++){
      setTimeout(createParticle,i*35);
    }
  }

  let count=3;

  const timer=setInterval(()=>{
    count--;

    if(count>0){
      number.textContent=count;
      number.classList.remove("countdown-pop");
      void number.offsetWidth;
      number.classList.add("countdown-pop");
    }else{
      clearInterval(timer);

      number.textContent="♥";
      message.textContent="SURPRISE!";

      overlay.classList.add("surprise-final");
      burst();

      setTimeout(()=>{
        window.location.href=url;
      },1800);
    }
  },1000);
}

document.querySelectorAll("[data-surprise-link]").forEach(element=>{
  element.addEventListener("click",function(event){
    event.preventDefault();
    startSurpriseCountdown(this.dataset.surpriseLink);
  });
});