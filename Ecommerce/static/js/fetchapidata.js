FethcUrl();
{
  fetch("http://127.0.0.1:8000/api/v1/latest-products/")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

FethcUrl();
