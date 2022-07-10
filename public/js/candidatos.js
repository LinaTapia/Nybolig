const URL = `/public/js/candidatos.json`;

const listado = document.getElementById("candidatos-lista");

const obtenerData2 = async () => {
    const ruta = await fetch('/public/js/candidatos.json');
    const data = await ruta.json();
    listado.innerHTML = "";

    data.forEach((post) => {
        listado.innerHTML += `<tr>
        <td><img src="${post.imagen}" alt="${post.nombre}" loading="lazy" height="50" width="50"></td>
        <td>${post.nombre}</td>
        <td><b>${post.perfil}</b></td>
        <td>${post.contacto}</td>
        <td><b>${post.experiencia}</b></td>
        <td><a href="${post.linkedln}">${post.linkedln}</a></td>
    </tr>`
    })
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        obtenerData2(URL)
    }, 500);
})