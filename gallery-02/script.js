const galleryItems = [
    {id:1,src:"./public/1.jpg",author:"Author 1",title:"Title 1",description:"Description 1",tag:["tag1","tag2"]},
    {id:2,src:"./public/2.jpg",author:"Author 1",title:"Title 2",description:"Description 1",tag:["tag1","tag3"]},
    {id:3,src:"./public/3.jpg",author:"Author 1",title:"Title 3",description:"Description 1",tag:["tag1","tag4"]},
    {id:4,src:"./public/4.jpg",author:"Author 2",title:"Title 4",description:"Description 1",tag:["tag1","tag4"]},
    {id:5,src:"./public/5.jpg",author:"Author 2",title:"Title 5",description:"Description 1",tag:["tag2","tag3"]},
    {id:6,src:"./public/6.jpg",author:"Author 3",title:"Title 6",description:"Description 1",tag:["tag1","tag3"]},
    {id:7,src:"./public/7.jpg",author:"Author 3",title:"Title 7",description:"Description 1",tag:["tag2","tag4"]},
    {id:8,src:"./public/8.jpg",author:"Author 3",title:"Title 8",description:"Description 1",tag:["tag3","tag4"]},
    {id:9,src:"./public/9.jpg",author:"Author 4",title:"Title 9",description:"Description 1",tag:["tag1","tag2"]},
    {id:10,src:"./public/10.jpg",author:"Author 10",title:"Title 10",description:"Description 1",tag:["tag2","tag3"]},
    {id:11,src:"./public/11.jpg",author:"Author 11",title:"Title 11",description:"Description 1",tag:["tag1","tag4"]},
    {id:12,src:"./public/12.png",author:"Author 12",title:"Title 12",description:"Description 1",tag:["tag1","tag2"]},
    {id:13,src:"./public/13.jpg",author:"Author 12",title:"Title 13",description:"Description 1",tag:["tag3","tag6"]},
    {id:14,src:"./public/14.png",author:"Author 13",title:"Title 14",description:"Description 1",tag:["tag5","tag6"]},
    {id:15,src:"./public/15.jpg",author:"Author 13",title:"Title 15",description:"Description 1",tag:["tag7","tag8"]},
    {id:16,src:"./public/16.png",author:"Author 13",title:"Title 16",description:"Description 1",tag:["tag9","tag10"]},
    {id:17,src:"./public/17.jpg",author:"Author 12",title:"Title 17",description:"Description 1",tag:["tag3","tag6"]},
    {id:18,src:"./public/18.png",author:"Author 14",title:"Title 18",description:"Description 1",tag:["tag5","tag6"]},
    {id:19,src:"./public/19.jpg",author:"Author 16",title:"Title 19",description:"Description 1",tag:["tag7","tag8"]},
    {id:20,src:"./public/20.png",author:"Author 20",title:"Title 20",description:"Description 1",tag:["tag9","tag10"]},

]

let columns = [];
let elementColumn = [];

const galleryContainer = document.querySelector(".gallery-images");

const searchInput = document.querySelector(".input-search");




/* Filter logica */

function searchItems() {
  const value = searchInput.value.trim().toLowerCase(); // To normalize

  //clear before
  createColumns(getColumnsCount());

  const filtered = elementColumn.filter(item => {
    const title = item.dataset.title.toLowerCase();
    const author = item.dataset.author.toLowerCase();
    const tags = item.dataset.tag.toLowerCase();

    return (
      value === "" ||
      title.includes(value) ||
      author.includes(value) ||
      tags.includes(value)
    );
  });

  // Only filtered
  filtered.forEach(el => placeElement(el));

  /* First version, but the gallery don´t update itself 
  const items = document.querySelectorAll(".item-wrap");

  items.forEach(item => {
    const title = item.dataset.title.toLowerCase();
    const author = item.dataset.author.toLowerCase();
    const tags = item.dataset.tag.toLowerCase();

    if (value === "" || title.includes(value) || author.includes(value) || tags.includes(value)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }); */
}

let currentIndex=0;

const modal = document.querySelector(".modal")
const modalImg = modal.querySelector(".modal-img")

const modalTitle = modal.querySelector(".title-modal")
const modalAuthor = modal.querySelector(".author-modal")
const modalTags = modal.querySelector(".tags-modal")
const modalDesc = modal.querySelector(".desc-modal")
const modalCloseBtn = modal.querySelector(".btn-close")

galleryContainer.addEventListener("click", (e) => {
  const item = e.target.closest(".item-wrap")
  if(!item) return;

  const image = item.querySelector(".item-wrap-img");
  modalTitle.textContent = item.dataset.title;
  modalAuthor.textContent = item.dataset.author;
  modalTags.textContent = item.dataset.tag;
  modalDesc.textContent = item.dataset.desc;

  if (image) modalImg.src = image.src;
  console.log(item);

  modal.classList.add("active");

});


modalCloseBtn.addEventListener("click",()=>{
  modal.classList.remove("active")
})
/* ----Functions------------ */

function getColumnsCount() {
    const width = window.innerWidth;
    if (width > 1200) return 6;
    if (width > 900) return 5;
    if (width > 800) return 4;
    if (width > 500) return 2;
    return 2;
    
    
    
   
}



function getAspectRatio(src) {
    const image = new Image();
    image.src = src;
  return image.naturalWidth / image.naturalHeight;
}


function createColumns(n) {
    galleryContainer.innerHTML = "";
    columns = [];
    const colN = getColumnsCount();
    
    for (let i = 0; i < n; i++) {
        const col = document.createElement('div');
        col.className = "column";
        col.style.width = `calc((100% - 65px)/${colN})`;
        galleryContainer.appendChild(col);
        columns.push(col);
       
    }

 
}



function createItems(items){
    elementColumn = items.map(i =>{
        const wrap = document.createElement("div");
        wrap.classList.add("item-wrap");
        
        wrap.dataset.id = i.id;
        wrap.dataset.author = i.author;
        wrap.dataset.title = i.title;
        wrap.dataset.desc = i.description;
        wrap.dataset.tag = i.tag.join(",");
        
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.innerHTML = `
        <p class="title">${i.title}</p>
        <p class="author">${i.author}</p>
        `;

        const imageWrap = new Image();
        imageWrap.className = "item-wrap-img";
        imageWrap.src = i.src;
        imageWrap.alt = i.title;
        
        wrap.appendChild(imageWrap);
        wrap.appendChild(overlay);
        
        
        imageWrap.addEventListener("load", ()=>{
            if (imageWrap.naturalWidth && imageWrap.naturalHeight) {
            wrap.style.aspectRatio = `${imageWrap.naturalWidth}/${imageWrap.naturalHeight}`;
          }

          placeElement(wrap);
        })


/*         <div class="modal">
                <img src="" alt="modal img " class="modal-img">
                <div class="content-modal">
                    <h2>Title</h2>
                    <p class="author">Author:</p>
                    <p class="tags">Tags:</p>
                    <p class="description">Description:</p>
                    <button class="btn-close">Close</button>
                </div>
             </div> */

        

         return wrap;
    });

    
}

function placeAll() {
      // vaciamos columnas y las reconstruimos para evitar duplicados
      // (appendChild moverá el nodo donde esté)
      elementColumn.forEach(el => {
        // recomendamos limpiar transform/style temporales si aplica
      });

      // Append en orden: esto coloca cada elemento en la columna más corta
      elementColumn.forEach(el => placeElement(el));
    }

function placeElement(element){
    if (!columns.length) createColumns(getColumnCount());
    let shortest = columns[0];
    for(let c of columns){
        if(c.offsetHeight < shortest.offsetHeight) shortest = c;
    }
    /*  let shortest = columns.reduce((a, b) => 
    a.offsetHeight < b.offsetHeight ? a : b
    );*/
    shortest.appendChild(element); 
}

function debounce(fn, wait = 150) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    }

function init(){

   
    createColumns(getColumnsCount());
    
    createItems(galleryItems);
    
    

    window.addEventListener('resize', debounce(() => {
        const cols = getColumnsCount();
        createColumns(cols);
        placeAll();
      }, 200));

    
}


/* -------------------------- */
init();