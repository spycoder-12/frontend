// /*=====================================================
//             CONFIG & GLOBAL VARIABLES
// =====================================================*/

// const gallery = document.getElementById("gallery");
// const contactForm = document.getElementById("contactForm");

// const adminBtn = document.getElementById("adminBtn");
// const adminModal = document.getElementById("adminModal");
// const closeAdmin = document.getElementById("closeAdmin");

// const adminPanel = document.getElementById("adminPanel");
// const adminLoginForm = document.getElementById("adminLoginForm");

// const uploadForm = document.getElementById("uploadForm");

// const photoTableBody = document.getElementById("photoTableBody");
// const contactTableBody = document.getElementById("contactTableBody");

// const loader = document.getElementById("loader");

// const lightbox = document.getElementById("lightbox");
// const lightboxImage = document.getElementById("lightboxImage");
// const lightboxCaption = document.getElementById("lightboxCaption");
// const closeLightbox = document.getElementById("closeLightbox");

// const scrollTopBtn = document.getElementById("scrollTop");

// let photos = [];
// let contacts = [];
// let selectedDeleteId = null;
// let deleteType = "";

// let adminToken = localStorage.getItem("adminToken") || null;

// function authHeaders() {
//     return adminToken ? { "Authorization": "Bearer " + adminToken } : {};
// }

// function escapeHtml(value) {
//     const div = document.createElement("div");
//     div.textContent = value ?? "";
//     return div.innerHTML;
// }


// /*=====================================================
//                 LOADER
// =====================================================*/

// window.addEventListener("load", () => {

//     setTimeout(() => {

//         loader.style.display = "none";

//     }, 1000);

// });


// /*=====================================================
//             TOAST MESSAGE
// =====================================================*/

// function showToast(message, success = true) {

//     const toast = document.getElementById("toast");
//     const icon = document.getElementById("toastIcon");
//     const text = document.getElementById("toastMessage");

//     text.innerText = message;

//     if (success) {

//         icon.className = "ri-checkbox-circle-fill";

//         toast.style.borderColor = "#22c55e";

//     } else {

//         icon.className = "ri-close-circle-fill";

//         toast.style.borderColor = "#ef4444";

//     }

//     toast.classList.add("show");

//     setTimeout(() => {

//         toast.classList.remove("show");

//     }, 3000);

// }


// /*=====================================================
//             FETCH PHOTOS
// =====================================================*/

// async function loadPhotos() {

//     try {

//         const response = await fetch(`${API_BASE}/photos`);

//         photos = await response.json();

//         renderGallery(photos);

//         renderPhotoTable(photos);

//         document.getElementById("totalPhotos").innerText = photos.length;

//     }

//     catch (error) {

//         console.log(error);

//         showToast("Unable to load photos", false);

//     }

// }


// /*=====================================================
//             GALLERY
// =====================================================*/

// function renderGallery(data) {

//     gallery.innerHTML = "";

//     if (data.length === 0) {

//         gallery.innerHTML = `
//             <div class="empty-state">
//                 <h2>No Photos Available</h2>
//             </div>
//         `;

//         return;

//     }

//     data.forEach(photo => {

//         const card = document.createElement("div");
//         card.className = "photo-card";

//         const img = document.createElement("img");
//         img.src = API_BASE + "/uploads/" + photo.image_path;
//         img.alt = photo.caption ?? "";
//         img.onclick = function () { openLightbox(img.src, photo.caption ?? ""); };

//         const overlay = document.createElement("div");
//         overlay.className = "photo-overlay";

//         const h3 = document.createElement("h3");
//         h3.textContent = photo.category;

//         const p = document.createElement("p");
//         p.textContent = photo.caption ?? "";

//         const span = document.createElement("span");
//         span.textContent = photo.exposure ?? "";

//         overlay.appendChild(h3);
//         overlay.appendChild(p);
//         overlay.appendChild(span);

//         card.appendChild(img);
//         card.appendChild(overlay);

//         gallery.appendChild(card);

//     });

// }


// /*=====================================================
//             LIGHTBOX
// =====================================================*/

// function openLightbox(image, caption) {

//     lightbox.classList.add("active");

//     lightboxImage.src = image;

//     lightboxCaption.innerText = caption;

// }

// closeLightbox.onclick = () => {

//     lightbox.classList.remove("active");

// };

// lightbox.onclick = (e) => {

//     if (e.target === lightbox) {

//         lightbox.classList.remove("active");

//     }

// };


// /*=====================================================
//             CATEGORY FILTER
// =====================================================*/

// document.querySelectorAll(".filter").forEach(button => {

//     button.onclick = () => {

//         document.querySelectorAll(".filter").forEach(btn => {

//             btn.classList.remove("active");

//         });

//         button.classList.add("active");

//         const category = button.dataset.category;

//         if (category === "all") {

//             renderGallery(photos);

//         }

//         else {

//             const filtered = photos.filter(photo =>

//                 photo.category.toLowerCase() === category.toLowerCase()

//             );

//             renderGallery(filtered);

//         }

//     };

// });


// /*=====================================================
//             CONTACT FORM
// =====================================================*/

// contactForm.addEventListener("submit", async function (e) {

//     e.preventDefault();

//     const data = {

//         name: document.getElementById("name").value,

//         email: document.getElementById("email").value,

//         message: document.getElementById("message").value,

//         event_date: document.getElementById("event_date").value,

//         website: document.getElementById("website").value

//     };

//     try {

//         const response = await fetch(`${API_BASE}/contact`, {

//             method: "POST",

//             headers: {

//                 "Content-Type": "application/json"

//             },

//             body: JSON.stringify(data)

//         });

//         const result = await response.json();

//         showToast(result.message);

//         contactForm.reset();

//     }

//     catch (err) {

//         console.log(err);

//         showToast("Unable to send message", false);

//     }

// });


// /*=====================================================
//             ADMIN LOGIN
// =====================================================*/

// adminBtn.onclick = () => {

//     adminModal.style.display = "flex";

// };

// closeAdmin.onclick = () => {

//     adminModal.style.display = "none";

// };

// adminLoginForm.addEventListener("submit", async function (e) {

//     e.preventDefault();

//     const username = document.getElementById("adminUsername").value;
//     const password = document.getElementById("adminPassword").value;

//     try {

//         const response = await fetch(`${API_BASE}/admin/login`, {

//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify({ username, password })

//         });

//         if (!response.ok) {

//             showToast("Invalid username or password", false);
//             return;

//         }

//         const result = await response.json();

//         adminToken = result.access_token;
//         localStorage.setItem("adminToken", adminToken);

//         adminPanel.classList.remove("hidden");

//         adminModal.style.display = "none";

//         adminLoginForm.reset();

//         loadContacts();

//         showToast("Admin Login Successful");

//     }

//     catch (error) {

//         console.log(error);

//         showToast("Unable to reach the server", false);

//     }

// });


// /*=====================================================
//             AUTO LOGIN
// =====================================================*/

// async function tryAutoLogin() {

//     if (!adminToken) return;

//     try {

//         const response = await fetch(`${API_BASE}/admin/me`, {
//             headers: authHeaders()
//         });

//         if (!response.ok) {

//             // Token expired/invalid — clear it and require a fresh login.
//             adminToken = null;
//             localStorage.removeItem("adminToken");
//             return;

//         }

//         adminPanel.classList.remove("hidden");

//         loadContacts();

//     }

//     catch (error) {

//         console.log(error);

//     }

// }

// /*=====================================================
//             LOGOUT
// =====================================================*/

// document.getElementById("logoutBtn").onclick = () => {

//     adminToken = null;

//     localStorage.removeItem("adminToken");

//     adminPanel.classList.add("hidden");

//     showToast("Logged Out");

// };


// /*=====================================================
//             INITIAL LOAD
// =====================================================*/

// loadPhotos();

// /*=====================================================
//             PHOTO TABLE
// =====================================================*/

// function renderPhotoTable(data) {

//     photoTableBody.innerHTML = "";

//     data.forEach(photo => {

//         photoTableBody.innerHTML += `

//         <tr>

//             <td>${photo.id}</td>

//             <td>

//                 <img src="${API_BASE}/uploads/${photo.image_path}">

//             </td>

//             <td>${photo.category}</td>

//             <td>${photo.caption ?? ""}</td>

//             <td>${photo.frame_no ?? ""}</td>

//             <td>${photo.exposure ?? ""}</td>

//             <td>${photo.sort_order}</td>

//             <td>

//                 <button
//                     class="edit-btn"
//                     onclick="openEditModal(${photo.id})">

//                     Edit

//                 </button>

//                 <button
//                     class="delete-btn"
//                     onclick="deletePhoto(${photo.id})">

//                     Delete

//                 </button>

//             </td>

//         </tr>

//         `;

//     });

// }


// /*=====================================================
//                 UPLOAD PHOTO
// =====================================================*/

// uploadForm.addEventListener("submit", async function (e) {

//     e.preventDefault();

//     const formData = new FormData();

//     formData.append(
//         "category",
//         document.getElementById("category").value
//     );

//     formData.append(
//         "caption",
//         document.getElementById("caption").value
//     );

//     formData.append(
//         "frame_no",
//         document.getElementById("frame_no").value
//     );

//     formData.append(
//         "exposure",
//         document.getElementById("exposure").value
//     );

//     formData.append(
//         "sort_order",
//         document.getElementById("sort_order").value
//     );

//     formData.append(
//         "image",
//         document.getElementById("image").files[0]
//     );

//     try {

//         const response = await fetch(
//             `${API_BASE}/photos/upload`,
//             {

//                 method: "POST",

//                 headers: authHeaders(),

//                 body: formData

//             }

//         );

//         const result = await response.json();

//         if (result.success) {

//             showToast(result.message);

//             uploadForm.reset();

//             loadPhotos();

//         }

//         else {

//             showToast("Upload Failed", false);

//         }

//     }

//     catch (error) {

//         console.log(error);

//         showToast("Server Error", false);

//     }

// });


// /*=====================================================
//                 DELETE PHOTO
// =====================================================*/

// async function deletePhoto(id) {

//     if (!confirm("Delete this photo?")) return;

//     try {

//         const response = await fetch(

//             `${API_BASE}/photos/${id}`,

//             {

//                 method: "DELETE",

//                 headers: authHeaders()

//             }

//         );

//         const result = await response.json();

//         showToast(result.message);

//         loadPhotos();

//     }

//     catch (err) {

//         console.log(err);

//         showToast("Delete Failed", false);

//     }

// }


// /*=====================================================
//                 EDIT MODAL
// =====================================================*/

// function openEditModal(id) {

//     const photo = photos.find(p => p.id === id);

//     if (!photo) return;

//     document.getElementById("editModal").style.display = "flex";

//     document.getElementById("editPhotoId").value = photo.id;

//     document.getElementById("editCategory").value = photo.category;

//     document.getElementById("editCaption").value = photo.caption || "";

//     document.getElementById("editFrame").value = photo.frame_no || "";

//     document.getElementById("editExposure").value = photo.exposure || "";

//     document.getElementById("editSort").value = photo.sort_order;

// }


// /*=====================================================
//                 CLOSE EDIT
// =====================================================*/

// document.getElementById("closeEditModal").onclick = () => {

//     document.getElementById("editModal").style.display = "none";

// };

// document.getElementById("cancelEdit").onclick = () => {

//     document.getElementById("editModal").style.display = "none";

// };


// /*=====================================================
//                 UPDATE PHOTO
// =====================================================*/

// document
// .getElementById("editPhotoForm")
// .addEventListener(

// "submit",

// async function(e){

// e.preventDefault();

// const id=document.getElementById("editPhotoId").value;

// const formData=new FormData();

// formData.append(
// "category",
// document.getElementById("editCategory").value
// );

// formData.append(
// "caption",
// document.getElementById("editCaption").value
// );

// formData.append(
// "frame_no",
// document.getElementById("editFrame").value
// );

// formData.append(
// "exposure",
// document.getElementById("editExposure").value
// );

// formData.append(
// "sort_order",
// document.getElementById("editSort").value
// );

// try{

// const response=await fetch(

// `${API_BASE}/photos/${id}`,

// {

// method:"PUT",

// headers: authHeaders(),

// body:formData

// }

// );

// const result=await response.json();

// showToast(result.message);

// document.getElementById("editModal").style.display="none";

// loadPhotos();

// }

// catch(error){

// console.log(error);

// showToast("Update Failed",false);

// }

// });


// /*=====================================================
//             PHOTO SEARCH
// =====================================================*/

// document
// .getElementById("photoSearch")
// .addEventListener(

// "keyup",

// function(){

// const keyword=this.value.toLowerCase();

// const filtered=photos.filter(photo=>

// photo.category.toLowerCase().includes(keyword) ||

// (photo.caption||"").toLowerCase().includes(keyword)

// );

// renderPhotoTable(filtered);

// });

// /*=====================================================
//                 LOAD CONTACTS
// =====================================================*/

// async function loadContacts() {

//     try {

//         const response = await fetch(

//             `${API_BASE}/contacts`,

//             {
//                 headers: authHeaders()
//             }

//         );

//         contacts = await response.json();

//         renderContacts(contacts);

//         document.getElementById("totalContacts").innerText = contacts.length;

//     }

//     catch (error) {

//         console.error(error);

//         showToast("Unable to load contacts", false);

//     }

// }


// /*=====================================================
//             RENDER CONTACT TABLE
// =====================================================*/

// function renderContacts(data) {

//     contactTableBody.innerHTML = "";

//     if (data.length === 0) {

//         contactTableBody.innerHTML = `
//             <tr>
//                 <td colspan="7" style="text-align:center;">
//                     No Contact Messages
//                 </td>
//             </tr>
//         `;

//         return;

//     }

//     data.forEach(contact => {

//         contactTableBody.innerHTML += `

//         <tr>

//             <td>${contact.id}</td>

//             <td>${escapeHtml(contact.name)}</td>

//             <td>${escapeHtml(contact.email)}</td>

//             <td>${escapeHtml(contact.event_date) || "-"}</td>

//             <td>${escapeHtml(contact.message)}</td>

//             <td>${new Date(contact.created_at).toLocaleDateString()}</td>

//             <td>

//                 <button
//                     class="delete-btn"
//                     onclick="deleteContact(${contact.id})">

//                     Delete

//                 </button>

//             </td>

//         </tr>

//         `;

//     });

// }


// /*=====================================================
//                 DELETE CONTACT
// =====================================================*/

// async function deleteContact(id) {

//     if (!confirm("Delete this contact message?"))
//         return;

//     try {

//         const response = await fetch(

//             `${API_BASE}/contact/${id}`,

//             {

//                 method: "DELETE",

//                 headers: authHeaders()

//             }

//         );

//         const result = await response.json();

//         showToast(result.message);

//         loadContacts();

//     }

//     catch (error) {

//         console.error(error);

//         showToast("Unable to delete contact", false);

//     }

// }


// /*=====================================================
//             CONTACT SEARCH
// =====================================================*/

// document
// .getElementById("contactSearch")
// .addEventListener(

// "keyup",

// function(){

// const keyword=this.value.toLowerCase();

// const filtered=contacts.filter(contact=>

// contact.name.toLowerCase().includes(keyword) ||

// contact.email.toLowerCase().includes(keyword) ||

// contact.message.toLowerCase().includes(keyword)

// );

// renderContacts(filtered);

// });


// /*=====================================================
//             MOBILE MENU
// =====================================================*/

// const menuBtn = document.querySelector(".menu-btn");

// const navLinks = document.querySelector(".nav-links");

// menuBtn.addEventListener("click", () => {

//     navLinks.classList.toggle("active");

// });


// /*=====================================================
//             SCROLL TO TOP
// =====================================================*/

// window.addEventListener("scroll", () => {

//     if (window.scrollY > 400) {

//         scrollTopBtn.style.display = "flex";

//     }

//     else {

//         scrollTopBtn.style.display = "none";

//     }

// });


// scrollTopBtn.onclick = () => {

//     window.scrollTo({

//         top: 0,

//         behavior: "smooth"

//     });

// };


// /*=====================================================
//             NAVBAR EFFECT
// =====================================================*/

// window.addEventListener("scroll", () => {

//     const header = document.querySelector("header");

//     if (window.scrollY > 60) {

//         header.style.background = "#000";

//     }

//     else {

//         header.style.background = "rgba(0,0,0,.45)";

//     }

// });


// /*=====================================================
//             WHATSAPP BUTTON
// =====================================================*/

// document
// .querySelector(".whatsapp-btn")
// .addEventListener(

// "click",

// function(e){

// e.preventDefault();

// window.open(

// "https://wa.me/91XXXXXXXXXX",

// "_blank"

// );

// });


// /*=====================================================
//             CLOSE MODALS
// =====================================================*/

// window.onclick = function(event){

// if(event.target===adminModal){

// adminModal.style.display="none";

// }

// if(event.target===lightbox){

// lightbox.classList.remove("active");

// }

// if(event.target===document.getElementById("editModal")){

// document.getElementById("editModal").style.display="none";

// }

// };


// /*=====================================================
//             PAGE LOADING
// =====================================================*/

// function showLoading(){

// const loading=document.getElementById("pageLoading");

// if(loading){

// loading.classList.remove("hidden");

// }

// }

// function hideLoading(){

// const loading=document.getElementById("pageLoading");

// if(loading){

// loading.classList.add("hidden");

// }

// }


// /*=====================================================
//             INITIALIZE
// =====================================================*/

// document.addEventListener("DOMContentLoaded", () => {

//     loadPhotos();

//     tryAutoLogin();

// });


// console.log("Photography Portfolio Loaded Successfully");


/*=====================================================
            CONFIG & GLOBAL VARIABLES
=====================================================*/

const gallery = document.getElementById("gallery");
const reelsGallery = document.getElementById("reelsGallery");
const contactForm = document.getElementById("contactForm");

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const closeAdmin = document.getElementById("closeAdmin");

const adminPanel = document.getElementById("adminPanel");
const adminLoginForm = document.getElementById("adminLoginForm");

const uploadForm = document.getElementById("uploadForm");
const uploadReelForm = document.getElementById("uploadReelForm");

const photoTableBody = document.getElementById("photoTableBody");
const reelTableBody = document.getElementById("reelTableBody");
const contactTableBody = document.getElementById("contactTableBody");

const loader = document.getElementById("loader");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

const scrollTopBtn = document.getElementById("scrollTop");

let photos = [];
let reels = [];
let contacts = [];
let selectedDeleteId = null;
let deleteType = "";

let adminToken = localStorage.getItem("adminToken") || null;

function authHeaders() {
    return adminToken ? { "Authorization": "Bearer " + adminToken } : {};
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}


/*=====================================================
                LOADER
=====================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.display = "none";

    }, 1000);

});


/*=====================================================
            TOAST MESSAGE
=====================================================*/

function showToast(message, success = true) {

    const toast = document.getElementById("toast");
    const icon = document.getElementById("toastIcon");
    const text = document.getElementById("toastMessage");

    text.innerText = message;

    if (success) {

        icon.className = "ri-checkbox-circle-fill";

        toast.style.borderColor = "#22c55e";

    } else {

        icon.className = "ri-close-circle-fill";

        toast.style.borderColor = "#ef4444";

    }

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/*=====================================================
            FETCH PHOTOS
=====================================================*/

async function loadPhotos() {

    try {

        const response = await fetch(`${API_BASE}/photos`);

        photos = await response.json();

        renderGallery(photos);

        renderPhotoTable(photos);

        document.getElementById("totalPhotos").innerText = photos.length;

    }

    catch (error) {

        console.log(error);

        showToast("Unable to load photos", false);

    }

}


/*=====================================================
            FETCH REELS
=====================================================*/

async function loadReels() {

    try {

        const response = await fetch(`${API_BASE}/reels`);

        reels = await response.json();

        renderReelsGallery(reels);

        renderReelTable(reels);

        document.getElementById("totalReels").innerText = reels.length;

    }

    catch (error) {

        console.log(error);

        showToast("Unable to load reels", false);

    }

}


/*=====================================================
            GALLERY
=====================================================*/

function renderGallery(data) {

    gallery.innerHTML = "";

    if (data.length === 0) {

        gallery.innerHTML = `
            <div class="empty-state">
                <h2>No Photos Available</h2>
            </div>
        `;

        return;

    }

    data.forEach(photo => {

        const card = document.createElement("div");
        card.className = "photo-card";

        const img = document.createElement("img");
        img.src = API_BASE + "/uploads/" + photo.image_path;
        img.alt = photo.caption ?? "";
        img.onclick = function () { openLightbox(img.src, photo.caption ?? ""); };

        const overlay = document.createElement("div");
        overlay.className = "photo-overlay";

        const h3 = document.createElement("h3");
        h3.textContent = photo.category;

        const p = document.createElement("p");
        p.textContent = photo.caption ?? "";

        const span = document.createElement("span");
        span.textContent = photo.exposure ?? "";

        overlay.appendChild(h3);
        overlay.appendChild(p);
        overlay.appendChild(span);

        card.appendChild(img);
        card.appendChild(overlay);

        gallery.appendChild(card);

    });

}


/*=====================================================
            REELS GALLERY (PUBLIC)
=====================================================*/

function renderReelsGallery(data) {

    reelsGallery.innerHTML = "";

    if (data.length === 0) {

        reelsGallery.innerHTML = `
            <div class="empty-state">
                <h2>No Reels Available</h2>
            </div>
        `;

        return;

    }

    data.forEach(reel => {

        const card = document.createElement("div");
        card.className = "photo-card";

        const video = document.createElement("video");
        video.src = API_BASE + "/uploads/" + reel.video_path;
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";

        const overlay = document.createElement("div");
        overlay.className = "photo-overlay";

        const p = document.createElement("p");
        p.textContent = reel.caption ?? "";

        overlay.appendChild(p);

        card.appendChild(video);
        card.appendChild(overlay);

        reelsGallery.appendChild(card);

    });

}


/*=====================================================
            LIGHTBOX
=====================================================*/

function openLightbox(image, caption) {

    lightbox.classList.add("active");

    lightboxImage.src = image;

    lightboxCaption.innerText = caption;

}

closeLightbox.onclick = () => {

    lightbox.classList.remove("active");

};

lightbox.onclick = (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

};


/*=====================================================
            CATEGORY FILTER
=====================================================*/

document.querySelectorAll(".filter").forEach(button => {

    button.onclick = () => {

        document.querySelectorAll(".filter").forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {

            renderGallery(photos);

        }

        else {

            const filtered = photos.filter(photo =>

                photo.category.toLowerCase() === category.toLowerCase()

            );

            renderGallery(filtered);

        }

    };

});


/*=====================================================
            CONTACT FORM
=====================================================*/

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        message: document.getElementById("message").value,

        event_date: document.getElementById("event_date").value,

        website: document.getElementById("website").value

    };

    try {

        const response = await fetch(`${API_BASE}/contact`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        showToast(result.message);

        contactForm.reset();

    }

    catch (err) {

        console.log(err);

        showToast("Unable to send message", false);

    }

});


/*=====================================================
            ADMIN LOGIN
=====================================================*/

adminBtn.onclick = () => {

    adminModal.style.display = "flex";

};

closeAdmin.onclick = () => {

    adminModal.style.display = "none";

};

adminLoginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    try {

        const response = await fetch(`${API_BASE}/admin/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ username, password })

        });

        if (!response.ok) {

            showToast("Invalid username or password", false);
            return;

        }

        const result = await response.json();

        adminToken = result.access_token;
        localStorage.setItem("adminToken", adminToken);

        adminPanel.classList.remove("hidden");

        adminModal.style.display = "none";

        adminLoginForm.reset();

        loadContacts();

        showToast("Admin Login Successful");

    }

    catch (error) {

        console.log(error);

        showToast("Unable to reach the server", false);

    }

});


/*=====================================================
            AUTO LOGIN
=====================================================*/

async function tryAutoLogin() {

    if (!adminToken) return;

    try {

        const response = await fetch(`${API_BASE}/admin/me`, {
            headers: authHeaders()
        });

        if (!response.ok) {

            // Token expired/invalid — clear it and require a fresh login.
            adminToken = null;
            localStorage.removeItem("adminToken");
            return;

        }

        adminPanel.classList.remove("hidden");

        loadContacts();

    }

    catch (error) {

        console.log(error);

    }

}

/*=====================================================
            LOGOUT
=====================================================*/

document.getElementById("logoutBtn").onclick = () => {

    adminToken = null;

    localStorage.removeItem("adminToken");

    adminPanel.classList.add("hidden");

    showToast("Logged Out");

};


/*=====================================================
            CHANGE PASSWORD
=====================================================*/

document.getElementById("changePasswordForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const current_password = document.getElementById("currentPassword").value;
    const new_password = document.getElementById("newPassword").value;

    try {

        const response = await fetch(`${API_BASE}/admin/change-password`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                ...authHeaders()
            },

            body: JSON.stringify({ current_password, new_password })

        });

        const result = await response.json();

        if (!response.ok) {

            showToast(result.detail || "Unable to update password", false);
            return;

        }

        showToast(result.message);

        this.reset();

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", false);

    }

});


/*=====================================================
            INITIAL LOAD
=====================================================*/

loadPhotos();
loadReels();

/*=====================================================
            PHOTO TABLE
=====================================================*/

function renderPhotoTable(data) {

    photoTableBody.innerHTML = "";

    data.forEach(photo => {

        photoTableBody.innerHTML += `

        <tr>

            <td>${photo.id}</td>

            <td>

                <img src="${API_BASE}/uploads/${photo.image_path}">

            </td>

            <td>${photo.category}</td>

            <td>${photo.caption ?? ""}</td>

            <td>${photo.frame_no ?? ""}</td>

            <td>${photo.exposure ?? ""}</td>

            <td>${photo.sort_order}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="openEditModal(${photo.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deletePhoto(${photo.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


/*=====================================================
                UPLOAD PHOTO
=====================================================*/

uploadForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "category",
        document.getElementById("category").value
    );

    formData.append(
        "caption",
        document.getElementById("caption").value
    );

    formData.append(
        "frame_no",
        document.getElementById("frame_no").value
    );

    formData.append(
        "exposure",
        document.getElementById("exposure").value
    );

    formData.append(
        "sort_order",
        document.getElementById("sort_order").value
    );

    formData.append(
        "image",
        document.getElementById("image").files[0]
    );

    try {

        const response = await fetch(
            `${API_BASE}/photos/upload`,
            {

                method: "POST",

                headers: authHeaders(),

                body: formData

            }

        );

        const result = await response.json();

        if (result.success) {

            showToast(result.message);

            uploadForm.reset();

            loadPhotos();

        }

        else {

            showToast("Upload Failed", false);

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", false);

    }

});


/*=====================================================
                DELETE PHOTO
=====================================================*/

async function deletePhoto(id) {

    if (!confirm("Delete this photo?")) return;

    try {

        const response = await fetch(

            `${API_BASE}/photos/${id}`,

            {

                method: "DELETE",

                headers: authHeaders()

            }

        );

        const result = await response.json();

        showToast(result.message);

        loadPhotos();

    }

    catch (err) {

        console.log(err);

        showToast("Delete Failed", false);

    }

}


/*=====================================================
                EDIT MODAL
=====================================================*/

function openEditModal(id) {

    const photo = photos.find(p => p.id === id);

    if (!photo) return;

    document.getElementById("editModal").style.display = "flex";

    document.getElementById("editPhotoId").value = photo.id;

    document.getElementById("editCategory").value = photo.category;

    document.getElementById("editCaption").value = photo.caption || "";

    document.getElementById("editFrame").value = photo.frame_no || "";

    document.getElementById("editExposure").value = photo.exposure || "";

    document.getElementById("editSort").value = photo.sort_order;

}


/*=====================================================
                CLOSE EDIT
=====================================================*/

document.getElementById("closeEditModal").onclick = () => {

    document.getElementById("editModal").style.display = "none";

};

document.getElementById("cancelEdit").onclick = () => {

    document.getElementById("editModal").style.display = "none";

};


/*=====================================================
                UPDATE PHOTO
=====================================================*/

document
.getElementById("editPhotoForm")
.addEventListener(

"submit",

async function(e){

e.preventDefault();

const id=document.getElementById("editPhotoId").value;

const formData=new FormData();

formData.append(
"category",
document.getElementById("editCategory").value
);

formData.append(
"caption",
document.getElementById("editCaption").value
);

formData.append(
"frame_no",
document.getElementById("editFrame").value
);

formData.append(
"exposure",
document.getElementById("editExposure").value
);

formData.append(
"sort_order",
document.getElementById("editSort").value
);

try{

const response=await fetch(

`${API_BASE}/photos/${id}`,

{

method:"PUT",

headers: authHeaders(),

body:formData

}

);

const result=await response.json();

showToast(result.message);

document.getElementById("editModal").style.display="none";

loadPhotos();

}

catch(error){

console.log(error);

showToast("Update Failed",false);

}

});


/*=====================================================
            PHOTO SEARCH
=====================================================*/

document
.getElementById("photoSearch")
.addEventListener(

"keyup",

function(){

const keyword=this.value.toLowerCase();

const filtered=photos.filter(photo=>

photo.category.toLowerCase().includes(keyword) ||

(photo.caption||"").toLowerCase().includes(keyword)

);

renderPhotoTable(filtered);

});

/*=====================================================
            REEL TABLE
=====================================================*/

function renderReelTable(data) {

    reelTableBody.innerHTML = "";

    data.forEach(reel => {

        reelTableBody.innerHTML += `

        <tr>

            <td>${reel.id}</td>

            <td>
                <video
                    src="${API_BASE}/uploads/${reel.video_path}"
                    style="width:160px;height:auto;"
                    controls
                    preload="none">
                </video>
            </td>

            <td>${escapeHtml(reel.caption)}</td>

            <td>${reel.sort_order}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteReel(${reel.id})">

                    Delete

                </button>
            </td>

        </tr>

        `;

    });

}


/*=====================================================
                UPLOAD REEL
=====================================================*/

uploadReelForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "caption",
        document.getElementById("reelCaption").value
    );

    formData.append(
        "sort_order",
        document.getElementById("reelSortOrder").value || "0"
    );

    formData.append(
        "video",
        document.getElementById("reelVideo").files[0]
    );

    try {

        const response = await fetch(
            `${API_BASE}/reels/upload`,
            {

                method: "POST",

                headers: authHeaders(),

                body: formData

            }

        );

        const result = await response.json();

        if (result.success) {

            showToast(result.message);

            uploadReelForm.reset();

            loadReels();

        }

        else {

            showToast("Upload Failed", false);

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", false);

    }

});


/*=====================================================
                DELETE REEL
=====================================================*/

async function deleteReel(id) {

    if (!confirm("Delete this reel?")) return;

    try {

        const response = await fetch(

            `${API_BASE}/reels/${id}`,

            {

                method: "DELETE",

                headers: authHeaders()

            }

        );

        const result = await response.json();

        showToast(result.message);

        loadReels();

    }

    catch (err) {

        console.log(err);

        showToast("Delete Failed", false);

    }

}


/*=====================================================
            REEL SEARCH
=====================================================*/

document
.getElementById("reelSearch")
.addEventListener(

"keyup",

function(){

const keyword=this.value.toLowerCase();

const filtered=reels.filter(reel=>

(reel.caption||"").toLowerCase().includes(keyword)

);

renderReelTable(filtered);

});

/*=====================================================
                LOAD CONTACTS
=====================================================*/

async function loadContacts() {

    try {

        const response = await fetch(

            `${API_BASE}/contacts`,

            {
                headers: authHeaders()
            }

        );

        contacts = await response.json();

        renderContacts(contacts);

        document.getElementById("totalContacts").innerText = contacts.length;

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load contacts", false);

    }

}


/*=====================================================
            RENDER CONTACT TABLE
=====================================================*/

function renderContacts(data) {

    contactTableBody.innerHTML = "";

    if (data.length === 0) {

        contactTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No Contact Messages
                </td>
            </tr>
        `;

        return;

    }

    data.forEach(contact => {

        contactTableBody.innerHTML += `

        <tr>

            <td>${contact.id}</td>

            <td>${escapeHtml(contact.name)}</td>

            <td>${escapeHtml(contact.email)}</td>

            <td>${escapeHtml(contact.event_date) || "-"}</td>

            <td>${escapeHtml(contact.message)}</td>

            <td>${new Date(contact.created_at).toLocaleDateString()}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteContact(${contact.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


/*=====================================================
                DELETE CONTACT
=====================================================*/

async function deleteContact(id) {

    if (!confirm("Delete this contact message?"))
        return;

    try {

        const response = await fetch(

            `${API_BASE}/contact/${id}`,

            {

                method: "DELETE",

                headers: authHeaders()

            }

        );

        const result = await response.json();

        showToast(result.message);

        loadContacts();

    }

    catch (error) {

        console.error(error);

        showToast("Unable to delete contact", false);

    }

}


/*=====================================================
            CONTACT SEARCH
=====================================================*/

document
.getElementById("contactSearch")
.addEventListener(

"keyup",

function(){

const keyword=this.value.toLowerCase();

const filtered=contacts.filter(contact=>

contact.name.toLowerCase().includes(keyword) ||

contact.email.toLowerCase().includes(keyword) ||

contact.message.toLowerCase().includes(keyword)

);

renderContacts(filtered);

});


/*=====================================================
            MOBILE MENU
=====================================================*/

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/*=====================================================
            SCROLL TO TOP
=====================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopBtn.style.display = "flex";

    }

    else {

        scrollTopBtn.style.display = "none";

    }

});


scrollTopBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


/*=====================================================
            NAVBAR EFFECT
=====================================================*/

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 60) {

        header.style.background = "#000";

    }

    else {

        header.style.background = "rgba(0,0,0,.45)";

    }

});


/*=====================================================
            WHATSAPP BUTTON
=====================================================*/

document
.querySelector(".whatsapp-btn")
.addEventListener(

"click",

function(e){

e.preventDefault();

window.open(

"https://wa.me/91XXXXXXXXXX",

"_blank"

);

});


/*=====================================================
            CLOSE MODALS
=====================================================*/

window.onclick = function(event){

if(event.target===adminModal){

adminModal.style.display="none";

}

if(event.target===lightbox){

lightbox.classList.remove("active");

}

if(event.target===document.getElementById("editModal")){

document.getElementById("editModal").style.display="none";

}

};


/*=====================================================
            PAGE LOADING
=====================================================*/

function showLoading(){

const loading=document.getElementById("pageLoading");

if(loading){

loading.classList.remove("hidden");

}

}

function hideLoading(){

const loading=document.getElementById("pageLoading");

if(loading){

loading.classList.add("hidden");

}

}


/*=====================================================
            INITIALIZE
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadPhotos();

    loadReels();

    tryAutoLogin();

});


console.log("Photography Portfolio Loaded Successfully");