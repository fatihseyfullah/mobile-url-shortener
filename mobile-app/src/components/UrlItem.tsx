import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';
import { Url } from '../types';
import { urlService } from '../services/urlService';

interface Props {
  url: Url;
  onDelete: () => void;
}

export default function UrlItem({ url, onDelete }: Props) {
  const [showQR, setShowQR] = useState(false);
  const shortUrl = `https://your-app.netlify.app/${url.short_code}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(shortUrl);
    Alert.alert('Kopyalandı', 'Kısa URL kopyalandı');
  };

  const shareWhatsApp = () => {
    const message = encodeURIComponent(`Kısa URL: ${shortUrl}`);
    Linking.openURL(`whatsapp://send?text=${message}`);
  };

  const handleDelete = async () => {
    Alert.alert('Sil', 'Bu URL\'i silmek istediğinizden emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          try {
            await urlService.deleteUrl(url.id);
            onDelete();
          } catch (error) {
            Alert.alert('Hata', 'Silinemedi');
          }
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.originalUrl} numberOfLines={1}>
            {url.original_url}
          </Text>
          <Text style={styles.shortUrl}>{shortUrl}</Text>
          <Text style={styles.date}>
            {new Date(url.created_at).toLocaleDateString('tr-TR')}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={copyToClipboard} style={styles.actionBtn}>
            <Text style={styles.actionText}>📋</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowQR(true)} style={styles.actionBtn}>
            <Text style={styles.actionText}>📱</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareWhatsApp} style={styles.actionBtn}>
            <Text style={styles.actionText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionBtn}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showQR} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QR Kod</Text>
            <View style={styles.qrContainer}>
              <QRCode value={shortUrl} size={200} />
            </View>
            <Text style={styles.modalUrl}>{shortUrl}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowQR(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  originalUrl: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  shortUrl: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
  },
  actionText: {
    fontSize: 20,
  },
  deleteText: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalUrl: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
