//pegar o container do html para fazer calculo do topo da página até o elemento do texto.
const body = document.querySelector("body");
// pegar o container do texto
const textContainer = document.querySelector(".container");
// pega o valor em pixels da diferença entre o topo do html e o topo do texto.
const screenHeight =
  window.screen.availHeight;
// criar elemento
let bar = document.createElement("div");
// pegar o elemento button para liberar após a leitura.
const button = document.getElementById('send');

// estilo do elemento
bar.style.height = "4px";
bar.style.width = 0;
bar.style.backgroundColor = "#6633cc";
bar.style.position = "fixed";
bar.style.top = 0;
bar.style.left = 0;
bar.style.zIndex = 999;
bar.style.transition = "0.2s";

// adiciona no corpo da página
document.body.append(bar);
let lastScroll = 0;
// atualizar o elemento
function updateBar() {
  // verificar o movimento do scroll
  // tamanho da caixa que contem o texto
  const boxSize = textContainer.offsetHeight;
  // verificar em que posição da página eu estou.
  const pagePosition = window.scrollY + screenHeight;
  //regra de 3
  updatedBar = (pagePosition * 100) / boxSize;
  const widthValue = Math.ceil(updatedBar);
  // trata carregamento da barra somente para frente sem voltar no scrollUp.
  if (pagePosition <= lastScroll) {
  } else {
    lastScroll = pagePosition;
    bar.style.width = `${widthValue}%`;
  }

  // trata se a porcentagem de progresso da leitura foi aproximadamente 100% e tira listener do scroll.
  // também seta um tempo de 200ms ou 0.2s para dar tempo da transição do css ser realizada antes da mensagem.
  if (widthValue >= 95) {
    bar.style.width = `${100}%`;
    setTimeout(() => document.removeEventListener('scroll', updateBar), 400);
    button.removeAttribute('disabled');
  }
}


  window.addEventListener("load", () => {
      document.addEventListener("scroll", updateBar);
  });
