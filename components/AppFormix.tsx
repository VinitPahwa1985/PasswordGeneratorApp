import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = yup.object().shape({
  passwordLength: yup.number()
    .min(4, 'should be minimum 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('length is required')
});

export default function AppFormix() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const generatedPasswordString = (values) => {
    const { passwordLength, lowerCase, upperCase, numbers, symbols } = values;
    let characters = '';
    if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters += '0123456789';
    if (symbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (characters.length === 0) {
      Alert.alert('Please select at least one character type');
      return;
    }
    const newPassword = createPassword(characters, passwordLength);
    setPassword(newPassword);
    setIsPassGenerated(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = (resetForm) => {
    setPassword('');
    setIsPassGenerated(false);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Generator</Text>
      <Formik
        initialValues={{ passwordLength: '', lowerCase: false, upperCase: false, numbers: false, symbols: false }}
        validationSchema={PasswordSchema}
        onSubmit={generatedPasswordString}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, resetForm, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter password length"
              keyboardType="numeric"
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              onBlur={handleBlur('passwordLength')}
            />
            {errors.passwordLength && touched.passwordLength && <Text style={styles.error}>{errors.passwordLength}</Text>}
            <View style={styles.switchContainer}>
              <Text>Include Lowercase</Text>
              <BouncyCheckbox
                isChecked={values.lowerCase}
                onPress={() => setFieldValue('lowerCase', !values.lowerCase)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>Include Uppercase</Text>
              <BouncyCheckbox
                isChecked={values.upperCase}
                onPress={() => setFieldValue('upperCase', !values.upperCase)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>Include Numbers</Text>
              <BouncyCheckbox
                isChecked={values.numbers}
                onPress={() => setFieldValue('numbers', !values.numbers)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>Include Symbols</Text>
              <BouncyCheckbox
                isChecked={values.symbols}
                onPress={() => setFieldValue('symbols', !values.symbols)}
              />
            </View>
            <Button title="Generate Password" onPress={handleSubmit} />
            {isPassGenerated && (
              <Text style={styles.password}>Generated Password: {password}</Text>
            )}
            <Button title="Reset" onPress={() => resetPasswordState(resetForm)} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  password: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});