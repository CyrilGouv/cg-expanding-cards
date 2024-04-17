document.addEventListener("DOMContentLoaded", () => {
    cgExpandingCardsInit()
    
    const images = document.querySelectorAll(".wp-block-cyrilgouv-expanding-cards .wp-block-image")
    images.forEach(img => {
        img.addEventListener("click", () => {
            cgExpandingCardsRemoveActiveClasses(images)
            img.classList.add("isActive")
        })
    })
})

const cgExpandingCardsInit = () => {
    const firstImg = document.querySelector(".wp-block-cyrilgouv-expanding-cards .wp-block-image")
    firstImg.classList.add('isActive')
}

const cgExpandingCardsRemoveActiveClasses = (images) => {
    images.forEach(img => img.classList.remove('isActive'))
}