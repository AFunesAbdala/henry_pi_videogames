const isURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
const isDATE = /(\d{4})-(\d{2})-(\d{2})/

export const Validate = (property, errors, setErrors, videogameData) => {
    
    if (property === "name") {
        if (!videogameData.name) {
            setErrors({...errors, name : "Enter the title of your video game"})
        } else if (videogameData.name.length > 40 ) {
            setErrors({...errors, name : "Title must be under 40 characters"})
        } else {
            setErrors({...errors, name : ""})
        }
    }
    
    if (property === "image") {
        if (!videogameData.image) {
            setErrors({...errors, image : "Enter the URL of your video game's image"})
        } else if (!isURL.test(videogameData.image)) {
            setErrors({...errors, image : "Image must be an URL"})
        } else {
            setErrors({...errors, image : ""})
        }
    }

    if (property === "description") {
        if (!videogameData.description) {
            setErrors({...errors, description : "Enter the description of your video game"})
        } else if (videogameData.description.length < 200 ) {
            setErrors({...errors, description : "Description has to be at least 200 characters"})
        } else {
            setErrors({...errors, description : ""})
        }
    } 

    if (property === "released") {
        if (!videogameData.released) {
            setErrors({...errors, released : "Enter the date of your video game's release"})
        } else if (!isDATE.test(videogameData.released)) {
            setErrors({...errors, released : "This field must be a date"})
        } else {
            setErrors({...errors, released : ""})
        }
    }

    if (property === "genres") {
        if (videogameData.length === 0) {
            setErrors({...errors, genres : "Select at least one genre"})
        } else {
            setErrors({...errors, genres : ""})
        }
    }

    if (property === "platforms") {
        if (videogameData.length === 0) {
            setErrors({...errors, platforms : "Select at least one platform"})
        } else {
            setErrors({...errors, platforms : ""})
        }
    }
}