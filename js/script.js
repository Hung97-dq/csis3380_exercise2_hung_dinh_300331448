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
var currentPage;
const setContactDisplay = (pageNum) => {
    currentPage = pageNum;
    setActivePage();
    const prevRange = (pageNum - 1) * contactDisplayLimit;
    const currRange = pageNum * contactDisplayLimit;
    const listContact = Array.from(content.querySelectorAll("li"));

    listContact.forEach((contact, i) => {
        contact.classList.add("hidden");
        if (i >= prevRange && i < currRange) {
          contact.classList.remove("hidden");
        }
  });
  }

  const setActivePage = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
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

  window.addEventListener("load", () => {
    setContactDisplay(1);
    onPageClicked();
});