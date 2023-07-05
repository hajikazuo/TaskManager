function salvarDados() {
    var title = document.getElementById("titulo").value;
    var description = document.getElementById("descricao").value;
    var date = document.getElementById("data").value;
  
    if (!title || !date) {
      exibirAlerta("Por favor, preencha todos os campos obrigatórios.", "alert-danger");
      return;
    }
  
    var tarefas = localStorage.getItem("tarefas");
  
    if (tarefas) {
      tarefas = JSON.parse(tarefas);
    } else {
      tarefas = [];
    }
  
    tarefas.push({ titulo: title, descriptionText: description, taskDate: date, done: false});
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  
    exibirDados();
    exibirAlerta("Dados salvos com sucesso!", "alert-success");
    limparCampos();
  }
  
  function exibirAlerta(mensagem, tipo) {
    var alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = "";
  
    var alertElement = document.createElement("div");
    alertElement.classList.add("alert", tipo);
    alertElement.textContent = mensagem;
    alertContainer.appendChild(alertElement);
  
    var tempoDesaparecer = 2000;
  
    setTimeout(function () {
      alertContainer.removeChild(alertElement);
    }, tempoDesaparecer);
  }
  
  function exibirDados() {
    var dadosSalvos = document.getElementById("dadosSalvos");
    dadosSalvos.innerHTML = "";
  
    var tarefas = localStorage.getItem("tarefas");
  
    if (tarefas) {
      tarefas = JSON.parse(tarefas);
      console.log(tarefas);
      tarefas.forEach(function (tarefa, index) {
        var card = document.createElement("div");
        card.classList.add("card");
  
        var titleElemento = document.createElement("p");
        titleElemento.textContent = tarefa.titulo;
        card.appendChild(titleElemento);
  
        var descriptionElemento = document.createElement("p");
        descriptionElemento.textContent = tarefa.descriptionText;
        card.appendChild(descriptionElemento);
  
        var dateElemento = document.createElement("p");
        if (tarefa.taskDate) {
          var taskDate = new Date(tarefa.taskDate + "T00:00:00");
          if (!isNaN(taskDate.getTime())) {
            var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            dateElemento.textContent = taskDate.toLocaleDateString("pt-BR", options);
          }
        }
        card.appendChild(dateElemento);
  
        var checkboxContainer = document.createElement("label"); 
        checkboxContainer.className = "checkbox-container";
        var doneCheckbox = document.createElement("input");
        doneCheckbox.type = "checkbox";
        doneCheckbox.checked = tarefa.done;
        doneCheckbox.addEventListener("change", function () {
          tarefa.done = this.checked;
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
        });
        checkboxContainer.appendChild(doneCheckbox);
        var doneText = document.createElement("span"); 
        doneText.textContent = "Feito";
        checkboxContainer.appendChild(doneText);
        card.appendChild(checkboxContainer);
  
        var deleteButton = document.createElement("button");
        deleteButton.className = 'btn btn-secondary'
        deleteButton.textContent = "Excluir";
        deleteButton.setAttribute("onclick", "excluirTarefa(" + index + ")");
        card.appendChild(deleteButton);
        
        dadosSalvos.appendChild(card);
      });
    }
  }
  
  window.addEventListener("DOMContentLoaded", exibirDados);
  
  function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
  }
  
  function excluirTarefa(index) {
    var tarefas = localStorage.getItem("tarefas");
  
    if (tarefas) {
      tarefas = JSON.parse(tarefas);
  
      if (index >= 0 && index < tarefas.length) {
        tarefas.splice(index, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        exibirDados();
      }
    }
  }
  
  function alternarModo() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark");
  
    var toggleButton = document.getElementById("toggleButton");
    if (body.classList.contains("dark")) {
      toggleButton.textContent = "Modo Dia";
    } else {
      toggleButton.textContent = "Modo Noite";
    }
  }
  
  