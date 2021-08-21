# JSON Editor for Material UI 5
A simple editor library for visually editing JSON objects built using Material UI.

## How to use
1. Add as a dependency
```bash
npm i material-jsoneditor
```

2. Import the component into your project
```javascript
import { Editor } from 'material-jsoneditor';
```

3. Add the component to your project
```javascript
const myComponent = () => {
    const [myObj, setObj] = useState({});

    return (
        <Editor value={myObj} onChange={setObj} />
    )
};
```

## Demo
Visit https://andrewlowndes.github.io/material-jsoneditor/dist/ to use the pre-built editor online. Copy your JSON into the right panel and edit on the left.

## Roadmap
- [x] Change types at any depth (number, boolean, string, array, object and null)
- [x] UI Editors for values of all types
- [x] Triggers for all JSON object changes
- [x] Designed for mobile first
- [x] Breadcrumb dropdowns for quick property navigation
- [ ] Drag and drop array editing
- [ ] Tabular view for arrays of objects
- [ ] Easier duplication / mass deletion
- [ ] Inline editing for objects / array primitives
- [ ] Extra UI Editors for Date / Time / DateTime / Colour picker

## Development
Checkout the repo, install dependencies via `npm i` and start the development server via `npm start`.
