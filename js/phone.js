const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}
    `);
    const data = await res.json();
    const phone = data.data;
    displayPhones(phone);
    // console.log(phones)
}

const displayPhones = phone => {
    // console.log(phones)

    //1. get container div
    const phonesContainer = document.getElementById('phones-container')
    // clear kore dibe age jeta search deya hoiche 
    phonesContainer.textContent = '';

    phone.forEach(phones => {
        console.log(phones)

        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = ` card card-compact p-5 bg-red-50 shadow-xl `;
        // 3. set innerHTML 
        phoneCard.innerHTML = ` 
        <figure><img src="${phones.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phones.phone_name} </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div> 
        
        `;
        // 4. appendChild 
        phonesContainer.appendChild(phoneCard);

    })
}


// handler buttons
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // searchField.innerText = ' ';
  console.log(searchText)
  loadPhone(searchText);
}


// loadPhone();