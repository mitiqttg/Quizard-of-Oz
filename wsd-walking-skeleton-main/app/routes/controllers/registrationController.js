import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  
  const email = params.get("email");
  const password = params.get("password");

  const existEmail = await userService.findUserByEmail(email); 
  if (existEmail && existEmail.length > 0) { 
    render("registration.eta", {
      description: "This email is already registered",
    });
    return;
  }
  await userService.addUser(email, await bcrypt.hash(password));
  return response.redirect("/auth/login");
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };