import {act, fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchResults from '../../components/searchResults/searchResults';

describe('searchResults',  () => {
    it("should render searched videos", ()=>{
       const videos = [{
            id:{
                videoId:"videoId"
            },
            snippet:{
                title:"test title",
                description:"test description",
                thumbnails:{
                    high:{
                        url:"test-image-url"
                    }
                }
            }
       }]
       const {container} = render(<SearchResults videos={videos}/>);
       expect(container).toMatchSnapshot();
       
    });

   
})