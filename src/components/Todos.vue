<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>

            <input
                v-model="newTodo"
                type="text"
                class="new-todo"
                placeholder="Ajouter une tâche"
                @keyup.enter="addTodo"
            />
        </header>
        <div class="main">
            <input type="checkbox" v-model="allDone" class="toggle-all" id="toggle-all">
            <label for="toggle-all">Tous cochés</label>
            <ul class="todo-list">
                <li
                    class="todo"
                    v-for="todo in filteredTodos"
                    :key="todo.name"
                    :class="{completed: todo.completed, editing: todo === editing}"
                >
                    <div class="view">
                        <input type="checkbox" v-model="todo.completed" class="toggle">
                        <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                    </div>
                    <input
                        type="text"
                        class="edit"
                        v-model="todo.name"
                        @keypress.enter="editDone"
                        v-focus="todo === editing"
                        @keyup.esc="cancelEdit"
                    />
                </li>
            </ul>
        </div>
        <footer class="footer" v-if="hasTodo">
            <span class="todo-count"><strong>{{ remaining }}</strong> tâche(s) à faire</span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter == 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
                <li><a href="#" :class="{selected: filter == 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter == 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-if="completed" @click.prevent="deleteCompleted">Supprimer les tâches finies</button>
        </footer>
    </section>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      todos: [],
      newTodo: '',
      filter: 'all',
      editing: null,
      oldTodo: ''
    }
  },
  methods: {
    addTodo () {
      this.todos.push({
        name: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    deleteTodo (todo) {
      this.todos = this.todos.filter(i => i !== todo)
    },
    deleteCompleted () {
      this.todos = this.todos.filter(i => !i.completed)
    },
    editTodo (todo) {
      this.editing = todo
      this.oldTodo = todo.name
    },
    editDone () {
      this.editing = null
    },
    cancelEdit () {
      this.editing.name = this.oldTodo
      this.editDone()
    }
  },
  computed: {
    remaining () { return this.todos.filter(todo => !todo.completed).length },
    completed () { return this.todos.filter(todo => todo.completed).length },
    filteredTodos () {
      if (this.filter === 'todo') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter === 'done') {
        return this.todos.filter(todo => todo.completed)
      } else {
        return this.todos
      }
    },
    allDone: {
      get () {
        return this.remaining === 0
      },
      set (value) {
        this.todos.forEach(todo => {
          todo.completed = value
        })
      }
    },
    hasTodo () {
      return this.todos.length > 0
    }
  },
  directives: {
    focus (el, value) {
      Vue.nextTick(_ => {
        el.focus()
      })
    }
  }
}
</script>

<style src="../assets/css/todos.css"></style>
<style>
    .main .todo-list .todo .view {
        text-align: left !important;
    }
</style>
