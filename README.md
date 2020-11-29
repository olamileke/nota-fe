### Nota-Fe

------------
A notes app with wysiwyg formatting and versioning. Create notes, update down, generate pdfs for download. Written in React. 

The backend is written in express and is available [here](https://github.com/olamileke/nota-be "here"). 

View the live application [here](https://notaapp.netlify.app "here").

To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). 

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/nota-fe.git
```

When cloning is complete, navigate into the application directory by running

```
cd nota-fe
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Navigate to the src/app/services directory and set the baseUrl option in api.js on line 19 to http://localhost:4000/ or whatever url the cloned backend is running on.

Still in the terminal, run

```
npm start
```
When the application is done compiling, access it at localhost:3000.



