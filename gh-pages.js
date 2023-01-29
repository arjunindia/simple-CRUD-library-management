import { publish } from "gh-pages";

publish(
  "build", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/arjunindia/simple-CRUD-library-management.git", // Update to point to your repository
    user: {
      name: "Arjun S", // update to use your name
      email: "arjun8107@gmail.com", // Update to use your email
    },
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
