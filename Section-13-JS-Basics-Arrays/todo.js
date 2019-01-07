window.setTimeout(function () {
    // ALL JAVASCRIPT GOES HERE
    var todos = ['buy new turtle'];

    var input = prompt("What would you like to do?");

    while (input !== 'quit') {

        if (input === "list") {
            todos.forEach(function(todo, i){
                console.log(i + ": " + todo);
            })
        } else if (input === 'new') {
            var newTodo = prompt("Enter new todo");
            //add to todos array
            todos.push(newTodo);
        }
        var input = prompt("What would you like to do?");

    }
    console.log("OK, you quit the app.");

}, 500);