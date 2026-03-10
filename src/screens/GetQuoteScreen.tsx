import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {InfoCard} from '../components/ui/InfoCard';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockQuoteDraft} from '../data/policies';
import {RootStackParamList} from '../navigations/AppNavigator';
import {QuoteProduct} from '../types/insurance';

type GetQuoteRouteProp = RouteProp<RootStackParamList, 'GetQuote'>;
type GetQuoteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetQuote'
>;

interface Props {
  route: GetQuoteRouteProp;
  navigation: GetQuoteNavigationProp;
}

export const GetQuoteScreen: React.FC<Props> = ({route, navigation}) => {
  const initialProduct =
    route.params?.productType || mockQuoteDraft.productType;

  const [productType, setProductType] = useState<QuoteProduct>(initialProduct);
  const [fullName, setFullName] = useState(mockQuoteDraft.fullName);
  const [email, setEmail] = useState(mockQuoteDraft.email);
  const [phone, setPhone] = useState(mockQuoteDraft.phone);
  const [zipCode, setZipCode] = useState(mockQuoteDraft.zipCode);

  const [vehicleYear, setVehicleYear] = useState(
    mockQuoteDraft.vehicleYear || '',
  );
  const [vehicleMake, setVehicleMake] = useState(
    mockQuoteDraft.vehicleMake || '',
  );
  const [vehicleModel, setVehicleModel] = useState(
    mockQuoteDraft.vehicleModel || '',
  );
  const [age, setAge] = useState(mockQuoteDraft.age || '');
  const [annualIncome, setAnnualIncome] = useState(
    mockQuoteDraft.annualIncome || '',
  );
  const [smoker, setSmoker] = useState<'yes' | 'no'>(
    mockQuoteDraft.smoker || 'no',
  );
  const [hasDependents, setHasDependents] = useState<'yes' | 'no'>(
    mockQuoteDraft.hasDependents || 'no',
  );

  const commonIsValid =
    fullName.trim().length > 1 &&
    email.includes('@') &&
    phone.trim().length >= 7 &&
    zipCode.trim().length >= 4;

  const productIsValid = useMemo(() => {
    if (productType === 'Auto') {
      return (
        vehicleYear.trim().length === 4 &&
        vehicleMake.trim().length > 1 &&
        vehicleModel.trim().length > 1
      );
    }

    if (productType === 'Health') {
      return age.trim().length > 0;
    }

    return age.trim().length > 0 && annualIncome.trim().length > 0;
  }, [age, annualIncome, productType, vehicleMake, vehicleModel, vehicleYear]);

  const canContinue = commonIsValid && productIsValid;

  return (
    <ScreenContainer useSafeArea={false}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Choose product</Text>
        <View style={styles.chipRow}>
          {(['Auto', 'Health', 'Life'] as QuoteProduct[]).map(item => {
            const selected = item === productType;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setProductType(item)}>
                <Text
                  style={[
                    styles.chipLabel,
                    selected && styles.chipLabelSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Your details</Text>
        <InfoCard style={styles.formCard}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor={COLORS.textMuted}
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={COLORS.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="ZIP code"
            placeholderTextColor={COLORS.textMuted}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="number-pad"
            style={styles.input}
          />
        </InfoCard>

        {productType === 'Auto' && (
          <>
            <Text style={styles.sectionTitle}>Vehicle details</Text>
            <InfoCard style={styles.formCard}>
              <TextInput
                placeholder="Vehicle year"
                placeholderTextColor={COLORS.textMuted}
                value={vehicleYear}
                onChangeText={setVehicleYear}
                keyboardType="number-pad"
                style={styles.input}
              />
              <TextInput
                placeholder="Vehicle make"
                placeholderTextColor={COLORS.textMuted}
                value={vehicleMake}
                onChangeText={setVehicleMake}
                style={styles.input}
              />
              <TextInput
                placeholder="Vehicle model"
                placeholderTextColor={COLORS.textMuted}
                value={vehicleModel}
                onChangeText={setVehicleModel}
                style={styles.input}
              />
            </InfoCard>
          </>
        )}

        {productType === 'Health' && (
          <>
            <Text style={styles.sectionTitle}>Health profile</Text>
            <InfoCard style={styles.formCard}>
              <TextInput
                placeholder="Age"
                placeholderTextColor={COLORS.textMuted}
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                style={styles.input}
              />
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Do you smoke?</Text>
                <View style={styles.toggleGroup}>
                  {(['yes', 'no'] as const).map(value => (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.toggle,
                        smoker === value && styles.toggleSelected,
                      ]}
                      onPress={() => setSmoker(value)}>
                      <Text
                        style={[
                          styles.toggleText,
                          smoker === value && styles.toggleTextSelected,
                        ]}>
                        {value.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </InfoCard>
          </>
        )}

        {productType === 'Life' && (
          <>
            <Text style={styles.sectionTitle}>Life profile</Text>
            <InfoCard style={styles.formCard}>
              <TextInput
                placeholder="Age"
                placeholderTextColor={COLORS.textMuted}
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                style={styles.input}
              />
              <TextInput
                placeholder="Annual income"
                placeholderTextColor={COLORS.textMuted}
                value={annualIncome}
                onChangeText={setAnnualIncome}
                keyboardType="number-pad"
                style={styles.input}
              />
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Any dependents?</Text>
                <View style={styles.toggleGroup}>
                  {(['yes', 'no'] as const).map(value => (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.toggle,
                        hasDependents === value && styles.toggleSelected,
                      ]}
                      onPress={() => setHasDependents(value)}>
                      <Text
                        style={[
                          styles.toggleText,
                          hasDependents === value && styles.toggleTextSelected,
                        ]}>
                        {value.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </InfoCard>
          </>
        )}

        <PrimaryButton
          variant="outline"
          label="Save Draft"
          onPress={() =>
            Alert.alert('Draft saved', 'Your quote draft was saved locally.')
          }
          style={styles.saveButton}
        />
        <PrimaryButton
          label="See Plans"
          disabled={!canContinue}
          onPress={() =>
            navigation.navigate('QuoteResults', {
              productType,
              applicantName: fullName,
            })
          }
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  chip: {
    flex: 1,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  chipLabel: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  chipLabelSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
  },
  toggleRow: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  toggle: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  toggleSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  toggleText: {
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    fontSize: TYPOGRAPHY.sizes.xs,
  },
  toggleTextSelected: {
    color: COLORS.primary,
  },
  saveButton: {
    marginBottom: SPACING.sm,
  },
});
