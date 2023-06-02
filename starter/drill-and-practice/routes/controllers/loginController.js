import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

// This function is used for verifying user registered credentials
const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;    

  // Check if the user's email exists in database
  const userFromDatabase = await userService.findUserByEmail(params.get("email"));
  
  // If the email does not exist, return an error message below the login form
  if (userFromDatabase.length == 0) {
    return render("login.eta", {
      emailDetail: "This email is not registered",
    });
  }
  
  // If the email exists, check the input password
  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"), 
    user.password
  ); 
  
  // If password is correct, set the current user and redirect the user to topics page,
  // otherwise, return an error message and stay on the current login page
  if (!passwordMatches) {
    return render("login.eta", {
      email: params.get("email"),
      passwordDetail: "Password is incorrect",
    });
  }   
  await state.session.set("user", user);
  return response.redirect("/topics");
};

// This function shows the login form
const showLoginForm = ({ render }) => {
  render("login.eta");
};

// This function is for log out the current user
const logOut = async ({ response, state }) => {
  await state.session.deleteSession();
  await state.session.set("user", []);
  return response.redirect('/');
}

export { processLogin, showLoginForm, logOut };