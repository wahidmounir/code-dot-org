/** @file Button that continues to the next puzzle when clicked */
import React, {Component} from 'react';
import i18n from '@cdo/locale';
import {processResults} from '../code-studio/levels/dialogHelper';

export default class ContinueButton extends Component {
  state = {submitting: false};

  onClick = () => {
    this.setState({submitting: true});
    processResults(willRedirect => {
      if (!willRedirect) {
        this.setState({submitting: false});
      }
    });
  };

  render() {
    return (
      <button
        className="btn btn-primary pull-right"
        disabled={!!this.state.submitting}
        onClick={this.state.submitting ? null : this.onClick}
      >
        {i18n.continue()}
      </button>
    );
  }
}
