//login elements
const login = document.querySelector(".login")
const loginForm = document.querySelector(".loginForm")
const loginInput = document.querySelector(".loginInput")


//chat sender elements
const sender = document.querySelector(".login")
const senderForm = document.querySelector(".senderForm")
const senderInput = document.querySelector(".senderInput")
const messagesArea = document.querySelector(".messagesArea")

const textarea = document.querySelector('.sender textarea');

textarea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        const textoDigitado = textarea.value.trim();

        if (textoDigitado !== "") {
            // Chama a função sendMessage para enviar a mensagem
            sendMessage(textoDigitado);
        }
    }
});

const user = {id: "", name: ""}

let websocket

const createMessage = (content, userName) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    const lineBreak = document.createElement("br");

    div.classList.add("messages")
    span.classList.add("userSender")

    div.appendChild(span)
    div.appendChild(lineBreak)

    span.innerHTML = userName
    div.innerHTML += content
    

    const messageReturn = `
            
            <div class="messages">
            <span class="userSender">${userName}</span>
            ${content}
            </div>`

    return messageReturn

}
const scrollScreen = () => {
    //const messagesArea = document.querySelector('.messagesArea');
    const lastMessage = messagesArea.lastElementChild;
    lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
};
const processMessage = ({ data })=>{
    const {userId, userName, content} = (JSON.parse(data))

    const element = createMessage(content, userName)

    messagesArea.appendChild(element)

    scrollScreen()

}

const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value

    login.style.display = "none"


    websocket = new WebSocket("wss://site-frontend-espt.onrender.com")
    websocket.onmessage = processMessage


    console.log(user)


    websocket.onerror = function(error) {
        console.error("Erro ao conectar ao servidor WebSocket:", error);
    };
}
const sendMessage = () => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        content: textarea.value

    }
    websocket.send(JSON.stringify(message))
    textarea.value = ""

}


loginForm.addEventListener("submit", handleLogin)
//senderForm.addEventListener("submit", sendMessage)

