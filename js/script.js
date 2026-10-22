// ===============================
// Skill Swap Project - script.js
// ===============================

let skills = JSON.parse(localStorage.getItem("skills")) || [];

// ===============================
// CREATE SKILL CARD
// ===============================

function createSkillCard(skill) {

    const newCard = document.createElement("div");
    newCard.className = "skill-card";

    newCard.innerHTML = `
        <h2>${skill.skillName}</h2>
        <p><strong>Shared By:</strong> ${skill.personName}</p>
        <p><strong>Category:</strong> ${skill.category}</p>
        <p><strong>Level:</strong> ${skill.level}</p>

        <button class="swap-btn">Request Swap</button>
        <button class="edit-btn">Edit</button>
        <button class="fav-btn">⭐ Favorite</button>
        <button class="delete-btn">Delete</button>
    `;

    //Request Swap
    const swapBtn = newCard.querySelector(".swap-btn");

    swapBtn.addEventListener("click", function () {
        alert("Your Swap Request has been sent successfully!");
    });

    // Favorite Button
    
    const favBtn = newCard.querySelector(".fav-btn");

favBtn.addEventListener("click", function () {

    if (favBtn.innerHTML === "⭐ Favorite") {

        favBtn.innerHTML = "❤️ Favorite";

    } else {

        favBtn.innerHTML = "⭐ Favorite";

    }

});
    
    // Edit Button
const editBtn = newCard.querySelector(".edit-btn");

editBtn.addEventListener("click", function () {

    const newSkillName = prompt("Enter New Skill Name", skill.skillName);

    if (newSkillName === null || newSkillName.trim() === "") return;

    skill.skillName = newSkillName;

    localStorage.setItem("skills", JSON.stringify(skills));

    displaySkills();

});

    // Delete Button
    const deleteBtn = newCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {

        if(confirm("Are you sure you want to delete this skill?")){

           

            skills = skills.filter(function(item){

                return !(
                    item.skillName === skill.skillName &&
                    item.personName === skill.personName
                );

            });

            localStorage.setItem("skills", JSON.stringify(skills));
            
             displaySkills();

            alert("Skill Deleted Successfully!");

        }

    });

    return newCard;

}

// ===============================
// DISPLAY SKILLS
// ===============================

function displaySkills(){

    const skillsContainer = document.getElementById("skillsContainer");

    if(!skillsContainer) return;

    const dynamicCards = skillsContainer.querySelectorAll(".dynamic-card");

    dynamicCards.forEach(function(card){
        card.remove();
    });

    skills.forEach(function(skill){

        const card = createSkillCard(skill);

        card.classList.add("dynamic-card");

        skillsContainer.appendChild(card);

    });
    
    const skillCount = document.getElementById("skillCount");

if(skillCount){
    skillCount.textContent = "Total Skills: " + document.querySelectorAll(".skill-card").length;
}

}

// Page Load
displaySkills();

// ===============================
// SEARCH SKILLS
// ===============================

const searchBox = document.querySelector(".search");

if(searchBox){

    searchBox.addEventListener("keyup", function(){

        const cards = document.querySelectorAll(".skill-card");

        const searchText = searchBox.value.toLowerCase();

        cards.forEach(function(card){

            const skillName = card.querySelector("h2").textContent.toLowerCase();

            if(skillName.includes(searchText)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

}
// ===============================
// ADD SKILL FORM
// ===============================

const form = document.getElementById("addSkillForm");

if(form){

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const skillName = document.getElementById("skillName").value.trim();
        const personName = document.getElementById("personName").value.trim();
        const category = document.getElementById("category").value.trim();
        const level = document.getElementById("level").value;

        if(
            skillName === "" ||
            personName === "" ||
            category === ""
        ){

            alert("Please fill all fields!");
            return;

        }

        const newSkill = {
            skillName: skillName,
            personName: personName,
            category: category,
            level: level
        };

        skills.push(newSkill);

        localStorage.setItem("skills", JSON.stringify(skills));

        displaySkills();

        form.reset();

        alert("Skill Added Successfully!");

    });

}

// ===============================
// REQUEST SWAP (DEFAULT HTML CARDS)
// ===============================

const swapButtons = document.querySelectorAll(".swap-btn");

swapButtons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Your Swap Request has been sent successfully!");

    });

});

// ===============================
// DELETE BUTTON (DEFAULT HTML CARDS)
// ===============================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(function(button){

    button.addEventListener("click", function(){

        if(confirm("Are you sure you want to delete this skill?")){

            button.parentElement.remove();

            alert("Skill Deleted Successfully!");

        }

    });

});
// ===============================
// CATEGORY FILTER
// ===============================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const cards = document.querySelectorAll(".skill-card");

        cards.forEach(function (card) {

            const category = card.querySelector("p:nth-of-type(2)").textContent;

            if (
                categoryFilter.value === "All" ||
                category.includes(categoryFilter.value)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}
// ===============================
// DARK MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeBtn.innerHTML = "☀️ Light Mode";

        } else {

            themeBtn.innerHTML = "🌙 Dark Mode";

        }

    });

}
// ===============================
// SORT SKILLS
// ===============================

const sortSkills = document.getElementById("sortSkills");

if (sortSkills) {

    sortSkills.addEventListener("change", function () {

        if (sortSkills.value === "az") {

            skills.sort(function (a, b) {
                return a.skillName.localeCompare(b.skillName);
            });

        } else if (sortSkills.value === "za") {

            skills.sort(function (a, b) {
                return b.skillName.localeCompare(a.skillName);
            });

        }

        displaySkills();

    });

}
// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all fields!");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {

            alert("Please enter a valid email!");
            return;
        }

        alert("Message Sent Successfully!");

        contactForm.reset();

    });

}

// iske baad 

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Skill Details Coming Soon!");

    });

});