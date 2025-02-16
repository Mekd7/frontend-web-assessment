const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const dogImages = document.getElementById('dogImages');
const loading = document.getElementById('loading');
const error = document.getElementById('error');


// Fetch all dog breeds from the API
async function fetchDogBreeds() {
   const url='https://dog.ceo/api/breeds/list/all'
  try {
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    dogImages.innerHTML = '';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data')};

    const data = await response.json();

    const breeds = Object.keys(data.message);
    displayDogBreeds(breeds);
  } catch (err) {
    error.classList.remove('hidden');
    console.error(err);
  } finally {
    loading.classList.add('hidden');
  }
}

// Display dog breeds and their images
async function displayDogBreeds(breeds) {
  for (const breed of breeds) {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      if (!response.ok) {
        throw new Error('Failed to fetch image')};

      const data = await response.json();

      const img = document.createElement('img');
      img.src = data.message;
      img.alt = breed;
      img.classList.add('dog-image');
      dogImages.appendChild(img);
    } catch (err) {
      console.error(`Failed to fetch image for ${breed}:`, err);
    }
  }
}

// Filter dog breeds based on search input
function filterDogBreeds() {
    const searchTerm = searchInput.value.toLowerCase();
    const images = document.querySelectorAll('#dogImages img');
    let found = false; // Variable to track if any images are found

    images.forEach(img => {
        const breed = img.alt.toLowerCase();
        if (breed.includes(searchTerm)) {
            img.style.display = 'block';
            found = true; // At least one image matches
        } else {
            img.style.display = 'none';
        }
    });

    // Display error message if no images are found
    if (!found) {
        error.classList.remove('hidden');
        error.textContent = `No results found for "${searchTerm}". Please try another breed.`;
    } else {
        error.classList.add('hidden'); // Hide error if results are found
    }
}


// Event listeners
searchButton.addEventListener('click', filterDogBreeds);
searchInput.addEventListener('input', filterDogBreeds);

// Initial fetch
fetchDogBreeds();