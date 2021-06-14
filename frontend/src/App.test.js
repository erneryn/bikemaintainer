import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount}  from 'enzyme'
import { CookiesProvider } from "react-cookie";


describe("It should render an APP",()=>{
  it("render app without crashing",()=>{
    const wrapper = shallow(<App/>)
  })
})
