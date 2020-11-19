const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {

    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function pagination (selectedPage, totalPages) {
    
        let pages = [], oldPage;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages

        const pageAfterSelectedPage =  currentPage <= selectedPage + 2
        const pageBeforeSelectedPage = currentPage >= selectedPage - 2

        if(currentPage == 1 || pageBeforeSelectedPage && pageAfterSelectedPage) {

            pages.push(currentPage)

                if(oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }

                if(oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)
                oldPage = currentPage
            }
        }
        return pages
}
