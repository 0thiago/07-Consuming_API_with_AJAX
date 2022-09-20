const Main = {

  albuns: [],

  getAPIData: function () {

    const xhttp = new XMLHttpRequest()
    const self = this


    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        const response = JSON.parse(this.responseText)

        self.albuns = response.filter(element => element.albumId <= 2)

        self.buildPhotosPage() //(2)then we need to build the page before the Main const initiation
        self.init() //(3)after we connect to API, get the data and build the page, now we start the application 

        console.log(self.albuns)
      }
    }

    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', true)

    xhttp.send()
  },

  init: function () {

    this.cacheSelectors()
    this.bindEvents()

  },

  cacheSelectors: function () {

    this.$mainContainer = document.querySelector('#photos__container')
    this.$photos = document.querySelectorAll('#photos__img')
    this.$fullPhoto = document.querySelector('#photo__clicked')
    this.$fullPhotoContainer = document.querySelector('#fullPhoto__container')
    this.$closeButton = document.querySelector('#closeButton')    

  },

  buildPhotosPage: function () {
    const self = this

    self.albuns.forEach((element) => {

      document.querySelector('#photos__container').innerHTML += `
        <img class="photos__img" id="photos__img" src="${element.thumbnailUrl}" data-photoid="${element.id}" alt="">
      `
    })

  },

  bindEvents: function () {

    const self = this

    this.$photos.forEach((photos) => {
      photos.onclick = self.Events.onThumbnail_click
    })

    this.$closeButton.onclick = self.Events.removeFullPhoto_click

  },

  Events: {

    onThumbnail_click: function (photoClicked) {
      const self = Main    
      const photoId = photoClicked.target.dataset['photoid']

      let photoURL = ''

      self.albuns.forEach((element) => {
        if (element.id == photoId) {
          photoURL = element.url
        }
      })      
      
      self.$fullPhotoContainer.innerHTML = `
        <figure class="photo__clicked show" id="photo__clicked">
        <button class="closeButton" id="closeButton">X</button>
        <img src="${photoURL}" alt="oi">
        <figcaption>
          placeholder
        </figcaption>
        </figure>
      `

      self.cacheSelectors()
      self.bindEvents()

    },

    removeFullPhoto_click: function () {
      const self = Main

      self.$fullPhotoContainer.innerHTML = ''
    }
  }
}

Main.getAPIData() //(1)we first make the connection and get the data from API




