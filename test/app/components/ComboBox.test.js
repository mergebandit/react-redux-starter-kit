import React from 'react';
import test from 'blue-tape';
import { shallow } from 'enzyme';

import ComboBox from '../../../app/components/ComboBox';


test('----- React Component Tests: ComboBox -----', t => {
  const data = [{
    value: 'first',
    label: 'First',
  }, {
    value: 'second',
    label: 'Second',
  }];

  const comboBox = shallow(<ComboBox data={data} />);
  const input = comboBox.find('input');
  const newInputValue = 'first';

  // Test component text field state
  input.simulate('change', { target: { value: newInputValue } });
  t.equal(comboBox.state().textValue, newInputValue, 'Updates input value correctly');

  // Test dropdown behavior
  const dropDownItem = comboBox.find('.combobox-dropdown-item');
  t.ok(comboBox.state().isOpen, 'Opens dropdown when input gets focused');
  t.equal(dropDownItem.text(), data[0].label, 'Filters dropdown data');
  dropDownItem.simulate('click');
  t.notOk(comboBox.state().isOpen, 'Hides dropdown when input losts focus');

  // Test text field state update
  t.equal(comboBox.state().selectedItem, data[0].value, 'Saves selected value');

  // Test text field control button
  const actionBtn = comboBox.find('.combobox-button');
  // if we have value it should delete the value
  actionBtn.simulate('click');
  t.equal(
    comboBox.state().textValue,
    '',
    'Click on action button cleans text field value if it is not empty'
  );

  // Test action button behavior with empty text field
  actionBtn.simulate('click');
  t.ok(comboBox.state().isOpen && comboBox.find('.combobox-dropdown').length > 0,
    'Click on action button opens dropdown if the text field is empty');

  // Test disabled state
  comboBox.setProps({ disabled: true });

  // Test dropdown
  comboBox.setState({
    isOpen: true,
  });

  t.equal(
    comboBox.find('.combobox-dropdown').length,
    0,
    'Hides dropdown when disabled flag is turned on'
  );

  // Test action button behavior with empty text field
  comboBox.setState({ isOpen: false });
  actionBtn.simulate('click');
  t.notOk(comboBox.state().isOpen, 'Prevents dropdown open when if disabled');

  // Test action button behavior with not empty text field
  comboBox.setState({
    selectedItem: data[0].value,
    textValue: data[0].value,
  });

  actionBtn.simulate('click');
  const state = comboBox.state();
  t.ok(
    state.selectedItem === data[0].value && state.selectedItem === data[0].value,
    'Prevents deleting text field value if disabled'
  );

  // Test selected state when typing something;
  comboBox.setProps({ disabled: false });
  input.simulate('change', { target: { value: 'Some value' } });

  t.equal(comboBox.state().selectedItem, '', 'Resets selectedItem when type in text field');

  // Test not found results
  comboBox.setState({
    textValue: 'Something which cant be found',
    selectedItem: '',
    isOpen: true,
  });

  t.equal(
    comboBox.find('.combobox-dropdown').children().text(),
    'Ничего не найдено',
    'Shows empty message when no search results'
  );

  t.end();
});
