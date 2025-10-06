// DOM要素を取得
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Todo項目の配列
let todos = [];

// 新しいTodoを追加する関数
function addTodo() {
    const todoText = todoInput.value.trim();
    
    // 空の入力チェック
    if (todoText === '') {
        alert('タスクを入力してください');
        return;
    }
    
    // 新しいTodoオブジェクトを作成
    const newTodo = {
        id: Date.now(), // 簡単なID生成
        text: todoText,
        completed: false
    };
    
    // 配列に追加
    todos.push(newTodo);
    
    // 入力欄をクリア
    todoInput.value = '';
    
    // リストを更新
    updateTodoList();
}

// Todoリストを更新する関数
function updateTodoList() {
    // リストをクリア
    todoList.innerHTML = '';
    
    // Todoが空の場合のメッセージ
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">まだタスクがありません</li>';
        return;
    }
    
    // 各Todo項目を表示
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <button class="complete-button" onclick="toggleComplete(${todo.id})">
                ${todo.completed ? '未完了' : '完了'}
            </button>
        `;
        todoList.appendChild(li);
    });
}

// イベントリスナーを追加
addButton.addEventListener('click', addTodo);

// Enterキーでも追加できるように
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 完了状態を切り替える関数
function toggleComplete(todoId) {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        todo.completed = !todo.completed;
        updateTodoList();
    }
}

// 初期表示
updateTodoList();

