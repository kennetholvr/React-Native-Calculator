import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import NumberButton from "./components/numberButton";

const buttons = [
  ["Clear", "Del"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: "0",
      operator: null,
      firstValue: "",
      secondValue: "",
      nextValue: false,
    };
  }
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <NumberButton
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this, buttonItems)}
            key={"btn-" + buttonIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={"row-" + index}>
          {rowItem}
        </View>
      );
    });

    return layouts;
  }

  handleInput = (input) => {
    const {
      displayValue,
      operator,
      firstValue,
      secondValue,
      nextValue,
    } = this.state;
    switch (input) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.setState({
          displayValue: displayValue === "0" ? input : displayValue + input,
        });

        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        this.setState({
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length - 1)
              : displayValue) + input,
          nextValue: true,
        });
        break;
      case "=":
        let formatOperator = (operator == "x") ? "*" : (operator == '/') ? '/' : operator
        let result = eval(firstValue + formatOperator + secondValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          secondValue: "",
          operator: null,
          nextValue: false,
        });
        break;
      case "Clear":
        this.setState({
          operator: null,
          displayValue: "0",
        });
        break;
      case "Del":
        let string = displayValue.toString();
        let length = string.length;
        let deletedString = string.substr(0, string.length - 1)
        this.setState({
          displayValue: length == 1 ? "0" : deletedString,
          firstValue: length == 1 ? "" : deletedString,
        });
        break;
      case ".":
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== "." ? displayValue + input : displayValue,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
    }
    console.log(displayValue)
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
        </View>
        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#446418",
  },
  inputContainer: {
    flex: 8,
    backgroundColor: "#7d9b5d",
  },
  resultText: {
    color: "white",
    fontSize: 80,
    fontWeight: "bold",
    padding: 20,
    textAlign: "right",
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
  },
});
