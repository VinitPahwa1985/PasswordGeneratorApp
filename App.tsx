import { StyleSheet, Text, View, TextInput, Button, Alert, Switch } from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import AppFormix from './components/AppFormix';

const PasswordSchema = yup.object().shape({
  passwordlength: yup.number()
    .min(4, 'should be minimum 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('length is required')
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false); // New state for uppercase
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState('');

  const generatedPasswordString = (passwordLength) => {
    let characters = '';
    if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Include uppercase characters
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

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false); // Corrected this line
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    setPasswordLength(''); // Reset the password length input
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password length"
        keyboardType="numeric"
        value={passwordLength}
        onChangeText={setPasswordLength}
      />
      <View style={styles.switchContainer}>
        <Text>Include Lowercase</Text>
        <Switch value={lowerCase} onValueChange={setLowerCase} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Include Uppercase</Text>
        <Switch value={upperCase} onValueChange={setUpperCase} /> {/* New switch for uppercase */}
      </View>
      <View style={styles.switchContainer}>
        <Text>Include Numbers</Text>
        <Switch value={numbers} onValueChange={setNumbers} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Include Symbols</Text>
        <Switch value={symbols} onValueChange={setSymbols} />
      </View>
      <Button
        title="Generate Password"
        onPress={() => generatedPasswordString(parseInt(passwordLength))}
      />
      {isPassGenerated && (
        <Text style={styles.password}>Generated Password: {password}</Text>
      )}
      <Button
        title="Reset"
        onPress={resetPasswordState} // Call the reset function here
      />
    <AppFormix></AppFormix>
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
});