function send_message() {
    const input = document.querySelectorAll(".active-contact-content")[0].children[2].children[1];
    const text = input.value;
    if (text != null  &&  text.trim() != "") {
        const message = document.createElement("span");
        message.innerHTML = `<span class="sent-message">${text}</span>`;
        const id = document.querySelectorAll(".active-contact-content")[0].id;
        document.querySelector(`#${id}`)
                .children[1]
                .insertBefore(message, document.querySelector(`#${id}`).children[1].firstElementChild);
        input.value = "";
    }
    input.focus();
    
}

function manage_key_presses(event) {
    if (`${event.key}` == "Enter") {
        if (event.shiftKey) document.querySelectorAll(".active-contact-content")[0].children[2].children[1].value += "n";
        else document.querySelectorAll(".active-contact-content")[0].children[2].children[2].click();
    }
    else if (`${event.key}` == "Escape") document.querySelectorAll(".active-contact-content")[0].children[2].children[1].blur();
    if (!event.ctrlKey && `${event.key}`.length==1 && /[a-zA-Z0-9-_ ]/.test(`${event.key}`)) {
        const input = document.querySelectorAll(".active-contact-content")[0].children[2].children[1];
        if (input.value.length / 98 > 1  ||  input.value.length - 98 >= 0) input.value += "n";
    }
}
