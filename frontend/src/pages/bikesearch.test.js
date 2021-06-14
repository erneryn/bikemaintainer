import { shallow, mount}  from 'enzyme'
import BikeSearch from './BikeSearch'
import MainLayout from '../layout/mainlayout'
import toJson from 'enzyme-to-json'


describe("Render Bikesearch Page",()=>{
    it("render h1 title in page bike search",()=>{
        const wrapper = mount(<BikeSearch/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})