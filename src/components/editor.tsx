import { Component } from "react";

// @ts-ignore
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

// import "./editor.css";

interface EditorProps {
  onChangeJSON: (test: any) => void;
  json: {};
}
export default class JSONEditorDemo extends Component<EditorProps> {
  jsoneditor: any;
  container: any;
  componentDidMount() {
    const options = {
      mode: "code",
      onChangeJSON: this.props.onChangeJSON,
      onChange: this.props.onChangeJSON,
    };

    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(this.props.json);
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentDidUpdate() {
    this.jsoneditor.update(this.props.json);
  }

  render() {
    return (
      <div
        className='jsoneditor-react-container'
        ref={(elem) => (this.container = elem)}
      />
    );
  }
}
