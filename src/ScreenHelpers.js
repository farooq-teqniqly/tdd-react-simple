import { screen } from "@testing-library/react";

// const ensureInputType = (element, expectedType) => {
//   expect(element.type).toBe(expectedType);
// };

const sh = {
  getHeading: (text) => {
    return screen.queryByRole("heading", { name: text });
  },
  getInput: (text) => {
    return screen.getByLabelText(text);
  },
  getButton: (text) => {
    return screen.queryByRole("button", { name: text });
  },
  ensureInDocument: (element) => {
    expect(element).toBeInTheDocument();
  },
  ensureDisabled: (element) => {
    expect(element).toBeDisabled();
  },
  ensureEnabled: (element) => {
    expect(element).toBeEnabled();
  },
  ensureInputType: (element, expectedType) => {
    expect(element.type).toBe(expectedType);
  },
  ensureInputTypePassword: (element) => {
    sh.ensureInputType(element, "password");
  },
  ensureInputTypeEmail: (element) => {
    sh.ensureInputType(element, "email");
  },
};

export default sh;
