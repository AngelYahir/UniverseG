const opciones = document.querySelector(".opciones");
const navbar = document.querySelector(".barranav");
const btnmenu = document.querySelector(".btn-menu");
const btncerrar = document.querySelector(".btn-cerrar");

btnmenu.onclick = () =>{
    opciones.classList.add("active");
    btnmenu.classList.add("desac");
}

btncerrar.onclick = () => {
    opciones.classList.remove("active");
    btnmenu.classList.remove("desac");
}

window.onscroll = () => {
    this.scrollY > 20 ? navbar.classList.add("stick") : navbar.classList.remove("stick");
}