# React Simple Captcha

A lightweight, backend-free, secure-enough React captcha component that renders on a canvas and provides validation utilities.

## Features

- **Zero dependencies** (except React peer dependency)
- **Lightweight** (< 10KB)
- **Frontend only** - no backend required
- **Canvas rendering** - prevents simple HTML scraping
- **Customizable** - length, dimensions, click-to-refresh
- **Validation utility** included

## Installation

```bash
npm install react-simple-captcha
```

## Usage

```jsx
import React, { useState } from 'react';
import { Captcha, validateCaptcha } from 'react-simple-captcha';

const App = () => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    if (validateCaptcha(userInput, captchaValue)) {
      alert('Valid Captcha!');
    } else {
      alert('Invalid Captcha!');
    }
  };

  return (
    <div>
      <Captcha
        length={6}
        width={200}
        height={60}
        onChange={(value) => setCaptchaValue(value)}
      />
      <input 
        type="text" 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter captcha"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
```

## API

### `<Captcha />` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Length of the captcha string |
| `width` | `number` | `200` | Width of the canvas in pixels |
| `height` | `number` | `60` | Height of the canvas in pixels |
| `onChange` | `function` | **Required** | Callback receiving the new captcha value |
| `refreshOnClick` | `boolean` | `true` | Regenerate captcha when clicked |

### Utility Function

`validateCaptcha(userInput, actualValue, options)`

- `userInput` (string): The value entered by the user
- `actualValue` (string): The real captcha value (from `onChange`)
- `options` (object): Optional settings
  - `caseSensitive` (boolean): Default `false`

Example:
```js
validateCaptcha('abc', 'ABC', { caseSensitive: true }) // false
validateCaptcha('abc', 'ABC') // true
```

## License

MIT
