import React, {useState} from 'react';

const App = () => {
    const [greeting, setGreeting] = useState('Hello function component');

    const handleChange = event => setGreeting(event.target.value);

    return (
        <Headline headline={greeting} onChangeHeadline={handleChange} />
    );
}

const Headline = ({headline , onChangeHeadline}) => {
    return (
        <div>
            <h1>{headline}</h1>
            <input type="text" name="headline" id="headline" value={headline} onChange={onChangeHeadline} />
        </div>
    );
}


export default App;