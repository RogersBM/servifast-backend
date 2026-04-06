// 🔗 CONFIGURAÇÕES (ALTERE AQUI)
const BASE_URL = "http://SEU_IP:8080/ServiFastPremium/api";
const API_LOGIN = BASE_URL + "/login";
const API_PROFISSIONAIS = BASE_URL + "/profissionais";

// 🔐 TOKEN
function getToken() {
  return localStorage.getItem("token");
}

// =====================
// 🔐 LOGIN
// =====================
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch(API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro no login");
    return res.json();
  })
  .then(data => {
    // Espera receber { token: "..." }
    localStorage.setItem("token", data.token);

    // Redireciona para tela principal
    window.location.href = "index.html";
  })
  .catch(() => {
    alert("Email ou senha inválidos");
  });
}

// =====================
// 🚪 LOGOUT
// =====================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// =====================
// 📥 CARREGAR PROFISSIONAIS
// =====================
function carregar() {
  fetch(API_PROFISSIONAIS, {
    headers: {
      "Authorization": getToken()
    }
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao buscar dados");
    return res.json();
  })
  .then(data => {
    renderLista(data);
  })
  .catch(() => {
    document.getElementById("lista").innerHTML =
      "<p class='text-danger'>Erro ao carregar dados</p>";
  });
}

// =====================
// 🎨 RENDERIZAÇÃO (UI APP)
// =====================
function renderLista(data) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(p => {
    lista.innerHTML += `
      <div class="col-12">
        <div class="card card-app p-3 mb-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">${p.nome}</h5>
              <small class="text-muted">${p.servico}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="excluir(${p.id})">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// =====================
// ➕ CADASTRAR
// =====================
function cadastrar() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;

  fetch(API_PROFISSIONAIS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    },
    body: JSON.stringify({ nome, servico })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    alert("Salvo com sucesso!");
    window.location.href = "index.html";
  })
  .catch(() => {
    alert("Erro ao salvar");
  });
}

// =====================
// ❌ EXCLUIR
// =====================
function excluir(id) {
  if (!confirm("Deseja excluir este profissional?")) return;

  fetch(`${API_PROFISSIONAIS}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": getToken()
    }
  })
  .then(res => {
    if (!res.ok) throw new Error();
    carregar();
  })
  .catch(() => {
    alert("Erro ao excluir");
  });
}

// =====================
// 📱 NAVEGAÇÃO (APP)
// =====================
function mostrar(tela) {
  document.getElementById("home").style.display = "none";
  document.getElementById("perfil").style.display = "none";

  document.getElementById(tela).style.display = "block";
}

// =====================
// 🚀 INICIALIZAÇÃO
// =====================
document.addEventListener("DOMContentLoaded", () => {

  // Se estiver na tela principal
  if (document.getElementById("lista")) {
    carregar();
  }

  // Se não tiver token, manda pro login
  if (!getToken() && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }

});