import { waitFor } from "@testing-library/react";

const waitForStateChange = async (stateChangeFn) => {
  await waitFor(async () => {
    await stateChangeFn();
  });
};

const th = {
  waitForStateChange,
};

export default th;
