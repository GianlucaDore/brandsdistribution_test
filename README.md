# About

This project is my submission for ICT Brandsdistribution test. The app is a simple Pokédex app, limited to the 1st gen
(Kanto region), aka the first 151 Pokémons. The API used are from pokéapi.co. Of course, all throughout the application,
cases where the API returned infos on next-generation Pokémons (not present in gen1 and thus in this app) were
properly handled. 

The app is made of 2 pages: Home, the landing page rendered at the URL '/', contains all the first 151 pokemon sprites, 
in a paginated style. By clicking on an entry, you get redirected to the correspondent Pokémon card, rendered at the URL 
'/pokémon/${Pokémon_name}'. You can also rapidly access a specific pokémon card by typing the correspondent URL in the 
browser's bar in the aforementioned syntax. 


## Dependencies

The application makes use of some 3rd party libraries, some of them are well known in the React world:

- react-redux : This is the library that implements the "global application state". The idea is to have a decentralized 
container in which we store a global state, external to the UI, that is accessible to the entire application. In our app,
it basically stores the data of the first 151 Pokémons.

- redux-persist : Famous library to save the global state locally on the user's end. It saves the state and permits to not lose
the data when refreshing the page or when exiting the application. It's also implemented to respect the rules of usage of the
pokeapi.co APIs. By storing the pokédex, we don't need to fetch it again when revisiting the home page or rebooting/refreshing
the application, saving resources on both client's end and server's end. To flush the persisted data, you can run, in the browser's
console, the command localStorage.clear() .

- react-router : Another fundamental library that is the foundation of dynamic manipulation, through JavaScript, of the URLs. Two
routes are defined, Home and Pokemon, respectively the landing page and the specific pokémons' card page. It also enables the
imperative navigation in the app, as well as the redirection after certain events.

- react-pagination : A very useful library that makes a very easy implementation of the pagination specifics. It lets the usage of
the ReactPaginate component, that creates the pagination of the data itself, as well as the pagination indexes that are used to
browse the paginated results.

- react-spinners : A library that implements some spinner elements to display loading phases in the application (which are kept at
minimum thanks to a proper check in the persistent storage each time the application boots).


# Screens and Responsiveness

The following screens represent how the application behaves once the repo is cloned and booted.


![Home_1920x1080](https://github.com/GianlucaDore/brandsdistribution_test/assets/51960987/b4a7d51d-d5e2-4876-9e17-3be711d2199c)


![Home_page5_1920x1080](https://github.com/GianlucaDore/brandsdistribution_test/assets/51960987/18a80ec1-f1b4-4b63-85e2-9ac9fd9f86a4)


![Pokemon_FULL](https://github.com/GianlucaDore/brandsdistribution_test/assets/51960987/4ee92b52-ed54-40de-b00d-9b2893730eec)


![Pokemon_iPadAir](https://github.com/GianlucaDore/brandsdistribution_test/assets/51960987/2cb8641d-4fae-4d89-8a1f-b15485ed137d)


![Pokemon_iPhoneSE](https://github.com/GianlucaDore/brandsdistribution_test/assets/51960987/c9fc797f-6aa5-4578-911a-6af99ca4abd0)




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
