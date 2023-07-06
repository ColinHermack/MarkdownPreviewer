//Update marked settings
marked.use({
    breaks: true
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exampleInput: `
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`,
            output: ""
        };
        this.handleChange = this.handleChange.bind(this);  //Bind 'this' keyword to handleChange method
    }

    //When the component renders, add the parsed exaple markdown to the output div
    componentDidMount() {
        this.setState({output: marked.parse(this.state.exampleInput)});
    }

    //Triggers when textarea is updated
    handleChange(event) {
        this.setState(() => ({
            output: marked.parse(event.target.value) //Parse markdown to convert to HTML
        }));
    }

    //Render App
    render() {
        
        //Styling
        const editorDivStyle = {
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            margin: "0 auto 50px auto"
        };

        const editorStyle = {
            width: "100%",
            padding: "0",
            margin: "0",
            resize: "vertical",
            minHeight: "150px", 
            border: "1px solid rgb(200, 200, 200)",
            borderRadius: "0 0 5px 5px"
        }

        const divTitleStyle = {
            width: "100%",
            textAlign: "center",
            margin: "0",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderTop: "1px solid rgb(200, 200, 200)",
            borderLeft: "1px solid rgb(200, 200, 200)",
            borderRight: "1px solid rgb(200, 200, 200)",
            fontFamily: "sans-serif",
            fontSize: "1.2em",
            borderRadius: "5px 5px 0 0",
            backgroundColor: "rgb(230, 230, 230)"
        }

        const previewDivStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            margin: "0 auto 0 auto"
        }

        const previewStyle = {
            width: "100%",
            border: "1px solid rgb(200, 200, 200)",
            minHeight: "200px",
            padding: "0",
            borderRadius: "0 0 5px 5px",
            maxWidth: "100%",
            overflow: "hidden"
        }

        //Elements to render to the DOM
        return(
            <div>
                <div id="editor-div" style={editorDivStyle}>
                    <h2 style={divTitleStyle}>Editor</h2>
                    <textarea id="editor" onChange={this.handleChange} rows="10" cols="50" style={editorStyle}>{this.state.exampleInput}</textarea>
                </div>
                <div id="preview-div" style={previewDivStyle}>
                    <h2 style={divTitleStyle}>Preview</h2>
                    <div id="preview" dangerouslySetInnerHTML={{ __html: this.state.output }} style={previewStyle}></div>
                </div>
            </div>
        )
    }
}

//Render App comoment to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
