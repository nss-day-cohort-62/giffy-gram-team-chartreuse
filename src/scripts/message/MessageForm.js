import { getUsers, saveMessage, getShowForm, toggleShowForm, toggleShowPrivateMessage} from "../data/provider.js";

let showMessageForm = getShowForm()
const applicationElement = document.querySelector('.giffygram')

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessageIcon') {
        toggleShowForm()
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessage__submit') {
        let recipient = document.querySelector("#directMessage__userSelect").value 
        let messages = document.querySelector('input[name="message"]').value
        let [, recipientId] = recipient.split("--")

        const messageObject = {
            senderId: parseInt(localStorage.getItem('gg_user')),
            recipientId: parseInt(recipientId),
            text: messages
        }
        saveMessage(messageObject)
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'directMessage__close') {
        setShowForm(false)
    }
})

document.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'DMCount') {
        toggleShowPrivateMessage()
    }
})

export const MessageForm = () => {
    let showMessageForm = getShowForm()
    let users = getUsers()
    let html = ''
    if (!showMessageForm) {
        return ``
    } else {
        html +=
        `<article class="directMessage">
            <h2>Direct Message</h2>
            <section>Recipient:
                <select id="directMessage__userSelect" class="message__input">
                    <option>Choose Recipient</option>
                    
                    ${ users.map(user => `<option value="recipient--${user.id}">${user.name}</option>"`).join('')}
    
                </select>
            </section>
        

        <section>
        <label for="message">Message</label>
        <input name="message" class="message__input" type="text" placeholder="Message..." />
        </section>
        
        <button id="directMessage__submit">Save</button>
        <button id="directMessage__cancel">Cancel</button>
        <button id="directMessage__close>">x</button>
        
        </article>`

}
return html
}
