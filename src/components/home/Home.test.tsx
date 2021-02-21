import * as React from "react";
import { Home } from "./Home";
import { configure, shallow } from "enzyme";
import { Header } from "./navbar/Navbar";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  // @ts-ignore
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    // Add params
  }),
  useRouteMatch: () => ({ url: "/" }),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test("Header rendered", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
});
