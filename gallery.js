const galleryItems=[
  {title:'Memory 01',description:'Your photo and the story behind it will go here.',src:''},
  {title:'Memory 02',description:'Another photo and a personal caption.',src:''},
  {title:'Memory 03',description:'A favorite moment.',src:''},
  {title:'Memory 04',description:'A funny memory.',src:''},
  {title:'Memory 05',description:'A chat/photo combination.',src:''},
  {title:'Memory 06',description:'One more memory we will add.',src:''}
];
const gallery=$('#gallery');
galleryItems.forEach((item,i)=>{
  const el=document.createElement('div');el.className='gallery-item';
  el.innerHTML=item.src?`<img src="${item.src}" alt="${item.title}">`:`<div class="gallery-placeholder">📷<br>${item.title}</div>`;
  el.addEventListener('click',()=>{
    $('#modalContent').innerHTML=item.src?`<img src="${item.src}" alt="${item.title}"><p>${item.description}</p>`:`<div class="glass" style="padding:60px"><div style="font-size:4rem">📷</div><h3 style="margin-top:15px">${item.title}</h3><p>${item.description}</p></div>`;
    $('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false');
  });
  gallery.appendChild(el);
});
