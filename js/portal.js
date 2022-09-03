document.getElementById('spinner').style.display = 'none';
document.getElementById('footer').style.display = 'none';

const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
        try{
            const res = await fetch(url);
            const data = await res.json();
            displayCategories(data.data.news_category);
        }
        catch (error){
            console.log(error);
        }
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
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryList(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const displayCategoryList = async(data) =>{

    document.getElementById('spinner').style.display = 'none';
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.textContent = '';
            data.forEach(element => {
                const categoryDetailsDiv = document.createElement('div');
                categoryDetailsDiv.classList.add('card');
                categoryDetailsDiv.innerHTML = `
                <div class="card lg:card-side bg-base-100 shadow-lg mb-12">
                    <figure><img src="${element.thumbnail_url ? element.thumbnail_url : "No data Found"}" alt="Album"></figure>
                    <div class="card-body">
                        <h2 class="card-title">${element.title ? element.title : "No data Found"}</h2>
                        <p>${element.details.length > 250 ? element.details.slice(0,250) + '...' : element.details}</p>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 gap-4">
                                <div>
                                    <img class="rounded h-full lg:w-16" src="${element.author.img ? element.author.img : "No data Found"}"/>
                                </div>
                                <div>
                                    <p>${element.author.name ? element.author.name : "No data Found"}</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa-solid fa-eye"> ${element.total_view ? element.total_view : "No data Found"}</i>
                            </div>
                            <div>
                                <label for="my-modal-3" onclick="loadNews('${element._id}')" class="btn btn-primary modal-button">More...</label>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                categoryDetails.appendChild(categoryDetailsDiv);
            });

        const totalItems = document.getElementById('total-items');
        totalItems.textContent = '';
                const itemsDiv = document.createElement('div');
                itemsDiv.classList.add('card-body');
                itemsDiv.innerHTML = ` 
                    <p class="text-2xl font-semibold text-center">${data.length} items found</p>
                `;
                totalItems.appendChild(itemsDiv);
}

const loadNews = async(newsId) => {
    document.getElementById('spinner').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displayNewsDetails = async(info) => {
    document.getElementById('spinner').style.display = 'none';
    const newsDetails = document.getElementById('modal-body');
        newsDetails.classList.remove('hidden');
        newsDetails.textContent = '';
        newsDetails.innerHTML =
        `
            <p class="py-4">${info.details}</p>
            <h3 class="font-bold text-lg">Author: ${info.author.name}</h3>
            <h3 class="font-bold text-lg">Published Date: ${info.author.published_date}</h3>
            <h3 class="font-bold text-lg">Rating: ${info.rating.number}</h3>
        `;
}

loadCategories();