
```
srikanth
├─ client
│  ├─ .env
│  ├─ package.json
│  ├─ public
│  │  ├─ apple.svg
│  │  ├─ assets
│  │  │  └─ images
│  │  │     ├─ hero.png
│  │  │     └─ search.png
│  │  ├─ data.json
│  │  ├─ facebook.svg
│  │  ├─ favicon.ico
│  │  ├─ google.svg
│  │  ├─ house.png
│  │  ├─ index.html
│  │  ├─ login-house.png
│  │  ├─ logo.png
│  │  ├─ manifest.json
│  │  ├─ otp-house.png
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ components
│  │  │  ├─ admin
│  │  │  │  ├─ dashboard
│  │  │  │  │  └─ AdminDashboard.jsx
│  │  │  │  └─ workerslist
│  │  │  │     └─ WorkersList.jsx
│  │  │  ├─ auth
│  │  │  │  ├─ LogIn
│  │  │  │  │  ├─ LogIn.css
│  │  │  │  │  ├─ LogIn.jsx
│  │  │  │  │  └─ ResetPassword
│  │  │  │  │     └─ ResetPassword.jsx
│  │  │  │  ├─ Logout
│  │  │  │  │  └─ Logout.jsx
│  │  │  │  ├─ oauth
│  │  │  │  │  └─ OauthLogin.jsx
│  │  │  │  └─ SignUp
│  │  │  │     ├─ SignUp.css
│  │  │  │     └─ SignUp.jsx
│  │  │  ├─ common
│  │  │  │  ├─ footer
│  │  │  │  │  ├─ Footer.css
│  │  │  │  │  └─ Footer.jsx
│  │  │  │  ├─ header
│  │  │  │  │  ├─ Header.css
│  │  │  │  │  └─ Header.jsx
│  │  │  │  └─ Hero
│  │  │  │     ├─ Hero.css
│  │  │  │     └─ Hero.jsx
│  │  │  ├─ marketplace
│  │  │  │  ├─ filters
│  │  │  │  │  └─ Filters.jsx
│  │  │  │  ├─ homes
│  │  │  │  │  ├─ homes.css
│  │  │  │  │  └─ Homes.jsx
│  │  │  │  ├─ map
│  │  │  │  │  └─ Map.jsx
│  │  │  │  └─ SearchBar
│  │  │  │     └─ SearchBar.jsx
│  │  │  ├─ property
│  │  │  │  ├─ PropertyCard
│  │  │  │  │  ├─ ImageGallery.jsx
│  │  │  │  │  ├─ PropertyCard.css
│  │  │  │  │  ├─ PropertyCard.jsx
│  │  │  │  │  └─ PropertyDetails.jsx
│  │  │  │  └─ PropertyListing
│  │  │  │     ├─ PropertyListing.jsx
│  │  │  │     └─ steps
│  │  │  │        ├─ Amenities.jsx
│  │  │  │        ├─ Description.jsx
│  │  │  │        ├─ Details.jsx
│  │  │  │        ├─ Location.jsx
│  │  │  │        └─ Media.jsx
│  │  │  ├─ routes
│  │  │  │  └─ PrivateRoute.js
│  │  │  └─ user
│  │  │     ├─ ListedProperties
│  │  │     │  └─ ListedProperties.jsx
│  │  │     ├─ Profile
│  │  │     │  └─ Profile.jsx
│  │  │     └─ verification
│  │  │        └─ Verification.jsx
│  │  ├─ context
│  │  │  ├─ Map.js
│  │  │  ├─ modal.css
│  │  │  ├─ Modal.js
│  │  │  └─ Notification.js
│  │  ├─ firebase.js
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ redux
│  │  │  ├─ store.js
│  │  │  └─ user
│  │  │     └─ userSlice.js
│  │  ├─ utils
│  │  │  └─ dates.js
│  │  └─ _codux
│  │     └─ boards
│  ├─ tailwind.config.js
│  └─ yarn.lock
└─ server
   ├─ .env
   ├─ api
   │  ├─ controllers
   │  │  ├─ auth.controller.js
   │  │  ├─ property.controller.js
   │  │  ├─ upload.controller.js
   │  │  └─ user.controller.js
   │  ├─ middleware
   │  │  ├─ property.middleware.js
   │  │  └─ upload.middleware.js
   │  ├─ models
   │  │  ├─ property.model.js
   │  │  └─ user.model.js
   │  ├─ routes
   │  │  ├─ auth.router.js
   │  │  ├─ property.route.js
   │  │  ├─ upload.route.js
   │  │  └─ user.route.js
   │  └─ utils
   │     └─ error.js
   ├─ index.js
   ├─ package.json
   └─ yarn.lock

```