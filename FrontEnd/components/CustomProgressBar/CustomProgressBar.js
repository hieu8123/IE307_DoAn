import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const CustomProgressBar = ({ visible, label }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={modalStyles.container}>
      <View style={modalStyles.modalContent}>
        <Text style={modalStyles.text}>{label}</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: '200',
  },
});

export default CustomProgressBar;
