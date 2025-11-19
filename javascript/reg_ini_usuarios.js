// 1. Preloader
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if(preloader) {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }
        });

        // 2. Alternar entre Login y Registro
        function alternarFormularios(modo) {
            const seccionLogin = document.getElementById('seccionInicioSesion');
            const seccionRegistro = document.getElementById('seccionRegistro');
            const titulo = document.getElementById('tituloFormulario');
            const subtitulo = document.getElementById('subtituloFormulario');
            const cajaAlerta = document.getElementById('cajaAlerta');

            // Limpiar alertas
            cajaAlerta.style.display = 'none';
            
            if (modo === 'registro') {
                seccionLogin.classList.add('oculto');
                seccionRegistro.classList.remove('oculto');
                titulo.innerText = "Crear Cuenta";
                titulo.style.color = "#44ffd1";
                subtitulo.innerText = "Únete a INFOTICS hoy mismo";
            } else {
                seccionRegistro.classList.add('oculto');
                seccionLogin.classList.remove('oculto');
                titulo.innerText = "Bienvenido";
                titulo.style.color = "#44ffd1";
                subtitulo.innerText = "Accede a tu panel de control";
            }
        }

        // 3. Mostrar Alertas
        function mostrarAlerta(mensaje, tipo) {
            const cajaAlerta = document.getElementById('cajaAlerta');
            cajaAlerta.className = 'alerta';
            
            if (tipo === 'error') {
                cajaAlerta.classList.add('alerta-error');
            } else if (tipo === 'exito') {
                cajaAlerta.classList.add('alerta-exito');
            }
            
            cajaAlerta.innerText = mensaje;
            cajaAlerta.style.display = 'block';
        }

        // 4. Manejar Inicio de Sesión (Simulado)
        async function manejarInicioSesion(e) {
            e.preventDefault();
            
            const correo = document.getElementById('correoAcceso').value;
            const clave = document.getElementById('claveAcceso').value;
            const boton = document.getElementById('btnInicioSesion');

            boton.disabled = true;
            boton.innerText = "Verificando...";
            document.getElementById('cajaAlerta').style.display = 'none';

            try {
                // TODO: AQUÍ CONECTAR CON TU BASE DE DATOS
                console.log("Enviando credenciales:", { correo });
                
                await new Promise(resolver => setTimeout(resolver, 1500));

                if (clave === "123456") {
                    mostrarAlerta("¡Acceso concedido! Redirigiendo...", "exito");
                    setTimeout(() => {
                        alert("Redirigiendo al Dashboard...");
                        // window.location.href = "/dashboard.html";
                    }, 1000);
                } else {
                    throw new Error("Credenciales incorrectas (Prueba con: 123456)");
                }

            } catch (error) {
                mostrarAlerta(error.message, "error");
                boton.disabled = false;
                boton.innerText = "INICIAR SESIÓN";
            }
        }

        // 5. Manejar Registro (Simulado)
        async function manejarRegistro(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombreRegistro').value;
            const correo = document.getElementById('correoRegistro').value;
            const clave = document.getElementById('claveRegistro').value;
            const confirmarClave = document.getElementById('confirmarClaveRegistro').value;
            const boton = document.getElementById('btnRegistro');

            if (clave !== confirmarClave) {
                mostrarAlerta("Las contraseñas no coinciden.", "error");
                return;
            }

            if (clave.length < 6) {
                mostrarAlerta("La contraseña debe tener al menos 6 caracteres.", "error");
                return;
            }

            boton.disabled = true;
            boton.innerText = "Creando cuenta...";
            document.getElementById('cajaAlerta').style.display = 'none';

            try {
                // TODO: AQUÍ CONECTAR CON TU BASE DE DATOS PARA CREAR USUARIO
                console.log("Registrando usuario:", { nombre, correo });

                await new Promise(resolver => setTimeout(resolver, 2000));

                mostrarAlerta("¡Cuenta creada con éxito!", "exito");
                
                e.target.reset();
                setTimeout(() => {
                    alternarFormularios('login');
                    boton.disabled = false;
                    boton.innerText = "CREAR CUENTA";
                }, 1500);

            } catch (error) {
                mostrarAlerta("Error al registrar: " + error.message, "error");
                boton.disabled = false;
                boton.innerText = "CREAR CUENTA";
            }
        }
