const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}
    `);
    const data = await res.json();
    const phone = data.data;
    displayPhones(phone, isShowAll);
    // console.log(phones)
}

// for display phones 
const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    //1. get container div
    const phonesContainer = document.getElementById('phones-container')

    // clear kore dibe age jeta search deya hoiche 
    phonesContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if( phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }else{
      showAllContainer.classList.add('hidden');
    }
    console.log('is show all:', isShowAll)
    // display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone)

        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = ` card card-compact p-5 bg-red-50 shadow-xl `;
        // 3. set innerHTML 
        phoneCard.innerHTML = ` 
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name} </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div> 
        
        `;
        // 4. appendChild 
        phonesContainer.appendChild(phoneCard);

    });
    // hide loading spinner 
    toggleLoadingDots(false)
}


// search buttons function
const handleSearch = (isShowAll) => {
  // calling toggleLoadingDots function
  toggleLoadingDots(true);

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // searchField.innerText = ' ';
  loadPhone(searchText, isShowAll);
}


// another searching
/* const anotherSearch = () => {
   const anotherSearchField = document.getElementById('another-search-field');
   const anotherText = anotherSearchField.value ;
  //  console.log(anotherText)
   loadPhone(anotherText)
} */


// loading dots or spinner
const toggleLoadingDots = (isLoading) =>{  
  const loaderSpinner = document.getElementById('loading-dots')
  if(isLoading){
    loaderSpinner.classList.remove('hidden');
  }else{
    loaderSpinner.classList.add('hidden');
  }

}


// show all buttons function
const showAllButton = () => {
  handleSearch(true);
}


// loadPhone();