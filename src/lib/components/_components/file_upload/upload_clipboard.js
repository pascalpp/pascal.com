import Button from '../button';
import parse  from './parse_file';
import React  from 'react';


export default class UploadClipboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state         = {
      canUseClipboardRead: false,
    };
    this.handleOnPaste = this.handleOnPaste.bind(this);
  }

  async componentDidMount() {
    await this.askPastePermission();
  }

  async askPastePermission() {
    const { canUseClipboardRead } = this.state;

    // Can we read text from clipboard?
    if (!canUseClipboardRead && window.navigator.permissions) {
      try {
        const permission = await window.navigator.permissions.query({ name: 'clipboard-read' });
        if (permission.state !== 'denied')
          this.setState({ canUseClipboardRead: true });
      } catch (error) {
        // Promise fails in browsers that do not support this permission
      }
    }
  }

  async handleOnPaste(event) {
    event.preventDefault();

    const { onSuccess } = this.props;
    const { onError }   = this.props;

    const data = await window.navigator.clipboard.readText('text/plain');
    try {
      const { headers, records } = parse({ data, type: 'string' });
      onSuccess({ headers, records });
    } catch (error) {
      onError(new Error('We do not support this content pasted.'));
    }
  }

  render() {
    const { canUseClipboardRead } = this.state;

    if (canUseClipboardRead)
      return <Button link onClick={this.handleOnPaste} label="Paste from clipboard"/>;
    else
      return null;
  }
}
