const assert = require("assert")
const searchProduct = require("../searchProduct")


describe("Search a product", () => {
    
    it("display product name ", () => {

       return searchProduct("kraken").then(response => {
        assert.equal(response.message, "Product find.")
       })
    })


/*
   it("find user with email ", async () => {
    const response = await findUser("tassin@gmail.com")
    assert.equal(response.message, "Utilisateur trouvé.")
 })
 */

})



