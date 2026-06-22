const imagens = document.querySelectorAll('.imagem'); 
const Esquerda = document.getElementById('esquerda');
const Direita = document.getElementById('direita');

let indiceAtual = 0;

function atualizarBorda() {
    imagens.forEach(img => img.classList.remove('selecionada'));
    
    imagens[indiceAtual].classList.add('selecionada');
}

Direita.addEventListener('click', () => {
    if (indiceAtual < imagens.length - 1) {
        indiceAtual++; 
        atualizarBorda();
    }
});

Esquerda.addEventListener('click', () => {
    if (indiceAtual > 0) {
        indiceAtual--;
        atualizarBorda();
    }
});