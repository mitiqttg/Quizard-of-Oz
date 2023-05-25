import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

// Register users
const registerUser = async ({ render, request, response }) => {
  // Get the input data type "form"
  const body = request.body({ type: "form" });
  const params = await body.value;

  // Get email and password
  const email = params.get("email");
  const password = params.get("password");

  const userFromDatabase = await userService.findUserByEmail(email);
  // Checking if the user is already registered, if yes return a message
  if (userFromDatabase && userFromDatabase.length != 0) { 
    return render("registration.eta", {
      emaildetail: email,
      emailDescription: "This email is already registered",
    }); 
  }

  // Checking if the password satisfies length requirements (4 characters), if not return a message
  if (password.length < 4) { 
    return render("registration.eta", {
      emaildetail: email,
      pwDescription: "Password must contain minimum 4 characters",
    });
  }

  // If email and password satisfy the requirements, add the user to database 
  // and direct the user to login page
  await userService.addUser(email, await bcrypt.hash(password));
  return response.redirect("/auth/login");
};

// Show registration form
const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };
