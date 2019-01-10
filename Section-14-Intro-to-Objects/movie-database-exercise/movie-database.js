console.log("Movies");
console.log("**********");

var movies = [
    {
        title: "clerks.",
        rating: 10,
        hasWatched: true
    },
    {
        title: "Mall Rats",
        rating: 8,
        hasWatched: true
    },
    {
        title: "Vice",
        rating: 7,
        hasWatched: false
    },
    {
        title: "Drowning Moana",
        rating: 0,
        hasWatched: true
    }
];

for (var i = 0; i < movies.length; i++) {
    let hasSeen = "not seen";
    if (movies[i].hasWatched === true) {
        hasSeen = "watched";
    };
    console.log(
        `You have ${hasSeen} "${movies[i].title}" - ${movies[i].rating}/10`
    );
};