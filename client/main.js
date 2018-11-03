const socket = io.connect('192.168.100.10:80', {'forceNew': true});

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map((val, index) => {
        return (`
            <div class="message">
                <strong>${val.nickname}</strong> says: <br/>
                <span>${val.text}</span>
            </div>
        `);
    }).join(' ');

    const div_msgs = document.querySelector(".messages");
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight; 

}

function addMessage(e) {
    const message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.querySelector('#nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}