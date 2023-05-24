import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ render, request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  
  const email = params.get("email");
  const password = params.get("password");
  const data = {};
  const existEmail = await userService.findUserByEmail(email); 
  if (existEmail && existEmail.length > 0) { 
    data.emaildescription= "This email is already registered";
  }
  if (password.length < 6) { 
    data.pwdescription= "Password needs to be at least 6 character";
  }
  if (data && data.length >0) {
    return render("registration.eta", data);
  } else {
    await userService.addUser(email, await bcrypt.hash(password));
    return response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };