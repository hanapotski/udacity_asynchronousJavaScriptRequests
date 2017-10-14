(function () {
    const form = document.querySelector('#search-form');
    let searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    let searchedForText = 'baby tiger';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        
        
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 53b939cf07c19e95a3197f75bd4a82b67e01d283cb6a48379036d28f3904d756');
        unsplashRequest.send();

        function addImage() {
            let htmlContent = ';'
            const data = JSON.parse(this.responseText);
            if (data && data.results && data.results[0]){
              const firstImage = data.results[0];
            htmlContent = `<figure>
              <img src="${firstImage.urls.regular}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
          } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
          }
          
          
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
        
        
        function addArticles() {
          let htmlContent = '';
          const data = JSON.parse(this.responseText);
          if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
                </li>`
            ).join('') + '</ul>';
          } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
          }
          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
        
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=45bdb4ba4a21426983cf67c1e715bfaa`);
        articleRequest.send();    
    });

    
})();
