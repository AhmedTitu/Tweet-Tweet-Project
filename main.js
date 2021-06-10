//Selecting
const tweetInput = document.querySelector('.tweetInput')
const tweetBtn = document.querySelector('.tweetBtn')
const searchInput = document.querySelector('.searchInput')
const tweetCollectionUl = document.querySelector('.tweetCollection')
const msg = document.querySelector('.msg')
const editBtn = document.querySelector('.editBtn')
const deleteBtn = document.querySelector('.deleteBtn')


//Store / state
let tweetData = []

function loadEventListener(){
    tweetBtn.addEventListener('click' , tweetBtnFunc)
    tweetCollectionUl.addEventListener('click' , tweetCollectionUlFunc)
    searchInput.addEventListener('keyup' , searchInputFunc)
}

function showMsg(message){
    msg.innerHTML = message
}

function getData(tweetList){
    if(tweetData.length > 0){
        msg.innerHTML = ''
        tweetList.forEach(({id , tweetText}) => {
        let li = document.createElement('li')
            li.className = 'list-group-item tweetCollectionItem mb-3'
            li.id = `tweetID-${id}`
            li.innerHTML = `    <span class="tweetText"><p> ${tweetText} </p></span>
                                <i class="fas fa-trash deleteBtn float-end ms-2"></i>
                                <i class="far fa-edit editBtn float-end ms-2"></i>
                                <i class="far fa-clock float-end"> Tweet Time </i>     `
            
            tweetCollectionUl.appendChild(li)
        })
    } else {
        showMsg('No tweet to show')
    }
}
getData(tweetData)

function tweetBtnFunc() {
    const tweetTextValue = tweetInput.value
    let id

    if(tweetData.length === 0){
        id = 0
    }else {
        id = tweetData[tweetData.length - 1].id + 1
    }

    if (tweetTextValue === ''){
        alert('Please, write your tweet.')
    } else if(tweetTextValue.length > 250){
        alert('Please, write your tweet within 250 letter.')
    } else{
        tweetData.push({
            id ,
            tweetText : tweetTextValue
        })
        tweetCollectionUl.innerHTML = ''
        getData(tweetData)
        tweetInput.value = ''
    }
}

function tweetCollectionUlFunc(e){
    // remove from UI
    if (e.target.classList.contains('deleteBtn')){
        const target = e.target.parentElement
        e.target.parentElement.parentElement.removeChild(target)

    // remove from
    const id = parseInt(target.id.split('-')[1])
    const result = tweetData.filter((tweet)=>{
       return tweet.id !== id
    })
    tweetData = result
    }
}

function searchInputFunc(e){
    const searchText = e.target.value.toLowerCase()

    document.querySelectorAll('.tweetCollection .tweetCollectionItem').forEach(tweet => {
        const tweetName = tweet.firstElementChild.textContent.toLowerCase()

        if (tweetName.indexOf(searchText) === -1){
            showMsg('No tweet match with your search.')
            tweet.style.display = 'none'
        } else {
            msg.innerHTML = ''
            tweet.style.display = 'block'
        }
    })
}

loadEventListener()