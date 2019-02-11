var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
  {
    name: "Cloud's Rest",
    image: "http://www.innerdalen.com/DesktopModules/DigArticle/MediaHandler.ashx?portalid=0&moduleid=387&mediaid=50&width=600&height=400",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ex in luctus efficitur. Aliquam erat volutpat. Donec iaculis tellus ac nisi sagittis consequat. In tempus orci sed aliquam vulputate. Donec ornare metus ut tempus vestibulum. Cras iaculis ex ac turpis tincidunt, a pharetra libero efficitur. Phasellus condimentum augue dolor, eget facilisis magna sagittis eget. Fusce quis porttitor mi. Donec sit amet arcu nisl. Mauris posuere lacinia turpis, vel congue leo tincidunt et."
  },
  {
    name: "Calm Evenings",
    image: "http://www.ilfarmandrecland.com/wp-content/uploads/2017/01/Campsite-camping-grounds-starry-night-sky-%C2%A9-Omepl1-Dreamstime-34354603-e1429194198421-1000x399.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ex in luctus efficitur. Aliquam erat volutpat. Donec iaculis tellus ac nisi sagittis consequat. In tempus orci sed aliquam vulputate. Donec ornare metus ut tempus vestibulum. Cras iaculis ex ac turpis tincidunt, a pharetra libero efficitur. Phasellus condimentum augue dolor, eget facilisis magna sagittis eget. Fusce quis porttitor mi. Donec sit amet arcu nisl. Mauris posuere lacinia turpis, vel congue leo tincidunt et."
  },
  {
    name: "River's Edge",
    image: "http://cumberlandriver.com.au/wp-content/uploads/2014/04/cumberland-external-12.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ex in luctus efficitur. Aliquam erat volutpat. Donec iaculis tellus ac nisi sagittis consequat. In tempus orci sed aliquam vulputate. Donec ornare metus ut tempus vestibulum. Cras iaculis ex ac turpis tincidunt, a pharetra libero efficitur. Phasellus condimentum augue dolor, eget facilisis magna sagittis eget. Fusce quis porttitor mi. Donec sit amet arcu nisl. Mauris posuere lacinia turpis, vel congue leo tincidunt et."
  },
  {
    name: "Mountain View",
    image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1443561122%2FCAMPING0915-Glacier-National-Park.jpg%3Fitok%3D6gQxpDuT&w=450&c=sc&poi=face&q=85",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia ex in luctus efficitur. Aliquam erat volutpat. Donec iaculis tellus ac nisi sagittis consequat. In tempus orci sed aliquam vulputate. Donec ornare metus ut tempus vestibulum. Cras iaculis ex ac turpis tincidunt, a pharetra libero efficitur. Phasellus condimentum augue dolor, eget facilisis magna sagittis eget. Fusce quis porttitor mi. Donec sit amet arcu nisl. Mauris posuere lacinia turpis, vel congue leo tincidunt et."
  }
];

var seedDB = () => {
  //Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    };
    console.log('removed campgrounds');
    // Add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // Add a few comments
          Comment.create(
            {
              text: "This place is great but I wish there was internet",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");

              }
            })
        }
      })
    });
  });

}

module.exports = seedDB;
