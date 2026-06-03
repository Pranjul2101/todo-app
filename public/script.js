const API = 'http://localhost:3000/todos'

async function fetchTodos() {
    const res = await fetch(API)
    const todos = await res.json()
    const list = document.getElementById('todoList')
    list.innerHTML = ''
    todos.forEach(todo => {
        const li = document.createElement('li')
        li.innerHTML = `
            <span>${todo.title}</span>
            <button class="delete-btn" onclick="deleteTodo('${todo._id}')">Delete</button>
        `
        list.appendChild(li)
    })
}

fetchTodos()

document.getElementById('addBtn').onclick = async function() {
    const input = document.getElementById('todoInput')
    const title = input.value.trim()
    if (!title) return
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    input.value = ''
    fetchTodos()
}

async function deleteTodo(id) {
    await fetch(API + '/' + id, {
        method: 'DELETE'
    })
    fetchTodos()
}