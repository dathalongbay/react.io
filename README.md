# react.io
## Xây dựng ứng dụng Shopping Cart
## Cấu trúc thư mục
![image](https://user-images.githubusercontent.com/6966136/183286769-0058295b-d5bd-44cf-b2ff-b45718702837.png)
![image](https://user-images.githubusercontent.com/6966136/183286789-a77405d9-e6a1-467d-b086-1d9307b5e06c.png)

tạo 1 file File package.json với nội dung như sau : 
```
{
  "name": "react",
  "version": "1.0.0",
  "description": "React example starter project",
  "keywords": [
    "react",
    "starter"
  ],
  "main": "src/index.js",
  "dependencies": {
    "axios": "0.20.0",
    "bootstrap": "4.5.2",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-redux": "7.2.1",
    "react-router-dom": "5.2.0",
    "react-scripts": "3.4.3",
    "redux": "4.0.5",
    "redux-thunk": "2.3.0"
  },
  "devDependencies": {
    "typescript": "3.8.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```

## Thêm file index.js
```
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./stores";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
## Nội dung file App.js
```
import React from 'react';
import {BrowserRouter as Router,Link, Route,Switch} from 'react-router-dom'
import Cart from './components/Cart';
import Header from './components/Header';
import Product from './components/Product';
function App() {
  return (
     <Router>
        <div className="container">
            <Header />
            <Switch>
               <Route path="/" exact component={Product} />
               <Route path="/carts" exact component={Cart} />
            </Switch>
        </div>
     </Router>
  );
}

export default App;
```
## Thêm file styles.css
```
.App {
  font-family: sans-serif;
  text-align: center;
}
```
