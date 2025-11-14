import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { urlService } from '../services/urlService';
import { Url } from '../types';
import UrlItem from '../components/UrlItem';

export default function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUrls();
    
    // Listen for focus event to reload URLs when returning to screen
    const unsubscribe = navigation.addListener('focus', () => {
      loadUrls();
    });
    
    return unsubscribe;
  }, [navigation]);

  const loadUrls = async () => {
    setLoading(true);
    try {
      const data = await urlService.getUserUrls();
      setUrls(data);
    } catch (error) {
      Alert.alert('Hata', 'URL\'ler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>URL Listesi</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateUrl')}
      >
        <Text style={styles.createButtonText}>+ Yeni URL Oluştur</Text>
      </TouchableOpacity>

      <FlatList
        data={urls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UrlItem url={item} onDelete={loadUrls} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadUrls} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz URL oluşturmadınız</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutBtn: {
    padding: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});
