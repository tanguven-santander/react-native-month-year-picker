import React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import invariant from 'invariant';

import RNMonthPickerView from './RNMonthPickerNativeComponent';
import { ACTION_DATE_SET, ACTION_DISMISSED, useTheme } from './utils';

const styles = StyleSheet.create({
  pickerContainer: { width: '100%', height: 200, minWidth: 315 },
  picker: { flex: 1 },
});

class MonthPicker extends React.PureComponent {
  state = {
    currentDate: this.props.value,
  };

  getLongFromDate = (selectedValue) => selectedValue.valueOf();

  onValueChange = (event) => {
    const [month, year] = event.nativeEvent.newDate.split('-');
    this.props.onChange(
      ACTION_DATE_SET,
      new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1),
    );
  };

  componentDidMount() {
    const darkMode = NativeModules.RNDarkModeManager;
    darkMode.isDarkMode((error, isDark) => {
      const theme = this.props.enableAutoDarkMode ? isDark : !isDark;
      this.setState({ theme: useTheme(theme) });
    });
  }

  render() {
    const {
      value,
      minimumDate,
      maximumDate,
      enableAutoDarkMode = true,
    } = this.props;
    invariant(value, 'value prop is required!');

    return (
      <View style={styles.pickerContainer}>
        <RNMonthPickerView
          style={styles.picker}
          onChange={this.onValueChange}
          value={this.getLongFromDate(value)}
          minimumDate={this.getLongFromDate(minimumDate)}
          maximumDate={this.getLongFromDate(maximumDate)}
          enableAutoDarkMode={enableAutoDarkMode}
        />
      </View>
    );
  }
}

export default MonthPicker;
