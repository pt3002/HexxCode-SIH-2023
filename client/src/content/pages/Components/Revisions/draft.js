export const getRevHTML = (rev) => {
    return rev.body.split("<p><br></p>")
}
    