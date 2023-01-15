// Author: Hung Dinh, ID: 300331448


// Reference to the user array, which contain the user data
const contacts = users;
// Limit for the number of user for each display
const contactDisplayLimit = 10;


// Calculate the number of display page
const DisplayCount = Math.ceil(contacts.length/contactDisplayLimit);



// Set total number of contact
const contactNum = document.querySelector(`h3`);
contactNum.innerHTML = `Total: ` + contacts.length;


// Display the user contact information
const content = document.querySelector('.contact-list');
let contactDisplay= '';
for (i = 0; i < contacts.length; i++) {
    contactDisplay+=`<li class="contact-item cf">
    <div class="contact-details">
        <img class="avatar" src="`+ contacts[i].picture.thumbnail+`">
        <h3>`+ contacts[i].name.first + ` ` + contacts[i].name.last +`</h3>
        <span class="email">`+ contacts[i].name.first +`.`+ contacts[i].name.last +`@example.com</span>
    </div>
    <div class="joined-details"> Joined
           <span class="date">`
           + contacts[i].registered.date.split('T')[0].split('-')[1] + `/`
           +contacts[i].registered.date.split('T')[0].split('-')[2]+ `/`
           + contacts[i].registered.date.split('T')[0].split('-')[0]  +`</span>
    </div>
    </li>`
}
content.innerHTML = contactDisplay

// Generate Page Button
const paginationNumber = document.querySelector('#page-num');
let pageNumber = '';

for (let i = 1; i <= DisplayCount; i++) {
    pageNumber += `<button class="pagination-number" page-index="`+i+`">`+ i+ `</button>`
    };
paginationNumber.innerHTML = pageNumber;

// Set visible for user contact of selected page, and hide the other contact form othe pages

const setContactDisplay = (currentPageIndex) => {
     var activePage = currentPageIndex;
    // Set active page to a different color
    setActivePage(activePage);

    //Set limit of contact can be showed on the screen
    const firstContactDisplay = (currentPageIndex - 1) * contactDisplayLimit;
    const lastContactDisplay = currentPageIndex * contactDisplayLimit;
    const listContact = Array.from(content.querySelectorAll("li"));

    listContact.forEach((contact, i) => {
        contact.classList.add("hidden");
        if (i >= firstContactDisplay && i < lastContactDisplay) {
          contact.classList.remove("hidden");
        }
  });
  }

  // Set page active once a page button was clicked
  const setActivePage = (activePage) => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == activePage) {
        button.classList.add("active");
      }
    });
  };

// Set current page to the page number on the button clicked
  const onPageClicked = () =>{
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex) {
          button.addEventListener("click", () => {
            setContactDisplay(pageIndex);
          });
  }});
  }

  // Call the function to set contact on first page to be active
  // and set function to listen to the page click action
  window.addEventListener("load", () => {
    setContactDisplay(1);
    onPageClicked();
});