import React, { Component } from 'react';

class Share extends Component {
  constructor(props) {
    super(props);

    this.handleFacebookShare = this.handleFacebookShare.bind(this);
    this.handleTwitterShare = this.handleTwitterShare.bind(this);
  }

  // eslint-disable-next-line
  handleFacebookShare() {
    window.FB.ui({
      method: 'share',
      href: 'https://alpcanaydin.github.io/github-stats-for-turkey',
    });
  }

  // eslint-disable-next-line
  handleTwitterShare() {
    const url = `https://twitter.com/share?url=https://alpcanaydin.github.io/github-stats-for-turkey&text=Github Türkiye istatistikleri.`;

    const width = 550;
    const height = 400;

    const windowWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const windowHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const left = (windowWidth - width) / 2;
    const top = (windowHeight - height) / 2;

    const popupOptions = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, 'twitter', popupOptions);
  }

  render() {
    return (
      <p>
        <button className="button is-small is-dark" onClick={this.handleFacebookShare}>
          Facebook'ta Paylaş
        </button>
        {' '}
        <button className="button is-small is-dark" onClick={this.handleTwitterShare}>
          Twitter'ta Paylaş
        </button>
      </p>
    );
  }
}

export default Share;
