import './assets/css/index.css'

function component() {
    let element = document.createElement('div');
    element.classList.add('red')
    return element;
}

document.body.appendChild(component());