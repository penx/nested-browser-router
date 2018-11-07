# Nested Browser router

A Nested Browser Router that can be used with React Router, when you want to set a basename on a sub router.


## Usage

`npm install nested-browser-router`

```jsx
import { BrowserRouter } from 'react-router-dom';
import NestedBrowserRouter from 'nested-browser-router';

function App() {
  return <BrowserRouter basename="/path1">
    <Switch>
      ...
      <NestedBrowserRouter>
        <Switch>
          ...
        </Switch>
      </NestedBrowserRouter>
    </Switch>
  </BrowserRouter>
}
```

## Why?

React Router doesn't support nesting BrowserRouter, but sometimes you need to set a basename for a subsection of your application.
