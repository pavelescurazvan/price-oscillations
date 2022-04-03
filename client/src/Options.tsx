import React from 'react';

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  value: string; // like this
};

export default class Options extends React.Component<MyProps, MyState> {
  state: MyState = {
    value: ""
  }

  constructor(props: MyProps) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({value: event.currentTarget.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}