import React, { Component } from 'react';
export default function NetworkDetector (ComposedComponent: any) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
            })
              .then(() => {
                this.setState({ isDisconnected: false }, () => {
                  return clearInterval(webPing)
                });
              }).catch(() => this.setState({ isDisconnected: true }))
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          {
            isDisconnected ? (
              <div className="internet-error" >
                <p>{"Sin conexión a Internet"} </p>
              </div>
            ) : null
          }
          < ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}