const loadCategories = async() => {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
}

const displayCategories = async(categoriesData) => {
    const categoriesContainer = document.getElementById('all-category');
        categoriesData.forEach(element => {
            const categoriesDiv = document.createElement('div');
            categoriesDiv.innerHTML = `
            <button onclick="loadCategoryList('${element.category_id}')">${element.category_name}</button>
            `;
            categoriesContainer.appendChild(categoriesDiv);
        });
}

const loadCategoryList = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayCategoryList(data.data);
}

const displayCategoryList = async(data) =>{
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.textContent = '';
        data.forEach(element => {
            const categoryDetailsDiv = document.createElement('div');
            categoryDetailsDiv.classList.add('card');
            categoryDetailsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl mb-4">
                <figure><img src="${element.thumbnail_url}" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${element.title}</h2>
                    <p>${element.details.length > 250 ? element.details.slice(0,250) + '...' : element.details}</p>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="grid grid-cols-6 gap-4">
                            <div>
                                <img class="rounded h-full w-12" src="${element.author.img}"/>
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