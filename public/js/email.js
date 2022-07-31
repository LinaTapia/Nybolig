const btn = document.getElementById('button');
const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_9gm7frx';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar';
            alertaExito()
            form.reset()
        }, (err) => {
            btn.value = 'Enviar';
            alert(JSON.stringify(err));
        });
});

//Alerta 
const alertaExito = () => {
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Correo enviado correctamente.',
        confirmButtonColor: '#34BE82',
        timer: 1500
    })
}