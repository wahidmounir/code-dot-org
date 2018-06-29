import React, {PropTypes} from 'react';
import _ from 'lodash';
import {Panel} from 'react-bootstrap';

export default class SingleChoiceResponses extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.object.isRequired,
    answerType: PropTypes.string.isRequired,
    possibleAnswers: PropTypes.array.isRequired,
    otherAnswers: PropTypes.array //Free response "other" answers
  };

  render() {
    let totalAnswers = Object.values(this.props.answers).reduce((sum, x) => sum + x, 0);
    return (
      <Panel>
        {this.props.question}
        <table>
          <tbody>
          {
            this.props.possibleAnswers.map((possibleAnswer, i) => {
              let answerIndex;

              if (this.props.answerType === 'selectValue') {
                // For selectValue questions, the value is not the text of the response
                // but a numeric value in some range. The hash contains a map of the
                // numeric values to counts, not texts to counts.
                answerIndex = i + 1;
              } else {
                answerIndex = possibleAnswer;
              }

              let count = this.props.answers[answerIndex] || 0;
              return (
                <tr key={i}>
                  <td>
                    {
                      (count / totalAnswers)
                        .toLocaleString('en-US', {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                    }
                  </td>
                  <td style={{paddingLeft: '20px'}}>
                    {count}
                  </td>
                  <td style={{paddingLeft: '20px'}}>
                    {possibleAnswer}
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        {
          this.props.otherAnswers && (
            <div>
              <br/>
              Other:
              <ul>
                {_.compact(this.props.otherAnswers).map((answer, i) => (<li key={i}>{answer}</li>))}
              </ul>
            </div>
          )
        }
      </Panel>
    );
  }
}
