const loadPhone = async (searchText='13', isShowAll) => {
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
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden');
  }
  // console.log('is show all:', isShowAll)

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
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
          <div class="card-actions justify-center">
            <button onclick= "handleShowDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
          </div>
        </div> 
        
        `;
    // 4. appendChild 
    phonesContainer.appendChild(phoneCard);

  });
  // hide loading spinner 
  toggleLoadingDots(false)
}

// show details modal function
const handleShowDetails = async (id) => {

   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id} `)
   const data = await res.json();
   const phone = data.data;
   
   showPhonesDetails(phone)
}

// show phones details function
const showPhonesDetails = (phone) => {
  console.log(phone)
  // const phoneName = document.getElementById('show-details-phone-name');
  // phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img class="" src="${phone.image}"/>
  
  <p class="text-xl font-medium">${phone?.name}</p>
  <p><span class="text-lg font-medium">Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span class="text-lg font-medium">DisplaySize: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="text-lg font-medium">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="text-lg font-medium">Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="text-lg font-medium">Slug: </span>${phone?.slug}</p>
  <p><span class="text-lg font-medium">ReleaseDate: </span>${phone?.releaseDate}</p>
  <p><span class="text-lg font-medium">Brand: </span>${phone?.brand}</p>
  <p><span class="text-lg font-medium">GPS: </span>${phone?.others?.GPS || 'NO GPS AVAILABLE'}</p>
  
  `;

  // show the modal methods
  show_details_modal.showModal()
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
const toggleLoadingDots = (isLoading) => {
  const loaderSpinner = document.getElementById('loading-dots')
  if (isLoading) {
    loaderSpinner.classList.remove('hidden');
  } else {
    loaderSpinner.classList.add('hidden');
  }

}


// show all buttons function
const showAllButton = () => {
  handleSearch(true);
}


loadPhone();