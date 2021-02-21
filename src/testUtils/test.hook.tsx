import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

// Helper to allow us to more easily "inject" hooks into test
const TestHook = ({ callback }: any) => {
  callback();
  return null;
};

export const testHook = (callback: any) => {
  mount(<TestHook callback={callback} />);
};
