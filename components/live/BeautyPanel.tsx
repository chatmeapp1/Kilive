import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Slider from '@react-native-community/slider';

interface BeautyPanelProps {
  visible: boolean;
  values: any;
  onChange: (key: string, value: number) => void;
}

export default function BeautyPanel({ visible, values, onChange }: BeautyPanelProps) {
  if (!visible) return null;

  const sliderItem = (label: string, key: string, min = 0, max = 1, step = 0.01) => (
    <View style={styles.sliderItem}>
      <Text style={styles.label}>{label}</Text>
      <Slider
        style={{ width: '100%' }}
        value={values[key]}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#A855F7"
        maximumTrackTintColor="#666"
        thumbTintColor="#A855F7"
        onValueChange={(v) => onChange(key, v)}
      />
    </View>
  );

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Beauty Filters</Text>

      {sliderItem("Smoothness", "smoothnessLevel")}
      {sliderItem("Whiten", "lighteningLevel")}
      {sliderItem("Redness", "rednessLevel")}
      {sliderItem("Sharpen", "sharpnessLevel")}
      {sliderItem("Face Slim", "faceSlimLevel")}
      {sliderItem("Eye Enlarge", "eyeEnlargeLevel")}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  sliderItem: {
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
});