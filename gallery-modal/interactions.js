
/* First create imaginary data */
const galleryItems = [
    {
        id: 1,
        title: "Image 1",
        description: "Description for Image 1",
        imageUrl: "public/1.jpg"
    },
    {
        id: 2,
        title: "Image 2",
        description: "Description for Image 2",
        imageUrl: "public/2.jpg"
    },
    {
        id: 3,
        title: "Image 3",
        description: "Description for Image 3",
        imageUrl: "public/3.jpg"
    },

    {
        id: 4,
        title: "Image 4",
        description: "Description for Image 4",
        imageUrl: "public/4.jpg"
    },

    /* two more  */
    {
        id: 5,
        title: "Image 5",
        description: "Description for Image 5",
        imageUrl: "public/5.jpg"
    },
    {
        id: 6,
        title: "Image 6",
        description: "Description for Image 6",
        imageUrl: "public/6.jpg"
    }
];


/* Logica */

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal-container');
const close = document.querySelector('.close-button');
let currentIndex = 0;
const prev = modal.querySelector('.prev');
const next = modal.querySelector('.next');

galleryItems.forEach((item,index) => {
    const div = document.createElement('div');
    div.classList.add('item');

    /* styles */
    div.style.backgroundImage = `url(${item.imageUrl})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.dataset.id = item.id;

    /* activate modal */

    div.addEventListener('click', () => {
        modal.classList.add('active');
        const modalImage = modal.querySelector('.modal-image');
        const modalContent = modal.querySelector('.modal-content');

        modalImage.src = item.imageUrl;
        modalContent.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        `;

        /* logical to update modal content */
        currentIndex = index;
        console.log(currentIndex);


    });


    
    /* close modal */
    close.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    



    gallery.appendChild(div);
});


const updateContent = () => {
    const modalImage = modal.querySelector('.modal-image');
    const modalContent = modal.querySelector('.modal-content');

    modalImage.src = galleryItems[currentIndex].imageUrl;
    modalContent.innerHTML = `
        <h2>${galleryItems[currentIndex].title}</h2>
        <p>${galleryItems[currentIndex].description}</p>
    `;
};

        prev.addEventListener('click', () => {
            
            if (currentIndex == 0) {
                currentIndex = galleryItems.length - 1; // wrap around to last item
            } else {
                currentIndex = currentIndex - 1;
            }

            updateContent();


            /* console.log(currentIndex); */
        }
        );

       next.addEventListener('click', () => {
           if (currentIndex >= galleryItems.length-1) {
               currentIndex = 0; // wrap around to first item
           }else{   
               currentIndex = currentIndex + 1;
           }

           updateContent();
           /* console.log(currentIndex); */
       }
       );
