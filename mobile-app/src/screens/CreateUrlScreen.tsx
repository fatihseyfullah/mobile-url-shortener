import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { urlService } from '../services/urlService';

export default function CreateUrlScreen({ navigation, route }: any) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!originalUrl) {
      Alert.alert('Hata', 'Lütfen bir URL girin');
      return;
    }

    setLoading(true);
    try {
      await urlService.createUrl({ original_url: originalUrl });
      Alert.alert('Başarılı', 'URL başarıyla oluşturuldu');
      route.params?.onSuccess?.();
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Hata', error.response?.data?.message || 'URL oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni URL Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="Uzun URL'inizi girin"
        value={originalUrl}
        onChangeText={setOriginalUrl}
        autoCapitalize="none"
        keyboardType="url"
        multiline
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Oluşturuluyor...' : 'Oluştur'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelText}>İptal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
