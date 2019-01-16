import '../styles/main.scss';

const ul = document.querySelectorAll('ul');
const li = document.querySelectorAll('ul li');

for(const el of li) {
    el.setAttribute('draggable', true);
    el.addEventListener('dragstart', dragStart);
    el.addEventListener('dragend', dragEnd);
}

for(const el of ul) {
    el.addEventListener('dragover', dragOver);
    el.addEventListener('drop', drop);
}

function dragStart(e) {
    if(this.id) {
        e.dataTransfer.setData('id', '#' + this.id);
        e.dataTransfer.setData('remove-id', 'no');
    } else {
        const id = 'dragged-' + Math.floor(Math.random() * 1000);
        this.id = id;
        e.dataTransfer.setData('id', '#' + id);
        e.dataTransfer.setData('remove-id', 'yes');
    }

    setTimeout(() => this.classList.add('draggable'), 0);
}

function dragEnd(e) {
    this.classList.remove('draggable');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    const id = e.dataTransfer.getData('id');
    const el = document.querySelector(id);
    el.className = this.className + '__item';

    if(e.target.tagName.toLowerCase() === 'li') {
        e.target.before(el);
    } else {
        this.append(el);
    }

    if(e.dataTransfer.getData('remove-id') === 'yes') {
        el.removeAttribute('id');
    }

    e.dataTransfer.clearData();
}