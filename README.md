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

React Router [doesn't support nesting BrowserRouter](https://github.com/ReactTraining/react-router/issues/5291#issuecomment-311720082), but sometimes you need to set a basename for a subsection of your application.

e.g. so that React Router applications can be distributed as modules and live within parent applications that also use React Router

### Working example

```jsx
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <h1>Application</h1>
        <Link to="/">Home</Link> | <Link to="/sub">Sub app</Link> |{" "}
        <Link to="/sub/sub">Sub sub</Link>
        <Switch>
          <Route exact path="/" render={() => <h2>Home</h2>} />
          <Route
            path="/sub"
            render={() => (
              <NestedBrowserRouter basename="sub">
                <>
                  <h1>Sub app</h1>
                  <Link to="/">Sub Home</Link> | <Link to="/sub">Sub Sub</Link>
                  <Switch>
                    <Route exact path="/" render={() => <h2>Sub Home</h2>} />
                    <Route exact path="/sub" render={() => <h2>Sub Sub</h2>} />
                  </Switch>
                </>
              </NestedBrowserRouter>
            )}
          />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
```

https://codesandbox.io/s/q4l9vo1m89

### Equivalent broken example with BrowserRouter

The following does not work with React Router - try clicking Home and Sub in the two nav bars:

```jsx
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <h1>Application</h1>
        <p>
          Try clicking between sub app and sub sub and note that sub app below
          does not update.{" "}
          <a target="_blank" href="https://codesandbox.io/s/q4l9vo1m89">
            Fixed with NestedBrowserRouter here
          </a>.
        </p>
        <Link to="/">Home</Link> | <Link to="/sub">Sub app</Link> |{" "}
        <Link to="/sub/sub">Sub sub</Link>
        <Switch>
          <Route exact path="/" render={() => <h2>Home</h2>} />
          <Route
            path="/sub"
            render={() => (
              <BrowserRouter basename="sub">
                <>
                  <h1>Sub app</h1>
                  <Link to="/">Sub Home</Link> | <Link to="/sub">Sub Sub</Link>
                  <Switch>
                    <Route exact path="/" render={() => <h2>Sub Home</h2>} />
                    <Route exact path="/sub" render={() => <h2>Sub Sub</h2>} />
                  </Switch>
                </>
              </BrowserRouter>
            )}
          />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
```

https://codesandbox.io/s/04plqpol5l


## Caveats

- This requires React Router @4.4 which is still in beta
- I've only proven a basic use case here, would be interested in feedback and to hear if this works for all use cases. We are planning to use this in production on a large scale, modularised React application that lives across multiple repositories.
- I'm not yet sure how to link from the sub app/router back up to the parent app/router
