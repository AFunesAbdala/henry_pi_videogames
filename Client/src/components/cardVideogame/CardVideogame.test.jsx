import { BrowserRouter as Router } from 'react-router-dom';
import { assert, describe, expect, it } from "vitest"
import { render , screen } from '@testing-library/react'

import CardVideogame from './CardVideogame';

describe('CardVideogame Component', () => {

  it('Should render with props (name, image, genres (Array of Objects), rating)', () => {
    const props = {
      name : "Destiny 2",
      image : "https://cdn.akamai.steamstatic.com/steam/apps/1085660/capsule_616x353_spanish.jpg?t=1702506550",
      genres : [{ name : "Action"}, { name : "Adventure" }],
      rating : "4.5"
    };

    render(
      <Router>
        <CardVideogame {...props} />
      </Router>
    )

    expect(screen.getAllByTestId("name")[0].textContent).toBe(props.name)
    expect(screen.getAllByTestId("rating")[0].textContent).toBe(props.rating)
    
    const imageElement = screen.getByAltText(props.name)
    assert.equal(imageElement.src, props.image)


    props.genres.map((genre, index) => {
      return expect(screen.getAllByTestId("genre")[index].textContent).toBe(genre.name)
    })
  })

})