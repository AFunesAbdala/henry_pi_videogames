import { BrowserRouter as Router } from 'react-router-dom';
import { assert, describe, expect, it } from "vitest"
import { render , screen } from '@testing-library/react'

import DetailVideogame from './DetailVideogame';

describe('CardVideogame Component', () => {

  it('Should render with props videogames as an object with "name", "description", "rating", "released", "genres" (Array), "platforms" (Array)', () => {
    const videogame = {
      id: 1,
      name : "Destiny 2",
      description : "Lorem ipsum amet",
      image : "https://cdn.akamai.steamstatic.com/steam/apps/1085660/capsule_616x353_spanish.jpg?t=1702506550",
      genres : [{ name : "Action"}, { name : "Adventure" }],
      platforms : ["PC", "Xbox"],
      released : "99/99/9999",
      rating : "4.5"
    };

    render(
      <Router>
        <DetailVideogame videogame={videogame} />
      </Router>
    )

    expect(screen.getAllByTestId("name")[0].textContent).toBe(videogame.name)
    expect(screen.getAllByTestId("rating")[0].textContent).toBe(videogame.rating)
    expect(screen.getAllByTestId("description")[0].textContent).toBe(videogame.description)
    
    const imageElement = screen.getByAltText(videogame.name)
    assert.equal(imageElement.src, videogame.image)


    videogame.genres.map((genre, index) => {
      return expect(screen.getAllByTestId("genre")[index].textContent).toBe(genre.name)
    })

    const platformElements = screen.getAllByTestId('platform')

    videogame.platforms.forEach((currentPlatform, index) => {
        const currentPlatformElement = platformElements[index]

        assert.equal(currentPlatformElement.getAttribute('data-tooltip'), currentPlatform)
    })

    const releasedElement = screen.queryByText(`Released at: ${videogame.released}`)
    assert.ok(releasedElement)

  })

})