# Library App
Library App is a full stack React/Spring Book application which allows users to reserve and return library books. 

It has the the following features:
- User authentication via Okta
- Search and filter functions 
- Custom pagination
- Rate and review a book
- Return books
- Payment integration via Stripe
- Differentiation between user and admin portal
- Users are able to seek help from admins, who will be able to respond via a Q&A section
- Admins are able to create, edit and remove books on the app
- Responsive design for both mobile and web
- HTTPS

## Pages
- Home Page  
For quick navigation to explore new books, reserve a book, sign up for the app  

- Search Page  
View and search (via categories or text) for all the books within the library app  

- Individual Book Page  
View an individual book and rate it or leave a review  

- Shelf page  
All the books ever borrowed by the user
Tab design to view books currently on loan or books borrowed previously  
User can manage their book loans here  
Users are required to pay a fine for books that are overdue

- Library Services Page  
Users are able to ask admin questions in case they need help  

- Admin page  
Admins are able to add, edit and delete books on the app  
Admins are able to respond to users' queries here as well   


## Technologies 
- React
- Spring Boot
- MySQL
- Okta
- Stripe 

## Run the App

```javascript
//run the backend
cd 02-backend
//run the file in spring-boot-library/main/java/SpringBootLibraryApplication

//run the frontend
cd 03-frotend/react-library  
npm install   
npm run start