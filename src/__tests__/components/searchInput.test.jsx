import {act, fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchInput from '../../components/searchInput/SearchInput'
import axios from 'axios'

jest.mock('../../components/searchResults/searchResults',()=> ()=>{
    const SearchResults = ()=> "searchResults";
    return <SearchResults />
})

describe('searchInput',  () => {
    it("should make api calls and render results on type", async()=>{
        const mockedResponse = Promise.resolve({
            data:{
                items:["video1","video2"],
                nextPageToken:"testToken"
            },
        });
    
        jest.spyOn(axios,'get').mockReturnValue(mockedResponse)
      let inputElement;
       act(()=>{
        render(<SearchInput/>);
         inputElement =  screen.getByTestId("search-input");
        fireEvent.change(inputElement, { target: { value: 'test' } });
       })
        
        await waitFor(() =>  
        {
            expect(axios.get).toHaveBeenCalledWith("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyCKRgwhV0u7mZ90dMQzMuZvigebklwjzLY&pageToken=");
            expect(axios.get).toHaveBeenCalledWith("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=test&type=video&key=AIzaSyCKRgwhV0u7mZ90dMQzMuZvigebklwjzLY&pageToken=testToken");
    
        });
        expect(inputElement).toBeInTheDocument();
    });

    it("should make api call and render results on scroll", async()=>{
        const mockedResponse = Promise.resolve({
            data:{
                items:["video1","video2"],
                nextPageToken:"testToken"
            },
        });
    
        jest.spyOn(axios,'get').mockReturnValue(mockedResponse);
        Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 10});
        Object.defineProperty(document.documentElement, 'scrollTop', {writable: true, configurable: true, value: 10});
        Object.defineProperty(document.documentElement, 'scrollHeight', {writable: true, configurable: true, value: 5});
        
        act(()=>{
            render(<SearchInput/>);
            fireEvent.scroll(document, { target: { scrollY: 100 } });
        })
        
        await waitFor(() =>  
        {
            setTimeout(()=>{
                expect(axios.get).toHaveBeenCalledWith("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=&type=video&key=AIzaSyCKRgwhV0u7mZ90dMQzMuZvigebklwjzLY&pageToken=");
                expect(axios.get).toHaveBeenCalledTimes(2);
            },500)
        });
    })

})