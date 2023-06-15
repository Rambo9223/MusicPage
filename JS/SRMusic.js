/* Our arrays below are for our form and saved values
input by our user */

let saved = [];
//let elementsHTML = [];
let bookingInfo = [];
let subcribers = [];
let userComments = [];
//let images = document.getElementsByClassName("gallery-image");

/* The page has functionality for the user to save items from the gallery
the clearsaved function is called when the user click the clear item button 
in the saved page,
This function will remove the items from the saved list by removing the
image elements on the page, and the items from local storage */
function clearSaved(){
    //confirm user wants to remove items 
    let check = confirm("Are you sure you want to clear saved items");
    if(check===true){// if true 
        localStorage.clear("userSaved");// clear local storage 
        let saveLater = document.getElementById("saved-gallery");
    while(saveLater.hasChildNodes()){// remove child img elements from parent
            saveLater.removeChild(saveLater.firstChild);}
    }
}
/* The Gallery page function is called on load of the body of the 
gallery page. 
This function calls the nessescary functions required for the user to 
be able to save items */
function galleryPage(){
    startUp();// startup runs in order to initalise session storage
    likedItems();// likeItems allows the user to like the page elements
    saveItem();// Save item allows the user to mark elements to add to the save page
}

/*startUp is called on body load of the saved page or gallery page,
its job is to set the local storgae variable on the first run through
then in subsequent runs populate the saved page with any elements the user 
has selected. */
function startUp(){

    if(localStorage.getItem("hasRun") === null){
        //if the page hasn't loaded before the if statement will read null

        // we initialise the saved array in to local storage so we can use the values
        // across different pages
        localStorage.setItem("userSaved", JSON.stringify(saved));
        
        localStorage.setItem("hasRun",true);// we change the has run key value to true so if the page is 
        // reloaded the values will be saved in the session storage. 
         
    }else{
        /*convert array items to objects so the html data saved inside from the 
        saveItem function can be accesed via the array index no*/
        saved = JSON.parse(localStorage.getItem("userSaved"));
                
        for(let i = 0; i<saved.length; i++){//for loop to runthrough all items in the array
            
            let newItem = document.createElement("div");//create a new div element
            newItem.value = i;//value of i
            newItem.className = "image-wrap";//class name image-wrap
            // this will automatically apply the same css as images/videos
            // in the gallery page

            newItem.innerHTML = saved[i];/*the inner html of the saved item from the gallery page
            is applied to the new element so it will show in the saved page*/

            document.getElementById("saved-gallery").appendChild(newItem);
           // finally we add the new element as a child node of the parent div
        }
      
    }
}

//let liked = document.getElementsByClassName("gallery");

/* The next 3 functions - bookingForm, subscribed & userFeedback
are all object constructors that we use to extract and layout the 
data inputted to the respective html forms */
function bookingForm(name,date,start,end,email,phoneNo,otherInfo){
    this.name = name;
    this.date = date;
    this.start = start;
    this.end = end;
    this.email = email;
    this.phoneNo = phoneNo;
    this.otherInfo = otherInfo;
}

function subscribed(name,age,email,newReleases,shows){
    this.name = name;
    this.age = age;
    this.email = email;
    this.newReleases = newReleases;
    this.shows = shows;
}

function userFeedback(name,feedback){
    this.name = name;
    this.feedback = feedback;
}


/* Submit booking is called when the user submits the booking form on the 
calendar-booking-page
it is a means for the user to contact me for any booking enquiries */
function submitBooking(){
    // when called we create a new object using the constructor 
    let newBooking = new bookingForm(
        // the parameters are now equal to the user inputs in each section of the form
        document.getElementById("booking-name").value,
        document.getElementById("booking-date").value,
        document.getElementById("start-time").value,
        document.getElementById("end-time").value,
        document.getElementById("booking-email").value,
        document.getElementById("booking-phone-number").value,
        document.getElementById("booking-info").value,
    );
    /* In order to process a booking we need a minimum of name, date & email
    the below if statement to ensure those values have been submitted in the form */
    if((newBooking.name.length >0 && newBooking.name)&&(newBooking.date)&&(newBooking.email.length>0 && newBooking.email)){// if true we alert to the user the booking is sucessful
        alert
    (`Thank you for submitting your booking!
Your enquiry has been recieved and someone will be in touch with you shortly.`);

    bookingInfo.push(newBooking);// push the new booking object to the bookingInfo array
    localStorage.setItem("booking",JSON.stringify(bookingInfo));// set the array to local storage
    console.log(bookingInfo);
    }else{// if the user has not inputted the minumum required info
        // we reject the booking and don't push the enquiry to the array
        alert
    (`Your booking enquiry has been rejected!
Please make sure you enter the required details marked(*)!`)
    }
    // finally we reset the booking form values
    document.getElementById("booking-form").reset("");
}
/* We utilise the same logic as above to retrieve the data submitted in the 
subscriber form and below in the feedback form */
function subscriber(){

    let subcriber = new subscribed(
        document.getElementById("subscribe-name").value,
        document.getElementById("subscribe-age").value,
        document.getElementById("subscribe-email").value,
        document.getElementById("subscribe-release").checked,
        document.getElementById("subscribe-show").checked,
    )
    // minimum data required is name & email 
    if((subcriber.name.length>0)&&(subcriber.name)&&(subcriber.email.length>0)&&(subcriber.email)){
    alert(`Thank you for subscribing!`)
    
    subcribers.push(subcriber);
    localStorage.setItem("subscribed",JSON.stringify(subcribers));
    console.log(subcribers);}
    else{
        alert("Please enter your name & email!")
    }
    document.getElementById("sub-form").reset("");
}

function feedback(){
    let newFB = new userFeedback(
        document.getElementById("feedback-name").value,
        document.getElementById("user-feedback").value,
    )
    if(newFB.name && newFB.feedback){
        alert("Thank you for your feedback");
        userComments.push(newFB);
        localStorage.setItem("comments",JSON.stringify(userComments));
        console.log(userComments);
    }
    document.getElementById("feedback-form").reset("");
}


/* The liked items function allows the user to like an item on the gallery 
page, when the gallery page is loaded we call this function */
function likedItems(){
    
    // the html collection of checkbox type input elements
    let likeElements = document.getElementsByClassName("like");

    // for each item in the collection we run the below loop
    for(let i = 0; i < likeElements.length; i++){
        //using index number at i we can target an individual html element in the collection
        let likeItem = document.getElementsByClassName("like")[i];
        // we arm each with an onclick event function
        likeItem.onclick = function(e){

            let likeLabel = likeItem.previousElementSibling ;// the html label preceeding the checkbox

            /* all checkboxes are null initially so when clicked the below if 
            would be true */
            if(likeItem.ariaChecked === null){
            likeItem.ariaChecked = true;//we change the checked property to true
            likeLabel.innerHTML = "Liked";//change the inner html to read liked
            }else{
                // should the user uncheck the like box
                // we revert the box and label to it's initial values
                likeLabel.innerHTML = "Like" ; 
                likeItem.ariaChecked = null ; 
            }
        }
    }
}


function saveItem(){

    //saved is made equal to local storage values and are converted to objects 
    saved = JSON.parse(localStorage.getItem("userSaved"));
    // the html collection of save checkbox type inputs
    let savedElements = document.getElementsByClassName("save");
    // for each html element we run through a for loop
    for(let i = 0; i < savedElements.length; i++){

        // the parent div which contains the image or video
        let saveItemParent = document.getElementsByClassName("image-wrap")[i];

        // the individual checkbox of the collection 
        let saveItem = document.getElementsByClassName("save")[i];
        /* we arm each input with an onclick event function */
        saveItem.onclick = function(e){
            
            /*like the above like item function we change the 
            lable to read saved when the used clicks on the checkbox */
            let saveLabel = saveItem.previousElementSibling ;
            if(saveItem.ariaChecked === null){
            alert(`You've added this item to your saved for later items`);
            saveItem.ariaChecked = true;
            saveLabel.innerHTML = "Saved";
            // we disable the checkbox when clicked to show the user it has been added
            saveItem.disabled = true ;
            
            /* in order to populate the save page with content we need to find the 
            html of the selected element so it can be saved to our local storage,
            our wrapperSaved variable contains this information */
            let wrapperSaved = saveItemParent.children[0].outerHTML;
            // we push this info in to the saved array
            saved.push(wrapperSaved);
            // we set it to local storage so it can be carried over to the next page
            localStorage.setItem("userSaved",JSON.stringify(saved));
            // we alert the number of items on the saved paged 
            alert(`You have ${saved.length} items in your saved items.`);
            }
            }
    }
     
}