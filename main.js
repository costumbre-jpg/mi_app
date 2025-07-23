 import { auth } from './firebase.js'; // o './js/firebase.js' según tu carpeta


    // Configuración Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAUmoN-7nIaYSRFAq2pN3J_AyWLfU1iuYI",
    authDomain: "costum-e7c55.firebaseapp.com",
    projectId: "costum-e7c55",
    storageBucket: "costum-e7c55.appspot.com",
    messagingSenderId: "323021509339",
    appId: "1:323021509339:web:b20c90983856b002dd32fe",
    measurementId: "G-TTF8D0FVLS"
  };

  

  // Variables de elementos
  const splash = document.getElementById("splash");
  const bienvenida = document.getElementById("bienvenida");
  const tour = document.getElementById("tour");
  const registro = document.getElementById("registro");
  const login = document.getElementById("login");
  const slides = document.querySelectorAll('.slide');
  let index = 0;

  // Bloquear y permitir scroll
  function bloquearScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function permitirScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  // Mostrar bienvenida después de 3 segundos
  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";
    bienvenida.style.opacity = "1";
    bienvenida.style.pointerEvents = "auto";
  }, 3000);

  // Al hacer clic en "Entrar", mostrar tour y bloquear scroll
  document.getElementById("entrarBtn").addEventListener("click", () => {
    bienvenida.style.opacity = "0";
    bienvenida.style.pointerEvents = "none";

    const video = document.getElementById("tourVideo");
    if (video) {
      video.play().catch((err) => {
        console.warn("El navegador bloqueó el autoplay:", err);
      });
    }

    bloquearScroll();
    tour.scrollIntoView({ behavior: 'smooth' });
  });

  // Pasar al siguiente slide del tour
  function nextSlide() {
    slides[index].classList.remove('active');
    index++;
    if (index >= slides.length) index = slides.length - 1;
    slides[index].classList.add('active');
  }

  // Ir a registro desde el tour y permitir scroll
  function irARegistro() {
    permitirScroll();
    tour.classList.add('hidden');
    registro.scrollIntoView({ behavior: 'smooth' });
    login.classList.remove('active');
  }

  // Mostrar login y permitir scroll
  function mostrarLogin(event) {
    event.preventDefault();
    permitirScroll();
    login.classList.add('active');
    login.classList.remove('hidden');
    registro.classList.remove("active");
    registro.classList.add("hidden");
    tour.classList.add('hidden');
    login.scrollIntoView({ behavior: 'smooth' });
  }

  // Mostrar registro y permitir scroll
  function mostrarRegistro(event) {
    event.preventDefault();
    permitirScroll();
    registro.classList.remove('hidden');
    registro.classList.add('active');
    login.classList.remove('active');
    login.classList.add("hidden");
    tour.classList.add('hidden');
    registro.scrollIntoView({ behavior: 'smooth' });
  }

  // Mostrar u ocultar contraseña
  function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
  }

  // Crear cuenta con email y contraseña
  function crearCuenta(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Cuenta creada: " + userCredential.user.email);
        window.location.href = "home.html";

 
      })
      .catch(error => alert("Error: " + error.message));
  }

  // Iniciar sesión con email y contraseña
  function iniciarSesion(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Bienvenido: " + userCredential.user.email);
        window.location.href = "home.html";

      })
      .catch(error => alert("Error: " + error.message));
  }

  // Manejar registro desde formulario
  function handleRegister() {
    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;

    if (!nombre || !email || !pass1 || !pass2) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (pass1 !== pass2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (pass1.length < 12) {
      alert("La contraseña debe tener al menos 12 caracteres.");
      return;
    }

    crearCuenta(email, pass1);
    window.location.href = "home.html";

  }

  // Manejar inicio de sesión desde formulario
  function handleLogin() {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passLogin').value;

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    iniciarSesion(email, password);
    window.location.href = "home.html";

  }

  // Cerrar sesión
  function cerrarSesion() {
    auth.signOut().then(() => {
      alert("Has cerrado sesión");
      document.getElementById("home").classList.add("hidden");
      document.getElementById("bienvenida").style.opacity = "1";
      document.getElementById("bienvenida").style.pointerEvents = "auto";
    }).catch((error) => {
      alert("Error al cerrar sesión: " + error.message);
    });
  }

  // Mostrar home y ocultar otras secciones
  function mostrarHome() {
    ["registro", "login", "tour"].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.classList.add("hidden");
    });

    bienvenida.style.opacity = "0";
    bienvenida.style.pointerEvents = "none";

    const home = document.getElementById("home");
    if(home) home.classList.remove("hidden");

  }

  // Login con Google
  function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        alert("Login Google exitoso: " + result.user.email);
        mostrarHome();
      })
      .catch(error => alert("Error Google: " + error.message));
  }

  // Login con Facebook
  function loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        alert("Login Facebook exitoso: " + result.user.email);
        mostrarHome();
      })
      .catch(error => alert("Error Facebook: " + error.message));
  }

  // Login con Apple (requiere configuración adicional)
  function loginApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    auth.signInWithPopup(provider)
      .then(result => {
        alert("Login Apple exitoso: " + result.user.email);
        mostrarHome();
      })
      .catch(error => alert("Error Apple: " + error.message));
  }
  