function open_modal() {
    const overlay = document.querySelectorAll("[data-add-contact-overlay]")[0];
    const modal = document.querySelectorAll("[data-add-contact-modal-content]")[0];
    const clsbtn = document.querySelectorAll("[data-close-modal]")[0];
    const btn = document.querySelectorAll("[data-add-contact]")[0];
    const input_box = document.querySelectorAll("[data-add-contact-modal-input]")[0];
    const null_tag = document.querySelectorAll("[data-null-tag]")[0];
    const multiple_tag = document.querySelectorAll("[data-existing-contact]")[0];
    const root = document.querySelector(":root");
    

    btn.addEventListener("mouseenter", function() {
        root.style.setProperty("--ion-color-primary", getComputedStyle(root).getPropertyValue("--pure-white"));
    });
    btn.addEventListener("mouseleave", function() {
        root.style.setProperty("--ion-color-primary", getComputedStyle(root).getPropertyValue("--ion-color-light"));
    });
    btn.addEventListener("click", function() {
        overlay.style.display = "grid";
        overlay.style.animation = "overlayShow 300ms linear forwards";
        modal.style.animation = "addContactModalShow 300ms linear forwards";
        clsbtn.style.animation = "addContactModalColorShow 300ms linear forwards";
        modal.children[1].style.animation = "addContactModalColorShow 300ms linear forwards";
        modal.children[2].style.animation = "addContactModalInputShow 300ms linear forwards";
        modal.children[3].style.animation = "addContactModalSubmitShow 300ms linear forwards";
        setTimeout(() => {
            for (let i=0; i < modal.children.length; i++) {
                modal.children[i].style.animation = "";
            }
        }, 300);
        null_tag.style.display = "none";
        multiple_tag.style.display = "none";
        input_box.value = "";
        input_box.focus();
    });

    clsbtn.addEventListener("mouseenter", function() {
        clsbtn.style.color = "#20212a";
        clsbtn.onmousedown = function() {
            clsbtn.style.color = "#000";
        }
    });
    clsbtn.addEventListener("mouseleave", function() {
        clsbtn.style.color = "";
    });
    clsbtn.addEventListener("click", function() {
        input_box.blur();
        overlay.style.animation = "overlayHide 200ms linear forwards";
        modal.style.animation = "addContactModalHide 200ms linear forwards";
        clsbtn.style.animation = "addContactModalColorHide 200ms linear forwards";
        modal.children[1].style.animation = "addContactModalColorHide 200ms linear forwards";
        modal.children[2].style.animation = "addContactModalInputHide 200ms linear forwards";
        modal.children[3].style.animation = "addContactModalSubmitHide 200ms linear forwards";
        if (multiple_tag.style.display == "block") {
            multiple_tag.style.animation = "addContactModalFlagHide 200ms linear forwards";
        }
        if (null_tag.style.display == "block") {
            null_tag.style.animation = "addContactModalFlagHide 200ms linear forwards";
        }
        setTimeout(() => {
            overlay.style.display = "none";
            null_tag.style.display = "none";
            multiple_tag.style.display = "none";
            input_box.value = ""
        }, 200);
    });
    
    window.onclick = function(event) {
        if (event.target == overlay) clsbtn.click();
    }
    
    document.addEventListener("keydown", function(event) {
        if (`${event.code}` == "Escape") {
            if (input_box === document.activeElement) input_box.blur();
            else clsbtn.click();
        }
    });
}

function toggle_contact() {
    const contact_btns = document.querySelectorAll("[data-contact-btn]");
    
    contact_btns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const contact_content_main = document.querySelectorAll(".contact-content-main")[0];
            if (contact_content_main.style.display != "none") contact_content_main.style.display = "none";
            if (document.querySelectorAll(".focused-contact")[0]) {
                const focused_contact = document.querySelectorAll(".focused-contact")[0];
                const contact = document.getElementById(focused_contact.getAttribute("data-contact-btn"));
                contact.className = contact.className.replace(" active-contact-content", "");
                focused_contact.className = focused_contact.className.replace(" focused-contact", "");
            }
            btn.classList.add("focused-contact");
            document.getElementById(btn.getAttribute("data-contact-btn")).classList.add("active-contact-content");
        });
    });
}

function add_contact() {
    const submit = document.querySelectorAll("[data-add-contact-modal-submit]")[0];
    const input = document.querySelectorAll("[data-add-contact-modal-input]")[0];
    const multiple_tag = document.querySelectorAll("[data-existing-contact]")[0];
    const null_tag = document.querySelectorAll("[data-null-tag]")[0];
    
    submit.addEventListener("click", function() {
        const text = input.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#47;");
        null_tag.style.display = "none";
        multiple_tag.style.display = "none";
        if (text != null && text != "") {
            if (document.getElementById(text)) setTimeout(() => { multiple_tag.style.display = "block"; }, 10);
            else {
                // const hr = document.createElement("hr");
                // hr.classList.add("hr");
                const contact_btn = document.createElement("button");
                contact_btn.setAttribute("data-contact-btn", `${text}`);
                contact_btn.classList.add("contact");
                contact_btn.dataset.contact = "";
                contact_btn.innerHTML =`<img src="#" alt="">
                                        <p> ${text} </p>`;
                document.querySelectorAll("[data-contact-list]")[0].appendChild(contact_btn);
                const contact_content = document.createElement("div");
                contact_content.id = `${text}`;
                contact_content.classList.add("contact-content");
                contact_content.innerHTML =`<div class="contact-name"><img src="#" alt=""><p>${text}</p></div>
                                            <div class="message-area"></div>
                                            <div class="message-bar">
                                                <span class="attach" title="Atașați"><ion-icon name="attach-outline" color="medium" class="paperclip"></ion-icon></span>
                                                <input type="text" class="send-message-box" id="send_message_box" placeholder="Scrieți un mesaj" onkeydown="manage_key_presses(event)">
                                                <span class="send" title="Trimiteți" onclick="send_message()"><ion-icon name="send" color="medium" class="send-arrow"></ion-icon></span>
                                            </div>`
                document.querySelectorAll("[data-contacts-area]")[0].appendChild(contact_content);
                document.querySelectorAll("[data-close-modal]")[0].click();
                toggle_contact();
            }
        }
        else {
            setTimeout(() => {
                null_tag.style.display = "block";
            }, 10);
        }
    });

    input.addEventListener("keydown", function(event) {
        if (`${event.code}` == "Enter") submit.click();
    });
}



open_modal();
toggle_contact();
add_contact();
