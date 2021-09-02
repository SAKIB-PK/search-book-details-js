// dom selection 
let searchInput = document.getElementById('search-input')
let searchButton = document.getElementById('search-submit')
let searchLength = document.getElementById('searchLength')
let cardBook = document.getElementById('card-book')
let errMsg = document.getElementById('errMsg')


// initial value
let api = 'http://openlibrary.org/search.json?q='

// add eventListner
searchButton.addEventListener('click',() =>{
    let searchValue = searchInput.value
    console.log(api + searchValue);
    searchInput.value = ''
    // search value checking
    if(searchValue === ''){
        errMsg.classList.remove('d-none')
        // also clear cardbook
        cardBook.innerHTML =''
        searchLength.innerHTML =''
    }else{
        errMsg.classList.add('d-none')
        fetchData(api+searchValue)
    }
    
})

// fetchData
let fetchData = (api) =>{
    fetch(api ).then(e=>e.json()).then(res=>{
        console.log(res)
        console.log(res.docs[0].cover_i);
        searchResult(res)
        cardData(res.docs)
    })
}

// search result show ui
let searchResult = (e)=>{
    let lengthValue = e.numFound
    searchLength.innerText = `About ${lengthValue} results`
    console.log(lengthValue);

}
//card Data 
let cardData = (res)=>{
    // clear cardBook 
    cardBook.innerHTML =''
    res.forEach(book => {
        
        // initial value 
        let {cover_i,title} =book
        let apiImage = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
        let div = document.createElement('div')
        // ui to create card ui
        div.innerHTML =`
        <div class="card" style="width: 18rem;">
            <img src="${apiImage}" class="card-img-top" alt="...">
            <div class="card-body" id='authorData'>
                <h5 class="card-title">${title}</h5>
                <div class="card-text">
                    <p><strong>Publisher:</strong> ${book?.publisher?.join(' - ')}</p>
                    <p><strong>Publish Date:</strong> ${book?.publish_date?.join(' - ')}</p>
                    <p><strong>Author Name:</strong> ${book?.author_name?.join(' - ')}</p>
                </div>
                
            </div>
        </div>
        `
        // add specific class
        div.className += ' col-md-6 col-lg-4 col-12'
        //append all the card inside card-book row
        cardBook.append(div)
    });

}


