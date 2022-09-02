const loadCategories = async() => {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
}

const displayCategories = async(categoriesData) => {
    console.log(categoriesData)
    const categoriesContainer = document.getElementById('all-category');
        categoriesData.forEach(element => {
            const categoriesDiv = document.createElement('div');
            categoriesDiv.innerHTML = `
            <a onclick="loadCategoryList()">${element.category_name}</a>
            `;
            categoriesContainer.appendChild(categoriesDiv);
        });
}

const loadCategoryList = async() => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryList(data.data);
}

const displayCategoryList = async(data) =>{
    console.log(data);
    const categoryDetails = document.getElementById('category-details');
        data.forEach(element => {
            const categoryDetailsDiv = document.createElement('div');
            categoryDetailsDiv.classList.add('card');
            categoryDetailsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="${element.thumbnail_url}" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${element.title}</h2>
                    <p>${element.details}</p>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="grid grid-cols-6 gap-4">
                            <div>
                                <img class="rounded h-full w-12" src="${element.image_url}"/>
                            </div>
                            <div>
                                <p>${element.author.name}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye"> ${element.total_view}</i>
                        </div>
                        <div class="">
                            <button class="btn btn-primary">More...</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            categoryDetails.appendChild(categoryDetailsDiv);
        });
}

loadCategories();