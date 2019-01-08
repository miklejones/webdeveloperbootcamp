window.setTimeout(function () {
    // ALL JAVASCRIPT GOES HERE
    var todos = ['buy new turtle'];

    var input = prompt("What would you like to do?");

    while (input !== 'quit') {

        if (input === "list") {
            listTodos();
        } else if (input === 'new') {
            addTodo();
        } else if (input === 'delete') {
            deleteTodo();
        }
        var input = prompt("What would you like to do?");

    }
    console.log("OK, you quit the app.");

    function listTodos() {
        console.log("**********");
        todos.forEach(function (todo, i) {
            console.log(i + ": " + todo);
        });
        console.log("**********");
    };

    function addTodo() {
        var newTodo = prompt("Enter new todo");
        //add to todos array
        todos.push(newTodo);
    };

    function deleteTodo() {
        //ask for index of todo to be deleted
        var index = prompt("Enter index of todo to delete");
        //delete that todo
        console.log(todos[index] + " has been deleted")
        todos.splice(index, 1);
    };

}, 500);