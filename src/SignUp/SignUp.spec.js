import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import sh from "../ScreenHelpers";
import th from "../TestHelpers";
import axios from "axios";

const fillForm = async (user) => {
  const username = sh.getInput("Username");
  const email = sh.getInput("Email");
  const password = sh.getInput("Password");
  const confirmPassword = sh.getInput("Confirm password");

  await user.type(username, "farooq");
  await user.type(email, "farooq2foo.com");
  await user.type(password, "P@assword!");
  await user.type(confirmPassword, "P@assword!");

  return {
    username,
    email,
    password,
    confirmPassword,
  };
};

describe("SignUp Component", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUp></SignUp>);
      const heading = sh.getHeading("Sign Up");
      sh.ensureInDocument(heading);
    });

    it("has input for user name", () => {
      render(<SignUp></SignUp>);
      const username = sh.getInput("Username");
      sh.ensureInDocument(username);
    });

    it("has input for email", () => {
      render(<SignUp></SignUp>);
      const email = sh.getInput("Email");
      sh.ensureInDocument(email);
    });

    it("has email type for email input", () => {
      render(<SignUp></SignUp>);
      const email = sh.getInput("Email");
      sh.ensureInputTypeEmail(email);
    });

    it("has input for password", () => {
      render(<SignUp></SignUp>);
      const password = sh.getInput("Password");
      sh.ensureInDocument(password);
    });

    it("has password type for password input", () => {
      render(<SignUp></SignUp>);
      const password = sh.getInput("Password");
      sh.ensureInputTypePassword(password);
    });

    it("has input for confirm password", () => {
      render(<SignUp></SignUp>);
      const confirmPassword = sh.getInput("Confirm password");
      sh.ensureInDocument(confirmPassword);
    });

    it("has password type for confirm password input", () => {
      render(<SignUp></SignUp>);
      const confirmPassword = screen.getByLabelText("Confirm password");
      sh.ensureInputTypePassword(confirmPassword);
    });

    it("has Sign Up button", () => {
      render(<SignUp></SignUp>);
      const button = sh.getButton("Sign Up");
      sh.ensureInDocument(button);
    });

    it("initially disables the Sign Up button", () => {
      render(<SignUp></SignUp>);
      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });
  });

  describe("Interactions", () => {
    let user = null;

    beforeEach(() => (user = userEvent.setup()));

    it("enables the Sign Up button when form is correctly filled out", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        await fillForm(user);
      });

      const button = sh.getButton("Sign Up");
      sh.ensureEnabled(button);
    });

    it("disables the Sign Up button when passwords don't match", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        const { confirmPassword } = await fillForm(user);
        await user.type(confirmPassword, "12345");
      });

      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });

    it("disables the Sign Up button when username is missing", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        const { username } = await fillForm(user);
        await user.clear(username);
      });

      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });

    it("disables the Sign Up button when email is missing", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        const { email } = await fillForm(user);
        await user.clear(email);
      });

      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });

    it("sends user name, email, and password when Sign Up button clicked", async () => {
      const mockFn = jest.fn();
      axios.post = mockFn;

      const user = userEvent.setup();
      render(<SignUp></SignUp>);

      let formElements = null;

      await th.waitForStateChange(async () => {
        formElements = await fillForm(user);
        const button = sh.getButton("Sign Up");
        await user.click(button);
      });

      const mockCalls = mockFn.mock.calls;
      const body = mockCalls[0][1];

      expect(body).toEqual({
        username: formElements.username.value,
        email: formElements.email.value,
        password: formElements.password.value,
      });
    });

    it("disables Sign Up button when only user name is filled out", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        const { email, password, confirmPassword } = await fillForm(user);
        await user.clear(email);
        await user.clear(password);
        await user.clear(confirmPassword);
      });

      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });

    it("disables Sign Up button when only user name and email is filled out", async () => {
      render(<SignUp></SignUp>);

      await th.waitForStateChange(async () => {
        const { password, confirmPassword } = await fillForm(user);
        await user.clear(password);
        await user.clear(confirmPassword);
      });

      const button = sh.getButton("Sign Up");
      sh.ensureDisabled(button);
    });
  });
});
