import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;    
    const userFromDatabase = await userService.findUserByEmail(params.get("email"));
    if (userFromDatabase.length == 0) {
      render("login.eta", {
        emailDetail: "This email is not registered",
      });
      return;
    } else if (userFromDatabase.length > 1) {
      render("login.eta", {
        emailDetail: "This email is used once, please check password",
      });
      return;
    }  
    const user = userFromDatabase[0];
    console.log(user);
    const passwordMatches = await bcrypt.compare(
      params.get("password"),
      user.password,
    );  
    if (!passwordMatches) {
      render("login.eta", {
        passwordDetail: "Password is incorrect",
      });
      return;
    }   
    await state.session.set("user", user);
    return response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
    render("login.eta");
};
export { processLogin, showLoginForm };